import { Component, Prop, Part } from '@mdi/element';

import template from './inputHexRgb.html';
import style from './inputHexRgb.css';

@Component({
  selector: 'mdi-input-hex-rgb',
  style,
  template
})
export default class MdiNav extends HTMLElement {
  @Prop() value: string = '#000000';

  @Part() $hex: HTMLInputElement;
  @Part() $red: HTMLInputElement;
  @Part() $green: HTMLInputElement;
  @Part() $blue: HTMLInputElement;

  connectedCallback() {
    this.$hex.value = this.value;
  }

  render() {

  }
}