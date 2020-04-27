# `<mdi-toast>`

The `mdi-toast` lives inside of the `mdi-body` element and listens for content.

```typescript
import '@mdi/web-component/mdiToast.js';
```

```html
<mdi-toast></mdi-toast>
```

## Open Toast

```js
// Info
addInfoToast(message, seconds = 3);
addInfoToast('Hello World!');
// Generic
addToast({
  id: 'unique',
  message: 'Hello World!',
  seconds: 3,
  loading: true
});
```

## Close Toast

Toasts that define an `id` can also be removed.

```js
removeToast(id);
```