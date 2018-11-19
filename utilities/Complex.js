/**
 * Complex.js:
 * 这个文件定义 Complex 类，用来描述复数
 * 复数是虚数和实数的和，并且虚数 i 是-1的平方根
 */

/**
 * Complex() 构造函数为它所创建的每个实例定义了实例字段 r 和 i，它们是对象的状态
 * @param {Number} real 实部
 * @param {Number} imaginary 虚部
 */
function Complex(real, imaginary) {
  if (isNaN(real) || isNaN(imaginary)) {
    // 如果不都是数字则抛出错误
    throw new TypeError();
  }

  // 复数的实部
  this.r = real;

  // 复数的虚部
  this.i = imaginary;
}

/**
 * 类的实例方法定义为原型对象的函数值属性
 * 这里定义的方法可以被所有实例继承，并为它们提供共享的行为
 * 需要注意的是，JavaScript 的实例方法必须使用关键字 this
 * 来存取实例的字段
 */
// 当前复数对象加上另外一个复数，并返回一个新的计算和值后的复数对象
Complex.prototype.add = function(that) {
  return new Complex(this.r + that.r, this.i + that.i);
};

// 当前复数乘以另外一个复数，并返回一个新的计算乘积之后的复数对象
Complex.prototype.mul = function(that) {
  return new Complex(
    this.r * that.r - this.i * that.i,
    this.r * that.i + this.r * that.i,
  );
};

// 计算复数的模，模的定义为原点（0, 0） 到复平面的距离
Complex.prototype.mag = function() {
  return Math.sqrt(this.r * this.r + this.i * this.i);
};

// 复数的求负运算
Complex.prototype.neg = function() {
  return new Complex(-this.r, -this.i);
};

// 将复数对象转为一个字符串
Complex.prototype.toString = function() {
  return "{" + this.r + "," + this.i + "}";
};

// 检测当前复数对象是否和另外一个复数值相等
Complex.prototype.equals = function(that) {
  return (
    // 必须有定义且不能是 null
    that != null &&
    // 并且必须是 Complex 的实例那个
    that.constructor === Complex &&
    // 并且必须包含相同的值
    this.r === that.r &&
    this.i === that.i
  );
};

/**
 * 类字段（比如常量）和类方法直接定义为为构造函数的属性
 * 需要注意的是，类方法通常不使用关键字 this，
 * 它们只对参数进行操作
 */

// 这里预定义了一些对复数运算有帮助的类字段
// 它们的命名全都是大写，用以表明它们是常量
// 在 ECMAScript 5中，还能设置这些类字段的属性为只读
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

// 这个类方法将由实例对象的 toString 方法返回的字符串解析为一个 Complex 对象
// 或抛出一个类型错误对象
Complex.parse = function(s) {
  try {
    // 假设解析成功
    // 利用正则表达式进行匹配
    var m = Complex._format.exec(s);
  } catch (x) {
    // 如果解析失败则抛出异常
    throw new TypeError("Can't pars;e" + s + "as a complex number.");
  }
};

// 定义类的“私有”字段，这个字段在 Complex.parse() 中用到了
// 下划线前缀表明它是内部使用的，而不属于类的公有 API 的部分
Complex._format = /^\{([^,] +),(^}]+)\}$/;
