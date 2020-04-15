import { Component, Prop, Part } from '@mdi/element';

import template from './nav.html';
import style from './nav.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-nav',
  style,
  template
})
export default class MdiNav extends HTMLElement {
  @Prop() nav: string = noIcon;

  @Part() $path: SVGPathElement;

  render() {

  }
}