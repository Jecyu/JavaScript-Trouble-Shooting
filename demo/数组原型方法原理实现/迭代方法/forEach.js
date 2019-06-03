// 1.forEach 实例
// thisArg 可选，用来当做fn函数内的this对象。
// forEach 将为数组中每一项执行一次 fn 函数，那些已删除，新增或者从未赋值的项将被跳过（但不包括值为 undefined 的项）
const arr = [
  { id: 1, user: "linjy", roleName: "admin" },
  { id: 2, user: "jecyu", roleName: "superAdmin" },
  { id: 3, user: "jecyu", roleName: "ordinary" }
]; // 引用类型
const arr2 = [1, 2, 3]; // 基本类型
const obj = { name: "linjy" };
function fn1() {
  return arr.forEach(function(item, idx, arr) {
    // arr.push(idx); // 动态添加的值无法被回调函数访问到
    console.log(item, idx);
    if (idx === 2) {
      return; // 无法中断操作，相当于 for 循环的 continue
    }
    item.id += idx;
    console.log(this.name);
  }, obj);
}
function fn2() {
  return arr2.forEach(function(item, idx, arr) {
    item += idx;
    console.log(item);
  });
}
const res = fn1();
res;
fn2();

console.log(arr, arr2);

// 2.forEach 讲解
// 2.1 forEach无法使用break，continue跳出循环，使用return时，效果和在for循环中使用continue一致
// 2.2 如果 item 是基本类型, 无法改变原数组; 如果是引用类型,则会改变原数组
// 2.3 注意实例中es5的 function(){} ,所以回调函数中的this是 obj ,并不是arr；如果用的是es6的箭头函数, 则回调中的this是fn函数的当前上下文

// 3.实现源码实现
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError("this is null or not defined");
    }
    var o = Object(this); // 当前要遍历的数组
    var len = o.length >>> 0; // 长度，右移取整
    if (typeof callback !== "function") {
      throw new TypeError(callback + "is not a function");
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in o) {
        kValue = o[k];
        callback.call(T, kValue, k, o); // 执行回调函数
      }
      k++;
    }
  };
}
// 参考文章：https://blog.csdn.net/lyt_angularjs/article/details/80466366
