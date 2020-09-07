# `<mdi-input-file-local>`

The `mdi-input-file-local` component allows a quick way to read uploaded files for local processing. Such as reading a JSON file or text based file. It can also take in image files.

```typescript
import '@mdi/web-components/mdi/inputLocalFile';
import MdiInputFileLocal from '@mdi/web-components/mdi/inputLocalFile';
```

```html
<mdi-input-file-local
  acceptsFileType="json,txt">
</mdi-input-file-local>
```

## Attributes

| Attributes          | Tested   | Description |
| ------------------- | -------- | ----------- |
| `accepts-file-type` | &#x2705; | Allowed files. |

## Events

| Events     | Detail |
| ---------- | ------ |
| `change`   | `{ value, name }` |

## CSS Variables

For CSS Variables please look at the `mdi-button` as all CSS styles are shared.