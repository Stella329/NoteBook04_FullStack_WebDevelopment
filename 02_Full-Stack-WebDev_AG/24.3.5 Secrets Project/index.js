import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


// 添加requese body
app.use(bodyParser.urlencoded({ extended: true }));

// check req.body 中的password：自定义
function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    req.userIsAuthorised = true;    // 把它挂在 req 上，而不是全局变量上var
  } else {
    req.userIsAuthorised = false;
  }
  next();
}

app.use(passwordCheck);


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// 密码是在第二次请求（POST）时才飞到服务器的。

app.post("/check", (req, res) => {
  // 检查当前这个用户请求里的标记
  if (req.userIsAuthorised) { 
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
