---
title: deletable
sidebar_position: 17
---

Allows deleting of an html element. To use the module, import it and initialize like so.

```javascript
import { deletable } from '@javaabu/js-utilities';

deletable.init();
```

You can also manually bind `deletable` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding conditionalDisplay on dynamic elements.

```javascript
import { deletable } from '@javaabu/js-utilities';

deletable.bind($('.some-element'));
```

## data-deletable

Use this data attribute on the parent element of the element that can be dynamically deletable.

## data-delete

Use this data attribute on the delete button inside the element that can be deleted. Must point to the selector of the item that can be deleted.

Below example shows both data attributes being used together.

```html
<div data-deletable="true">
    <div id="item-1">
        Item 1
        
        <button type="button" data-delete="#item-1">Delete</button>
    </div>

    <div id="item-2">
        Item 2

        <button type="button" data-delete="#item-2">Delete</button>
    </div>
</div>
```
