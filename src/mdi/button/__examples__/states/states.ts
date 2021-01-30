import { Component, Part, Prop } from '@mdi/element';
import MdiButton from './../../button';

import template from './states.html';

@Component({
  selector: 'x-button-states',
  template
})
export default class XButtonStates extends HTMLElement {
  @Part() $active: MdiButton;

  connectedCallback() {
    this.$active.addEventListener('click', this.handleActive.bind(this));
  }

  handleActive() {
    this.$active.active = !this.$active.active;
  }
}