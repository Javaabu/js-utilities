---
title: editSelected
sidebar_position: 19
---

Allows dynamically linking to an item selected from a select. To use the module, import it and initialize like so.

```javascript
import { editSelected } from '@javaabu/js-utilities';

editSelected.init();
```

You can also manually bind `editSelected` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding conditionalDisplay on dynamic elements.

```javascript
import { editSelected } from '@javaabu/js-utilities';

editSelected.bind($('.some-element'));
```

## data-edit-selected

This feature uses these data attributes. The data attributes must be used on an `a` tag:
- `data-edit-selected`: (Required) Points to the select input selector.
- `data-selected-url`: (Required) Provides the url to dynamically link to. Can have a `:id` placeholder that will get replaced with the value of the select.

```html
<x-forms:select :options="App\Models\User::query()" name="user" id="user" />

<a href="#" data-edit-selected="#user" data-edit-selected-url="/users/edit/:id" >
    View User
</a>
```