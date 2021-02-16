import { Component, Part, Prop } from '@mdi/element';
import MdiIcon from 'mdi/icon/icon';

import template from './basic.html';
import { mdiAccount, mdiSquare } from './constants';

@Component({
  selector: 'x-mdi-icon-basic',
  template
})
export default class XMdiIconBasic extends HTMLElement {
  @Part() $icon1: MdiIcon;
  @Part() $buttonClear: HTMLButtonElement;
  @Part() $buttonAccount: HTMLButtonElement;
  @Part() $buttonSquare: HTMLButtonElement;

  connectedCallback() {
    this.$buttonClear.addEventListener('click', this.handleClear.bind(this));
    this.$buttonAccount.addEventListener('click', this.handleAccount.bind(this));
    this.$buttonSquare.addEventListener('click', this.handleSquare.bind(this));
  }

  handleClear() {
    this.$icon1.path = '';
  }

  handleAccount() {
    this.$icon1.path = mdiAccount;
  }

  handleSquare() {
    this.$icon1.path = mdiSquare;
  }
}