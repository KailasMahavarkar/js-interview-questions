function memoMaker(fn: Function = () => { }) {
    if (typeof fn !== 'function') {
        console.warn("cannot memoize non-functional code")
    }

    let cache = {};

    function computedFunction(...props) {
        const propString = JSON.stringify(props);
        if (propString in cache){
            return cache[propString];
        }
        cache[propString] = fn.call(this, ...props);
        return cache[propString];
    }

    return computedFunction;
}

const foo = memoMaker(() => {
    let sum = 0;
    for (let i = 0; i < 10 ** 6; i++) {
        sum += i;
    }
    return sum;
});

console.time();
foo();
console.timeEnd()
// foo();
// foo();

console.time();
foo();
console.timeEnd()