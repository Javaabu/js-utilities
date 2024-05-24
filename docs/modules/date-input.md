---
title: dateInput
sidebar_position: 11
---

This module enables date and time pickers. This module requires [`flatpickr`](https://flatpickr.js.org/). Make sure `flatpickr` is included in the page using this module. To use the module, import it and initialize like so.

```javascript
import { dateInput } from '@javaabu/js-utilities';

dateInput.init();
```

You can also manually bind `dateInput` on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding `postLinks` on dynamic elements.

```javascript
import { dateInput } from '@javaabu/js-utilities';

dateInput.bind($('.some-element'));
```

By default, `dateInput` are designed to use [FontAwesome](https://fontawesome.com) icons for the datepicker navigation icons. To use a different icon library, you can customise the classes used by the module like so:

```javascript
import { dateInput } from '@javaabu/js-utilities';

dateInput.config.iconPrefix = 'fa';
dateInput.config.nextArrowIcon = dateInput.config.iconPrefix + '-chevron-right';
dateInput.config.prevArrowIcon = dateInput.config.iconPrefix + '-chevron-left';
```

## .datetime-picker

Adds a date time picker to the given element.

```html
<input type="datetime" name="expires_at" class="datetime-picker" />
```

## .date-picker

Adds a date picker to the given element.

```html
<input type="date" name="expires_at" class="date-picker" />
```

## .time-picker

Adds a time picker to the given element.

```html
<input type="time" name="expires_at" class="time-picker" />
```

## data-date-clear

Clears the given date input's value on click.

```html
<input id="expires_at" type="datetime" name="expires_at" class="datetime-picker" />

<button type="button" data-date-clear="#expires_at">Clear Date</button>

```