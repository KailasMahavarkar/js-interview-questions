function f(){
    console.log(this);
}


let user = {
    g: f.bind(null)
}

user.g(); // in nodejs it points to null / in chrome it points to window


// Node.js has no concept of the window object, and in a non-strict environment, null remains null.
// NodeJS: null
// Chrome (or browser) environments interpret this as window when null is provided in non-strict mode, 
// since this is supposed to refer to some object and window is the default global object.
// Chrome: window