import { Component, Part, Prop } from '@mdi/element';
import MdiInputCheckList from 'mdi/inputCheckList/inputCheckList';

import template from './basic.html';

@Component({
  selector: 'x-mdi-input-check-list-basic',
  template
})
export default class XMdiInputCheckListBasic extends HTMLElement {

  @Part() $input: MdiInputCheckList;
  @Part() $value: HTMLSpanElement;

  connectedCallback() {
      this.$input.value = ['uuid1', 'uuid3'];
      this.$input.options = [
        { value: 'uuid1', label: 'Item 1' },
        { value: 'uuid2', label: 'Item 2' },
        { value: 'uuid3', label: 'Item 3', disabled: true },
        { value: 'uuid4', label: 'Item 4' }
      ];
      this.$value.innerText = this.$input.value.join(',');
      this.$input.addEventListener('change', this.handleChange.bind(this));
  }

  handleChange(e) {
    const { value } = e.detail;
    this.$value.innerText = value.join(',');
  }
}