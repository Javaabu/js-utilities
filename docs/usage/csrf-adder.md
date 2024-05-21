---
title: csrfAdder
sidebar_position: 1
---

This module automatically adds the `X-CSRF-Token` header to outgoing ajax requests. This module assumes that you have the `csrf-token` meta tag in your page's head. The CSRF Token is added only to requests going to the same domain as the current one.

To use the module, import it and initialize like so.

```javascript
import { csrfAdder } from '@javaabu/js-utilities';

csrfAdder.init();
```
