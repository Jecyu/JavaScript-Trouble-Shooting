/**
 * 使用 Promise 包装以前的回调函数
 */

const fs = require("./FileSystem");
fs.readFile("./hello.md", "utf-8").then(content => {
  console.log(content);
});
