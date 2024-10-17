function curry(mainFunction: Function) {
    return function curriedFunction(...args) {
        if (args.length >= mainFunction.length) {
            return mainFunction(...args);
        }
        return function (...next) {
            return curriedFunction(...args, ...next)
        }
    }
}


const curriedSum = curry((a, b, c, d) => a + b + c + d);
console.log(curriedSum(10)(20)(30)(40))
