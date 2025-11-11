function flattenPolyUnique(depth = 100) {
	const result = [];
	const st = new Set();

    console.log(this)

	function flat(arr, currentDepth) {
		for (const item of arr) {
			if (typeof item === "number") {
				if (!st.has(item)) {
					result.push(item);
					st.add(item);
				}
			} else if (Array.isArray(item)) {
				if (currentDepth < depth) {
					flat(item, currentDepth + 1);
				} else {
					result.push(item);
				}
			}
		}
	}

	flat(this, 0);
	return result;
}

Array.prototype.flattenPolyUnique = flattenPolyUnique;

// Test case
const arr = [
	[10, 20],
	[20, [20, 30, [80, 90]]],
	[30, 40],
];
const flat = arr.flattenPolyUnique(2);
console.log(flat);