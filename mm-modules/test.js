mm_modules.define("test", [], function () {
    function test() {
        console.log("mm-modules test ok.");
    }
    return {
        test: test
    }
});