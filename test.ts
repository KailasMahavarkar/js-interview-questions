const nestedObj = {
	a: {
		B: {
			c: {
				d: 1,
				e: 2,
			},
			e: [1, 2, 3, 4, 5],
			f: true,
			g: null,
		},
	},
};


const obj2 = {
	a: {
		B: 10,
		C: 20,
	},
};

function getFlattenObject(obj = {}, result = {}, currentKey = "") {
	if (typeof obj === "undefined" || typeof obj === null) {
		return;
	}

	if (typeof obj === "object" && !Array.isArray(obj)) {
		Object.entries(obj || {}).map(([k, v]) => {
            const newKey = currentKey ? `${currentKey}.${k}`: `${k}`;
			if (typeof v === "object" && !Array.isArray(v)) {
				getFlattenObject(v, result, newKey);
			}else{
                result[newKey] = v;
            }
		});
	}else{
        result[currentKey] = obj;
    }
    return result
}

console.log(
    getFlattenObject(nestedObj)
);
