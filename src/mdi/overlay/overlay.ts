import { Component, Prop, Part } from '@mdi/element';

function camelToDash(str: string): string {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

const layers: any[] = [];
const promises: any[] = [];

// Update to support passing no object for a base class
@Component({
  selector: 'mdi-overlay',
  template: '-'
})
export default class MdiOverlay extends HTMLElement {
  static open(props: any = {}): Promise<any> {
    var ele = document.createElement(camelToDash(this.name));
    Object.assign(ele, props);
    document.body.appendChild(ele);
    layers.push(ele);
    return new Promise((resolve) => {
      promises.push(resolve);
    });
  }

  close(result?: any) {
    layers.pop().remove();
    promises.pop()(result);
  }
}