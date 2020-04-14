import { Component, Prop, Part } from '@mdi/element';

import template from './grid.html';
import style from './grid.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

declare const ResizeObserver;

@Component({
  selector: 'mdi-grid',
  style,
  template
})
export default class MdiSearch extends HTMLElement {
  @Prop() icons: any = [];

  @Part() $grid: HTMLDivElement;

  currentCount = 0;
  items: [HTMLButtonElement, SVGPathElement][] = [];
  svg = 'http://www.w3.org/2000/svg';

  resizeObserver = new ResizeObserver(entries => {
    console.log(entries[0].contentRect.width)
  });

  connectedCallback() {
    this.resizeObserver.observe(this.$grid);
  }

  render() {
    const count = this.icons.length;
    // Render more grid items
    for(let i = this.currentCount; i < count; i++) {
      this.currentCount = i + 1;
      const btn = document.createElement('button');
      btn.addEventListener('click', () => {
        console.log(this.icons[i]);
      });
      const svg = document.createElementNS(this.svg, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      const path = document.createElementNS(this.svg, 'path') as SVGPathElement;
      svg.appendChild(path);
      btn.appendChild(svg);
      this.$grid.appendChild(btn);
      this.items.push([btn, path]);
    }
    const columns = Math.floor(this.$grid.offsetWidth / 24);
    // this.$grid.style.gridTemplateColumns = `repeat(${columns}, 1.5rem)`;
    const rows = Math.ceil(count / columns);
    this.$grid.style.gridTemplateRows = `repeat(${rows}, 1.5rem)`;
    this.items.forEach(([btn, path], i) => {
      if (this.icons[i]) {
        btn.style.gridColumn = `${(i % columns + 1)}`;
        btn.style.gridRow = `${Math.ceil((i + 1) / columns)}`;
        path.setAttribute('d', this.icons[i].data);
        this.icons[i].id = i;
      } else {
        path.setAttribute('d', '');
      }
    });
    this.$grid.style.height = `${1.5 * rows}rem`;
  }
}