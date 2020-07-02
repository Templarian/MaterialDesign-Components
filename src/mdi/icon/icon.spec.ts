import { selectComponent } from '@mdi/element';

import './icon';
import MdiIcon from './icon';

const MDI_ICON = 'mdi-icon';
const ICON = 'M12,4C14.21,4 16,5.79 16,8C16,10.21 14.21,12 12,12C9.79,12 8,10.21 8,8C8,5.79 9.79,4 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z';
const DEFAULT_ICON = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

describe('mdi-icon', () => {

  beforeEach(() => {
    var c = document.createElement(MDI_ICON);
    document.body.appendChild(c);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be registered', () => {
    expect(customElements.get(MDI_ICON)).toBeDefined();
  });

  it('should only expose known props', () => {
    const { symbols } = customElements.get(MDI_ICON);
    const props = Object.keys(symbols);
    expect(props.length).toBe(1);
    expect(props).toContain('path');
  });

  it('should default path value', () => {
    var component = selectComponent<MdiIcon>(MDI_ICON);
    var { $path } = component;
    expect($path.getAttribute('d')).toEqual(DEFAULT_ICON);
  });

  it('path should be set', async () => {
    var component = selectComponent<MdiIcon>(MDI_ICON);
    var { $path } = component;
    await component.setAttribute('path', ICON);
    expect($path.getAttribute('d')).toEqual(ICON);
  });

});
