/**
 * 根据指定表格每行第 n 个单元格的值，对第一个<tbody>中的行进行排序
 * 如果存在comparator函数则使用它，否则按字母表顺序比较
 */

function sortrows(table, n, comparator) {
  // 第一个 tbody，可能是隐式创建的
  var tbody = table.tBodies[0];
  // tbody 中的所有行
  var rows = tbody.getElementsByTagName("tr");
  // 真实数组中的快照
  rows = Array.prototype.slice.call(rows, 0);

  // 基于第 n 个 <td> 元素的值对行排序
  rows.sort(function(row1, row2) {
    // 获得第 n 个单元格
    var cell1 = row1.getElementsByTagName("td")[n];
    var cell2 = row2.getElementsByTagName("td")[n];

    // 获得文本内容
    var val1 = cell1.textContent || cell2.innerText;
    var val2 = cell2.textContent || cell2.innerText;

    if (comparator) {
      return comparator(val1, val2);
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  });

  // 在 tbody 中按它们的顺序把行添加到最后
  // 这将自动把它们从当前位置移走，故没必要删除它们
  // 如果 <tbody> 还包含了除 <tr> 的任何其他元素，这些节点将会悬浮到顶部位置
  for (var i = 0; i < rows.length; i++) {
    tbody.appendChild(rows[i]);
  }
}

/**
 * 查找表格的 <th> 元素，假设只有一行，让它们可单击，
 * 以便单击列标题，按改列对行排序
 */

function makeSortable(table) {
  var headers = table.getElementsByTagName("th");
  for (var i = 0, len = headers.length; i < len; i++) {
    // 嵌套函数来创建本地作用域
    (function(n) {
      headers[i].onclick = function() {
        sortrows(table, n);
      };
    })(i);
  }
}
