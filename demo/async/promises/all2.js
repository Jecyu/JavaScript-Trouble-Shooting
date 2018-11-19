/**
 * 一个 Promise 决议后，这个 Promise 上所有的通过 then(..) 注册的回调都会在下一个异步时机点上依次被调用
 * 处理 Promise 里的 resolve 函数带有异步操作不会阻断，同样嵌套的 then 不会打断相邻连接的 then
 */
console.log("Here we go");
Promise.all([1, 2, 3]) //[1]，每个值都会通过 Promise.resolve() 过滤，生成一个真正的 Promise
  .then(all => {
    console.log("1: ", all);
    let val = 90;
    let targetVal = 10;
    // 所以这里通常会是产生 bug 的原因
    setTimeout(() => {
      targetVal += val;
      console.log("我比 then 要慢输出"); // 这里的异步是不会打断下一个 then 的
    }, 1000);
    return targetVal; // 期望输出 100
  })
  .then(all => {
    console.log("2:", all); // 结果 10
  });
