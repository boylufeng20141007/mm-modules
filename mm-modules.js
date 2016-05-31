window.mm_modules = (function Manager() {
    var debug = false;
    var modules = {};
    var rebuilds = [];
    function copyArray (array){
        var tempArray = [];
        for(var i=0; i<array.length; i++){
            tempArray.push(array[i]);
        }
        return tempArray;
    }
    function define(name, deps, impl) {
        //判断依赖构建是否成功
        var depsDone = true;
        
        //拷贝一份当前想要构建的模块，当构建失败时使用
        var rebuildCopy = {
            name : name,
            deps : copyArray(deps),
            impl : impl
        };
        
        //循环依赖数组，构建依赖
        for (var i=0; i<deps.length; i++){
            //将依赖的名字替换成已经注册了的模块
            deps[i] = modules[deps[i]];
            //有依赖的模块未定义，所以这个模块构建失败
            if(!deps[i]){
                depsDone = false;
                break;
            }
        }
        
        //如果依赖构建成功，即模块构建成功
        if(depsDone){
            //将依赖数组展开成参数传入模块的构建函数，生成新模块
            modules[name] = impl.apply(impl, deps);
            //从rebuilds数组中移除
            if(rebuilds[name]){
               delete rebuilds[name];
            }
            //循环rebuilds数组，尝试从新构建之前构建失败的模块
            for (key in rebuilds){
                var rebuild = rebuilds[key];
                if(rebuild){
                    //递归调用
                    define(rebuild.name, rebuild.deps, rebuild.impl);
                }
            }
        }
        //模块构建失败，存入rebuilds数组中，等待下一次重新构建
        else{
            rebuilds[name] = rebuildCopy;
        }
        if(debug){
            console.log("[mm_modules debug]need rebuild modules:", rebuilds);
        }
    }
    function get(name){
        return modules[name];
    }
    return {
        define: define,
        get: get
    }
})();