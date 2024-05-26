---
title: selectAllCheckbox
sidebar_position: 15
---

Used for selecting multiple checkboxes using a single checkbox. To use the module, import it and initialize like so.

```javascript
import { selectAllCheckbox } from '@javaabu/js-utilities';

selectAllCheckbox.init();
```

You can also manually bind `selectAllCheckbox` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding conditionalDisplay on dynamic elements.

```javascript
import { selectAllCheckbox } from '@javaabu/js-utilities';

selectAllCheckbox.bind($('.some-element'));
```

## data-all

This data atrribute must be used on the select all checkbox. Specifies which checkboxes it can control. 

## data-check

This data atrribute must be used on the checkboxes that are controlled by `data-all`. Both `data-all` and `data-check` must have the same value.

```html
<label>
    <input type="checkbox" data-all="users" name="select_all_users" value="1">
    Select All Users
</label>

<label>
    <input type="checkbox" data-check="users" name="users[]" value="95">
    John
</label>

<label>
    <input type="checkbox" data-check="users" name="users[]" value="94">
    Doe
</label>
```
