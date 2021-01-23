# `<mdi-toast>`

The `mdi-toasts` will create instances of `mdi-toast`.

```typescript
import '@mdi/components/mdiToast.js';
```

```html
<mdi-toasts></mdi-toasts>
```

## Open Toast

All of these functions will return the unique key used to track them. Note by default toasts disappear after `3` seconds. Setting `0` seconds will keep the toast opened indefinitely.

```js
import { addToast, addInfoToast } from '@mdi/web-component';
// Info
addInfoToast(message, seconds = 3);
addInfoToast('Hello World!');
// Generic
const key = addToast({
  message: 'Hello World!',
  seconds: 10,
  loading: true
});
// removeToast(key)
```

## Close or Remove Toast

Toasts that define an `key` can also be removed.

```js
removeToast(key);
```