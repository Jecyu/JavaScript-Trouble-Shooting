/**
 * 有时候我们不希望所有动作一起发生，而是按照一定的顺序，逐个执行
 */
function queue(things) {
  let promise = Promise.resolve();
  things.forEach(thing => {
    promise = promise.then(() => {
      doThing(thing, () => {
        resolve();
      });
    });
  });
  return promise;
}
queue[("lots", "of", "things")];
