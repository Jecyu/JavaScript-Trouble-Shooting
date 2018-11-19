/**
 * paging 分页组件
 * es6 版本
 */
(function (root, factory) {
  // 判断是否为 amd 
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // 判断是否 cmd
    module.exports = factory();
  } else {
    // Browser globals（root is window）通过 script 标签引入
    root.Paging = factory();
  }
})(typeof self != 'undefined' ? self : this , function () {
    // 输入输出参数
    // 数据层 pageNo, totalPage, totalSize, callback
    // 表现层
    // 逻辑层

  const Paging = {
    /**
     * 分页类 
     * @param {*} node 
     * @param {*} options 
     */
    constructor (node, options) {
      
    },
    getHtml() {
      
    },
    eventBind() {
      
    }
  };
  return Paging;
});