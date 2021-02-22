import { Component, Part, Prop } from '@mdi/element';
import MdiInputUserSelect from './../../inputUserSelect';
import { users } from './constants';

import template from './basic.html';

@Component({
  selector: 'x-mdi-input-user-select-basic',
  template
})
export default class XMdiInputUserSelectBasic extends HTMLElement {

  @Part() $input: MdiInputUserSelect;
  @Part() $value: HTMLSpanElement;

  connectedCallback() {
    this.$input.options = users;
    this.$input.addEventListener('change', this.handleChange.bind(this));
  }

  handleChange(e: CustomEvent) {
    const { name, value } = e.detail;
    this.$value.innerText = `${name} - ${value}`;
  }
}