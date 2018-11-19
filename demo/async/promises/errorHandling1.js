// try...catch 无法处理异步
function foo() {
  setTimeout(() => {
    baz.bar();
  }, 100);
}

try {
  foo();
  // 后面从 `baz.bar()` 抛出全局错误
} catch (err) {
  // 无法用于异步模式
  // 永远无法到达这里
}
