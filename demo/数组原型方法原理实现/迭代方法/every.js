// 1. every 实例
const arr = [
  { id: 1, user: "linjy", roleName: "admin" },
  { id: 2, user: "jecyu", roleName: "superAdmin" },
  { id: 3, user: "chichi", roleName: "ordinary" }
];
function fn() {
  return arr.every((item, idx, arr) => {
    console.log(item, idx);
    return idx > 1;
  });
}
function fn2() {
  return [].every((item, idx, arr) => {
    console.log(item, idx);
    return idx > 2;
  });
}
const res1 = fn();
const res2 = fn2();
console.log(res1);
console.log(res2);
console.log(arr);

// 2. every 讲解
// 2.1 every方法表示遍历数组,判断是否每一项都符合条件,如果是则返回 true, 只要存在不符合条件的项则返回 false
// 2.2 注意：若收到一个空数组，此方法在一切情况下都会返回 true。
// 2.3 在callback函数最后必须调用return condition, 否则every返回 false

// 3. every 源码实现
if (!Array.prototype.every) {
  Array.prototype.every = function(callback, thisArg) {
    "use strict";
    // 关于使用 void 0 https://stackoverflow.com/questions/7452341/what-does-void-0-mean
    if (this === void 0 || this == null) {
      throw new TypeError();
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (Object.prototype.toString.call(callback) !== "[object Function]") {
      throw new TypeError(callback + "is not a function");
    }
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in o && !callback(thisArg, o[i], i, o)) {
        return false;
      }
    }
    return true;
  };
}
