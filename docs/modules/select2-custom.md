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

:::info

The examples given here are using [`javaabu/forms`](https://github.com/Javaabu/forms) Laravel package blade components.

:::

## Ajax select2

Add the `select2-ajax` class and a `data-select-ajax-url` to load options from a paginated API endpoint. The request sends `filter[search]`, `page` and `fields`, and reads the results from `data` and the next page from `next_page_url`.

By default, nothing is requested until the user types a character. These options are opt-in:

| Attribute | Description |
| --- | --- |
| `data-minimum-input-length` | Characters to type before searching. Defaults to `1`. Set to `0` to load the first page of results as soon as the dropdown opens. `filter[search]` is left out while nothing is typed. |
| `data-per-page` | Sent as `per_page`. `-1` loads all results in one request (the endpoint returns a plain array and must allow unlimited results). A positive number pages the results by that amount. When not set, no `per_page` is sent and the endpoint's default page size is used. |

```html
<select class="select2-ajax"
        data-select-ajax-url="/api/v1/employers"
        data-minimum-input-length="0"
        data-per-page="20">
</select>
```

## data-filter-parent

Filters an ajax select2 by the value of another (parent) select. The parent's current value is sent as `filter[<data-filter-field>]` with every search and page request, so the results stay paginated and searchable on the server. Use `data-per-page` to choose between loading all of the parent's children at once (`-1`) or paging them.

| Attribute | Description |
| --- | --- |
| `data-filter-parent` | jQuery selector for the parent select, e.g. `[name=employer]` or `#employer`. |
| `data-filter-field` | The filter key to send, e.g. `employer` sends `filter[employer]=<parent value>`. |
| `data-select-ajax-url` | The API url. `:value` in the url is replaced with the parent value. |

```blade
<x-forms::select2 name="employer"
                  :options="$employers"
                  :ajax-url="route('api.employers.index')"
                  is-ajax
                  allow-clear />

<x-forms::select2 name="job_listing"
                  :options="$job_listings"
                  :ajax-url="route('api.job-listings.index')"
                  is-ajax
                  filter-field="employer"
                  data-filter-parent="[name=employer]"
                  name-field="title"
                  data-minimum-input-length="0"
                  data-per-page="20"
                  allow-clear />
```

The child sends requests like:

```
GET /api/v1/job-listings?append=&include=&page=1&fields=id,title&per_page=20&filter[search]=chef&filter[employer]=42
```

- Changing the parent clears the child's selection and options, and triggers `change` on the child so any further children cascade.
- While the parent is empty, the child is disabled.
- On page load, an already selected child option is kept.

The API endpoint needs a filter for the parent key (e.g. `AllowedFilter::exact('employer', 'employer_id')`) and a `search` filter.
