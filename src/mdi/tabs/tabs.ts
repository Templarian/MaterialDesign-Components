import { Component, Prop, Part } from '@mdi/element';

import template from './tabs.html';
import style from './tabs.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-tabs',
  style,
  template
})
export default class MdiTabs extends HTMLElement {
  @Prop() path: string = noIcon;

  @Part() $path: SVGPathElement;

  render(changes) {
    if (changes.path) {
      this.$path.setAttribute('d', this.path);
    }
  }
}