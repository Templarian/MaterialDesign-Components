import { Component, Prop, Part } from '@mdi/element';

import template from './tooltip.html';
import style from './tooltip.css'

@Component({
  selector: 'mdi-tooltip',
  style,
  template
})
export default class MdiTooltip extends HTMLElement {
  @Prop() visible: boolean = false;
  @Prop() rect: any = null;
  @Prop() text: string = '';
  @Prop() position: string = 'bottom-center';

  @Part() $tooltip: HTMLDivElement;
  @Part() $tooltipText: HTMLSpanElement;
  @Part() $tooltipArrow: HTMLDivElement;

  render(changes) {
    this.$tooltipText.innerText = this.text;
    if (changes.visible) {
      this.style.display = this.visible ? 'inline-flex' : 'none';
    }
    if (changes.rect && this.rect) {
      const { top, right, bottom, left, width, height } = this.rect;
      this.style.position = 'fixed';
      this.style.left = `${this.rect.left}px`;
      this.style.top = `${this.rect.top + 5}px`;
      const arrow = Math.floor(width / 2) - 5;
      this.$tooltipArrow.style.left = `${arrow}px`;
      this.$tooltipArrow.style.top = `${height}px`;
      this.$tooltipText.style.top = `${height + 5}px`;
    }
  }
}