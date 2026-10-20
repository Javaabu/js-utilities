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

Add the `select2-ajax` class and a `data-select-ajax-url` to load options from a paginated API endpoint. The request sends `filter[search]` (when a search term is typed), `page` and `fields`, and reads the results from `data` and the next page from `next_page_url`.

When the dropdown is opened, the first page of results is loaded straight away, before anything is typed. To wait for the user to type instead, set `data-minimum-input-length`.

```html
<select class="select2-ajax"
        data-select-ajax-url="/api/v1/employers"
        data-minimum-input-length="1">
</select>
```

## data-filter-parent

Filters an ajax select2 by the value of another (parent) select. The parent's current value is sent as `filter[<data-filter-field>]` with every search and page request, so the results stay paginated and searchable on the server. No `per_page=-1` request is made, so the endpoint doesn't need to allow unlimited results.

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
                  allow-clear />
```

The child sends requests like:

```
GET /api/v1/job-listings?filter[search]=chef&filter[employer]=42&page=1&fields=id,title&append=&include=
```

- Changing the parent clears the child's selection and options, and triggers `change` on the child so any further children cascade.
- While the parent is empty, the child is disabled.
- On page load, an already selected child option is kept.

The API endpoint needs a filter for the parent key (e.g. `AllowedFilter::exact('employer', 'employer_id')`) and a `search` filter.
