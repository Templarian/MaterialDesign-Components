# `MdiOverlay`

The `MdiOverlay` class provides a way to create an element on the body element. Elements that should be attached at the body root should extend `MdiOverlay`.


## Example Modal

```typescript
import { Component, Prop } from '@mdi/element';
import MdiOverlay from '@mdi/components/mdiOverlay';

import template from './modal.html';
import style from './modal.css';

@Component({
  selector: 'mdi-modal',
  template,
  style
})
export default class MdiModal extends MdiOverlay {
  // This will render attached to the body. To close call
  // this.close(result);

  @Prop() foo: string = 'Default';
}
```

While this component can be inlined still it will mostly be opened via the a static open method which will create an instance and attach it to the `<body>` tag.

```typescript
import MdiModal from './../modal/modal';

const result = await MdiModal.open({
  foo: 'bar'
});
console.log(result);
```