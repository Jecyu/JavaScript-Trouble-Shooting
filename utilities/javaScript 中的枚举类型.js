/**
 * 这个函数创建一个新的枚举类型，实参对象表示类的每个实例的名字和值
 * 返回值是一个构造函数，它标识这个新类
 * 注意，这个构造函数也会抛出异常：不能使用它来创建该类型的新实例
 * 返回的构造函数包含名/值对的映射表
 * 包括由值组成的数组，以及一个 foreach() 的迭代器函数
 */

function enumeration(namesToValues) {
  // 这个虚拟的构造函数是返回值
  var enmueration = function() {
    throw "Can't Instantiate Enumerations";
  };

  // 枚举值继承自这个对象
  var proto = (enumeration.prototype = {
    // 标识类型
    constructor: enumeration,

    // 返回名字
    toString: function() {
      return this.name;
    },

    // 返回值
    valueOf: function() {
      return this.value;
    },

    toJSON: function() {}
  });

  // 用以存放枚举对象的数组
  enmueration.values = [];

  // 现在创建新类型的实例
  for (name in namesToValues) {
    // 创建一个代表它的对象
    var e = inheir(proto);

    // 给它一个名字
    e.name = name;
    // 给它一个值
    e.value = namesToValues[name];

    // 将它设置为构造函数的属性
    enumeration[name] = e;
    // 将它存储到数组中
    enmueration.values.push(e);
  }

  // 一个类方法，用来对类的实例进行迭代
  enumeration.foreach = function(f, c) {
    for (var i = 0, len = this.values.length; i < len; i++) {
      f.call(c, this.values[i]);
    }
  };

  // 返回标识这个新类型的构造函数
  return enumeration;
}

/**
 * 使用枚举类型来表示一副扑克牌
 */

// 定义一个表示“玩牌”的类
function Card(suit, rank) {
  // 每张牌都有花色
  this.suit = suit;

  // 以及点数
  this.rank = rank;
}

// 使用枚举类型定义花色和数
Card.Suit = enmueration({
  Clubs: 1,
  Diamonds: 2,
  Hearts: 3,
  Spades: 4
});

Card.Rank = enmueration({
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 11,
  Queen: 12,
  King: 13,
  Ace: 14
});

// 定义用以描述牌面的文本
Card.prototype.toString = function() {
  return this.rank.toString() + "of" + this.suit.toString();
};

// 比较扑克牌中两张牌的大小
Card.prototype.compareTo = function(that) {
  if (this.rank < that.rank) {
    return -1;
  }

  if (this.rank > that.rank) {
    return 1;
  }

  return 0;
};

// 以桥牌的玩法规则对扑克牌进行排序的函数
Card.orderBySuit = function(a, b) {
  if (a.suit < b.suit) {
    return -1;
  }

  if (a.suit > b.suit) {
    return 1;
  }

  if (a.rank < b.rank) {
    return -1;
  }

  if (a.rank > b.rank) {
    return 1;
  }

  return 0;
};

// 定义用以表示一副标准扑克牌的类
function Deck() {
  // 一副牌就是由牌组成的数组
  var cards = (this.cards = []);

  // 初始化这个数组
  Card.Suit.foreach(function(s) {
    Card.Rank.foreach(function(r) {
      cards.push(new Card(s, r));
    });
  });
}
