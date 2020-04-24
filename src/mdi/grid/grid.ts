import { Component, Prop, Part, Local } from '@mdi/element';
import { createPopper } from '@popperjs/core';
import { debounce, copyText } from './utils';
import { getCopySvgInline } from './copy';

import template from './grid.html';
import style from './grid.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

declare const ResizeObserver;

@Component({
  selector: 'mdi-grid',
  style,
  template
})
export default class MdiGrid extends HTMLElement {
  @Prop() icons: any = [];
  @Prop() size: number = 24;
  @Prop() width: string = 'auto';
  @Prop() height: string = 'auto';

  @Part() $grid: HTMLDivElement;

  @Part() $contextMenu: HTMLDivElement;
  @Part() $newTab: HTMLAnchorElement;
  @Part() $copyIconName: HTMLButtonElement;
  @Part() $pngBlack: HTMLButtonElement;
  @Part() $pngWhite: HTMLButtonElement;
  @Part() $pngColor: HTMLButtonElement;
  @Part() $png24: HTMLButtonElement;
  @Part() $png36: HTMLButtonElement;
  @Part() $png48: HTMLButtonElement;
  @Part() $png96: HTMLButtonElement;
  @Part() $copyPng: HTMLButtonElement;
  @Part() $svgBlack: HTMLButtonElement;
  @Part() $svgWhite: HTMLButtonElement;
  @Part() $svgColor: HTMLButtonElement;
  @Part() $svgDownload: HTMLButtonElement;
  @Part() $copySvgInline: HTMLButtonElement;
  @Part() $copySvgFile: HTMLButtonElement;
  @Part() $copySvgPath: HTMLButtonElement;
  @Part() $copyUnicode: HTMLButtonElement;
  @Part() $copyCodepoint: HTMLButtonElement;
  @Part() $copyPreview: HTMLButtonElement;

  @Part() $tooltip: HTMLDivElement;
  @Part() $tooltipText: HTMLSpanElement;

