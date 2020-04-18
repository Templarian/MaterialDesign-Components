import { Component, Prop, Part } from '@mdi/element';
import { debounce } from './utils';

import template from './search.html';
import style from './search.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-search',
  style,
  template
})
export default class MdiSearch extends HTMLElement {
  @Prop() path: string = noIcon;

  @Part() $input: HTMLInputElement;
  @Part() $list: HTMLUListElement;

  isOpen: boolean = false;

  connectedCallback() {
    this.$input.addEventListener('input', this.handleInput.bind(this));
    this.$input.addEventListener('focus', this.handleFocus.bind(this));
  }

  handleInput(e) {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    console.log(value);
  }

  handleFocus() {
    this.isOpen = true;
    this.$list.style.display = 'block';
  }

  render() {

  }
}