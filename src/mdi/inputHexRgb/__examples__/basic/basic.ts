import { Component, Part, Prop } from '@mdi/element';
import MdiInputHexRgb from './../../inputHexRgb';

import template from './basic.html';

@Component({
  selector: 'x-mdi-input-hex-rgb-basic',
  template
})
export default class XMdiInputHexRgbBasic extends HTMLElement {

  @Part() $input: MdiInputHexRgb;
  @Part() $value: HTMLSpanElement;

  connectedCallback() {
    this.$input.addEventListener('change', this.handleChange.bind(this));
  }

  handleChange(e: CustomEvent) {
    var { value } = e.target as any;
    this.$value.innerText = `${value}`;
  }
}