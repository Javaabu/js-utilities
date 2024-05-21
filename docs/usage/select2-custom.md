---
title: select2Custom
sidebar_position: 2
---

This module provides Javaabu's custom [Select2](https://select2.org/) functionality through data attributes. This module requires [Select2](https://select2.org/) to be available on the page.

To use the module, import it and initialize like so.

```javascript
import { select2Custom } from '@javaabu/js-utilities';

select2Custom.init();
```

You can also manually bind select2Custom on an arbitary element using the `bind()` method. The argument to the `bind()` method must be a jQuery object. This can be useful for binding select2Custom on dynamic elements.

```javascript
import { select2Custom } from '@javaabu/js-utilities';

select2Custom.bind($('.some-element'));
```
