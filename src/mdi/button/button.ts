import { Component, Part, Prop } from '@mdi/element';

import template from './button.html';
import style from './button.css';

const DEFAULT_VARIANT = 'base';

@Component({
  selector: 'mdi-button',
  style,
  template
})
export default class MdiButton extends HTMLElement {
  @Prop() variant = DEFAULT_VARIANT;

  @Part() $button: HTMLButtonElement;

  connectedCallback() {
    this.$button.addEventListener('click', (e) => this.dispatchEvent(new CustomEvent('click')));
  }

  oldVariant = DEFAULT_VARIANT;
  render() {
    if (this.variant != this.oldVariant) {
      this.$button.classList.replace(this.oldVariant, this.variant);
      this.oldVariant = this.variant;
    }
  }
}