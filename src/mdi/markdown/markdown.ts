import { Component, Prop } from '@mdi/element';

import template from './markdown.html';
import style from './markdown.css';

@Component({
  selector: 'mdi-markdown',
  style,
  template
})
export default class MdiMarkdown extends HTMLElement {
  @Prop() text = '';
}