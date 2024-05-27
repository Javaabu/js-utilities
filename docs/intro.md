---
title: Introduction
sidebar_position: 1.0
---

# JS Utilities

[JS Utilities](https://github.com/Javaabu/js-utilities) provides helpful JavaScript functionalities that you can use in your Laravel app.

This package provides multiple features in the forms of separate ES6 modules which can be imported as needed.
For example, to automatically add the `X-CSRF-Token` header to outgoing ajax requests, you can import the `csrfAdder` module and initialize it.

```javascript
import { csrfAdder } from '@javaabu/js-utilities';

csrfAdder.init();
```