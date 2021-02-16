import { Component, Part, Prop } from '@mdi/element';
import MdiInputCheck from 'mdi/inputCheck/inputCheck';

import template from './basic.html';

@Component({
  selector: 'x-mdi-input-check-basic',
  template
})
export default class XMdiInputCheckBasic extends HTMLElement {

  @Part() $input: MdiInputCheck;
  @Part() $value: HTMLSpanElement;

  connectedCallback() {
    this.$input.addEventListener('change', this.handleChange.bind(this));
  }

  handleChange(e) {
    var value = e.target.value;
    this.$value.innerText = value;
  }
}