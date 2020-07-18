import { Component, Part, Prop } from '@mdi/element';

import template from './button.html';
import style from './button.css';

@Component({
  selector: 'mdi-button',
  style,
  template
})
export default class MdiButton extends HTMLElement {
  @Prop() active: string | boolean = false;

  @Part() $button: HTMLButtonElement;

  connectedCallback() {
    this.$button.addEventListener('click', (e) => this.dispatchEvent(new CustomEvent('click')));
  }

  render(changes) {
    if (changes.active) {
      this.$button.classList.toggle('active', this.active === 'true' || !!this.active);
    }
  }
}