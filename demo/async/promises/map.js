/**
 * Promise.all() 与 .map() 一起使用，用 map 构建 promise
 */

if (!Promise.map) {
  Promise.map = function(vals, cb) {
    // 一个等待所有 map 的 promise 的新 promsie
    return Promise.all(
      vals.map(function(val) {
        return new Promise(resolve => {
          cb(val, resolve);
        });
      })
    );
  };
}

let p1 = Promise.resolve(21);
let p2 = Promise.resolve(42);
let p3 = Promise.reject("Oops");

// 把列表中的值加倍，即使是在 Promise 中
Promise.map([p1, p2, p3], function(pr, done) {
  // 保证这一条本身是一个 Promise
  Promise.resolve(pr).then(
    // 提取值作为 v
    v => done(v * 2),
    // 或者 map 到 promise 拒绝信息
    done
  );
}).then(vals => console.log(vals));
