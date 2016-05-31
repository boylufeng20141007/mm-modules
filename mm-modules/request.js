mm_modules.define("request", [], function () {
    function getJSON(url, callback, stateCallback) {
        var xhrObject = new XMLHttpRequest();
        xhrObject.open("GET", url, true);
        xhrObject.responseType = "json";
        xhrObject.send();
        xhrObject.onreadystatechange = function (event) {
            var target = event.target;

            //状态改变回调
            if (stateCallback) {
                stateCallback(target.readyState);
            }

            if (target.readyState === 4) {
                //最终状态成功回调
                if (target.status === 200) {
                    callback(xhrObject.response, target.status);
                }
                //最终状态失败回调
                else {
                    callback(null, target.status);
                }
            }
        }
    }

    function _test() {
        var xhrObject = new XMLHttpRequest();
        //xhrObject.responseType = "json";
        //最后一个参数，决定是否异步调用，同步调用会有警告
        xhrObject.open("GET", "http://talk.simplejan.com/api/use", true);
        xhrObject.send();
        xhrObject.onreadystatechange = function (event) {
            //target also xhrObject
            var target = event.target;
            //0，1，2，3，4
            console.log("readyState:", target.readyState);
            console.log("response:", target.response);
            console.log("responseText:", target.responseText);
            console.log("responseType:", target.responseType);
            console.log("responseXML", target.responseXML);
        }
    }
    return {
        _test: _test
        , getJSON: getJSON
    }
});