---
title: editModal
sidebar_position: 9
---

This module includes functionality for dynamic edit modals. This module requires [`SweetAlert2`](https://sweetalert2.github.io/). Make sure `SweetAlert2` is included in the page using this module. To use the module, import it and initialize like so.

```javascript
import { editModal } from '@javaabu/js-utilities';

editModal.init();
```

You can also manually bind `editModal` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding `postLinks` on dynamic elements.

```javascript
import { editModal } from '@javaabu/js-utilities';

editModal.bind($('.some-element'));
```

For effective use of this module, you need to utilise `data-edit-modal` in conjuction with `data-save-modal` like so:

```html
<button 
        type="button"
        data-edit-modal="#edit-modal"
        data-edit-data="{
            'id': 2,
            'name': 'Arushad'
        }"
        data-modal-title="Edit Arushad"
        data-btn-text="Update Arushad"
>Edit</button>


<div id="edit-modal" class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="text" name="name">
                <ul class="invalid-feedback" id="name-error" style="display: none;"></ul>
                
                <input type="hidden" name="id">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" 
                        class="btn btn-primary" 
                        data-save-modal="/users/:id"
                        data-redirect-url="/users"
                        data-inline-errors="true"
                        data-method="PATCH"
                >Save changes</button>
            </div>
        </div>
    </div>
</div>
```

## data-edit-modal

Displays a modal to edit the given the data. This feature supports the following data attributes:

- `data-edit-modal`: (Required) The selector for the modal to open
- `data-edit-data`: (Required) JSON encoded data to edit. For each value in the data payload, the modal should have an input with that name
- `data-modal-title`: The title to display on the modal
- `data-btn-text`: The text to display on the modal save button

## data-save-modal

Saves the modal data using an Ajax request and redirects the page to the given redirect url. This feature supports the following data attributes:

- `data-save-modal`: (Required) The url to send the ajax request to. Note that this url can have an `:id` placeholder, which will get replaced with the value from the `id` input in the modal.
- `data-redirect-url`: (Required) The url to redirect the page after a successful ajax request
- `data-inline-errors`: Whether to display the errors inline inside the modal. For this to work, for each input, you must have `.invalid-feedback` ul elements with the id corresponding to the input name. For example, if the input name is `city_name`, then its error display element should have the id `city_name-error`
- `data-method`: The ajax request method. Default is `POST`