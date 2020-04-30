import { Component, Prop, Part } from '@mdi/element';

import template from './indexeddb.html';
import style from './indexeddb.css';

import { DatabaseService } from '../shared/databaseService';

const db = new DatabaseService();

@Component({
  selector: 'mdi-indexeddb',
  style,
  template
})
export default class MdiNav extends HTMLElement {
  @Part() $sync: HTMLButtonElement;

  connectedCallback() {
    this.$sync.addEventListener('click', () => {
      db.sync();
    });
  }

  render() {

  }
}