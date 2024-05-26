---
title: codeInput
sidebar_position: 16
---

Enables tab input in textareas for code input. To use the module, import it and initialize like so.

```javascript
import { codeInput } from '@javaabu/js-utilities';

codeInput.init();
```

## .code-text

When you use `code-text` class on `textarea` inputs, it will input tabs instead of tabbing to the next input when the tab key is pressed when typing into the textarea. 

```html
<textarea name="analytics_script" class="code-text">
</textarea>
```
