// 将 DOM 节点插入到 parent 中，使其成为第 n 个子节点
function insertAt(parent, child, n) {
  if (n < 0 || n > parent.childNodes.length) {
    throw new Error("invalid index");
  } else if (n == parent.childNodes.length) {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, parent.childNodes[n]);
  }
}
