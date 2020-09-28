import { selectComponent } from '@mdi/element';

import './cardUser';
import MdiCardUser from './cardUser';

const MDI_CARD_USER = 'mdi-card-user';

describe('mdi-card-user', () => {

  beforeEach(() => {
    var c = document.createElement(MDI_CARD_USER);
    document.body.appendChild(c);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be registered', () => {
    expect(customElements.get(MDI_CARD_USER)).toBeDefined();
  });

  it('should only expose known props', () => {
    const { symbols } = customElements.get(MDI_CARD_USER);
    const props = Object.keys(symbols);
    expect(props.length).toBe(1);
    expect(props).toContain('user');
  });

  /*
  it('should default path value', () => {
    const component = selectComponent<MdiIcon>(MDI_CARD_USER);
    const { $path } = component;
    expect($path.getAttribute('d')).toEqual(DEFAULT_ICON);
  });

  it('path should be set', async () => {
    const component = selectComponent<MdiIcon>(MDI_CARD_USER);
    const { $path } = component;
    await component.setAttribute('path', ICON);
    expect($path.getAttribute('d')).toEqual(ICON);
  });
  */

});
