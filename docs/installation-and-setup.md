---
title: Installation & Setup
sidebar_position: 1.2
---

# Installation

First install the NPM package 

```bash
npm install @javaabu/js-utilities --save
```

Now you can use any of the available modules provided by the package in your JS.

```JavaScript
import { select2Custom } from '@javaabu/js-utilities';

select2Custom.init();
```

Note that many of the modules require access to DOM elements and several modules depend on jQuery.
So, make sure to load your JS in your page footer and include jQuery in your page before including any module from this package.

This package also provides some SASS styling for Bootstrap 5 for various features offered by the package. You can import the SASS like so:

```scss
@import '@javaabu/js-utilities/src/scss/bootstrap-5/variables';
@import '@javaabu/js-utilities/src/scss/bootstrap-5/animations';
@import '@javaabu/js-utilities/src/scss/bootstrap-5/flatpickr';
@import '@javaabu/js-utilities/src/scss/bootstrap-5/preloader';
@import '@javaabu/js-utilities/src/scss/bootstrap-5/select2';
@import '@javaabu/js-utilities/src/scss/bootstrap-5/sweetalert2';
```