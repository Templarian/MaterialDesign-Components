import { Component, Prop, Part, Local } from '@mdi/element';

import template from './scroll.html';
import style from './scroll.css';

declare const ResizeObserver;

@Component({
  selector: 'mdi-scroll',
  style,
  template
})
export default class MdiScroll extends HTMLElement {
  @Part() $scroll: HTMLDivElement;

  columns = 10;
  size = 44;
  visible = false;

  resizeObserver = new ResizeObserver(entries => {
    const { width } = entries[0].contentRect;
    this.columns = Math.floor(width / (this.size + 20));
  });

  getView() {
    const { innerHeight } = window;
    const { y, height } = this.getBoundingClientRect();
    const top = y < 0 ? -1 * y : 0;
    const maxHeight = height > innerHeight ? innerHeight : height;
    return {
      visible: y < innerHeight && height + y > 0,
      y: top,
      height: y + height - innerHeight > 0 ? maxHeight : maxHeight + y + height - innerHeight,
      offsetRows: Math.floor(top / 44)
    }
  }

  calculateScroll() {
    const { visible, y, height, offsetRows } = this.getView();
    if (visible) {
      this.$scroll.innerText = `Offset Rows: ${offsetRows}`;
      this.$scroll.style.transform = `translateY(${y}px)`;
      this.$scroll.style.height = `${height}px`;
    }
    if (this.visible !== visible) {
      this.visible = visible;
      if (this.visible) {
        this.enterView();
      } else {
        this.leaveView();
      }
    }
  }

  enterView() {
    console.log('Enter View');
  }

  leaveView() {
    console.log('Leave View');
  }

  connectedCallback() {
    this.style.height = '2000px';
    window.addEventListener('scroll', () => {
      this.calculateScroll();
    });
    this.calculateScroll();
  }
}
