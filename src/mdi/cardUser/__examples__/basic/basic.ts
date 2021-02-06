import { Component, Part, Prop } from '@mdi/element';
import MdiCardUser from './../../cardUser';
import { AVATAR } from './constants';

import template from './basic.html';

@Component({
  selector: 'x-mdi-card-user-basic',
  template
})
export default class XMdiCardUserBasic extends HTMLElement {

  @Part() $cardUser1: MdiCardUser;

  connectedCallback() {
    this.$cardUser1.user = {
      "id": "c4ea5584-07e3-11e4-bf19-842b2b6cfe1b",
      "name": "Austin Andrews",
      "description": "Hello, I am a developer that gets bored and makes icons, then websites for icons, then more icons. Open Source is pretty awesome.",
      "base64": AVATAR,
      "github": "Templarian",
      "twitter": "Templarian",
      "iconCount": 928,
      "website": "http:\/\/templarian.com",
      "sponsored": true,
      "core": true
    } as any;
  }
}