---
title: fileUploadInput
sidebar_position: 10
---

This module includes functionality for ajax upload and deletion for file inputs. This module is best used with [`jasny-bootstrap`](https://www.jasny.net/bootstrap) [`fileinput.js`](https://www.jasny.net/bootstrap/components/#fileinput) script. To use this module, import and initialize it.
This module requires [`SweetAlert2`](https://sweetalert2.github.io/) and [`bootstrap-notify`](https://github.com/mouse0270/bootstrap-notify).

```javascript
import { fileUploadInput } from '@javaabu/js-utilities';

fileUploadInput.init();
```

You can also manually bind `fileUploadInput` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding `postLinks` on dynamic elements.

```javascript
import { fileUploadInput } from '@javaabu/js-utilities';

fileUploadInput.bind($('.some-element'));
```

## data-provides="fileinput-upload"

Enables ajax upload of files for file inputs. Must be used inside a form element. Should have a file input, `.btn-file`, `.upload-btn` and a `data-dismiss="fileinput"` inside the element. This feature supports the following data attributes:

- `data-max-file-size`: The maximum file size allowed in KB. Defaults to 2 MB.

```html
<x-forms::form files>
    <div class="fileinput fileinput-new" data-provides="fileinput-upload" data-max-file-size="1024">
        <div>
        <span class="btn btn-info btn-file mb-1 ">
            <span class="upload-btn btn--icon-text">
                <i class="zmdi zmdi-upload"></i>&nbsp;
                Upload File
            </span>
            <input type="file" name="registry" accept="text/plain" />
        </span>
            <a href="#" class="mb-1 btn btn-danger fileinput-exists btn--icon-text" data-dismiss="fileinput">
                <i class="zmdi zmdi-close"></i> Remove
            </a>
        </div>
    </div>
</x-forms::form>
```

