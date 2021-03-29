import { Component, Prop, Part, node } from '@mdi/element';
import { list, item } from './../shared/list';
import MdiTab from './../tab/tab';

import template from './tabs.html';
import style from './tabs.css';
import partialTab from './partials/tab.html';

@Component({
  selector: 'mdi-tabs',
  style,
  template
})
export default class MdiTabs extends HTMLElement {

  @Part() $tabset: HTMLDivElement;
  @Part() $slot: HTMLSlotElement;

  tabs: any[] = [];

  connectedCallback() {
    this.addEventListener('tab', this.handleTab.bind(this));
    this.$slot.addEventListener('slotchange', this.handleSlotChange.bind(this));
  }

  handleTab(e: CustomEvent) {
    const { detail } = e;
    this.tabs.push(detail);
    list(
      this.$tabset,
      this.tabs,
      'id',
      (tab: any) => {
        const n = node<HTMLDivElement>(partialTab, {
          button: {
            innerText: tab.label
          }
        });
        const button = n.querySelector<HTMLDivElement>('[part="tab"]');
        button?.addEventListener('click', (e) => {
          this.selectTab(tab.id);
        });
        if (this.tabs[0].id === tab.id) {
          button?.classList.add('active');
        }
        return n;
      },
      (tab, $item) => {

      }
    );
    e.stopPropagation();
  }

  handleSlotChange(e) {
    const elements = this.$slot.assignedElements() as MdiTab[];
    if (elements.length !== 0) {
      elements[0].show();
    }
  }

  selectTab(id: string) {
    const tabs = Array.from(this.$tabset.children) as HTMLElement[];
    for (let tab of tabs) {
      tab.classList.toggle('active', tab.dataset['key'] === id);
    }
    const elements = this.$slot.assignedElements() as MdiTab[];
    elements.forEach(e => e.hide());
    const tab = elements.find(e => e.uuid === id) as MdiTab;
    tab.show();
  }
}