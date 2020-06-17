import { Component, Prop, Part } from '@mdi/element';
import { Remarkable } from 'remarkable';

import 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-php';

declare var Prism: any;

import template from './markdown.html';
import style from './markdown.css';

@Component({
  selector: 'mdi-markdown',
  style,
  template
})
export default class MdiMarkdown extends HTMLElement {
  @Prop() text = '';

  @Part() $content: HTMLDivElement;

  render(changes) {
    if (changes.text) {
      const md = new Remarkable();
      this.$content.innerHTML = md.render(this.text);
      const blocks = this.$content.querySelectorAll('code[class*="language-"]');
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i] as HTMLElement;
        const language = block.classList.value.replace('language-', '');
        block.innerHTML = Prism.highlight(block.innerText, Prism.languages[language], language);
      }
    }
  }
}