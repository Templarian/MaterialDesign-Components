import { Component, Part, Prop } from '@mdi/element';
import MdiPreview from './../../preview';

import template from './basic.html';

@Component({
  selector: 'x-mdi-preview-basic',
  template
})
export default class XMdiPreviewBasic extends HTMLElement {

  @Part() $preview: MdiPreview;

  connectedCallback() {
    // this.$button.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {

  }

}