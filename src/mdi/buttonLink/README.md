# `<mdi-button>`

The `mdi-button-link` component is essentially just a styled anchor, but it also allows special rendering for `mdi-button-group` and `mdi-icon`.

```typescript
import '@mdi/components/mdi/buttonLink';
import MdiButtonLink from '@mdi/components/mdi/buttonLink';
```

```html
<mdi-button-link>Click Me!</mdi-button-link>
```

| Slots       | Tested   | Description |
| ----------- | -------- | ----------- |
| default     | &#x2705; | Button contents. |

| Attribute  | Tested   | Description |
| ---------- | -------- | ----------- |
| block      |          | block sizing |
| active     |          | Depressed visual state. |
| start      |          | Internal Only |
| end        |          | Internal Only |
| center     |          | Internal Only |

| Events     | Tested   | Description |
| ---------- | -------- | ----------- |
| click      | &#x2705; | Standard click. |

| CSS Variables       | Default   | Description |
| ------------------- | --------- | ----------- |
| `--mdi-button-color` | `#453C4F` | Text color       |
| `--mdi-button-background-color` | `#fff` | Background color       |
| `--mdi-button-border-color` | `#453C4F`  | Border color       |
| `--mdi-button-hover-color` | `#fff`  | `:hover` Text color      |
| `--mdi-button-hover-background-color` | `#453C4F`  | `:hover` Background color      |
| `--mdi-button-hover-border-color` | `#453C4F`  | `:hover` Border color      |
| `--mdi-button-active-color` | `#fff`  | `active` Text color      |
| `--mdi-button-active-background-color` | `#453C4F`  | `active` Background color      |
| `--mdi-button-active-border-color` | `#453C4F`  | `active` Border color      |

### Slots

Special styling is applied for `mdi-icon`.

```html
<mdi-button-link>
  <mdi-icon path="M...Z"></mdi-icon>
  Hello!
</mdi-button-link>
```