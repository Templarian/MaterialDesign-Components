import { Component, Prop, Part } from '@mdi/element';

import template from './inputCheck.html';
import style from './inputCheck.css';

const unchecked = 'M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z';
const checked = 'M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z';

@Component({
  selector: 'mdi-input-check',
  style,
  template
})
export default class MdiInputCheck extends HTMLElement {
  @Prop() value: string | boolean = false;

  @Part() $button: HTMLButtonElement;
  @Part() $path: SVGPathElement;

  connectedCallback() {
    this.$button.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    const value = [true, 'true'].includes(this.value);
    this.value = !value;
    this.dispatchEvent(new CustomEvent('change'));
  }

  render(changes) {
    if (changes.value) {
      const value = [true, 'true'].includes(this.value);
      this.$path.setAttribute('d', value ? checked : unchecked);
      this.$button.classList.toggle('blank', !value);
      this.$button.classList.toggle('checked', value);
    }
  }
}