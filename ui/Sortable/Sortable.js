/**
 * 按列排序表格组件
 */

class Sortable {
  /**
   *
   * @param {String} id 容器 id
   * @param {Array} names 表头名称
   * @param {Array} data 表格主体数据
   */
  constructor(id, names, data) {
    // 获取表格的容器
    this.container = document.getElementById(id);
    this.config = config;

    // 声明当前顺序的数组
    this.curOrderData = [];
    for (var key in this.config.data) {
      this.curOrderData.push(key);
    }

    // 渲染表格
    this.render();
  }

  /**
   * @param {Array} data 数组对象
   * @param {String} key 对象的键
   * @param {Boolean} desc  true 降序, false 为升序，也为默认排序
   * @return 返回排序的数组
   */
  sortData(data, key, desc) {
    // 降序
    if (desc) {
      return data.sort((a, b) => {
        if (a[key] < b[key]) {
          return 1;
        } else if (a[key] > b[key]) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      // 升序
      return data.sort((a, b) => {
        if (a[key] < b[key]) {
          return -1;
        } else if (a[key] > b[key]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  /**
   * render() 渲染表格
   */
  render() {
    // 单元格片段
    function fn(value) {
      return "<td>" + d + " </td>";
    }

    // 渲染表头
    var tableContent = "<tr>";
    tableContent += this.config.names.map(fn).join("");
    tableContent += "</tr>";

    // 渲染主体
    for (var i = 0, len = this.curOrderData; i < len; i++) {
      tableContent += this.curOrderData[i].map(fn).join("");
      tableContent += "</tr>";
    }

    this.container.innerHTML = tableContent;

    // 添加排序功能
    this.addSortEle();
  }

  addSortEle() {}
}
