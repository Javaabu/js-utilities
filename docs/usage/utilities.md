---
title: utilities
sidebar_position: 3
---

This module provides several JS utility functions that other modules use. It might be useful to add these function to the window for convenience and backwards compatibility.

```javascript
import { utilities } from '@javaabu/js-utilities';

window.restrictCharacters = utilities.restrictCharacters;
window.slugify = utilities.slugify;
window.removeFromHead = utilities.removeFromHead;
window.randString = utilities.randString;
window.titleCase = utilities.titleCase;
window.redirectPage = utilities.redirectPage;
window.getJsonFormData = utilities.getJsonFormData;
window.setTooltip = utilities.setTooltip;
window.hideTooltip = utilities.hideTooltip;
```

## randString

Generates a random string of given length consisting of uppercase and lowercase alphanumeric characters.  

For example to generate a 10 character long random string:

```html
<script type="text/javascript">
    console.log(randString(10));
</script>
```

Results in the following console output

```html
'IpaUH2sKb9'
```

## redirectPage

Redirects the current page to the given URL. If no URL is provided reloads the page.

For example to redirect the current page to Google:

```html
<script type="text/javascript">
    redirectPage('https://google.com')
</script>
```

## removeFromHead

Removes a substring from the beginning of another string.

For example:

```html
<script type="text/javascript">
    console.log(removeFromHead('https://', 'https://google.com'));
</script>
```

Results in the following console output:

```html
'google.com'
```

## restrictCharacters

Restricts input characters to a text input to only specific characters defined by regex.

For example, to restrict inputs to only alphanumeric characters and hyphen:

```html
<input type="text" id="slug" name="slug" value="">

<script type="text/javascript">
    $(document).ready(function() {
        $('#slug').keypress(function (e) {
            return restrictCharacters($(this), e, /[-A-Za-z0-9]/g);
        });
    });
</script>
```

## slugify

Converts the given text to a slug format using the given text separator.

For example, to automatically generate a kebab case slug when another text input is updated:

```html
<input type="text" id="title" name="title" value="">
<input type="text" id="slug" name="slug" value="">

<script type="text/javascript">
    $(document).ready(function() {
        $('#title').keyup(function () {
            var str = $(this).val();
            $('#slug').val(slugify(str, '-'));
        });
    });
</script>
```

## titleCase

Converts a string with the given delimiter to Title Case.

For example:

```html
<script type="text/javascript">
    console.log(titleCase('public_user', '_'));
</script>
```

Results in the following console output:

```html
'Public User'
```