---
title: postLinks
sidebar_position: 7
---

This module provides on click ajax post functionalities for buttons and links. This module requires [`SweetAlert2`](https://sweetalert2.github.io/). Make sure `SweetAlert2` is included in the page using this module. To use the module, import it and initialize like so.

```javascript
import { postLinks } from '@javaabu/js-utilities';

postLinks.init();
```

You can also manually bind `postLinks` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding `postLinks` on dynamic elements.

```javascript
import { postLinks } from '@javaabu/js-utilities';

postLinks.bind($('.some-element'));
```


## data-post-url

Performs an ajax request when the element is clicked and redirects the page to the given redirect url. This feature supports the following data attributes:

- `data-post-url`: (Required) The url to send the ajax request to
- `data-redirect-url`: (Required) The url to redirect the page after a successful ajax request
- `data-params`: JSON encoded data to send with the ajax request
- `data-method`: The ajax request method. Default is `POST`
- `data-delete`: Whether this is a delete request. If this is set to true, then a confirmation dialouge will be shown before sending the ajax request.

```html
<a href="#"
    data-post-url="/users/1"
    data-redirect-url="/users"
    data-params="{'status': 'approved'}"
    data-delete="false"
    data-method="PATCH">Approve</a>
```

## .delete-link

Performs an ajax DELETE request to the given request url when the element is clicked and redirects the page to the given redirect url. This feature supports the following data attributes:

- `data-request-url`: (Required) The url to send the DELETE request to
- `data-redirect-url`: (Required) The url to redirect the page after a successful ajax request

```html
<a href="#"
    class="delete-link"
    data-request-url="/users/1"
    data-redirect-url="/users"
    >Delete</a>
```