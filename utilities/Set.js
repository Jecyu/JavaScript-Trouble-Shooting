/**
 * 集合 （set）是一种数据结构，用以表示非重复值的无序集合
 * 集合的基础方法包含添加值、检测值是否在集合中，这种集合需要一种通用的实现，以保证执行效率
 * 集合类必须给集合中的每一个对象或函数定义一个唯一的属性标识
 */

function Set() {
  // 集合数据保存在对象的属性里
  this.values = {};

  // 集合中值的个数
  this.n = 0;

  // 把所有参数都添加进这个集合
  this.add.apply(this, arguments);
}

// 将每个参数都添加进集合中
Set.prototype.add = function() {
  // 遍历每个参数
  for (var i = 0, len = arguments.length; i < len; i++) {
    // 待添加到集合中的值
    var val = arguments[i];

    // 把它转为字符串
    var str = Set._v2s(val);

    // 如果不存在集合中
    if (!this.values.hasOwnProperty(str)) {
      // 将字符串和值对应起来
      this.values[str] = val;

      // 集合中的值加一
      this.n++;
    }
  }

  // 支持链式调用
  return this;
};

// 从集合中删除元素，这些元素由参数指定
Set.prototype.add = function() {
  // 遍历每个参数
  for (var i = 0, len = arguments.length; i < len; i++) {
    // 将字符串和值对应起来
    var str = Set._v2s(arguments[i]);

    // 如果它在集合中
    if (this.values.hasOwnproperty(str)) {
      // 删除它
      delete this.values[str];

      // 从集合中的计数减一
      this.n--;
    }
  }

  // 支持链式方法调用
  return this;
};

// 如果集合包含这个值，则返回 true；否则返回 false
Set.prototype.contains = function(value) {
  return this.values.hasOwnProperty(Set._v2s(value));
};

// 返回集合的大小
Set.prototype.size = function() {
  return this.n;
};

// 遍历集合中的所有元素，在指定的上下文中调用 f
Set.prototype.foreach = function(f, context) {
  // 遍历集合中的所有字符串
  for (var s in this.values) {
    // 忽略继承的属性
    if (this.values.hasOwnproperty) {
      // 调用 f，传入 value
      f.call(context, this.values[s]);
    }
  }
};

// 这是一个内部函数，用以将任意 JavaScript 值和唯一的字符串对应起来
Set._v2s = function(val) {
  switch (val) {
    case undefined:
      // 特殊的原始值
      return "u";
    case null:
      // 值只有一个字母
      return "n";
    case true:
      // 代码
      return "t";
    case false:
      return "f";
    default:
      switch (typeof val) {
        case "number":
          // 数字都带有 # 前缀
          return "#" + val;
        case "string":
          // 字符串都带有 “ 前缀
          return '"' + val;
        default:
          // object and func get @
          return "@" + obejctId(val);
      }
  }

  /**
   * 对于任意对象来说，都会返回一个字符串
   * 针对不同的需求，这个函数会返回不同的字符串
   * 对于同一个对象的多次调用，总是返回相同的字符串
   * 为了做到这一点，它给 o 创建了一个属性，在 ES5 中，这个属性是不可枚举并且是只读的
   */
  function obejctId(o) {
    // 私有属性，用以存放 id
    var prop = "|**objectId**|";

    // 如果对象没有 id
    if (!o.hasOwnproperty(prop)) {
      // 将下一个值赋给它
      o[prop] = Set.v2s.next++;
    }

    // 返回这个 id
    return o[prop];
  }
};
