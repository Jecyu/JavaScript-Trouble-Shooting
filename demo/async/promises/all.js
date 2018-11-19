/**
 * 使用 `Promise.all()` 包装多个 Promise 实例
 * 数组中的值可以是 Promise、thenable，甚至是立即值[1]
 * 只有传入的所有 Promise 都完成，返回 Promise 才算完成
 * 注意：如果传入空值，它会立即完成
 */
console.log("Here we go");
Promise.all([1, 2, 3]) //[1]，每个值都会通过 Promise.resolve() 过滤，生成一个真正的 Promise
  .then(all => {
    console.log("1: ", all);
    return Promise.all([
      () => {
        console.log("ooxx");
      },
      "xxoo",
      false
    ]);
  })
  .then(all => {
    console.log("2: ", all);
    let p1 = new Promise(resolve => {
      setTimeout(() => {
        resolve("I'm P1");
      }, 1500);
    });
    let p2 = new Promise(resolve => {
      setTimeout(() => {
        resolve("I'm P2");
      }, 1000);
    });

    return Promise.all([p1, p2]);
  })
  // 只要有一个 Promise 错误都不会继续
  .then(all => {
    console.log("3: ", all);
    let p1 = new Promise(resolve => {
      setTimeout(() => {
        resolve("I'm P1");
      }, 1500);
    });
    let p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("I'm P2");
      }, 1000);
    });
    let p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("I'm P3");
      }, 3000);
    });
    return Promise.all([p1, p2, p3]);
  })
  .then(all => {
    console.log("4: ", all);
  })
  .catch(err => {
    console.log("catch", err); // 返回第一个拒绝的结果
  });
