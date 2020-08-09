import { Component, Part, Prop } from '@mdi/element';

import template from './buttonGroup.html';
import style from './buttonGroup.css';
import MdiButton from './../button/button';
import MdiButtonLink from './../buttonLink/buttonLink';

const MDI_BUTTON = 'MDI-BUTTON';
const MDI_BUTTON_LINK = 'MDI-BUTTON-LINK';

function isButton(ele: MdiButton | MdiButtonLink) {
  return ele.tagName === MDI_BUTTON || ele.tagName === MDI_BUTTON_LINK;
}

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
      if (isButton(first)) {
        first.start = true;
      }
      const last = elements[elements.length - 1] as MdiButton;
      if (isButton(last)) {
        last.end = true;
      }
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as MdiButton;
        if (isButton(element)) {
          element.center = !element.start && !element.end;
        }
      }
    }
  }

  render(changes) {

  }
}