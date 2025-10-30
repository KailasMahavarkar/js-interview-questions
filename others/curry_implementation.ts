// function curry(mainFunction: Function) {
//     return function curriedFunction(...args) {
//         if (args.length >= mainFunction.length) {
//             return mainFunction(...args);
//         }
//         return function (...next) {
//             return curriedFunction(...args, ...next)
//         }
//     }
// }

function curry(mainFunction: Function) {
    return function outerCurry(currentNumber) {
        return function (next) {
            if (!next) return currentNumber;
            return outerCurry(currentNumber + next)
        }
    }
}

//                        ([...args])=> some operation
//                    fn(this -> function, this.length =)
const curriedSum = curry((a, b) => a - b)
console.log(curriedSum(10)(20)(30)())
