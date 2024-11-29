function once(func, context) {
	let cache = null;

	return function () {
		if (func) {
			cache = func.apply(context || this, arguments);
			func = null;
		}
		return cache;
	};
}

const callable = once(
	function (a, b) {
		console.log(`this.value + a + b --> ${this.value + a + b}`);
	},
	{ value: 100 }
);

callable(10, 20);
