function expensiveOperation(endRange: number) {
    let sum = 0;
    for (let i = 0; i < endRange; i++) {
        sum += i;
    }
    return sum;
}


function memoize(fn: Function) {
    const cache = {};

    return function (...args) {
        const str = JSON.stringify(args);

        if (cache[str]) {
            return cache[str];
        }
        return cache[str] = fn.call(this, ...args);
    }
}
