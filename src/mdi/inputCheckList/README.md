# `<mdi-input-check-list>`

The `mdi-input-check-list` component is a list of checkboxes.

```typescript
import '@mdi/web-components/mdi/inputCheck';
import MdiInputCheck from '@mdi/web-components/mdi/inputCheck';
```

```html
<mdi-input-check-list></mdi-input-check-list>
```

## Attributes

| Attributes | Tested   | Description |
| ---------- | -------- | ----------- |
| value      | &#x2705; | Array of checked values. |
| options    | &#x2705; | Array of items. |

Each option object must have a `value`. Optionally a `label` and `disabled`.

## Events

| Attributes | Tested   | Description |
| ---------- | -------- | ----------- |
| change     | &#x2705; | Any change in the list checks. |

## CSS Variables

| CSS Variables       | Default   | Description |
| ------------------- | --------- | ----------- |
| `--mdi-input-check-blank-color`  | `#453C4F` | Color       |
| `--mdi-input-check-chcked-color`  | `#453C4F`  | Color       |
| `--mdi-icon-size` | `1.5rem`  | Width / Height      |