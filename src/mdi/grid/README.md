# `<mdi-grid>`

The `mdi-grid` component allows a standard way to render a grid of icons.

> A vast majority of code within this component handles the context menu for power users.

```typescript
import '@mdi/web-components/mdiGrid.js';
```

```html
<mdi-icon></mdi-icon>
```

| Attributes | Tested   | Description | Default |
| ---------- | -------- | ----------- | ------ |
| icons      | &#x2705; | Set icon data | `[]` |
| size       | &#x2705; | Set icon size | `24` |
| padding    | &#x2705; | Set icon padding | `8` |
| gap        | &#x2705; | Set icon gap | `4` |
| width      | &#x2705; | Set grid width | `'auto'` |
| height     | &#x2705; | Set grid height | `'auto'` |

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