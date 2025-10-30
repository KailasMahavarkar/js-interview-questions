// Promise States
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MyPromise(executor) {
	let state = PENDING;
	let value = undefined;
	let reason = undefined;
	const onFulfilledCallbacks = [];
	const onRejectedCallbacks = [];

	const resolve = (val) => {
		if (state === PENDING) {
			state = FULFILLED;
			value = val;
			onFulfilledCallbacks.forEach((callback) => callback(value));
		}
	};

	const reject = (err) => {
		if (state === PENDING) {
			state = REJECTED;
			reason = err;
			onRejectedCallbacks.forEach((callback) => callback(reason));
		}
	};

	this.then = function (onFulfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			const handleFulfilled = (val) => {
				try {
					if (typeof onFulfilled === "function") {
						const result = onFulfilled(val);
						resolve(result);
					} else {
						resolve(val); // Pass through if no handler
					}
				} catch (error) {
					reject(error);
				}
			};

			const handleRejected = (err) => {
				try {
					if (typeof onRejected === "function") {
						const result = onRejected(err);
						resolve(result); // Catching error = recovery
					} else {
						reject(err); // Pass through if no handler
					}
				} catch (error) {
					reject(error);
				}
			};

			if (state === FULFILLED) {
				setTimeout(() => handleFulfilled(value), 0);
			} else if (state === REJECTED) {
				setTimeout(() => handleRejected(reason), 0);
			} else {
				onFulfilledCallbacks.push(handleFulfilled);
				onRejectedCallbacks.push(handleRejected);
			}
		});
	};

	// .catch() method - syntactic sugar for .then(null, onRejected)
	this.catch = function (onRejected) {
		return this.then(null, onRejected);
	};

	try {
		executor(resolve, reject);
	} catch (error) {
		reject(error);
	}
}


function verifyAge(age = 1) {
	return new MyPromise((resolve, reject) => {
		if (age >= 18) {
			resolve(`age is good, ${age}`);
		} else {
			reject(`age is bad, ${age}`);
		}
	});
}

verifyAge(16)
	.then((data) => console.log(data))
	.catch((err) => console.error(err));

// // Example 2: Async resolve
// console.log("\n2. Async Resolve (setTimeout):");
// new MyPromise((resolve) => {
// 	setTimeout(() => resolve("✓ Async resolved!"), 100);
// }).then((value) => {
// 	console.log("  ", value);
// });

// // Example 3: Chaining
// console.log("\n3. Promise Chaining:");
// new MyPromise((resolve) => {
// 	resolve(1);
// })
// 	.then((value) => {
// 		console.log("   Step 1:", value);
// 		return value + 1;
// 	})
// 	.then((value) => {
// 		console.log("   Step 2:", value);
// 		return value + 1;
// 	})
// 	.then((value) => {
// 		console.log("   Step 3:", value);
// 	});

// // Example 4: Reject with catch
// console.log("\n4. Reject with .catch():");
// new MyPromise((resolve, reject) => {
// 	reject("✗ Error occurred!");
// }).catch((error) => {
// 	console.log("   Caught:", error);
// });

// // Example 5: Error recovery
// console.log("\n5. Error Recovery:");
// new MyPromise((resolve, reject) => {
// 	reject("Error!");
// })
// 	.catch((error) => {
// 		console.log("   Caught:", error);
// 		return "Recovered"; // Recovery
// 	})
// 	.then((value) => {
// 		console.log("   After recovery:", value);
// 	});

// // Example 6: Reject in then
// console.log("\n6. Reject in .then():");
// new MyPromise((resolve) => {
// 	resolve("Initial");
// })
// 	.then((value) => {
// 		console.log("   First:", value);
// 		throw new Error("Error in then!");
// 	})
// 	.catch((error) => {
// 		console.log("   Caught:", error.message);
// 	});

// // Example 7: Multiple then calls on same promise
// console.log("\n7. Multiple .then() on same promise:");
// const p = new MyPromise((resolve) => {
// 	setTimeout(() => resolve("Shared value"), 50);
// });

// p.then((value) => console.log("   Handler 1:", value));
// p.then((value) => console.log("   Handler 2:", value));
// p.then((value) => console.log("   Handler 3:", value));

// // Example 8: Then with both handlers
// console.log("\n8. .then() with both success and error handlers:");
// new MyPromise((resolve, reject) => {
// 	reject("Error!");
// }).then(
// 	(value) => console.log("   Success:", value),
// 	(error) => console.log("   Error handler:", error)
// );
