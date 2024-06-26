---
title: lang
sidebar_position: 4
---

This module provides JS localization functionality. It is designed to be used with [mariuzzo/laravel-js-localization](https://github.com/rmariuzzo/Laravel-JS-Localization). So to properlly use this module, the JS generated by `mariuzzo/laravel-js-localization` should be included in your page before this module.

## Translating a text

This module provides a `__()` function which accepts similar arguments as Laravel's builtin `__()` function.

```javascript
import { lang } from '@javaabu/js-utilities';

console.log(lang.__('Hello :name', {name: 'Arushad'}, 'dv'))
```

It might be useful to add this function to the window for convenience and backwards compatibility.

```javascript
import { lang } from '@javaabu/js-utilities';

window.__ = lang.__;
```

## Automatically setting the current locale

To automatically setting the current locale from the current page header's `lang` attribute, initialize the module.

```javascript
import { lang } from '@javaabu/js-utilities';

lang.init();
```