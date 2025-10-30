function memoMaker(fn: Function = () => { }) {
    if (typeof fn !== 'function') {
        console.warn("cannot memoize non-functional code")
    }

    let cache = {};

    return function (...props) {
        const propString = JSON.stringify(props);
        if (propString in cache) {
            return cache[propString];
        }
        console.log("this -->", this)
        cache[propString] = fn.call(this, ...props);
        return cache[propString];
    }
}

const foo = memoMaker(function () {
    console.log("this caller context ->", this)
    let sum = 0;
    for (let i = 0; i < 10 ** 6; i++) {
        sum += i;
    }
    return sum;
});

console.time();
(foo).call({}, 20, 30)
console.timeEnd()

console.time();
foo();
console.timeEnd()