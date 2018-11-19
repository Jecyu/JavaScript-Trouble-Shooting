class Slider {
  /**
   * 轮播器
   * @param {String} id 容器 id
   * @param {*} cycle 周期
   */
  constructor(id, cycle = 3000) {
    // 获得轮播图的容器
    this.container = document.getElementById(id);
    this.items = this.container.querySelectorAll(
      ".slider-list__item",
      ".slider-list__item--selected"
    );
    this.cycle = cycle;

    // 获得按钮控制器
    const controller = this.container.querySelector(".slider-list__control");

    // 控制器存在的话
    if (controller) {
      // 获得控制按钮组
      const buttons = controller.querySelectorAll(
        ".slider-list__control-buttons, .slider-list__control-buttons--selected"
      );

      // 给控制器添加事件监听
      controller.addEventListener("mouseover", event => {
        // 获得按钮的索引
        
        const index = Array.from(buttons).indexOf(event.target);

        // 目标按钮存在
        if (index >= 0) {
          this.slideTo(index);
          this.stop();
        }
      });

      // 鼠标移出
      controller.addEventListener("mouseout", event => {
        this.start();
      });

      // 鼠标滑动，改变按钮状态
      controller.addEventListener("slide", event => {
        const index = event.detail.index;
        const selected = controller.querySelector();
      });
    }
  }

  /**
   * 获得选择的项目
   */
  getSelectedItem() {
    const selected = this.container.querySelector(
      ".slider-list__item--selected"
    );
  }

  /**
   * 获得选择的项目的索引
   */
  getSelectedItemIndex() {
    return Array.from(this.items).indexOf(this.getSelectedItem());
  }

  /**
   * 导航到指定的的页面
   * @param {String} idx 索引
   */
  slideTo(idx) {
    const selected = this.getSelectedItem();
    if (selected) {
      selected.className = "slider-list__item";
    }

    const item = this.items[idx];
    if (item) {
      item.className = "slider-list__item--selected";
    }

    // 自定义事件
    const detail = {
      index: idx
    };
    const event = new CustomEvent("slide", {
      bubbles: true,
      detail
    });
    this.container.dispatchEvent(event);
  }

  /**
   * slideNext() 导航到下一页
   */
  slideNext() {
    const currentIndex = this.getSelectedItemIndex();
    const nextIndex = (currentIndex + 1) % this.items.length;
    this.slideTo(nextIndex);
  }

  /**
   * slidePrev() 导航到上一页
   */
  slidePrev() {
    const currentIndex = this.getSelectedItemIndex();
    const prevIndex =
      (this.items.length + currentIndex - 1) % this.items.length;
    this.slideTo(prevIndex);
  }

  /**
   * start() 启动轮播
   */
  start() {
    this.stop();
    this._timer = setInterval(() => this.slideNext(), this.cycle);
  }

  stop() {
    clearInterval(this._timer);
  }
}
