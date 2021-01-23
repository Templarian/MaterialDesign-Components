# `MdiModalAlert`

The `MdiModalAlert` creates a alert box above everything.

```typescript
import MdiModalAlert from '@mdi/components/mdiModalAlert';
```

```typescript
const result = await MdiModalAlert.open({
  header: 'Delete Item',
  message: 'Are you sure you want to delete the item?'
});
if (result) {
  console.log('Item has been deleted.');
}
```
