import { Component, Part, Prop } from '@mdi/element';
import MdiSearch from './../../search';

import template from './basic.html';

@Component({
  selector: 'x-search-basic',
  template
})
export default class XSearchBasic extends HTMLElement {
  @Part() $search: MdiSearch;

  connectedCallback() {
    this.$search.items = [
      { type: 'Documentation', name: 'Android', url: '/getting-started/android' },
      { type: 'Documentation', name: 'Angular', url: '/getting-started/angular' },
      { type: 'Documentation', name: 'AngularJS', url: '/getting-started/angularjs' },
      { type: 'Documentation', name: 'Bootstrap', url: '/getting-started/bootstrap' },
      { type: 'Documentation', name: 'How to Play Football', url: '/getting-started/football' },
      { type: 'Documentation', name: 'Foo Angular Foo Angular', url: '/getting-started/bootstraps' }
    ];
    this.$search.icons = [
      { name: 'account', aliases: [{ name: 'user' }] },
      { name: 'account-box', aliases: [{ name: 'user-box' }] },
      { name: 'account-circle', aliases: [{ name: 'user-circle' }] }
    ] as any;
  }
}