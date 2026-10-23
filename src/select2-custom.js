/**
 * Select2 custom
 */

var filter_parent_count = 0;

/**
 * Get a parent select's value as a string, '' when nothing is selected
 */
function filterParentValue(parent_selector) {
    var value = $(parent_selector).val();

    if (value === null || value === undefined || (Array.isArray(value) && ! value.length)) {
        return '';
    }

    return String(value);
}

/**
 * Clear the child when the parent's value changes,
 * and disable it while the parent is empty
 */
function bindFilterParent(child, parent_selector) {
    var parent = $(parent_selector);

    // a namespace per child, so re-binding doesn't stack handlers
    // and children sharing a parent don't remove each other's handlers
    var namespace = child.data('filterParentNamespace');
    if (! namespace) {
        namespace = 'select2FilterParent' + (++filter_parent_count);
        child.data('filterParentNamespace', namespace);
    }

    // remember the value at bind time, so server rendered selections survive page load
    var last_value = filterParentValue(parent_selector);
    child.prop('disabled', last_value === '');

    parent.off('change.' + namespace).on('change.' + namespace, function () {
        var value = filterParentValue(parent_selector);
        var changed = value !== last_value;

        last_value = value;

        if (changed) {
            child.val(null).empty();
        }

        child.prop('disabled', value === '');

        if (changed) {
            // let any grandchildren cascade
            child.trigger('change');
        }
    });
}

