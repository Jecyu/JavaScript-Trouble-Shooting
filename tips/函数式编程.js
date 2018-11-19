/**
 * 记忆
 * memorize() 接受一个函数作为实参，并返回带有记忆能力的函数
 * @description 只有当 f() 的实参的字符串表示都不相同时它才会工作
 * @param {Function} 函数
 * @return 返回 f() 的带有记忆能力的版本
 */
function memorize(f) {
  // 将值保存在闭包内
  var cache = {};
  return function() {
    // 将实参转换为字符串形式，并将其用做缓存的键
    var key = arguments.length + Array.prototype.join(arguments, ",");
    if (key in cache) {
      return cache[key];
    } else {
      return (cache[key] = f.apply(this, arguments));
    }
  };
}
