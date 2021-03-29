import { Component, Prop, Part, node } from '@mdi/element';
import { Tag } from './../shared/models/tag';
import { list, item } from './../shared/list';

import partialTag from './partials/tag.html';

import template from './listTag.html';
import style from './listTag.css';

@Component({
  selector: 'mdi-list-tag',
  style,
  template
})
export default class MdiListTag extends HTMLElement {
  @Prop() items: Tag[] = [];
  @Prop() edit: boolean = false;

  @Part() $items: HTMLDivElement;

  render(changes) {
    if (changes.items) {
      list(
        this.$items,
        this.items,
        'id',
        (tag: Tag) => {
          const n = node<HTMLDivElement>(partialTag, {
            name: {
              innerText: tag.name
            }
          });
          const name = n.querySelector<HTMLDivElement>('[part="name"]');
          name?.addEventListener('click', (e) => {
            console.log(tag);
          });
          return n;
        },
        (modifiction, $item) => {

        }
      );
    }
    if (changes.edit) {

    }
  }
}