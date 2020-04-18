import { Component, Prop, Part } from '@mdi/element';
import MdiButton from '../button/button';
import { createPopper } from '@popperjs/core';

import template from './picker.html';
import style from './picker.css';

window.process = { env: {} } as any;

@Component({
  selector: 'mdi-picker',
  style,
  template
})
export default class MdiPicker extends MdiButton {
  @Part() $popover: HTMLDivElement;

  connectedCallback() {
    createPopper(this.$button, this.$popover, {
      placement: 'right-start',
    });
  }
}