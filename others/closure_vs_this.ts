// Demo: Closure Scope vs 'this' Context

console.log("=== Example 1: Closure Scope ===\n");

function createCounter() {
    let count = 0;  // Closure variable
    let name = "Counter";  // Closure variable

    return function() {
        // Access via closure (lexical scope)
        count++;
        console.log("Closure access - name:", name);
        console.log("Closure access - count:", count);
        
        // Try to access via 'this' (won't work!)
        console.log("'this' access - name:", (this as any).name);  // undefined!
        console.log("'this' access - count:", (this as any).count);  // undefined!
        console.log("'this' is:", this);  // undefined in strict mode
    }
}

const counter = createCounter();
counter();

console.log("\n=== Example 2: Why 'this' is Different ===\n");

function memoMaker(fn: Function) {
    let cache = {};  // This is in CLOSURE, not on 'this'
    
    // If you try to use 'this' here:
    // this.cache = {};  // ❌ ERROR! 'this' is undefined in regular function

    return function(...props: any[]) {
        console.log("Can access 'cache' via closure:", cache);  // ✅
        console.log("Cannot access via 'this':", (this as any).cache);  // ❌ undefined
        console.log("'this' refers to:", this);  // undefined (or caller if method)
        
        return fn(...props);
    }
}

const memoized = memoMaker((x: number) => x * 2);
memoized(5);

console.log("\n=== Example 3: Two Separate Scopes ===\n");

function outerFunction() {
    // CLOSURE SCOPE
    let closureVar = "I'm in closure";
    
    return function innerFunction() {
        // Access closure variable
        console.log("From closure:", closureVar);  // ✅ Works
        
        // 'this' is completely separate!
        console.log("'this' is:", this);  // undefined (or depends on caller)
        
        // These are NOT the same:
        console.log("closureVar:", closureVar);  // ✅ "I'm in closure"
        console.log("this.closureVar:", (this as any).closureVar);  // ❌ undefined
    }
}

const inner = outerFunction();
inner();

console.log("\n=== Example 4: When 'this' DOES Matter ===\n");

const obj = {
    multiplier: 10,
    method: function() {
        console.log("'this' refers to:", this);  // The obj
        console.log("'this.multiplier':", this.multiplier);  // 10
    }
};

obj.method();  // 'this' = obj

console.log("\n=== Example 5: Your Memoize Case ===\n");

function memoMakerExample(fn: Function) {
    let cache = {};  // ← CLOSURE variable
    let callCount = 0;  // ← CLOSURE variable
    
    return function(...props: any[]) {
        callCount++;  // Access via closure ✅
        
        console.log("callCount (closure):", callCount);  // ✅ Works
        console.log("this.callCount:", (this as any).callCount);  // ❌ undefined
        
        // Why? Because 'this' ≠ closure scope!
        // 'this' = whoever called this function
        // closure = variables from outer function
        
        const key = JSON.stringify(props);
        if (key in cache) {
            console.log("Cache hit!");
            return (cache as any)[key];
        }
        
        (cache as any)[key] = fn.call(this, ...props);
        return (cache as any)[key];
    }
}

const add = memoMakerExample((a: number, b: number) => a + b);
add(2, 3);
add(2, 3);  // Cache hit

console.log("\n=== Key Insight ===");
console.log("Closure variables: Captured from outer function");
console.log("'this': Determined by HOW the function is CALLED");
console.log("They are COMPLETELY SEPARATE mechanisms!");

