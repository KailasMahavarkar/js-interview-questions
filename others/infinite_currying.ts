function sum(a: number) {
    return function (b: number) {
        if (b) {
            return sum(a + b)
        }
        return a
    };
}

console.log(
    sum(10)(20)(30)(50)
); // Output: 70
