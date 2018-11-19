/**
 * Promise.race()
 * 只有第一额决议的 Promise(完成或拒绝)取胜，并且其决议结果成为返回 Promise 的决议
 * 注意：如果传入空值，它会挂住，永远不会决议
 */
console.log("start");
// p1, p2 模拟 ajax 请求
let p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve("I'm p1");
  }, 1000);
});
let p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve("I'm p2");
  }, 500);
});
Promise.race([p1, p2])
  .then(race => {
    console.log(race);
  })
  .catch(err => {
    console.log("catch 捕获错误", err);
  });
