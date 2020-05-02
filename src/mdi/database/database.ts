import { Component, Prop, Part } from '@mdi/element';

import template from './database.html';
import style from './database.css';

import { DatabaseService } from '../shared/databaseService';

const db = new DatabaseService();

@Component({
  selector: 'mdi-database',
  style,
  template
})
export default class MdiNav extends HTMLElement {
  @Prop() font: string = '';

  async render() {
    if (this.font !== '') {
      await db.sync(this.font);
      this.dispatchEvent(new CustomEvent('sync', {
        detail: {
          db
        }
      }));
    }
  }
}