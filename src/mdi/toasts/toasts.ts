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

  @Part() $container: HTMLDivElement;

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
          this.$container.querySelector(`[key="${toast.key}"]`)?.remove();
        }
      }
    });
  }

  render() {
    this.toasts.forEach((toast) => {
      const existing = this.$container.querySelector(`[key="${toast.key}"]`) as MdiToast;
      if (existing) {
        existing.message = toast.message;
        existing.loading = toast.loading;
      } else {
        const ele = document.createElement('mdi-toast') as MdiToast;
        ele.setAttribute('key', toast.key);
        ele.message = toast.message;
        ele.loading = toast.loading;
        this.$container.appendChild(ele);
      }
    });
  }
}