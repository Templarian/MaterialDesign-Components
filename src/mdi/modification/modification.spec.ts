import { selectComponent } from '@mdi/element';

import './modification';
import MdiModification from './modification';

const MDI_MODIFICATION = 'mdi-modification';

describe('mdi-modification', () => {

  beforeEach(() => {
    var c = document.createElement(MDI_MODIFICATION);
    document.body.appendChild(c);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be registered', () => {
    expect(customElements.get(MDI_MODIFICATION)).toBeDefined();
  });

  it('should only expose known props', () => {
    const { symbols } = customElements.get(MDI_MODIFICATION);
    const props = Object.keys(symbols);
    expect(props.length).toBe(3);
    expect(props).toContain('modifications');
    expect(props).toContain('edit');
    expect(props).toContain('github');
  });

});
