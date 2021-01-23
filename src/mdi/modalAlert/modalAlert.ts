import { Component, Prop, Part } from '@mdi/element';

import template from './modalAlert.html';
import style from './modalAlert.css';

import MdiOverlay from '../overlay/overlay';
import MdiButton from '../button/button';

@Component({
  selector: 'mdi-modal-alert',
  template,
  style
})
export default class MdiModalAlert extends MdiOverlay {
  @Prop() header: string = 'Are you sure?';
  @Prop() message: string = 'Are you sure?';

  @Part() $header: HTMLDivElement;
  @Part() $headerText: HTMLHeadingElement;
  @Part() $message: HTMLDivElement;
  @Part() $yes: MdiButton;
  @Part() $no: MdiButton;

  connectedCallback() {
    this.$yes.addEventListener('click', this.handleYes.bind(this));
    this.$no.addEventListener('click', this.handleNo.bind(this));
  }

  handleYes() {
    this.close(true);
  }

  handleNo() {
    this.close(false);
  }

  render(changes) {
    if (changes.header) {
      this.$headerText.innerText = this.header;
    }
    if (changes.message) {
      this.$message.innerText = this.message;
    }
  }
}