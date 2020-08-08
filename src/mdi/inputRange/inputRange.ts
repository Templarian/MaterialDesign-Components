import { Component, Prop, Part } from '@mdi/element';

import template from './inputRange.html';
import style from './inputRange.css';

@Component({
  selector: 'mdi-input-range',
  style,
  template
})
export default class MdiInputRange extends HTMLElement {
  @Prop() min: string = '0';
  @Prop() max: string = '100';
  @Prop() step: string = '1';

  @Part() $input: HTMLInputElement;

  render() {
    this.$input.min = this.min;
    this.$input.max = this.max;
    this.$input.step = this.step;
  }
}