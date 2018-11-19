/**
 * 返回元素e的第n层祖先元素，如果不存在此类祖先或祖先不是Element，
 *（例如Document或者DocumentFragment）则返回null
 * 如果n为0，则返回e本身。如果n为1（或省略），则返回其父元素
 * 如果n为2，则返回其祖父元素，依次类推
 *
 */
function parent(e, n) {
  if (n === undefined) n = 1;
  while (n-- && e) {
    e = e.parentNode;
  }
  if (!e || e.nodeType === 1) {
    return null;
  }
  return e;
}

/**
 * 返回元素e的第n个兄弟元素
 * 如果n为正，返回后续的第n个兄弟元素
 * 如果n为负，返回前面的第n个兄弟元素
 * 如果n为零，返回e本身
 */
function sibling(e, n) {
  while (e && n !== 0) {
    // 如果 e 未定义，即刻返回它
    if (n > 0) {
      // 查找后续的兄弟元素
      if (e.nextElementSibling) {
        e = e.nextElementSibling;
      } else {
        // 空循环
        for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
      }
      n--;
    } else {
      // 查找前面的兄弟元素
      if (e.previousElementSibling) {
        e = e.previousElementSibling;
      } else {
        for (
          e = e.previousSibling;
          e && e.nodeType !== 1;
          e = e.previousSibling
        );
      }
      n++;
    }
  }
  return e;
}

/**
 * 返回元素 e 的第 n 代子元素，如果不存在则为 null
 * 负值 n 代表从后往前计数。0表示第一个子元素，而-1代表最后一个，-2代表倒数第二个，依次类推
 */
//
function child(e, n) {
  // 如果 children 数组存在
  if (e.children) {
    if (n < 0) {
      // 转换负的 n 为数组索引
      n += e.children.length;
    }
    if (n < 0) {
      // 如果它仍然为负，说明没有子元素？？？TODO
      return null;
    }
    // 返回指定的子元素
    return e.children[n];
  }
}
