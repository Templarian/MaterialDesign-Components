import { Component, Part, Local } from '@mdi/element';

import template from './annoy.html';
import style from './annoy.css';

@Component({
  selector: 'mdi-annoy',
  style,
  template
})
export default class MdiAnnoy extends HTMLElement {
  @Local('contextMenu') current;

  @Part() $contextMenu: HTMLDivElement;
  @Part() $extension: HTMLDivElement;
  @Part() $react: HTMLDivElement;

  list = [
    'contextMenu',
    'extension',
    'react'
  ];

  connectedCallback() {
    let next = this.list.findIndex(name => name === this.current) + 1;
    if (next >= this.list.length) {
      next = 0;
    }
    this.current = this.list[next];
    this[`$${this.current}`].classList.add('show');
  }
}