function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}
async function delayedLog(item) {
  await delay();
  // log item only after a delay
  console.log(item);
}
// 并行遍历
async function processArray(array) {
  // map array to promises
  const promises = array.map(delayedLog);
  // wait until all promises are resolved
  await Promise.all(promises);
  console.log(`Done!`);
}
// 注意：对于特别大的数组不建议使用这种写法，太多的并行任务会加重 CPU 和内存的负荷
processArray([1, 2, 3]);

// 串行遍历
// async function processArray2(array) {
//   for (const item of array) {
//     await delayedLog(item);
//   }
//   console.log(item);
// }
