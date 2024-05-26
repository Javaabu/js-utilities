---
title: slugInput
sidebar_position: 12
---

This module enables interactive slug inputs. To use the module, import it and initialize like so.

```javascript
import { slugInput } from '@javaabu/js-utilities';

slugInput.init();
```

You can also manually bind `slugInput` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding `postLinks` on dynamic elements.

```javascript
import { slugInput } from '@javaabu/js-utilities';

slugInput.bind($('.some-element'));
```

By default, `slugInput` is designed to use [FontAwesome](https://fontawesome.com) icons for the edit and save icons. To use a different icon library, you can customise the classes used by the module like so:

```javascript
import { slugInput } from '@javaabu/js-utilities';

slugInput.config.iconPrefix = 'fa';
slugInput.config.editIcon = slugInput.config.iconPrefix + '-edit';
slugInput.config.saveIcon = slugInput.config.iconPrefix + '-check';
```

## .slug.input-group

The `.slug` element must have the following elements within it:
- `.url-prefix`: The prefix to add to the slug url. eg: http://localhost/news/
- `.url`: The anchor element where to display the final full url.
- `.cancel`: Button to cancel editing the slug.
- `.edit`: Button to trigger editing the slug.
- `input`: The slug input element. Can be a hidden element.

```html
<div class="input-group slug mb-0">
    <div class="input-group-prepend url-prefix d-none">
        <div class="input-group-text">{{ $url_prefix.'/' }}</div>
    </div>
    <a class="url form-control" target="_blank" href="{{ $actual_url }}">{{ $url }}</a>
    <x-forms::hidden :name="$name" :placeholder="__('enter-:name-here', compact('name')" :disabled="$disabled" />
    @if(empty($disabled))
    <div class="input-group-append">
        <a href="#" class="btn btn-light edit">
            <i class="zmdi zmdi-edit"></i>
        </a>
        <a href="#" title="Cancel" class="d-none btn btn-light cancel">
            <i class="zmdi zmdi-close"></i>
        </a>
    </div>
    @endif
</div>
```
