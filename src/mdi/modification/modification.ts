import { Component, Prop, Part, node } from '@mdi/element';

import template from './modification.html';
import style from './modification.css';

import templateNews from './type/news.html';
import templateIconAliasCreated from './type/iconAliasCreated.html';

import { Modification } from 'mdi/shared/models/modification';
import { list, item } from './../shared/list';
import { ModificationType } from 'mdi/shared/enums/modificationType';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

const mapTemplates = {
  [ModificationType.News]: templateNews,
  [ModificationType.IconCreated]: templateNews,
  [ModificationType.IconModified]: templateNews,
  [ModificationType.IconRenamed]: templateNews,
  [ModificationType.IconDeleted]: templateNews,
  [ModificationType.IconAliasCreated]: templateIconAliasCreated,
  [ModificationType.IconAliasDeleted]: templateNews,
  [ModificationType.IconTagCreated]: templateNews,
  [ModificationType.IconTagDeleted]: templateNews
}

@Component({
  selector: 'mdi-modification',
  style,
  template
})
export default class MdiModification extends HTMLElement {
  @Prop() modifications: Modification[] | null = null;
  @Prop() edit: boolean = false;

  @Part() $items: HTMLDivElement;

  render(changes) {
    if (changes.modifications && this.modifications) {
      list(
        this.$items,
        this.modifications,
        'id',
        (modification: Modification) => {
          if (modification.modificationId in mapTemplates) {
            return node<HTMLDivElement>(mapTemplates[modification.modificationId], {
              text: {
                innerText: modification.text
              },
              icon: {
                path: modification.icon.data
              },
              avatar: {
                user: modification.user as any
              }
            });
          }
          const invalid = document.createElement('div');
          invalid.innerText = `Error: Unsupported modificationId with text: "${modification.text}"`;
          return invalid;
        },
        (modifiction, $item) => {

        }
      );
    }
    if (changes.edit) {

    }
  }

  addItem(modification: Modification) {
    const div = document.createElement('div');

    this.$items.appendChild(div);
  }
}