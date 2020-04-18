import { Component, Prop, Part } from '@mdi/element';
import { debounce } from './utils';

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
  @Prop() size: number = 24;

  @Part() $grid: HTMLDivElement;
  @Part() $tooltip: HTMLDivElement;
  @Part() $tooltipText: HTMLSpanElement;

  currentCount = 0;
  items: [HTMLButtonElement, SVGPathElement][] = [];
  svg = 'http://www.w3.org/2000/svg';
  columns: number;
  debounceRender = debounce(() => this.render(), 300);

  resizeObserver = new ResizeObserver(entries => {
    const { width } = entries[0].contentRect;
    const columns = Math.floor(width / (this.size + 20));
    if (this.columns !== columns) {
      this.columns = columns;
      this.debounceRender();
    }
  });

  connectedCallback() {
    this.resizeObserver.observe(this.$grid);
    this.addEventListener('mousemove', this.handleTooltip.bind(this));
    this.addEventListener('mouseleave', this.hideTooltip.bind(this));
  }

  index = 0;
  handleTooltip(e: any) {
    var rect = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    const tileX = Math.floor(x / 44);
    const tileY = Math.floor(y / 44);
    const index = tileX + (tileY * this.columns);
    if (this.index !== index && this.icons[index]) {
      if (tileX > this.columns - 1) {
        this.hideTooltip();
      } else {
        this.showTooltip(this.icons[index], index);
      }
      this.index = index;
    }
  }

  render() {
    console.log('render');
    const count = this.icons.length;
    // Render more grid items
    for(let i = this.currentCount; i < count; i++) {
      this.currentCount = i + 1;
      const btn = document.createElement('button');
      btn.dataset.index = `${i}`;
      btn.addEventListener('click', () => {
        this.handleClick(this.icons[i]);
      });
      const svg = document.createElementNS(this.svg, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      const path = document.createElementNS(this.svg, 'path') as SVGPathElement;
      svg.appendChild(path);
      btn.appendChild(svg);
      this.$grid.appendChild(btn);
      this.items.push([btn, path]);
    }
    const rows = Math.ceil(count / this.columns);
    this.$grid.style.gridTemplateRows = `repeat(${rows}, 2.75rem)`;
    this.items.forEach(([btn, path], i) => {
      if (this.icons[i]) {
        btn.style.gridColumn = `${(i % this.columns + 1)}`;
        btn.style.gridRow = `${Math.ceil((i + 1) / this.columns)}`;
        path.setAttribute('d', this.icons[i].data);
        this.icons[i].id = i;
      } else {
        path.setAttribute('d', '');
      }
    });
    this.$grid.style.height = `${2.75 * rows}rem`;
  }

  handleClick(icon: any) {
    this.dispatchEvent(
      new CustomEvent('select', {
        detail: icon
      })
    );
  }

  showTooltip(icon: any, index: number) {
    this.$tooltipText.innerText = `${icon.name} ${icon.id}`;
    const { x, y } = this.getPositionFromIndex(index);
    this.$tooltip.style.gridColumn = `${x + 1}`;
    this.$tooltip.style.gridRow = `${y + 1}`;
    this.$tooltip.classList.add('visible');
  }

  hideTooltip() {
    this.$tooltip.classList.remove('visible');
  }

  getPositionFromIndex(index: number) {
    return {
      x: index % this.columns,
      y: Math.floor(index / this.columns)
    };
  }
}