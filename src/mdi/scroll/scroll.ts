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
  @Part() $text: HTMLDivElement;

  height = 16;
  columns = 10;
  size = 44;
  visible = false;
  y = -1;

  resizeObserver = new ResizeObserver(entries => {
    const { width } = entries[0].contentRect;
    this.columns = Math.floor(width / (this.size + 20));
  });

  getView() {
    const { innerHeight } = window;
    const { y, height } = this.getBoundingClientRect();
    const top = y < 0 ? -1 * y : 0;
    const calcY = height - top - innerHeight < 0
      ? height - innerHeight < 0 ? 0 : height - innerHeight
      : top;
    const calcHeight = height < innerHeight
      ? height
      : y + height - innerHeight > 0 ? innerHeight : y + height - innerHeight;
    return {
      visible: y < innerHeight && height + y > 0,
      y: calcY,
      height: calcHeight
    }
  }

  calculateScroll() {
    const { visible, y, height } = this.getView();
    if (visible) {
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
    if (this.visible && this.y !== y) {
      this.dispatchEvent(
        new CustomEvent('calculate', {
          detail: {
            offsetY: y,
            viewHeight: height,
            height: this.height
          }
        }
      ));
      this.y = y;
    }
  }

  enterView() {
    this.dispatchEvent(new CustomEvent('enter'));
  }

  leaveView() {
    this.dispatchEvent(new CustomEvent('leave'));
  }

  connectedCallback() {
    this.addEventListener('height', (e: any) => {
      e.preventDefault();
      const { height } = e.detail;
      this.style.height = `${height}px`;
      this.height = parseInt(height, 10);
      this.calculateScroll();
    });
    this.style.height = `${this.height}px`;
    window.addEventListener('scroll', () => {
      this.calculateScroll();
    });
    window.addEventListener('resize', () => {
      this.y = -1;
      this.calculateScroll();
    });
    this.calculateScroll();
  }
}
