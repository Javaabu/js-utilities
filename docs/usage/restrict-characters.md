---
title: restrictCharacters
---

This function restricts input characters to a text input to only specific characters defined by regex.

For example, to restrict inputs to only alphanumeric characters and hyphen:

```html
<input type="text" id="slug" value="">

<script type="text/javascript">
    $(document).ready(function() {
        $('#slug').keypress(function (e) {
            return restrictCharacters($(this), e, /[-A-Za-z0-9]/g);
        });
    });
</script>
```