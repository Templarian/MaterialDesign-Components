# `<mdi-button-toggle>`

The `mdi-button-toggle` component is essentially just a button with swappable slotted content. Commonly used with icons, but using `span` elements will allow assigning text content.

```typescript
import '@mdi/web-components/mdi/buttonToggle';
import MdiButtonToggle from '@mdi/web-components/mdi/buttonToggle';
```

```html
<mdi-button-toggle>
  <mdi-icon slot="active" path="M...Z"></mdi-icon>
  <mdi-icon slot="inactive" path="M...Z"></mdi-icon>
</mdi-button-toggle>
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
<mdi-button-toggle>
  <mdi-icon slot="active" path="M...Z"></mdi-icon>
  <mdi-icon slot="inactive" path="M...Z"></mdi-icon>
</mdi-button-toggle>
```