/**
 * 实现一个工具函数将类数组对象（或对象）转换为真正的数组
 * @param {Object} a 类数组对象
 * @param {String} n 索引
 */ 
function array (a, n) {
  return Array.prototype.slice.call(a, n || 0);
} 