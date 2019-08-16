// 导入express
var express = require("express");

// 生成实例
var app = express();

// 定义路由，第一个参数为路径，'/'代表根目录，function添加两个参数，请求和响应
app.get("/", function(req, res) {
  // 把信息响应给浏览器
  res.send("this is homepage");
});

// 添加到监听的端口上
app.listen(3000);

// 运行前，全局安装nodemon，运行nodemon会默认寻找server.js文件；如果没有serve.js 运行nodemon+文件名
