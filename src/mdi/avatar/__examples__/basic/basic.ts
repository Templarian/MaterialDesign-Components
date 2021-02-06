import { Component, Part, Prop } from '@mdi/element';
import MdiAvatar from './../../avatar';
import { AVATAR } from './constants';
import { User } from './../../../shared/models/user';

import template from './basic.html';

@Component({
  selector: 'x-mdi-avatar-basic',
  template
})
export default class XMdiAvatarBasic extends HTMLElement {
  @Part() $avatar1: MdiAvatar;
  @Part() $avatar2: MdiAvatar;

  connectedCallback() {
    this.$avatar1.user = new User().from({
      base64: AVATAR
    } as any);

    this.$avatar2.user = new User().from({
      base64: AVATAR,
      sponsored: true,
      github: 'Templarian',
      name: 'Austin Andrews'
    } as any);
  }
}