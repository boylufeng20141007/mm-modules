# mm-modules

基于gulp的简单模块管理方案与相关模块

## 开始使用

### 搭建环境
1. 建议您先安装git与node环境
2. 在命令行执行以下命令
```shell
https://github.com/MIKUScallion/mm-modules.git
cd mm-modules
npm install
./node_modules/.bin/gulp watch
```
3. 使用浏览器打开./dist/index.html，打开浏览器控制台，您会发现*mm-modules*已经正常运作

### 进一步开发

1. 修改./mm-modules文件夹下的模块文件，或者您添加自己的模块
2. 在./mm-modules/test.js模块中或者其他模块中依赖别的模块
3. 在./dist/index.html或者其他html中使用模块
4. 多参考其他模块文件，您可以的

### 原理

1. ./mm-modules文件夹下的模块文件，最终都会被gulp打包起来，不过请放心，模块的依赖会自动理清楚的，^_^
