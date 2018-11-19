/**
 * 参考：https://www.quora.com/Is-there-any-alternative-to-writing-multiple-else-if-statements#
 * 这些漫长的 if else火车令人讨厌，但它们已被证明并且具有高性能。
 * 除了到目前为止提到的那些，我有三个其他选择
 * 1. LUT (查找表)
 * 2. 递归方法
 * 3. ES6 MAP
 */

// if-else

bike = "triumph";
if (bike === "bmw") {
  // do sth extraordinary
} else {
  if (bike === "aprilla") {
    // do sth interesting
  } else {
    if (bike === "triumph") {
      // do sth different
    }
  }
}

// LUT
var bike = "triumph";
bikes = {
  bmw: function() {
    // do sth extraordinary
  },
  arilla: function() {
    // do sth interesting
  },
  triumph: function() {
    // do sth different
  },
};
bikes[bike]();

// Recursive
var choies = [
  42,
  53,
  17,
  114,
  512,
  12,
  114,
  512,
  857,
  1002,
  23,
  112,
  600,
  17,
  37,
  1024,
  5,
  6,
  7,
  8,
  9,
  444,
  502,
];

function find(key, ch) {
  var i = 0;
  // 递归
  (function looper(k, c) {
    return k === c ? i : looper(k, ch[++i]);
  })(key, ch[i]);

  return [ch[i], i];
}

find(112, chioes); // return [112, 10]

// ES6 MAP
var typesMap = new Map();
for (var i = 0; i < 20; i++) {
  // 使用 set() 方法添加键和值
  typesMap.set("type" + i, "Type" + i);
}
typesMap.get("type10");
