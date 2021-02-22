import { Component, Prop, Part } from '@mdi/element';

import template from './tabs.html';
import style from './tabs.css';

@Component({
  selector: 'mdi-tabs',
  style,
  template
})
export default class MdiTabs extends HTMLElement {

  @Part() $path: SVGPathElement;

  connectedCallback() {

  }
}