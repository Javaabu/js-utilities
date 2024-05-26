---
title: urlInput
sidebar_position: 14
---

Automatically prefixes `http://` or `https://` to url inputs on key up. To use the module, import it and initialize like so.

```javascript
import { urlInput } from '@javaabu/js-utilities';

urlInput.init();
```

You can also manually bind `urlInput` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding conditionalDisplay on dynamic elements.

```javascript
import { urlInput } from '@javaabu/js-utilities';

urlInput.bind($('.some-element'));
```

After initializing this module, whenever a user types into a url input, it would automatically prefix the protocol to the url. 

```html
<input type="url" name="link">
```
