// a promise??
// executor -> resolve, reject
// 

function getPromise(executor){
    let onReject;
    let onResolve;
    let isCalled = false;

    this.then = function(thenHandler){
        onResolve = thenHandler;
        return this;
    }

    this.catch = function(){
        onReject = thenHandler;
        return this;
    }

    function resolve(data){
        if (typeof onResolve === 'function' && !isCalled){
            onResolve(data);
            isCalled = true;
        }
    }

    function reject(err){
        if (typeof onReject === 'function' && !isCalled){
            onReject(err);
            isCalled = true;
        }
    }

    executor(resolve, reject); 
}


