mm_modules.define("util", [], function (util) {
    function randomNum(min, max) {
        var range = max - min;
        var rand = Math.random();
        var num = min + Math.round(rand * range);
        return num;
    }

    function delegate(dom, eventStr, classStr, callback) {
        dom.addEventListener(eventStr, function (event) {
            var target = event.target;

            var nodes = [target];

            while (true) {
                if (!target) {
                    break;
                }
                var parent = target.parentElement;
                target = parent;
                if (this != parent && parent) {
                    nodes.push(parent);
                } else {
                    break;
                }
            }
            nodes.push(this);
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.getAttribute("class") === classStr) {
                    callback(event, node);
                }
            }
        });
    }

    function appendTplDomToBody(id, tpl) {
        var tplDom = document.createElement("script");
        tplDom.setAttribute("id", id);
        tplDom.setAttribute("type", "text/html");
        tplDom.innerHTML = tpl;
        document.getElementsByTagName("body")[0].appendChild(tplDom);
    }
    return {
        randomNum: randomNum
        , delegate: delegate
        , appendTplDomToBody: appendTplDomToBody
    }
});