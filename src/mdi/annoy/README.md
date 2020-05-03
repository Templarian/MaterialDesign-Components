# `<mdi-annoy>`

The `mdi-annoy` component is the clippy of the the website. It shows annoying notifications in the corner of the page that the user has to close. This rotates on every page view using `localStorage` to track the previously show item.

```typescript
import '@mdi/web-components/mdiAnnoy.js';
```

```html
<mdi-annoy></mdi-annoy>
```

A `localStorage` variable switches between the list of items below.

- `contextMenu` - Right Click Menu
- `extension` - Chrome / Firefox Extension
- `react` - React Component
- `upgrade` - Read the upgrade guide