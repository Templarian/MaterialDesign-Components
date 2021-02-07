import { Component, Part, Prop } from '@mdi/element';
import MdiButtonToggle from './../../buttonToggle';

import template from './basic.html';

@Component({
  selector: 'x-mdi-button-toggle-basic',
  template
})
export default class XMdiButtonToggleBasic extends HTMLElement {

  @Part() $button: MdiButtonToggle;
  @Part() $value: HTMLSpanElement;

  connectedCallback() {
    this.$button.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    const { active } = e.detail;
    this.$value.innerText = `${active}`;
  }
}