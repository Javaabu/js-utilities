---
title: slugify
---

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