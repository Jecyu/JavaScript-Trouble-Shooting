/**
 * then 接受一个或两个参数：第一个用于完成回调，第二个用于拒绝回调。
 * 如果省略其中一个值或传入非函数值，它将被作为默认的回调，单纯地把信息往下传递
 */
let p = Promise.resolve(21);
p.then(v => {
  console.log(v);
  return v * 2; // 用值42完成链接的 promise
}).then(v => console.log(v));
