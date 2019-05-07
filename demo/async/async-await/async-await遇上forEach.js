/**
 * 参考文章：https://objcer.com/2017/10/12/async-await-with-forEach/
 * 在开发过程可能会有这么一种需求，我们需要在循环中异步处理 item，那么可以怎么做呢？
 */
// 1. 异步循环
// 问题描述

const getNumbers = () => {
  return Promise.resolve([1, 2, 3]);
};

const multi = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num) {
        resolve(num * num);
      } else {
        reject(new Error("num not specified"));
      }
    }, 1000);
  });
};

async function test() {
  const nums = await getNumbers();
  nums.forEach(async x => {
    const res = await multi(x);
    console.log(res);
  });
}
test();
// 在这个例子中，通过 forEach 遍历的将每一个数字都执行 multi 操作。代码执行的结果是：1 秒后，一次性输出1，4，9。这个结果和我们的预期有些区别，我们是希望每间隔 1 秒，然后依次输出 1，4，9；所以当前代码应该是并行执行了，而我们期望的应该是串行执行

// 分析问题
// 在本例中 forEach 的回调函数是一个异步函数，异步函数中包含一个 await 等待 Promise 返回结果，我们期望数组元素串行执行这个异步操作，但是实际却是并行执行了

// 解决方案一
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function test2() {
  const nums = await getNumbers();
  asyncForEach(nums, async x => {
    const res = await multi(x);
    console.log(res);
  });
}

test2();

// 解决方案二
async function test3() {
  const nums = await getNumbers();
  for (let x of nums) {
    const res = await multi(x);
    console.log(res);
  }
}

test3();
