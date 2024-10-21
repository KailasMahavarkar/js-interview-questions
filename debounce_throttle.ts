type timerType = ReturnType<typeof setTimeout>;
type callbackType = (...args: any[]) => any;

function debounce(callback: callbackType, delay: number) {
    let timer: timerType;
    if (typeof callback !== "function") {
        return;
    }

    const inner = (...args: any[]) => {
        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return inner;
}

function throttle(callback: callbackType, delay: number) {
    let isCalled = false;
    return function (...args: any[]) {
        if (!isCalled) {
            isCalled = true;
            setTimeout(() => {
                isCalled = false;
            }, delay);
            return callback(...args)
        }
    };
}


function consume_debounce() {
    console.log("debounce consumer")

    const sum = (...args: number[]) => {
        const res = args.reduce((p, c) => p + c, 0);
        console.log(res);
        return res;
    }

    const debounceSum = debounce(sum, 1000);

    debounceSum(10, 20, 30);
    debounceSum(10, 20, 30);

    setTimeout(() => {
        console.log("awaiting ...")
        debounceSum(10, 20, 30);
        debounceSum(10, 20, 30);
    }, 1000)
}

function consume_throttle() {

    console.log("throttle consumer")

    const sum = (...args: number[]) => {
        const res = args.reduce((p, c) => p + c, 0);
        console.log(res);
        return res;
    };

    const throttleSum = throttle(sum, 1000);

    throttleSum(10, 20, 30);
    throttleSum(10, 20, 30);

    setTimeout(() => {
        console.log("awaiting ...");
        throttleSum(10, 20, 30);
        throttleSum(10, 20, 30);
    }, 1000);
}

consume_throttle();
consume_debounce()