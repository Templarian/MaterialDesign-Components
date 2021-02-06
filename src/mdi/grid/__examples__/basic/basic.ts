import { Component, Part, Prop } from '@mdi/element';
import MdiDatabase from 'mdi/database/database';
import { Icon } from './../../../shared/models/icon';
import MdiGrid from './../../grid';

import template from './basic.html';

@Component({
  selector: 'x-mdi-grid-basic',
  template
})
export default class XMdiGridBasic extends HTMLElement {

  @Prop() fontId = 'D051337E-BC7E-11E5-A4E9-842B2B6CFE1B';

  @Part() $button1: HTMLButtonElement;
  @Part() $button10: HTMLButtonElement;
  @Part() $button50: HTMLButtonElement;
  @Part() $button250: HTMLButtonElement;
  @Part() $buttonAll: HTMLButtonElement;

  @Part() $mdiScrollSizeText: HTMLSpanElement;
  @Part() $mdiScrollPaddingText: HTMLSpanElement;
  @Part() $mdiScrollGapText: HTMLSpanElement;

  @Part() $mdiScrollSize: HTMLInputElement;
  @Part() $mdiScrollPadding: HTMLInputElement;
  @Part() $mdiScrollGap: HTMLInputElement;

  @Part() $database: MdiDatabase;
  @Part() $iconGrid1: MdiGrid;

  icons: Icon[] = [];

  connectedCallback() {
    this.$button1.addEventListener('click', () => {
      this.setIcons(1);
    });
    this.$button10.addEventListener('click', () => {
      this.setIcons(10);
    });
    this.$button50.addEventListener('click', () => {
      this.setIcons(50);
    });
    this.$button250.addEventListener('click', () => {
      this.setIcons(250);
    });
    this.$buttonAll.addEventListener('click', () => {
      this.setIcons(-1);
    });

    this.$database.addEventListener('sync', this.handleSync.bind(this));
    this.$database.font = this.fontId;
  }

  setIcons(count: number) {
    if (count === -1) {
      this.$iconGrid1.icons = this.icons;
    }
    this.$iconGrid1.icons = this.icons.slice(0, count);
  }

  async handleSync(e: CustomEvent) {
    const { db } = e.detail;
    const count = await db.getCount(this.fontId);
    console.log('Total Icons', count);
    const icons = await db.getIcons(this.fontId);
    console.log('Icon Objects:', icons.length);
    this.icons = icons;
    this.setIcons(10);
  }
/*
var tooltip3 = document.getElementById('tooltip3');
      document.body.addEventListener('tooltip', (e) => {
        var { visible, rect, text, position } = e.detail;
        tooltip3.visible = visible;
        tooltip3.rect = rect;
        tooltip3.text = text;
        tooltip3.position = position;
      });
      var ele = document.getElementsByTagName('mdi-grid')[0];
      tooltip3.style.display = 'none';
      ele.addEventListener('select', (e) => {
        var icon = e.detail;
        alert(icon.name);
      });
      ele.addEventListener('entericon', (e) => {
        var icon = e.detail.icon;
        console.log('enter', e.detail);
        var rect = ele.getBoundingClientRect();
        tooltip3.style.position = 'fixed';
        tooltip3.style.left = `${e.detail.x}px`;
        tooltip3.style.top = `${e.detail.y}px`;
        tooltip3.width = e.detail.width;
        tooltip3.height = e.detail.height;
        tooltip3.text = icon.name;
        tooltip3.style.display = 'block';
      });
      ele.addEventListener('leaveicon', (e) => {
        var icon = e.detail;
        tooltip3.style.display = 'none';
        console.log('leave', e.detail);
      });
      ele.addEventListener('openmenu', (e) => {
        var icon = e.detail;
        console.log(e.detail);
      });
      ele.addEventListener('closemenu', (e) => {
        var icon = e.detail;
        console.log(e.detail);
      });
      var mdiScrollSizeText = document.getElementById('mdiScrollSizeText');
      document.getElementById('mdiScrollSize').addEventListener('change', (e) => {
        ele.size = e.target.value;
        mdiScrollSizeText.innerText = e.target.value;
      });
      var mdiScrollPaddingText = document.getElementById('mdiScrollPaddingText');
      document.getElementById('mdiScrollPadding').addEventListener('change', (e) => {
        ele.padding = e.target.value;
        mdiScrollPaddingText.innerText = e.target.value;
      });
      var mdiScrollGapText = document.getElementById('mdiScrollGapText');
      document.getElementById('mdiScrollGap').addEventListener('change', (e) => {
        ele.gap = e.target.value;
        mdiScrollGapText.innerText = e.target.value;
      });
      window.iconGrid = {
        basic: (count) => {
          const element = document.getElementById('iconGrid1');
          element.icons = getIcons(count);
        }
      };
*/
}