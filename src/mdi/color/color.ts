import { Component, Part, Prop } from '@mdi/element';
import { SWATCHES } from './constants';

import template from './color.html';
import style from './color.css';

@Component({
  selector: 'mdi-color',
  style,
  template
})
export default class MdiColor extends HTMLElement {

}