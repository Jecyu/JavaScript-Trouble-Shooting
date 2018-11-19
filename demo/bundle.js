(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory()
    : typeof define === "function" && define.amd
      ? define(factory)
      : factory();
})(this, function() {
  "use strict";

  var wrap = function(el, wrapperEl) {
    el.parentElement.appendChild(wrapperEl);
    wrapperEl.appendChild(el);
  };
  var initStickyTableHeader = function(tableEl, height) {
    // WRITE
    var theadEl = tableEl.querySelector("thead");
    if (!theadEl) throw new Error("Could not find thead");
    var tbodyEl = tableEl.querySelector("tbody");
    if (!tbodyEl) throw new Error("Could not find tbody");
    var clonedTheadEl = theadEl.cloneNode(true);
    var theadCellEls = Array.from(theadEl.querySelectorAll("th, td"));
    var wrapperEl = document.createElement("div");
    Object.assign(wrapperEl.style, {
      position: "relative",
      overflow: "auto",
      height: height !== undefined ? height + "px" : undefined
    });
    clonedTheadEl.style.visibility = "hidden";
    Object.assign(theadEl.style, {
      position: "absolute",
      zIndex: "1"
    });
    wrap(tableEl, wrapperEl);
    tableEl.insertBefore(clonedTheadEl, tbodyEl);
    var applyOffset = function() {
      // READ
      var wrapperElScrollTop = wrapperEl.scrollTop;
      // WRITE
      theadEl.style.top = wrapperElScrollTop + "px";
    };
    var applyColumnWidths = function() {
      var firstRowEl = tbodyEl.querySelector("tr");
      if (firstRowEl) {
        // READ
        var cellWidths_1 = Array.from(firstRowEl.querySelectorAll("td")).map(
          function(el) {
            return el.offsetWidth;
          }
        );
        var tableElWidth = tableEl.offsetWidth;
        // WRITE
        theadEl.style.width = tableElWidth + "px";
        theadCellEls.forEach(function(cell, index) {
          var width = cellWidths_1[index];
          if (width) {
            cell.style.width = width + "px";
          } else {
            throw new Error("Width not found for index '" + index + "'");
          }
        });
      }
    };
    applyOffset();
    applyColumnWidths();
    var scrollHandler = function() {
      return requestAnimationFrame(applyOffset);
    };
    wrapperEl.addEventListener("scroll", scrollHandler);
    var destroy = function() {
      wrapperEl.removeEventListener("scroll", scrollHandler);
    };
    return { destroy: destroy, applyColumnWidths: applyColumnWidths };
  };
  // return initStickyTableHeader;
});
