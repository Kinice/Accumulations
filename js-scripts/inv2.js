var func = (function(a) {
    this.a = a;
    return function(a) {
        a += this.a;
        return a;
    }
})(function(a, b) {
    return a;
}(1, 2));

console.log(func(1))
