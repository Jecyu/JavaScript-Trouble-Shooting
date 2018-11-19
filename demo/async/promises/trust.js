// 不是真正的 promise
let p = {
  then: function(cb, errcb) {
    cb(42);
    errcb("evil laught");
  }
};

p.then(
  function fulfilled(val) {
    console.log(val);
  },
  function rejected(err) {
    console.log(err); // 这里不应该执行
  }
);

// 转换成真正的 promise，从 Promise.resolve() 得到的是一个可以信任的值
Promise.resolve(p).then(
  function fulfilled(val) {
    console.log(val);
  },
  function rejected(err) {
    console.log(err);
  }
);
