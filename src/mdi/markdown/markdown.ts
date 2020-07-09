import { Component, Prop, Part } from '@mdi/element';
import { Remarkable } from 'remarkable';
import { MarkdownReplace } from './markdownReplace';

import 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-bash';

const supported = [
  'css',
  'sass',
  'scss',
  'groovy',
  'typescript',
  'javascript',
  'jsx',
  'tsx',
  'java',
  'html',
  'xml',
  'php',
  'bash',
  'json',
  'yaml'
];

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
  @Prop() replace: MarkdownReplace[] = [];

  @Part() $content: HTMLDivElement;

  modify(callback) {
    callback(this.$content);
  }

  render(changes) {
    if (changes.text) {
      const md = new Remarkable({
        html: true
      });
      let html = md.render(this.text);
      this.replace.forEach(o => {
        html = html.replace(o.find, o.replace);
      });
      this.$content.innerHTML = html;
      const blocks = this.$content.querySelectorAll('code[class*="language-"]');
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i] as HTMLElement;
        const language = block.classList.value.replace('language-', '');
        if (supported.includes(language)) {
          block.innerHTML = Prism.highlight(block.innerText, Prism.languages[language], language);
        } else if (language !== '' && language !== 'text') {
          console.error(`Markdown contains a codeblock with "${language}" which is not loaded.`);
        }
      }
      // Additional Rendering
      this.replace.forEach(o => {
        if (o.render) {
          o.render(this.$content);
        }
      });
    }
  }
}