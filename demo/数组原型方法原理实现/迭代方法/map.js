// 1. map 实例
const arr = [
  { id: 1, user: "linjy", roleName: "admin" },
  { id: 2, user: "jecyu", roleName: "superAdmin" },
  { id: 3, user: "jecyu", roleName: "ordinary" }
];
function fn() {
  return arr.map((item, idx, arr) => {
    console.log(item, idx);
    if (idx == 2) {
      return;
    }
    item.id += idx;
    return item; // 必须返回一个值
  });
}
const res = fn();
console.log(res);
console.log(arr);

// 2. map 讲解
// 2.1 map方法遍历数组, callback 直接不修改原数组(非引用类型),返回新数组,callback 最后必须 return item
// 2.2 如果不想改变源数组，有如下解决方案：
// 2.2.1 在操作引用型数组之前，使用深拷贝
// 2.2.2 在里面新建一个对象，并且使用 object.assgin(target, source) 把之前的值拷贝下来

// 3. map 源码实现
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var T, A, K;
    if (this === null) {
      throw new TypeError("this is null or undefined");
    }
    var o = Object(this);
    var len = o.length >>> 0;
    if (Object.prototype.toString.call(callback) !== "[object Function]") {
      throw new TypeError(callback + "is not a function");
    }
    if (thisArg) {
      T = thisArg;
    }
    A = new Array(len); // 存储新的数组
    k = 0;
    while (k < len) {
      var kValue, mappedValue;
      // 遍历 o，k 为原数组索引
      if (k in o) {
        // kValue 为索引 k 对应的值
        kValue = o[k];
        mappedValue = callback.call(T, kValue, k, o);
        // 返回值添加到新数组中
        A[k] = mappedValue;
      }
    }
    return A;
  };
}
