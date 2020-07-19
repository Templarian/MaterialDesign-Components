import { selectComponent } from '@mdi/element';

import './buttonGroup';
import MdiButtonGroup from './buttonGroup';

const MDI_BUTTON_GROUP = 'mdi-button-group';

describe('mdi-button-group', () => {

  beforeEach(() => {
    var c = document.createElement(MDI_BUTTON_GROUP);
    document.body.appendChild(c);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be registered', () => {
    expect(customElements.get(MDI_BUTTON_GROUP)).toBeDefined();
  });

  it('should only expose known props', () => {
    const { symbols } = customElements.get(MDI_BUTTON_GROUP);
    const props = Object.keys(symbols);
    expect(props.length).toBe(0);
  });

});
