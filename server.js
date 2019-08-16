// 导入express
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
// 处理文件上传的库（下面两个）
var multer = require("multer");
var upload = multer({ dest: "uploads/" }); //文件保存的路径

/****************** */
// 路由中间件
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use("/", indexRouter);
app.use("/users", usersRouter);
/****************** */

// 生成实例
var app = express();
// 中间件urlencoded只处理传递进来的参数为urlencoded格式的，不能接收json格式传输过来的参数
app.use(bodyParser.urlencoded({ extended: false }));
// 中间件，接收json参数
app.use(bodyParser.json());

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// 定义路由，第一个参数为路径，'/'代表根目录，function添加两个参数，请求和响应
app.get("/test", function(req, res) {
  // 把信息响应给浏览器
  // res.send("this is homepage");
  // 发送json、数组都可以
  var responseObject = [
    {
      name: "haha"
    },
    { name: "hehe" }
  ];
  res.send(responseObject);
});

// 路由参数
app.get("/profile/:id/user/:name", function(req, res) {
  // 获取路由参数的id
  res.send(
    "You requested to see a profile with the name of " +
      req.params.id +
      req.params.name
  );
});

// ？代表前面的参数b可以出现一次或者0次(可以有，也可以没有)
app.get("/ab?cd", function(req, res) {
  res.send("/ab?cd");
});

// 通过req.query.find取出地址栏后面的参数（http://localhost:3000?find=hot）
app.get("/", function(req, res) {
  console.dir(req.query);
  res.send("home page: " + req.query.find); // 取出find的参数值hot
});

/*************************** */
// 处理文件上传
app.get("/form", function(req, res) {
  // var form = fs.readFileSync("./form.html", { encoding: "utf8" });
  // res.send(form);
  res.send(__dirname + "./form.html"); //上下两种写法一样
});

// single中的logo为form.html中input标签中的name（logo）
app.post("/upload", upload.single("logo"), function(req, res) {
  // 上传成功返回一个状态码
  res.send({ ret_code: 0 });
});
/*************************** */

// post请求
app.post("/", function(req, res) {
  console.dir(req.body);
  res.send("ok");
});
// 接收urlencoded传递过来的参数
app.post("/", urlencodedParser, function(req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});
// 接收json传递过来的参数
app.post("/upload", jsonParser, function(req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});

// 添加到监听的端口上
app.listen(3000);

// 运行前，全局安装nodemon，运行nodemon会默认寻找server.js文件；如果没有serve.js 运行nodemon+文件名
