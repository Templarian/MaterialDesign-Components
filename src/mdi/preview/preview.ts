import { Component, Prop, Part } from '@mdi/element';

import template from './preview.html';
import style from './preview.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-preview',
  style,
  template
})
export default class MdiIcon extends HTMLElement {
  @Prop() path: string = noIcon;
  @Prop() width: number = 24;
  @Prop() height: number = 24;
  @Prop() size: number = 4;

  @Part() $svg: SVGSVGElement;
  @Part() $path: SVGPathElement;
  @Part() $grid: HTMLDivElement;

  render(changes) {
    if (changes.path) {
      this.$path.setAttribute('d', this.path);
    }
    if (changes.size) {
      const width = parseInt(`${this.width}`, 10);
      const height = parseInt(`${this.height}`, 10);
      const size = parseInt(`${this.size}`, 10);
      this.$svg.style.width = `${width * size}px`;
      this.$svg.style.height = `${height * size}px`;
      this.$grid.style.width = `${width * size}px`;
      this.$grid.style.height = `${height * size}px`;
      this.$grid.style.setProperty('--mdi-preview-size', `${size}px`);
    }
  }
}