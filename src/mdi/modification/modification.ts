import { Component, Prop, Part, node } from '@mdi/element';

import template from './modification.html';
import style from './modification.css';

import templateNews from './type/news.html';
import templateIconAliasCreated from './type/iconAliasCreated.html';

import { Modification } from 'mdi/shared/models/modification';
import { list, item } from './../shared/list';
import { ModificationType } from 'mdi/shared/enums/modificationType';
import { addTooltip, BOTTOM_END, BOTTOM_START } from './../tooltip';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';
const editIcon = 'M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z';

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
            const n = node<HTMLDivElement>(mapTemplates[modification.modificationId], {
              text: {
                innerText: modification.text
              },
              markdown: {
                text: modification.text
              },
              icon: {
                path: modification.icon && modification.icon.data
              },
              iconName: {
                innerText: modification.icon && modification.icon.name
              },
              avatar: {
                user: modification.user as any
              },
              editIcon: {
                path: editIcon
              },
              issue: {
                style: modification.issue ? '' : 'display:none',
                innerText: modification.issue ? `#${modification.issue}` : '',
                href: `https://github.com/Templarian/MaterialDesign/issues/${modification.issue}`
              }
            });
            const issue = n.querySelector('[part="issue"]');
            if (issue) {
              addTooltip(issue, () => {
                return `View on GitHub`;
              }, BOTTOM_END);
            }
            const avatar = n.querySelector('[part="avatar"]');
            if (avatar) {
              addTooltip(avatar, () => {
                return modification.user.name;
              }, BOTTOM_START);
            }
            return n;
          }
          const invalid = document.createElement('div');
          invalid.classList.add('invalid');
          invalid.innerText = `Error: Unsupported modificationId with text: "${modification.text}"`;
          return invalid;
        },
        (modifiction, $item) => {

        }
      );
    }
    if (changes.edit) {
      this.$items.classList.toggle('edit', this.edit);
    }
  }

  addItem(modification: Modification) {
    const div = document.createElement('div');

    this.$items.appendChild(div);
  }
}