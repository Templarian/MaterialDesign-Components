import { Component, Part, Prop } from '@mdi/element';

import template from './buttonGroup.html';
import style from './buttonGroup.css';
import MdiButton from './../button/button';

const MDI_BUTTON = 'MDI-BUTTON';

@Component({
  selector: 'mdi-button-group',
  style,
  template
})
export default class MdiButtonGroup extends HTMLElement {
  @Part() $slot: HTMLSlotElement;

  connectedCallback() {
    this.$slot.addEventListener('slotchange', this.handleSlotChange.bind(this))
  }

  handleSlotChange(e) {
    const elements = this.$slot.assignedElements();
    if (elements.length !== 0) {
      const first  = elements[0] as MdiButton;
      if (first.tagName === MDI_BUTTON) {
        first.start = true;
      }
      const last = elements[elements.length - 1] as MdiButton;
      if (last.tagName === MDI_BUTTON) {
        last.end = true;
      }
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as MdiButton;
        if (element.tagName === MDI_BUTTON) {
          element.center = !element.start && !element.end;
        }
      }
    }
  }

  render(changes) {

  }
}