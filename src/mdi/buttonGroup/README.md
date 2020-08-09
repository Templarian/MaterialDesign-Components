# `<mdi-button-group>`

The `mdi-button-group` wraps the `mdi-button` component.

```typescript
import '@mdi/web-components/mdi/buttonGroup';
import MdiButtonGroup from '@mdi/web-components/mdi/buttonGroup';
```

```html
<mdi-button-group>
  <mdi-button active>Hello</mdi-button>
  <mdi-button>World</mdi-button>
</mdi-button-group>
```

### Slots

Special styling is applied for `mdi-button`.

```html
<mdi-button-group>
  <mdi-button>
    <mdi-icon path="M...Z"></mdi-icon>
    With Icons
  </mdi-button>
</mdi-button-group>
```