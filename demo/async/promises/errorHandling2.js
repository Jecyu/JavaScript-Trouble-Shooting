// 根据需要开启验证 [1]
// let baz = {
//   bar: function() {
//     setTimeout(() => {
//       console.log(x);
//     }, 0);
//   }
// };

// error-first 回调风格[1]
function foo(cb) {
  setTimeout(() => {
    try {
      let x = baz.bar(); // 注意：如果 baz.bar() 本身内部含有异步的完成函数，则里面任何错误都无法捕捉到
      // let x = 1;
      cb(null, x); // 成功
    } catch (err) {
      cb(err);
    }
  });
}

foo((err, val) => {
  // [1]
  err ? console.log("捕获错误 " + err) : console.log(val);
});
