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