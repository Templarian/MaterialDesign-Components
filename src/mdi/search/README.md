# `<mdi-search>`

The `mdi-search` component allows a standard way to search all content on the site.

- Search Guides
- Search General Pages
- Search Icons by Name

```typescript
import '@mdi/components/mdiSearch.js';
```

```html
<mdi-search></mdi-search>
```

| Attribute | Required | Description |
| --------- | -------- | ----------- |
| icons     | Required | Pass in icon array. |
| items     | -        | Pass in other items. |

| Events     | Tested   | Description |
| ---------- | -------- | ----------- |
| onsearch   |          | Called on enter key. |

## Schemas

### Icons

```json
[
  {
    "id": "uuid1",
    "name": "account",
    "aliases": [
      {
        "name": "user"
      }
    ]
  }
]
```

### Items

```json
[
  {
    "name": "Web Component",
    "url": "/getting-started/web-component",
    "type": "Documentation"
  }
]
```

## Accessibility

- Keyboard Navigation with Up/Down
- Focus States