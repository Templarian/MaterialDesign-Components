import { selectComponent } from '@mdi/element';

import './markdown';
import MdiMarkdown from './markdown';

const MDI_MARKDOWN = 'mdi-markdown';

describe('mdi-markdown', () => {

  beforeEach(() => {
    var c = document.createElement(MDI_MARKDOWN);
    document.body.appendChild(c);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be registered', () => {
    expect(customElements.get(MDI_MARKDOWN)).toBeDefined();
  });

  it('should only expose known props', () => {
    const { symbols } = customElements.get(MDI_MARKDOWN);
    const props = Object.keys(symbols);
    expect(props.length).toBe(2);
    expect(props).toContain('text');
    expect(props).toContain('replace');
  });

  it('should be empty', () => {
    var component = selectComponent<MdiMarkdown>(MDI_MARKDOWN);
    var {
      $content
    } = component;
    expect($content.innerHTML).toEqual('');
  });

  it('should markdown text input', async () => {
    var component = selectComponent<MdiMarkdown>(MDI_MARKDOWN);
    component.text = '# Hello';
    var {
      $content
    } = component;
    const result = $content.innerHTML.trim(); // '<h1>Hello</h1> '
    expect(result).toEqual('<h1>Hello</h1>');
  });

  it('should transform markdown text input', async () => {
    var component = selectComponent<MdiMarkdown>(MDI_MARKDOWN);
    component.replace = [{
      find: new RegExp('<h1>([^<]*)</h1>', 'g'),
      replace: (m, header) => {
        return `<h1 class="header">${header}</h1>`;
      }
    }]
    component.text = '# Hello';
    var {
      $content
    } = component;
    const result = $content.innerHTML.trim(); // '<h1 class="header">Hello</h1> '
    expect(result).toEqual('<h1 class="header">Hello</h1>');
  });

});
