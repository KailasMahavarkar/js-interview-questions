function once(func, context) {
	let cache = null;

	return function (...args) {
		if (func) {
			cache = func.apply(context || this, args);
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

callable();