function bind(root_elem) {

    // Iniate Select2 Plugin
    root_elem.find('.select2-basic').each(function () {
        var element = $(this);
        var dropdown_parent = element.data('dropdown-parent-elem') || null;
        var args = {};

        if (dropdown_parent) {
            args.dropdownParent = $(dropdown_parent);
        }

        element.select2(args);
    });

    // select2 icon
    root_elem.find('.select2-b-icon').each(function () {
        var prefix = $(this).data('icon-prefix');
        var placeholder = $(this).data('placeholder');

        $(this).select2({
            templateSelection: renderOption,
            templateResult: renderOption
        });

        function renderOption(item) {
            var option_el = $(item.element);

            var icon = option_el.val();
            icon = $('<div />').text(icon).html(); // escape html

            var text = option_el.text();
            text = $('<div />').text(text).html(); // escape html

            var html = '';

            if (icon) {
                html =
                    '<span>' +
                    '<i class="' + prefix + ' ' + prefix + '-' + icon + ' select2-icon"></i>' +
                    text +
                    '</span>';
            } else {
                var placeholder_text = placeholder ? placeholder : text;
                placeholder_text = $('<div />').text(placeholder_text).html(); // escape html

                html = '<span>' + placeholder_text + '</span>';
            }

            return $(html);
        }
    });

    // select2 image
    root_elem.find('.select2-b-image').each(function () {
        $(this).select2({
            templateSelection: renderOption,
            templateResult: renderOption
        });

        function renderOption(item) {
            var option_el = $(item.element);

            var image_url = option_el.data('image');
            image_url = $('<div />').text(image_url).html(); // escape html

            var text = option_el.data('text');
            text = $('<div />').text(text).html(); // escape html

            var html = '<span><img src="' + image_url + '" class="select2-img"> ' + text + '</span>';

            return $(html);
        }
    });

    //ajax select2
    root_elem.find('.select2-ajax').each(function () {
        var element = $(this);
        var name_field = element.data('name-field') || 'name';
        var id_field = element.data('id-field') || 'id';
        var dropdown_parent = element.data('dropdown-parent-elem') || null;
        var urls = element.data('select-ajax-url');

        // opt-in: filter the results by the value of a parent select.
        // read with attr() so jQuery doesn't try to parse selectors like "[name=x]" as JSON
        var filter_parent = element.attr('data-filter-parent') || null;
        var filter_field = element.data('filter-field') || null;

        // defaults to 1, so nothing is requested until the user types.
        // opt-in: set data-minimum-input-length="0" to load the first page as soon as the dropdown opens
        var minimum_input_length = element.data('minimum-input-length');
        if (minimum_input_length === undefined) {
            minimum_input_length = 1;
        }

        // opt-in: results per request. -1 loads all results at once,
        // a positive number pages them. when not set, no per_page is sent
        var per_page = element.data('per-page');

        // resolved on every request, so the parent value is always current
        var resolveUrl = function () {
            var dynamic_url = urls;

            if (urls && typeof urls === 'object') {
                dynamic_url = urls[element.data('selected-url')];

                // fallback to first url
                if (! dynamic_url) {
                    dynamic_url = Object.keys(urls).length ? urls[Object.keys(urls)[0]] : '';
                }
            }

            if (filter_parent && dynamic_url) {
                dynamic_url = dynamic_url.replace(':value', encodeURIComponent(filterParentValue(filter_parent)));
            }

            return dynamic_url;
        };

        // a plain string url, unless the url has to be worked out per request
        var url = (filter_parent || (urls && typeof urls === 'object')) ? resolveUrl : urls;

        var args = {
            ajax: {
                url: url,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    var query = {
                        append: '',
                        include: '',
                        page: params.page || 1,
                        fields: id_field + ',' + name_field,
                    };

                    if (per_page !== undefined && per_page !== '') {
                        query.per_page = per_page;
                    }

                    var filter = {};

                    // skip the search filter when there's no term, which only
                    // happens when data-minimum-input-length is 0
                    if (params.term) {
                        filter.search = params.term;
                    }

                    if (filter_parent && filter_field) {
                        filter[filter_field] = $(filter_parent).val();
                    }

                    if (! $.isEmptyObject(filter)) {
                        query.filter = filter;
                    }

                    return query;
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    // per_page -1 returns a plain array instead of a paginated response
                    var is_paginated = ! Array.isArray(data);
                    var items = is_paginated ? data.data : data;

                    return {
                        results: $.map(items, function (item) {
                            return {
                                text: item[name_field],
                                id: item[id_field]
                            }
                        }),
                        pagination: {
                            more: is_paginated && data.next_page_url != null
                        }
                    };
                },
                cache: true
            },
            minimumInputLength: minimum_input_length,
            allowClear: true,
            placeholder: $(this).attr('placeholder') || '-- Nothing Selected --'
        };

        if (dropdown_parent) {
            args.dropdownParent = $(dropdown_parent);
        }

        if (filter_parent) {
            bindFilterParent(element, filter_parent);
        }

        element.select2(args);
    });

    /*
     * SELECT2 AJAX Cascading Select Box
     * */
    root_elem.find('[data-ajax-child]').on('change', function () {
        var element = $(this);
        var value = element.val();
        var child = element.data('ajax-child');
        var child_element = $(child);

        if (value) {
            var selected_url = child_element.data('selected-url');
            if (selected_url != value) {
                child_element.val('');
                child_element.empty();
            }

            child_element.data('selected-url', value);
            child_element.prop('disabled', false);
        } else {
            child_element.val('');
            child_element.empty();
            child_element.data('selected-url', null);
            child_element.prop('disabled', true);
        }

        child_element.trigger('change');
    }).trigger('change');


    //Select2 Cascade
    root_elem.find('[data-select-child]').on('change', function () {
        var el = $(this);
        var selected_val = el.val();
        var child_selects = $(el.data('select-child'));
        var parent_fallback = el.data('fallback');
        var disable_child = el.data('disable-child') || false;

        if (selected_val) {
            child_selects.each(function () {
                var child_select = $(this);

                var fallback = child_select.data('fallback');
                var name_field = child_select.data('name-field') || 'name';
                var id_field = child_select.data('id-field') || 'id';
                var url = child_select.data('select-ajax-url');
                var filter = child_select.data('filter-field');
                var filterBys = child_select.data('filter-by') || [];

                url = url.replace(':value', selected_val);

                var params = {
                    fields: id_field + ',' + name_field,
                    per_page: -1
                };
                params['include'] = '';
                params['append'] = '';
                params['filter'] = {};
                params['filter'][filter] = selected_val;

                if (filterBys.length > 0) {
                    for (let i = 0; i < filterBys.length; i++) {
                        let filterValue = $('#' + filterBys[i]).val();
                        params['filter'][filterBys[i]] = filterValue;
                    }
                }

                var child_val = child_select.val() || '';

                $.ajax({
                    url: url,
                    dataType: 'json',
                    data: params,
                    beforeSend: function () {
                        child_select.prop('disabled', true);
                        child_select.html('<option value="">Loading...</option>');
                    },
                    error: function () {
                        child_select.html('<option value="">Error Loading Options</option>');
                    },
                    success: function (result) {
                        var options = '';
                        $.each(result, function (i) {
                            // escape html
                            // https://coderwall.com/p/jt7ysq/encode-string-to-html-entities-via-jquery
                            var option_val = $('<div />').text(result[i][id_field]).html();
                            var option_text = $('<div />').text(result[i][name_field]).html();

                            options += '<option value="' + option_val + '">' + option_text + '</option>';
                        });

                        child_select.html(options);
                        child_select.val(child_val);

                        if (fallback) {
                            if (result.length) {
                                //hide the fallback
                                $(fallback).prop('disabled', true).hide();

                                //display select
                                child_select.prop('disabled', false);
                                child_select.next().show();
                            } else {
                                //hide select
                                child_select.next().hide();
                                child_select.prop('disabled', true);

                                //display fallback
                                $(fallback).prop('disabled', false).show();
                            }
                        } else {
                            child_select.prop('disabled', (disable_child && !result.length ? true : false));
                        }

                        child_select.trigger('change');
                    }
                });
            });
        } else {
            child_selects.each(function () {
                var child_select = $(this);

                var fallback = child_select.data('fallback');

                child_select.html('');
                child_select.prop('disabled', true);
                if (fallback) {
                    child_select.next().hide();
                    $(fallback).show();

                    // if parent has fallback, and it's enabled
                    if (parent_fallback && !$(parent_fallback).prop('disabled')) {
                        $(fallback).prop('disabled', false);
                    } else {
                        $(fallback).prop('disabled', true);
                    }

                }
                child_select.trigger('change');
            });
        }
    });

    //Select2 Cascade trigger root select
    root_elem.find('[data-first][data-select-child]:not(.no-auto-trigger)').trigger('change');

    //Select2 Cascade Multiple Children
    root_elem.find('[data-select-children]').on('change', function () {
        var el = $(this);
        var selected_val = el.val();
        var children_select = $(el.data('select-children'));

        if (selected_val) {
            var name_field = el.data('children-name-field') || 'name';
            var id_field = el.data('children-id-field') || 'id';
            var url = el.data('select-ajax-children-url');
            var filter = el.data('filter-field');
            var params = el.data('params') || {};

            params['fields'] = id_field + ',' + name_field;
            params['per_page'] = -1;
            params['include'] = '';
            params['append'] = '';
            params['filter'] = {};
            params['filter'][filter] = selected_val;

            var children_vals = [];
            children_select.each(function(i) {
                children_vals[i] = $(this).val() || '';
            });

            $.ajax({
                url: url,
                dataType: 'json',
                data: params,
                beforeSend: function () {
                    children_select.each(function() {
                        $(this).prop('disabled', true)
                            .html('<option value="">Loading...</option>');
                    });
                },
                error: function () {
                    children_select.each(function() {
                        $(this).html('<option value="">Error Loading Options</option>');
                    });
                },
                success: function (result) {
                    var options = '';
                    $.each(result, function (i) {
                        // escape html
                        // https://coderwall.com/p/jt7ysq/encode-string-to-html-entities-via-jquery
                        var option_val = $('<div />').text(result[i][id_field]).html();
                        var option_text = $('<div />').text(result[i][name_field]).html();

                        options += '<option value="' + option_val + '">' + option_text + '</option>';
                    });

                    children_select.each(function(i) {
                        var disable = false;
                        var check_box_toggle = $(this).data('checkbox-toggle');
                        if (check_box_toggle) {
                            disable = $(check_box_toggle).val();
                        }

                        $(this).html(options)
                            .val(children_vals[i])
                            .prop('disabled', disable);

                        if (!disable) {
                            $(this).trigger('change');
                        } else {
                            $(this).addClass('auto-disabled');
                        }
                    });
                }
            });
        } else {
            children_select.each(function() {
                $(this).html('')
                    .prop('disabled', true)
                    .trigger('change');
            });
        }
    });

    // Select2 Cascade Children trigger root select
    root_elem.find('[data-first][data-select-children]').trigger('change');
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export { bind, init };