  @Local('#000') cachePngColor: string;
  @Local('24') cachePngSize: string;
  @Local('#000') cacheSvgColor: string;

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
    // Wire Up Context Menu
    this.$copyIconName.addEventListener('click', this.handleCopyIconName.bind(this));
    this.$svgBlack.addEventListener('click', () => {
      this.cacheSvgColor = '#000';
      this.render();
    });
    this.$svgWhite.addEventListener('click', () => {
      this.cacheSvgColor = '#fff';
      this.render();
    });
    this.$svgColor.addEventListener('click', () => {
      this.cacheSvgColor = '#f0f';
      this.render();
    });
    this.$pngBlack.addEventListener('click', () => {
      this.cachePngColor = '#000';
      this.render();
    });
    this.$pngWhite.addEventListener('click', () => {
      this.cachePngColor = '#fff';
      this.render();
    });
    this.$pngColor.addEventListener('click', () => {
      this.cachePngColor = '#f0f';
      this.render();
    });
    this.$png24.addEventListener('click', () => {
      this.cachePngSize = '24';
      this.render();
    });
    this.$png36.addEventListener('click', () => {
      this.cachePngSize = '36';
      this.render();
    });
    this.$png48.addEventListener('click', () => {
      this.cachePngSize = '48';
      this.render();
    });
    this.$png96.addEventListener('click', () => {
      this.cachePngSize = '96';
      this.render();
    });
    this.$copyPng.addEventListener('click', this.handleCopyPng.bind(this));
  }

  index = 0;
  handleTooltip(e: any) {
    var rect = e.target.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);
    const tileX = Math.floor(x / 44);
    const tileY = Math.floor(y / 44);
    const index = tileX + (tileY * this.columns);
    if (this.index !== index) {
      if (this.icons[index]) {
        if (tileX > this.columns - 1) {
          this.hideTooltip();
        } else {
          this.showTooltip(this.icons[index], index);
        }
        this.index = index;
      } else {
        this.hideTooltip();
      }
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
      btn.addEventListener('keydown', (e: KeyboardEvent) => {
        this.moveFocus(e, i);
      });
      btn.addEventListener('contextmenu', (e: any) => {
        var rect = this.$grid.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);
        this.showContextMenu(i, x, y);
        e.preventDefault();
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
    if (this.height === 'auto') {
      this.$grid.style.height = `${2.75 * rows}rem`;
      this.$grid.style.overflow = 'visible';
    } else {
      this.$grid.style.height = this.height;
      this.$grid.style.overflow = 'auto';
    }
    // Context Menu
    this.$svgBlack.classList.toggle('active', this.cacheSvgColor === '#000');
    this.$svgWhite.classList.toggle('active', this.cacheSvgColor === '#fff');
    this.$svgColor.classList.toggle('active', this.cacheSvgColor !== '#000' && this.cacheSvgColor !== '#fff');
    this.$pngBlack.classList.toggle('active', this.cachePngColor === '#000');
    this.$pngWhite.classList.toggle('active', this.cachePngColor === '#fff');
    this.$pngColor.classList.toggle('active', this.cachePngColor !== '#000' && this.cachePngColor !== '#fff');
    this.$png24.classList.toggle('active', this.cachePngSize === '24');
    this.$png36.classList.toggle('active', this.cachePngSize === '36');
    this.$png48.classList.toggle('active', this.cachePngSize === '48');
    this.$png96.classList.toggle('active', this.cachePngSize === '96');
    if (this.cachePngColor !== '#000' && this.cachePngColor !== '#fff') {
      this.$pngColor.style.color = this.cachePngColor;
    } else {
      this.$pngColor.style.color = 'transparent';
    }
    if (this.cacheSvgColor !== '#000' && this.cacheSvgColor !== '#fff') {
      this.$svgColor.style.color = this.cacheSvgColor;
    } else {
      this.$svgColor.style.color = 'transparent';
    }
  }

  moveFocus(e: KeyboardEvent, index: number) {
    console.log(e.which, index);
    let newIndex;
    switch(e.which) {
      case 37:
        newIndex = index - 1;
        if (newIndex >= 0) {
          this.items[newIndex][0].focus();
          e.preventDefault();
        }
        break;
      case 38:
        newIndex = index - this.columns;
        if (newIndex >= 0) {
          this.items[newIndex][0].focus();
          e.preventDefault();
        }
        break;
      case 39:
        newIndex = index + 1;
        if (newIndex < this.icons.length) {
          this.items[newIndex][0].focus();
          e.preventDefault();
        }
        break;
      case 40:
        newIndex = index + this.columns;
        if (newIndex < this.icons.length) {
          this.items[newIndex][0].focus();
          e.preventDefault();
        } else if (newIndex !== this.icons.length - 1) {
          this.items[this.icons.length - 1][0].focus();
          e.preventDefault();
        }
        break;
    }
  }

  handleClick(icon: any) {
    this.dispatchEvent(
      new CustomEvent('select', {
        detail: icon
      })
    );
  }

  canOpenTooltip = true;
  preventClose = false;
  currentIndex = 0;

  showContextMenu(index: number, x: number, y: number) {
    // Disable Copy PNG in browsers which do not support the necessary features
    if (!('ClipboardItem' in window && 'Path2D' in window &&
        'clipboard' in navigator && 'write' in navigator.clipboard)) {
      this.$copyPng.style.display = "none";
      console.log("Copy PNG disabled");
    }
    const gridRect = this.$grid.getBoundingClientRect();
    const cmRect = this.$contextMenu.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    if (y + gridRect.top + cmRect.height + 4 > window.innerHeight
      && x + gridRect.left + cmRect.width + 24 > window.innerWidth) {
      y = y - cmRect.height;
      x -= x + gridRect.left + cmRect.width + 24 - window.innerWidth;
     } else if (y + gridRect.top + cmRect.height + 4 > window.innerHeight) {
      y -= y + gridRect.top + cmRect.height + 4 - window.innerHeight;
    } else if (x + gridRect.left + cmRect.width + 24 > window.innerWidth) {
      x -= x + gridRect.left + cmRect.width + 24 - window.innerWidth;
    }
    this.currentIndex = index;
    var icon = this.icons[index];
    this.$newTab.href = `icons/${icon.name}`;
    this.$contextMenu.style.left = `${x}px`;
    this.$contextMenu.style.top = `${y}px`;
    this.$contextMenu.style.visibility = 'visible';
    this.hideTooltip();
    this.canOpenTooltip = false;
    const self = this;
    this.$contextMenu.addEventListener('mouseenter', () => {
      this.preventClose = true;
    });
    this.$contextMenu.addEventListener('mouseleave', () => {
      this.preventClose = false;
    });
    function handleMouseDown(e) {
      if (!self.preventClose) {
        self.hideContextMenu();
        document.removeEventListener('mousedown', handleMouseDown);
      }
    }
    this.preventClose = false;
    document.addEventListener('mousedown', handleMouseDown);
  }

  hideContextMenu() {
    this.$contextMenu.style.visibility = 'hidden';
    this.canOpenTooltip = true;
  }

  handleCopyPng() {
    const icon = this.icons[this.currentIndex];
    // TODO: is there another way to get the selected scale as number?
    const pngSize = Number(this.cachePngSize);
    console.log(icon.data);
    console.log(pngSize);
    // TODO: do we have to remove the element manually?
    const canvas = document.createElement('canvas');
    // TODO: transparent by default, but Windows clipboard loses transparency?
    // It does work in Paint.NET and Chrome (e.g. StackOverflow) however...
    // https://community.adobe.com/t5/photoshop/pasted-transparent-png-files-have-a-black-background/td-p/4923267
    // https://www.reddit.com/r/photoshop/comments/5hsd98/why_cant_i_paste_pngs_with_transparency_from_the/
    //canvas.style.background = 'transparent';
    canvas.width = canvas.height = pngSize;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Transparent by default
      //ctx.clearRect(0, 0, pngSize, pngSize);
      const path = new Path2D(icon.data);
      const scaleFactor = pngSize / this.size;
      ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);
      ctx.fillStyle = this.cachePngColor;
      ctx.fill(path);
      canvas.toBlob(async blob => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({
                [blob.type]: blob
              })
            ]);
            console.log("PNG copied");
          } else {
            console.log("Failed to get blob");
          }
        }, "image/png");
    } else {
      console.log("Failed to get canvas context");
    }
    this.dispatchEvent(
      new CustomEvent('toast', {
        detail: {
          type: 'info',
          icon: 'content-copy',
          message: `Copied "${icon.name}" to clipboard as PNG image.`
        },
        composed: true,
        bubbles: true
      })
    );
    this.hideContextMenu();
  }

  handleCopyIconName() {
    const icon = this.icons[this.currentIndex];
    copyText(icon.name);
    this.dispatchEvent(
      new CustomEvent('toast', {
        detail: {
          type: 'info',
          icon: 'content-copy',
          message: `Copied "${icon.name}" to clipboard.`
        },
        composed: true,
        bubbles: true
      })
    );
    this.hideContextMenu();
  }

  showTooltip(icon: any, index: number) {
    if (!this.canOpenTooltip) { return; }
    this.$tooltipText.innerText = icon.name;
    const { x, y } = this.getPositionFromIndex(index);
    //this.$tooltip.style.gridColumn = `${x + 1}`;
    //this.$tooltip.style.gridRow = `${y + 1}`;
    this.$tooltip.style.left = `${x * 44}px`;
    this.$tooltip.style.top = `${(y * 44 + 5)}px`;
    this.$tooltip.classList.add('visible');
  }

  hideTooltip() {
    this.$tooltip.classList.remove('visible');
    this.index = -1;
  }

  getPositionFromIndex(index: number) {
    return {
      x: index % this.columns,
      y: Math.floor(index / this.columns)
    };
  }
}