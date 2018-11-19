/**
 * range.js 表示值得范围的类
 * @param from
 * @param to
 */

function Range(from, to) {
  // 存储“范围对象”的起始位置和结束位置（状态）
  this.from = from;
  this.to = to;
}

Range.prototype = {
  construtor: Range,
  // 如果 x 在范围内，则返回 true；否则返回 false
  // 这个方法可以比较数字范围，也可以比较字符串和日期范围
  includes: function(x) {
    return this.from <= x && x <= this.to;
  },
  // 对于范围内的每个整数都调用一次 f
  // 这个方法只适用于数字范围
  foreach: function(f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++) {
      f(x);
    }
  },
  // 返回表示这个范围的字符串
  toString: function() {
    return "(" + this.from + "..." + this.to + ")";
  },
};
