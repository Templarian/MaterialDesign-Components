import { Component, Prop, Part } from '@mdi/element';

import template from './icon.html';
import style from './icon.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-icon',
  style,
  template
})
export default class MdiIcon extends HTMLElement {
  @Prop() path: string = noIcon;

  @Part() $path: SVGPathElement;

  render(changes) {
    if (changes.path) {
      this.$path.setAttribute('d', this.path);
    }
  }
}