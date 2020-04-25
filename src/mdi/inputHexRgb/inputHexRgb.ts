import { Component, Prop, Part } from '@mdi/element';
import { normalizeHex, hexToRgb, rgbToHex } from './utils';

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
    this.updateRgb();
    this.$hex.addEventListener('input', this.updateRgb.bind(this));
    this.$red.addEventListener('input', this.updateHex.bind(this));
    this.$green.addEventListener('input', this.updateHex.bind(this));
    this.$blue.addEventListener('input', this.updateHex.bind(this));
  }

  updateRgb() {
    const hex = normalizeHex(this.$hex.value);
    const rgb = hexToRgb(hex);
    if (rgb !== null) {
      this.$red.value = rgb.r.toString();
      this.$green.value = rgb.g.toString();
      this.$blue.value = rgb.b.toString();
    }
    this.dispatchSelect();
  }

  updateHex() {
    this.$hex.value = rgbToHex(
      parseInt(this.$red.value),
      parseInt(this.$green.value),
      parseInt(this.$blue.value)
    );
    this.dispatchSelect();
  }

  dispatchSelect() {
    const hex = normalizeHex(this.$hex.value);
    const rgb = rgbToHex(
      parseInt(this.$red.value),
      parseInt(this.$green.value),
      parseInt(this.$blue.value)
    );
    this.value = hex;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          hex,
          rgb
        }
      })
    );
  }

  render() {

  }
}