function sum(a, b) {
    return `sum was ran by ${this?.username} and anwer was ${a + b}`
}


Function.prototype.callPoly = function (context = {}, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError(this + " is not callable");
    }

    context.fn = this; // this here is actually a function
    const result = context.fn(...args);
    delete context.fn;
    return result;
};

Function.prototype.applyPoly = function (context = {}, args) {
    if (typeof this !== 'function') {
        throw new TypeError(this + " is not callable");
    }

    if (!Array.isArray(args)) {
        throw new TypeError(`${args} is expected to be array`)
    }

    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.bindPoly = function (context = {}, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError(this + " is not callable");
    }

    context.fn = this;
    return function (...newArgs) {
        return context.fn(...args, ...newArgs);
    }
}

console.log(
    sum.bindPoly({
        username: "kai"
    })(10, 20)
)

console.log(
    sum.call({
        username: "kai"
    }, 10, 20)
)