# JavaScript 进阶

标签（空格分隔）： 技术碎片

---

https://github.com/mqyqingfeng/Blog

## JavaScript 专题系列

### 深浅拷贝

> 浅拷贝：如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或者数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化.

**数组的浅拷贝**
如果是数组，我们可以利用数组的一些方法比如：slice、concat 返回一个新数组的特性来实现拷贝。

浅拷贝的实现：

    var shallowCopy = function(obj) {
        // 只拷贝对象
        if (typeof obj !== 'object') return;
        // 根据obj的类型判断是新建一个数组还是对象
        var newObj = obj instanceof Array ? [] : {};
        // 遍历obj，并且判断是obj的属性才拷贝
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }

> 深拷贝：就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。

    // 适用于对象和数组，不能拷贝函数。
    var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]
    var new_arr = JSON.parse( JSON.stringify(arr) );
    console.log(new_arr);

深拷贝的实现：

    /**
     * deepCopy() 深拷贝
     * @param {Object} obj
     */
    var deepCopy = function(obj) {
      if (typeof obj !== "object") return;
      var newObj = obj instanceof Array ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] =
            typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
        }
      }
      return newObj;
    };

### 数组去重

    var array = [1, 1, '1', '1'];

**双层循环**：

    function unique(array) {
        // res用来存储结果
        var res = [];
        for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
            for (var j = 0, resLen = res.length; j < resLen; j++ ) {
                if (array[i] === res[j]) {
                    break;
                }
            }
            // 如果array[i]是唯一的，那么执行完循环，j等于resLen
            if (j === resLen) {
                res.push(array[i])
            }
        }
        return res;
    }

**indexOf**

    function unique(array) {
        var res = [];
        for (var i = 0, len = array.length; i < len; i++) {
            var current = array[i];
            if (res.indexOf(current) === -1) {
                res.push(current)
            }
        }
        return res;
    }

## javaScript 深入系列

### 从原型到原型链

## ES6/ES7 系列
