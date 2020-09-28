import { Component, Prop, Part } from '@mdi/element';

import template from './cardUser.html';
import style from './cardUser.css';

import { addTooltip } from './../tooltip/addTooltip';
import { User } from './../shared/models/user';
import './../card/card';
import './../avatar/avatar';
import MdiAvatar from './../avatar/avatar';

@Component({
  selector: 'mdi-card-user',
  style,
  template
})
export default class MdiIcon extends HTMLElement {
  @Prop() user: User | null = null;

  @Part() $loading: HTMLDivElement;
  @Part() $user: HTMLDivElement;
  @Part() $name: HTMLDivElement;
  @Part() $github: HTMLAnchorElement;
  @Part() $twitter: HTMLAnchorElement;
  @Part() $iconCountValue: HTMLDivElement;
  @Part() $avatar: MdiAvatar;

  connectedCallback() {
    addTooltip(this.$github, () => {
      return `View ${this.user?.github} on GitHub`;
    });
    addTooltip(this.$twitter, () => {
      return `View ${this.user?.twitter} on Twitter`;
    });
  }

  render(changes) {
    if (changes.user && this.user) {
      this.$avatar.user = this.user;
      this.$name.innerText = `${this.user.name}`;
      this.$iconCountValue.innerText = `${this.user.iconCount}`;
      this.$github.href = `https://github.com/${this.user.github}`;
      this.$github.style.setProperty('display', this.user.github ? null : 'none');
      this.$twitter.href = `https://github.com/${this.user.twitter}`;
      this.$twitter.style.setProperty('display', this.user.twitter ? null : 'none');
      this.$user.style.setProperty('display', null);
      this.$loading.style.setProperty('display', 'none');
    } else {
      this.$user.style.setProperty('display', 'none');
      this.$loading.style.setProperty('display', null);
    }
  }
}