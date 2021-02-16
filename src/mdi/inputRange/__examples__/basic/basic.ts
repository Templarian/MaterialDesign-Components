import { Component, Part, Prop } from '@mdi/element';
import MdiInputRange from './../../inputRange';

import template from './basic.html';

@Component({
  selector: 'x-mdi-input-range-basic',
  template
})
export default class XMdiInputRangeBasic extends HTMLElement {

  @Part() $input: MdiInputRange;
  @Part() $value1: HTMLSpanElement;
  @Part() $value2: HTMLSpanElement;

  connectedCallback() {
    this.$input.addEventListener('change', this.handleChange.bind(this));
    this.$input.addEventListener('input', this.handleInput.bind(this));
  }

  handleChange(e: CustomEvent) {
    const { value } = e.detail;
    this.$value1.innerText = value;
  }

  handleInput(e: CustomEvent) {
    const { value } = e.detail;
    this.$value2.innerText = value;
  }
}