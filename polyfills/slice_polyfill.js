function slicePolyfill(this, initialIndex, finalIndex) {
    if (finalIndex < initialIndex) {
        console.warn("final index cannot be less than initial index");
        return;
    }

    if (!Array.isArray(this)) {
        console.warn('only callable on array')
        return;
    }

    if (finalIndex > this.length) {
        console.warn('out of bound')
        return;
    }

    let newValues = [];
    for (let i = initialIndex; i < finalIndex; i++) {
        newValues.push(this[i]);
    }
    return newValues;
}

Array.prototype.slicePoly = slicePolyfill;

console.log(
    [10, 20, 30].slicePoly(0, 4)
)


