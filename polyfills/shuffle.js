const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffleArray() {
	let s = 0;
	let e = arr.length - 1;

    if (Array.isArray(this) === false) {
        throw new Error('This is not an array');
    }

	function generateRandomNumber(start, end) {
		return Math.round(Math.random() * (end - start));
	}

	for (let i = 0; i < arr.length; i++) {
		let r1 = generateRandomNumber(s, e);
		let r2 = generateRandomNumber(s, e);
		let temp = this[r1];
		this[r1] = this[r2];
		this[r2] = temp;
	}

    return arr;
}

Array.prototype.shuffle = shuffleArray;
arr.shuffle();
console.log(arr);