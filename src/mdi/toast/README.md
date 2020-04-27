# `<mdi-toast>`

The `mdi-toast` lives inside of the `mdi-body` element and listens for content.

```typescript
import '@mdi/web-components/mdiToast.js';
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
  key: 'unique',
  message: 'Hello World!',
  seconds: 3,
  loading: true
});
```

## Close Toast

Toasts that define an `key` can also be removed.

```js
removeToast(key);
```