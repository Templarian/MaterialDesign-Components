import { Component, Part, Prop } from '@mdi/element';
import MdiInputSelect from './../../inputSelect';

import template from './basic.html';

@Component({
  selector: 'x-mdi-input-select-basic',
  template
})
export default class XMdiInputSelectBasic extends HTMLElement {

  @Part() $input: MdiInputSelect;
  @Part() $value: HTMLSpanElement;

  connectedCallback() {
    this.$input.options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
      { label: 'Option 4', value: 'option4' }
    ];
    this.$input.value = this.$input.options[1].value;
    this.$input.addEventListener('change', this.handleChange.bind(this));
  }

  handleChange(e) {
    const { value } = e.detail;
    this.$value.innerText = `${value}`;
  }
}