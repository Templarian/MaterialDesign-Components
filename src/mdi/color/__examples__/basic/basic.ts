import { Component, Part, Prop } from '@mdi/element';
import MdiColor from './../../color';

import template from './basic.html';

@Component({
  selector: 'x-mdi-color-basic',
  template
})
export default class XMdiColorBasic extends HTMLElement {
  @Part() $color1: MdiColor;
  @Part() $colorSelected: HTMLSpanElement;

  connectedCallback() {
    this.$color1.addEventListener('select', (e: CustomEvent) => {
      const { rgb, hex } = e.detail;
      this.$colorSelected.innerText = `${hex} or rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    });
  }
}