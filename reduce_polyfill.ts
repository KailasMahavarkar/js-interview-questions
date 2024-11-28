function reducePolyFill(callback, accumulator) {
    let globalAcc = accumulator || 0;
    this.forEach((element, idx) => {
        globalAcc = callback(globalAcc, element, idx);
    });
    return globalAcc;
}


Array.prototype.reducePoly = reducePolyFill;
const ans = [10, 20, 30].reducePoly((acc, element) => acc + element, 0);


console.log(ans)
