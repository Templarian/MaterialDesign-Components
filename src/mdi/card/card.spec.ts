import { selectComponent } from '@mdi/element';

import './card';
import MdiCard from './card';

const MDI_CARD = 'mdi-card';

describe('mdi-card', () => {

  beforeEach(() => {
    var c = document.createElement(MDI_CARD);
    document.body.appendChild(c);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be registered', () => {
    expect(customElements.get(MDI_CARD)).toBeDefined();
  });

  it('should only expose known props', () => {
    const { symbols } = customElements.get(MDI_CARD);
    const props = Object.keys(symbols);
    expect(props.length).toBe(0);
  });

});
