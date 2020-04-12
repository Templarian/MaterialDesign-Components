import { Component, Prop, Part } from '@mdi/element';

import template from './grid.html';
import style from './grid.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-grid',
  style,
  template
})
export default class MdiSearch extends HTMLElement {
  @Prop() icons: any = [];

  @Part() $grid: HTMLDivElement;

  render() {
    // this.$path.setAttribute('d', this.path);
  }
}