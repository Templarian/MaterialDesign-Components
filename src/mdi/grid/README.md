# `<mdi-grid>`

The `mdi-grid` component allows a standard way to render a configurable grid of icons.

> Note: Context menus and tooltips can be triggered with events described below. These are outside of the component so they can be rendered elsewhere in the DOM.

```typescript
import '@mdi/web-components/mdiGrid.js';
import MdiGrid from '@mdi/web-components/mdiGrid.js';
```

```html
<mdi-grid></mdi-grid>
```

## Attributes

| Attributes | Tested   | Description | Default |
| ---------- | -------- | ----------- | ------ |
| icons      |          | Set icon data | `[]` |
| size       |          | Set icon size | `24` |
| padding    |          | Set icon padding | `8` |
| gap        |          | Set icon gap | `4` |
| width      |          | Set grid width | `'auto'` |
| height     |          | Set grid height | `'auto'` |

### `icons`

The minimal data set must contain the `name` and `data` field.

```json
[{
  "id": "uuid",
  "name": "account",
  "data": "..."
}]
```

## Events

| Events     | Tested   | Description |
| ---------- | -------- | ----------- |
| select     |          | Fired on icon selections |
| openmenu   |          | Right click on icon |
| closemenu  |          | Right click on icon |
| entericon  |          | Keyboard / Mouse on icon |
| leaveicon  |          | Keyboard / Mouse off icon |

### All Events

The `x` and `y` properties are the calculated `top` and `left` in pixels relative to the grid. The `width` and `height` include the `padding`.

```javascript
interface MouseMeta {
  gridX: number,
  gridY: number,
  x: number,
  y: number,
  width: number,
  height: number,
  column: number,
  row: number,
  index: number,
  gap: number,
  extra: number
}

e = {
  detail: MouseMeta
}
```