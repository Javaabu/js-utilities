---
title: conditionalDisplay
sidebar_position: 6
---

This module provides several data attributes that can be used to conditionally dispaly or hide inputs. To use the module, import it and initialize like so.

```javascript
import { conditionalDisplay } from '@javaabu/js-utilities';

conditionalDisplay.init();
```

You can also manually bind conditionalDisplay on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding conditionalDisplay on dynamic elements.

```javascript
import { conditionalDisplay } from '@javaabu/js-utilities';

conditionalDisplay.bind($('.some-element'));
```

:::info

The examples given here are using [`javaabu/forms`](https://github.com/Javaabu/forms) Laravel package blade components.

:::

## data-toggle-checkbox

Disables another input if a checkbox is checked. To be used on the checkbox element.

```html
<x-forms::checkbox data-toggle-checkbox="#expires_at" name="never_expires" value="1" />

<x-forms::datetime name="expires_at" />
```

## data-enable-checkbox

Enables and shows a group of inputs if a checkbox is checked. The behaviour can be inverted, (i.e disable and hide on checked) by setting `data-disable="true"`. To be used on the checkbox element.

```html
<x-forms::checkbox data-enable-checkbox="#some-fields" name="never_expires" value="1" />

<div id="some-fields">
    <x-forms::datetime name="expires_at" />
</div>
```

## data-enable-section-checkbox

Enables a group of inputs if a checkbox is checked. The behaviour can be inverted, (i.e disable on checked) by setting `data-disable="true"`. Optionally you can hide/show the inputs on checked by setting `data-hide-fields="true"`. To be used on the element to hide/show.

```html
<x-forms::checkbox name="never_expires" value="1" />

<div id="some-fields" data-enable-section-checkbox="#never_expires" data-hide-fields="true">
    <x-forms::datetime name="expires_at" />
</div>
```

## data-enable-section-value

Enables a group of inputs when another input (`data-enable-elem="<another-input-selector>"`) has a specific value. The behaviour can be inverted, (i.e disable on value selected) by setting `data-disable="true"`. Optionally you can hide/show the inputs on value selected by setting `data-hide-fields="true"`. To be used on the element to hide/show. The `data-enable-section-value` attribute can take a single value or an array of values by json encoding the array.

```html
<x-forms::select2 :options="['quiz' => __('Quiz'), 'video' => __('Video')]" name="type" />

<div 
        data-enable-section-value="quiz" 
        data-enable-elem="#type"
        data-hide-fields="true">
    <x-forms::datetime name="expires_at" />
</div>
```

## data-disable-on-select

Disables a group of inputs when a truthy value has been selected. Optionally you can hide/show the inputs on value selected by setting `data-hide-fields="true"`. To be used on the select element.

```html
<x-forms::select2 data-hide-fields="true" data-disable-on-select="#some-fields" :options="['0' => __('Show'), '1' => __('Hide')]" name="type" />

<div id="some-fields">
    <x-forms::datetime name="expires_at" />
</div>
```

## data-toggle-hide

Toggles the display of another element when a button is clicked. Note that this does not disable or enable any inputs.

```html
<x-forms::button data-toggle-hide="#some-content">Toggle Content</x-forms::button>

<div id="some-content">
    Hello there
</div>
```

## data-tg-toggle

Toggles the display of another element when a button is clicked by setting a `.toggled` class and toggles the icon of the button. Note that this does not disable or enable any inputs. You can change the edit icon class by using the `data-tg-icon` attribute.

```html
<div id="some-content">
    <x-forms::button data-tg-toggle="#some-content" class="fa fa-edit"></x-forms::button>

    <div id="some-content">
        Hello there
    </div>
</div>
```

By default, this utility uses [FontAwesome](https://fontawesome.com). To use a different icon library you can customise the module config like so:

```javascript
import { conditionalDisplay } from '@javaabu/js-utilities';

conditionalDisplay.config.iconPrefix = 'fa';
conditionalDisplay.config.editIcon = conditionalDisplay.config.iconPrefix + '-edit';
conditionalDisplay.config.closeIcon = conditionalDisplay.config.iconPrefix + '-close';
```

## data-input-toggle

This is similar to `data-tg-toggle`, but instead of toggling the display, this will disable/enable an input.

```html
<x-forms::button data-input-toggle="#expires_at">
    <i class="fa fa-edit"></i>
</x-forms::button>

<x-forms::datetime name="expires_at" />
```