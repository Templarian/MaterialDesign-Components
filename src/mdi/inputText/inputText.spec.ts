import { selectComponent } from '@mdi/element';

import './inputText';
import MdiInputText from './inputText';

const MDI_INPUT_TEXT = 'mdi-input-text';

describe('mdi-input-text', () => {

  beforeEach(() => {
    var c = document.createElement(MDI_INPUT_TEXT);
    document.body.appendChild(c);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be registered', () => {
    expect(customElements.get(MDI_INPUT_TEXT)).toBeDefined();
  });

  it('should only expose known props', () => {
    const { symbols } = customElements.get(MDI_INPUT_TEXT);
    const props = Object.keys(symbols);
    expect(props.length).toBe(2);
    expect(props).toContain('name');
    expect(props).toContain('value');
  });

  it('should default value to empty', () => {
    const component = selectComponent<MdiInputText>(MDI_INPUT_TEXT);
    const { $input } = component;
    expect($input.value).toEqual('');
  });

  it('should set value to "Hello World!"', () => {
    const component = selectComponent<MdiInputText>(MDI_INPUT_TEXT);
    component.value = 'Hello World!';
    const { $input } = component;
    expect($input.value).toEqual('Hello World!');
  });

});
