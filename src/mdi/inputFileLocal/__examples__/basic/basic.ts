import { Component, Part, Prop } from '@mdi/element';
import MdiInputFileLocal from './../../inputFileLocal';

import template from './basic.html';

@Component({
  selector: 'x-mdi-input-file-local-basic',
  template
})
export default class XMdiInputFileLocalBasic extends HTMLElement {

  @Part() $input: MdiInputFileLocal;
  @Part() $value: HTMLSpanElement;

  connectedCallback() {
    this.$input.addEventListener('change', this.handleChange.bind(this));
  }

  handleChange(e: CustomEvent) {
    const { name, value } = e.detail;
    this.$value.innerText = `${name} - ${value}`;
  }
}