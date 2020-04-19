# `<mdi-grid>`

The `mdi-grid` component allows a standard way to render a grid of icons. Note this is setup for performance and does not reduce rendered nodes. So if 500 icons are passed the dom notes will stay for later renders.

```typescript
import '@mdi/web-component/mdiGrid.js';
```

```html
<mdi-icon></mdi-icon>
```

| Attributes | Tested   | Description |
| ---------- | -------- | ----------- |
| icons      | &#x2705; | Set icon data |

| Events     | Tested   | Description |
| ---------- | -------- | ----------- |
| select     | &#x2705; | Fired on icon selections |

The minimal data set must contain the `name` and `data` field.

```json
[{
  "name": "account",
  "data": "..."
}]
```