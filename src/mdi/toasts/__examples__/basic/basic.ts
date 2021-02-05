import { Component, Part, Prop } from '@mdi/element';

import template from './basic.html';

@Component({
  selector: 'x-toasts-basic',
  template
})
export default class XToastsBasic extends HTMLElement {
  /*
function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      document.getElementById('toast1').addEventListener('click', () => {
        document.body.dispatchEvent(new CustomEvent('mditoastadd', {
          detail: {
            type: 'info',
            message: 'Hello World! With really long content that wraps rows.',
            key: uuid()
          }
        }))
      });
      document.getElementById('toast2').addEventListener('click', () => {
        document.body.dispatchEvent(new CustomEvent('mditoastadd', {
          detail: {
            type: 'warning',
            message: 'Hello World! Warning',
            key: uuid()
          }
        }))
      });
      document.getElementById('toast3').addEventListener('click', () => {
        document.body.dispatchEvent(new CustomEvent('mditoastadd', {
          detail: {
            type: 'error',
            message: 'Hello World! Error',
            key: uuid()
          }
        }))
      });
      const key = uuid();
      document.getElementById('toast4').addEventListener('click', () => {
        document.body.dispatchEvent(new CustomEvent('mditoastadd', {
          detail: {
            type: 'info',
            message: 'Loading...',
            loading: true,
            key: key
          }
        }))
      });
      document.getElementById('toast5').addEventListener('click', () => {
        document.body.dispatchEvent(new CustomEvent('mditoastremove', {
          detail: {
            key: key
          }
        }))
      });
  */
}