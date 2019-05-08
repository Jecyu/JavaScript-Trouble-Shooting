/**
 * 需要像同步执行那样，按照理想的顺序打印
 */
// 问题描述： 期待按顺序执行
function old() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(`这是外层${i}`);
    }, 2000); //
    for (let j = 0; j < 5; j++) {
      setTimeout(() => {
        console.log(`这是内层${j}`);
      }, 1000);
    }
  }
}

// 问题：分层比内层慢的时候，则内层先执行了

// 解决方案：async/await
async function print(msg) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, msg);
  });
}

async function main() {
  // 这里同样可以使用 for of 代替，针对数组
  for (let i = 0; i < 10; i++) {
    console.log(await print(`外层${i}`));
    for (let j = 0; j < 5; j++) {
      console.log(await print(`内层${j}`));
    }
  }
}
main();
