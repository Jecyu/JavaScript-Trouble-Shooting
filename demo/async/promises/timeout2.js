console.log("here we go");
new Promise(resolve => {
  setTimeout(() => {
    resolve("hello");
  }, 2000);
})
  .then(value => {
    console.log(value + " world");
    // 创建一个 promise 并返回，这个 promise 替换了前面链接返回的 promise
    return new Promise(resolve => {
      // 引入异步，模拟 ajax 请求
      setTimeout(() => {
        resolve("world");
      }, 2000);
    });
  })
  .then(value => {
    // 在前一步中的 2s异步延迟之后运行
    console.log(value + " world"); // world world
  });
