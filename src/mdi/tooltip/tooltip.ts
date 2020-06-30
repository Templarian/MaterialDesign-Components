import { Component, Prop, Part } from '@mdi/element';

import template from './tooltip.html';
import style from './tooltip.css'

@Component({
  selector: 'mdi-tooltip',
  style,
  template
})
export default class MdiTooltip extends HTMLElement {
  @Prop() text: string = '';
  @Prop() position: string = 'bottom-center';
  @Prop() width: string = '32';
  @Prop() height: string = '32';

  @Part() $tooltip: HTMLDivElement;
  @Part() $tooltipText: HTMLSpanElement;
  @Part() $tooltipArrow: HTMLDivElement;

  render() {
    this.$tooltipText.innerText = this.text;
    const arrow = Math.floor(parseInt(this.width, 10) / 2) - 5;
    const height = parseInt(this.height, 10);
    this.$tooltipArrow.style.left = `${arrow}px`;
    this.$tooltipArrow.style.top = `${height}px`;
    this.$tooltipText.style.top = `${height + 5}px`;
  }
}