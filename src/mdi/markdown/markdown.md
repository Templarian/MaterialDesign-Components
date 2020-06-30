# `<mdi-markdown>`

The `mdi-markdown` component allows a standard way to render markdown files and apply customizations.

```typescript
import '@mdi/web-components/mdi/markdown';
import MdiMarkdown, {
  MarkdownReplace
} from '@mdi/web-components/mdi/markdown';
```

```html
<mdi-markdown text="# Hello World"></mdi-markdown>
```

## Attributes

| Attributes | Tested   | Description |
| ---------- | -------- | ----------- |
| text       | &#x2705; | Set path data |
| replace    | &#x2705; | Apply transforms |

### `text`

The `text` can be any valid markdown. This also bakes in rich code highlighting from the PrismJS library.

Only the languages listed below have been imported to reduce file size:

- `html`, `xml`
- `css`, `sass`, `scss`
- `javascript` / `typescript` / `jsx` / `tsx`
- `java`
- `yaml`
- `php`
- `php`

### `replace`

For customizing after a render it is helpful to regex replace some content then perform additional event binding.

An example that uses `find`, `replace`, and `render` is handling anchors in the shadow DOM.

```typescript
const mdiLinkVariant = 'M...Z';

component.replace = [{
    find: new RegExp('<(h[2-6])>([^<]+)</h[2-6]>', 'g'),
    replace: (m1, m2, m3) => {
      let id = m3.toLowerCase().replace(/ /g, '-').replace(/\//, '');
      return `<${m2} data-id="${id}">
                ${m3}
                <a href="${this.url}#${id}" style="display:inline-block;vertical-align:middle;">
                  <svg viewBox="0 0 24 24" style="width:18px;height:18px;">
                    <path d="${mdiLinkVariant}" fill="#999" />
                  </svg>
                </a>
              </${m2}>`;
    },
    render: (template) {
      // On page load if match scroll to
    }
  }]
  ```