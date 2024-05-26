---
title: contentSearch
sidebar_position: 13
---

This module provides several data attributes that can be used to search content on the page. To use the module, import it and initialize like so.

```javascript
import { contentSearch } from '@javaabu/js-utilities';

contentSearch.init();
```

You can also manually bind `contentSearch` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding conditionalDisplay on dynamic elements.

```javascript
import { contentSearch } from '@javaabu/js-utilities';

contentSearch.bind($('.some-element'));
```

## data-filter-links

Filters list items matching the typed search query. Must be used on the search input. This feature accepts the following data attributes:
- `data-filter-links`: (Required) The selector pointing to which elements to search.
- `data-search-elem`: Which elements to search from within the element to search. Defaults to ` li`.

```html
<input type="text" data-filter-links="#some-items" data-search-elemt=" li">

<ul id="some-items">
    <li>
        <a href="#">Apple</a>
    </li>
    <li>
        <a href="#">Orange</a>
    </li>
</ul>
```

## data-filter-checkboxes

Filters checkboxes matching the typed search query. Must be used on the search input. This feature accepts the following data attributes:
- `data-filter-checkboxes`: (Required) The selector pointing to which elements to search.
- `data-search-elem`: Which elements to search from within the element to search. Defaults to ` > .checkbox`.

```html
<input type="text" data-filter-links="#some-items" data-search-elemt=" li">

<div id="some-items">
    <div class="checkbox">
        <label>
            <input type="checkbox" name="fruits[]" value="apple">
            Apple
        </label>
    </div>
    
    <div class="checkbox">
        <label>
            <input type="checkbox" name="fruits[]" value="orange">
            Orange
        </label>
    </div>
</div>
```

