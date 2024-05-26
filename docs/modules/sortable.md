---
title: sortable
sidebar_position: 18
---

Provides functionality for sorting elements. To use the module, import it and initialize like so.

```javascript
import { sortable } from '@javaabu/js-utilities';

sortable.init();
```

You can also manually bind `sortable` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding conditionalDisplay on dynamic elements.

```javascript
import { sortable } from '@javaabu/js-utilities';

sortable.bind($('.some-element'));
```

## .sortable

Use this class to make the child html elements sortable. Requires [`jQuery-UI Sortable`](https://jqueryui.com/sortable/).
Optionally add `data-sort-url` to specify a url to make a PUT ajax call each time an element is moved. When using `data-sort-url` each element must have an `id` in the form `<model-name>_<id>`. For example, if the ids are in the format `users_2`, then the data submitted by ajax would be a `users` array of ids in their sorted order.

```html
<div class="sortable" data-sort-url="/users">
    <div id="users-1">
        User 1
    </div>

    <div id="users-2">
        User 2
    </div>
</div>
```

## data-form-sortable

This data attribute is used for triggering table sorting when a table heading is clicked. `data-form-sortable` must point to the filter form and the table column heading must `data-sort-field` which is the name of the field to sort. The filter form must have `orderby` and `order` inputs which can be hidden.

```html
<form id="filters">
    <input type="text" name="search" placeholder="Search.." />

    <input type="hidden" name="orderby" value="title" />
    <input type="hidden" name="order" value="ASC" />
</form>

<table data-form-sortable="#filters">
    <thead>
        <tr>
            <th data-sort-field="title" class="sorting_asc">Title</th>
            <th data-sort-field="created_at" class="sorting">Created At</th>
        </tr>
    </thead>
    <tbody>
        ...
    </tbody>
</table>
```
