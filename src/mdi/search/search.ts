import { Component, Prop, Part } from '@mdi/element';

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

  connectedCallback() {
    this.$input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      console.log(target.value);
    });
  }

  render() {
    // this.$path.setAttribute('d', this.path);
  }
}