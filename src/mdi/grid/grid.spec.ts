import { selectComponent } from '@mdi/element';

import './grid';
import MdiGrid from './grid';

const MDI_GRID = 'mdi-grid';

(window as any).ResizeObserver = class {
  constructor(callback) { }
  observe(ele) { }
};

describe('mdi-grid', () => {

  beforeEach(() => {
    var c = document.createElement(MDI_GRID);
    document.body.appendChild(c);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be registered', () => {
    expect(customElements.get(MDI_GRID)).toBeDefined();
  });

  it('should only expose known props', () => {
    const { symbols } = customElements.get(MDI_GRID);
    const props = Object.keys(symbols);
    expect(props.length).toBe(6);
    expect(props).toContain('icons');
    expect(props).toContain('size');
    expect(props).toContain('padding');
    expect(props).toContain('gap');
    expect(props).toContain('width');
    expect(props).toContain('height');
  });

  it('should be empty', () => {
    const component = selectComponent<MdiGrid>(MDI_GRID);
    const {
      $grid
    } = component;
    expect($grid.innerHTML).toEqual('');
  });


});
