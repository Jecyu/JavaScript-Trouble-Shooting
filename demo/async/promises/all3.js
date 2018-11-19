/**
 * 针对 all2，模拟真实情况下，加载图片等 Promise 内部异步，传递值的处理
 * 法一：通过新声明一个 Promise，当前的异步操作完成后，再进行决议传递给 then[1]
 * 法二：像一些框架，如 dojo、jQuery 提供了 deferred，可以新建一个 deferred ，然后在 setTimeout 内部进行 defer.resolve 记录状态
 */

console.log("Here we go");
function imgToCanvas() {
  return Promise.all(vals) //[1]，每个值都会通过 Promise.resolve() 过滤，生成一个真正的 Promise
    .then(all => {
      new console.log("1: ", all);
      let val = 90;
      let targetVal = 10;

      // 返回新的 promise 把异步操作放于此[2]
      return new Promise(resolve => {
        setTimeout(() => {
          targetVal += val;
          console.log("我比 then 要快输出"); // 这里的异步是不会打断下一个连接 then 的
          resolve(targetVal);
        }, 1000);
      });
    });
}

imgToCanvas().then(all => {
  console.log("2:", all); // 结果 10
});
