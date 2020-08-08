import { Component, Prop, Part } from '@mdi/element';

import template from './inputSelect.html';
import style from './inputSelect.css';

interface InputSelectItem {
  label: string;
  value: string;
}

@Component({
  selector: 'mdi-input-select',
  style,
  template
})
export default class MdiInputSelect extends HTMLElement {
  @Prop() options: InputSelectItem[] = [];
  @Prop() value: string;

  @Part() $select: HTMLSelectElement;

  render(changes) {
    if (changes.options) {
      this.options.forEach(o => {
        const option = document.createElement('option');
        option.innerText = o.label;
        option.value = o.value;
        this.$select.appendChild(option);
      });
      if (this.$select.value !== this.value) {
        this.$select.value = this.value;
      }
    }
    if (changes.value) {
      if (this.$select.value !== this.value) {
        this.$select.value = this.value;
      }
    }
  }
}