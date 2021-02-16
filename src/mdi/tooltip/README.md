# `<mdi-tooltip>`

The `mdi-tooltip` component should be placed on the top level. It then is wired to a shared event.

```typescript
import '@mdi/components/mdi/tooltip';
import MdiTooltip from '@mdi/components/mdi/tooltip';
import { addTooltip } from '@mdi/components/mdi/addTooltip';
```

```html
<mdi-icon path="..."></mdi-icon>
```

| Attributes | Tested   | Description |
| ---------- | -------- | ----------- |
| path       | &#x2705; | Set path data |


## Usage

Wire up the tooltip listener.

```javascript
@Part() $tooltip: MdiTooltip;

connectedCallback() {
  this.addEventListener('tooltip', this.handleTooltip.bind(this));
}

handleTooltip(e) {
  const { visible, rect, text, position } = e.detail;
  this.$tooltip.visible = visible;
  this.$tooltip.rect = rect;
  this.$tooltip.text = text;
  this.$tooltip.position = position;
  e.stopPropagation();
}
```

Triggering a tooltip on a part.

```javascript
import { addTooltip } from '@mdi/components/mdi/tooltip/addTooltip';

connectedCallback() {
  addTooltip(this.$partName, () => {
    return `Sponsor ${this.user.name} on GitHub`;
  });
}
```