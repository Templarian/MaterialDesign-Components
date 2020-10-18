import { Component, Prop, Part } from '@mdi/element';

import template from './modification.html';
import style from './modification.css';
import { Modification } from 'mdi/shared/models/modification';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-modification',
  style,
  template
})
export default class MdiIcon extends HTMLElement {
  @Prop() modifications: Modification[] | null = null;
  @Prop() edit: boolean = false;

  @Part() $items: HTMLDivElement;

  render(changes) {
    if (changes.modifications) {

    }
    if (changes.edit) {

    }
  }

  addItem(modification: Modification) {
    const div = document.createElement('div');

    this.$items.appendChild(div);
  }
}