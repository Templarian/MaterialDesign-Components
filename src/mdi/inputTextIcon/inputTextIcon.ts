import { Component, Prop, Part } from '@mdi/element';

import template from './inputTextIcon.html';
import style from './inputTextIcon.css';

import './../inputText/inputText';
import MdiInputText from './../inputText/inputText';
import './../icon/icon';
import MdiIcon from './../icon/icon';

@Component({
  selector: 'mdi-input-text-icon',
  style,
  template
})
export default class MdiInputTextIcon extends MdiInputText {
  @Prop() path: string = 'M3,3V21H21V3';

  @Part() $icon: MdiIcon;

  render(changes) {
    if (changes.path) {
      this.$icon.path = this.path;
    }
  }
}