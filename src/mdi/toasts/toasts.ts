import { Component, Prop, Part } from '@mdi/element';
import { observeToasts } from '../utils/toast';
import MdiToast from '../toast/toast';

import template from './toasts.html';
import style from './toasts.css';

@Component({
  selector: 'mdi-toasts',
  style,
  template
})
export default class MdiToasts extends HTMLElement {
  toasts: any[] = [];

  connectedCallback() {
    observeToasts({
      add: (toast) => {
        this.toasts.push(toast);
        this.render();
      },
      remove: (key) => {
        const index = this.toasts.findIndex(t => t.key === key);
        if (index !== -1) {
          var [toast] = this.toasts.splice(index, 1);
          console.log(toast, 'hmm');
          document.querySelector(`[key="${toast.key}"]`)?.remove();
        }
      }
    });
  }

  render() {
    console.log(this.toasts);
    this.toasts.forEach((toast) => {
      const existing = document.querySelector(`[key="${toast.key}"]`) as MdiToast;
      if (existing) {
        existing.message = toast.message;
      } else {
        const ele = document.createElement('mdi-toast') as MdiToast;
        ele.setAttribute('key', toast.key);
        ele.message = toast.message;
        document.body.appendChild(ele);
      }
    });
  }
}