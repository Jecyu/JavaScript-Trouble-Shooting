// Promise 没有采用流行的 error-first 风格，而是分离回调风格[1]
// 使用 .catch(handleErrors) 来处理错误[2]，但是如果 handleErrors(...) 内部有错误，则无法捕获了
// let p = new Promise((resolve, reject) => {
//   reject("Oop");
// });
// let p2 = p
//   .then(
//     function fullfilled() {
//       // 永远不会到这里
//     }
//     // 假定的拒绝处理函数，如果省略或者传入任何非函数值
//     // 默认拒绝处理函数只是把错误抛出，p2 用同样的理由拒绝，并继续向下传播这个错误，直到找到处理错误的函数
//     // function reject(err) {
//     // throw err;
//     // }
//   )
//   .then(
//     function fullfilled() {},
//     function rejected(err) {
//       // 分离回调 [1]
//       console.log(err);
//     }
//   );

let p3 = Promise.resolve(42);
p3.then(
  function fullfilled(msg) {
    // 数字没有 string 函数，所以抛出错误
    console.log(msg.toLowerCase());
  },
  function rejected(err) {
    // 分离回调 [1]，永远不会到这里，因为 promise 已经被决议为 42 了
    // 无法捕获到处理上面的 string 错误的
    console.log("捕获错误", err);
  }
).catch(error => console.log("catch 捕获错误", error)); // 这里就可以捕获到 fullfilled 内部的错误了
