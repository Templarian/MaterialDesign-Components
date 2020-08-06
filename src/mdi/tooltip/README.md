# `<mdi-tooltip>`

The `mdi-tooltip` component should be placed on the top level. It then is wired to a shared event.

```typescript
import '@mdi/web-components/mdi/tooltip';
import MdiTooltip from '@mdi/web-components/mdi/tooltip';
import { addTooltip } from '@mdi/web-components/mdi/addTooltip';
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
  var { visible, rect, text } = e.detail;
  this.$tooltip.visible = visible;
  this.$tooltip.rect = rect;
  this.$tooltip.text = text;
}
```

Triggering a tooltip on a part.

```javascript
import { addTooltip } from '@mdi/web-components/mdi/tooltip/addTooltip';

connectedCallback() {
  addTooltip(this.$partName, () => {
    return `Sponsor ${this.user.name} on GitHub`;
  });
}
```