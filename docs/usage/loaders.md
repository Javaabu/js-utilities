---
title: loaders
sidebar_position: 3
---

This module provides loading animation functionality for different elements.

## Trigerring a loading animation on a button

```javascript
import { loaders } from '@javaabu/js-utilities';

// start loading animation
loaders.toggleLoading($('#some-button'), true);

// stop loading animation
loaders.toggleLoading($('#some-button'), false);
```

You can customise the classes and elements used by the module like so:

```javascript
import { loaders } from '@javaabu/js-utilities';

loaders.iconPrefix = 'fa';
loaders.loadingClass = 'loading';
loaders.loadingTag = 'i';
loaders.loaderIcon = loaders.iconPrefix + '-loader';
loaders.loaderAnimation = loaders.iconPrefix + '-spin';
loaders.loadingElem = `<i class="${loaders.iconPrefix} ${loaders.loaderIcon} ${loaders.loaderAnimation} added-loader ${loaders.loadingClass} me-2"> `;
```

## Trigerring a page preloader

```javascript
import { loaders } from '@javaabu/js-utilities';

// start loading animation
loaders.togglePreloader(true);

// stop loading animation
loaders.togglePreloader(false);
```

You can customise the page preloader class like so:

```javascript
import { loaders } from '@javaabu/js-utilities';

loaders.preloaderClass = 'page-loading';
```

## Making the loader functions globally available

For backwards compatibility or convenience, you may want the loader functions to be available globally. For this you can add the required functions to the `window` object.

```javascript
import { loaders } from '@javaabu/js-utilities';

window.togglePreloader = loaders.togglePreloader;
window.togglePreloader = loaders.togglePreloader;
```

## Animate on submit

This module provides a handy css class `animate-submit` that can be used on submit buttons to trigger an animation on form submission. To use this functionality, you need to initialize the module.

```javascript
import { loaders } from '@javaabu/js-utilities';

loaders.init();
```

Now you can use the `animate-submit` class on form submit buttons. The animation will not be triggered if the native html form validation fails.

```html
<form>
    <input type="text" name="name">
    
    <button type="submit" class="animate-submit">Submit</button>
</form>
```