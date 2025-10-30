const re = {
    base() {
        console.log("this -> ", this);
        function inner() {
            console.log("base inner --> ", this);
        }

        return inner();
    },
    real() {
        console.log("this -> ", this);
    },
};

console.log(re.base());