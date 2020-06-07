# `<mdi-search>`

The `mdi-search` component allows a standard way to search all content on the site.

- Search Guides
- Search General Pages
- Search Icons by Name

```typescript
import '@mdi/web-components/mdiSearch.js';
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

## Icons

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

## Accessibility

- Keyboard Navigation with Up/Down
- Focus States