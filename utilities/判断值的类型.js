/**
 * 可以判断值的类型的 type() 函数
 * 以字符串形式返回 o 的类型：
 * 如果 o 是 null，返回 “null”；如果 o 是 NaN，返回 “nan”
 * 如果 typeof 返回的值不是 “object”，则返回这个值
 * （注意：有一些 JavaScript 的是实现将正则表达式识别为函数）
 * 如果 o 的类不是 “Object”，则返回这个值
 * 如果 o 包含构造函数并且构造函数具有名称，则返回这个名称
 * 否则，一律返回 “Object”
 */

function type(o) {
  // type, class, name
  var t, c, n;

  // 处理 null 值的特殊情形
  if (o === null) {
    return "null";
  }

  // 另一种情形：NaN 和它自身不相等
  if (o != o) return "nan";

  // 如果 typeof 的值不是“object”，则使用这个值
  // 这可以识别出原始值得类型和函数
  if ((t = typeof o) !== "object") return t;

  // 返回对象得类名，除非值为“Obejct”
  // 这种方式可以识别出原始值的类型和函数
  if ((c = classof) !== "Object") return c;

  // 如果对象的构造函数的名字存在的话，则返回它
  if (
    o.constructor &&
    typeof o.constructor === "function" &&
    (n = o.constructor.getName())
  ) {
    return n;
  }

  // 其他类型无法识别，一律返回“Object”
  return "Object";
}

// 返回对象的类
function classof(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

// 返回函数的名字（可能是空字符串），不是函数的话返回 null
Function.prototype.getName = function() {
  if ("name" in this) {
    return this.name;
  }
  return (this.name = this.toString().match(/function\s*([^(]*)\(/)[1]);
};

// 缺点：并不是所有的函数都有名字 使用鸭式辫型
