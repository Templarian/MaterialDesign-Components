import { Component, Prop, Part } from '@mdi/element';

import template from './header.html';
import style from './header.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-header',
  style,
  template
})
export default class MdiHeader extends HTMLElement {
  @Prop() logo: string = noIcon;
  @Prop() name: string = 'Default';

  @Part() $path: SVGPathElement;
  @Part() $name: HTMLSpanElement;

  render() {
    this.$path.setAttribute('d', this.logo);
    this.$name.innerText = this.name;
  }
}