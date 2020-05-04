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

  size = 44;

  resizeObserver = new ResizeObserver(entries => {
    const { width } = entries[0].contentRect;
    const columns = Math.floor(width / (this.size + 20));
  });

  getView() {
    const { innerHeight } = window;
    const { y, height } = this.getBoundingClientRect();
    const top = y < 0 ? -1 * y : 0;
    const maxHeight = height > innerHeight ? innerHeight : height;
    console.log(y, height, innerHeight, y - height - innerHeight > 0)
    return {
      visible: y < innerHeight && height + y > 0,
      y: top,
      height: y + height - innerHeight > 0 ? maxHeight : maxHeight + y + height - innerHeight,
      offsetRows: Math.floor(top / 44)
    }
  }

  connectedCallback() {
    window.addEventListener('scroll', () => {
      const { visible, y, height, offsetRows } = this.getView();
      if (visible) {
        this.$scroll.innerText = `Offset Rows: ${offsetRows}`;
        this.$scroll.style.transform = `translateY(${y}px)`;
        this.$scroll.style.height = `${height}px`;
      }
    });
    this.style.height = '2000px';
  }
}
