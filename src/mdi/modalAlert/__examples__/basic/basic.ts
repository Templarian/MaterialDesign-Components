import { Component, Part, Prop } from '@mdi/element';
import MdiModalAlert from './../../modalAlert';

import template from './basic.html';

@Component({
  selector: 'x-mdi-modal-alert-basic',
  template
})
export default class XMdiModalAlertBasic extends HTMLElement {

  @Part() $button: HTMLButtonElement;
  @Part() $result: HTMLSpanElement;

  connectedCallback() {
    this.$button.addEventListener('click', this.handleClick.bind(this));
  }

  async handleClick() {
    const result = await MdiModalAlert.open({
      header: 'Delete Item',
      message: 'Are you sure you want to delete the item?'
    });
    if (result) {
      this.$result.innerText = result;
    }
  }

}