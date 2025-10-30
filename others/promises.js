function cookMeal(age) {
	return new Promise((resolve, reject) => {
		const isMealReady = true; // Simulating whether the meal is ready

		if (age < 10) {
			reject("Sorry, you must be 18 or older to order a meal."); // Reject the promise if the user is under 18
		}

		// Simulate cooking time with setTimeout (asynchronous operation)
		setTimeout(() => {
			if (isMealReady) {
				resolve("Your meal is ready!"); // Success, promise fulfilled
			} else {
				reject("Sorry, the kitchen is closed."); // Failure, promise rejected
			}
		}, 3000); // Simulate a 3-second cooking time
	});
}

// Calling the function and handling the result
cookMeal()
	.then((result) => {
		console.log(result); // If the meal is ready, log success message
	})
	.catch((error) => {
		console.log(error); // If there's an issue, log the failure message
	})
	.finally(() => {
		console.log("Meal order process is complete."); // This will run whether the meal is ready or not
	});
