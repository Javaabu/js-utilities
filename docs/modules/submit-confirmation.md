---
title: submitConfirmation
sidebar_position: 8
---

This module enables displaying confirmation dialogues on form submissions and button clicks. This module requires [`SweetAlert2`](https://sweetalert2.github.io/). Make sure `SweetAlert2` is included in the page using this module. To use the module, import it and initialize like so.

```javascript
import { submitConfirmation } from '@javaabu/js-utilities';

submitConfirmation.init();
```

You can also manually bind `submitConfirmation` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding `postLinks` on dynamic elements.

```javascript
import { submitConfirmation } from '@javaabu/js-utilities';

submitConfirmation.bind($('.some-element'));
```


## data-confirm

Displays a confirmation dialouge when a form submit button is clicked. This feature supports the following data attributes:

- `data-confirm`: If set to true, displays the default confirmation message. To customize the displayed message, provide the message to display.

```html
<form>
    
    <button type="submit" data-confirm="true">Submit</button>

    <button type="submit" name="action" value="approve" data-confirm="Are you sure you want to approve this?">Approve</button>
    
</form>
```

## .delete-form

Displays a confirmation dialouge when the form is submitted. The form must have an input named `action` with a value of either `delete` or `force_delete`. This class must be used on the form element.

```html
<form class="delete-form">
    <input type="hidden" name="action" value="delete" />
    
    <button type="submit">Delete</button>
</form>
```
