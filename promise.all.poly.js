let promise1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("Resolved-1");
	}, 1000);
});

let promise2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("Resolved-2");
	}, 500);
});

let promise3 = new Promise((resolve, reject) => {
	resolve("Resolved-3");
});

Promise.runAll = function (promises = []) {
	let resolvedCount = 0;
	const promiseResult = new Array(promises.length);

	return new Promise((resolve, reject) => {
		promises.forEach((promise, index) => {
			promise
				.then((data) => {
					promiseResult[index] = data;
					resolvedCount++;
					if (resolvedCount === promises.length) resolve(promiseResult);
				})
				.catch((e) => reject(e));
		});
	});
};

Promise.runAll2 = function (promises) {
	let result = new Array(promises.length); //initialize array with length same as of promises array
	let totalPromisesResolved = 0;

	return new Promise((resolve, reject) => {
		promises.forEach((promise, index) => {
			promise
				.then((val) => {
					result[index] = val;
					totalPromisesResolved++;
					if (totalPromisesResolved == promises.length) resolve(result);
				})
				.catch((err) => reject(err));
		});
	});
};

const promises = [promise1, promise2, promise3];
Promise.runAll(promises)
	.then((result) => console.log(result))
	.catch((err) => console.log(err));
