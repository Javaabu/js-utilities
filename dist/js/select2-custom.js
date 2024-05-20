$(document).ready(function () {

    // Iniate Select2 Plugin
    $('.select2-basic').each(function () {
        var element = $(this);
        var dropdown_parent = element.data('dropdown-parent-elem') || null;
        var args = {};

        if (dropdown_parent) {
            args.dropdownParent = $(dropdown_parent);
        }

        element.select2(args);
    });

    // select2 icon
    $('.select2-b-icon').each(function () {
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
    $('.select2-b-image').each(function () {
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
    $('.select2-ajax').each(function () {
        var element = $(this);
        var name_field = element.data('name-field') || 'name';
        var id_field = element.data('id-field') || 'id';
        var dropdown_parent = element.data('dropdown-parent-elem') || null;
        var urls = element.data('select-ajax-url');
        var url = '';

        if (typeof urls === 'object') {
            url = function () {
                var dynamic_url = urls[element.data('selected-url')];

                // fallback to first url
                if (! dynamic_url) {
                    dynamic_url = Object.keys(urls).length ? urls[Object.keys(urls)[0]] : '';
                }

                return dynamic_url;
            };
        } else {
            url = urls;
        }

        var args = {
            ajax: {
                url: url,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        filter: {
                            search: params.term
                        }, // search term
                        append: '',
                        include: '',
                        page: params.page || 1,
                        fields: id_field + ',' + name_field,
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: $.map(data.data, function (item) {
                            return {
                                text: item[name_field],
                                id: item[id_field]
                            }
                        }),
                        pagination: {
                            more: data.next_page_url != null
                        }
                    };
                },
                cache: true
            },
            minimumInputLength: 1,
            allowClear: true,
            placeholder: $(this).attr('placeholder') || '-- Nothing Selected --'
        };

        if (dropdown_parent) {
            args.dropdownParent = $(dropdown_parent);
        }

        element.select2(args);
    });

    /*
     * SELECT2 AJAX Cascading Select Box
     * */
    $('[data-ajax-child]').on('change', function () {
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
    $('[data-select-child]').on('change', function () {
        var el = $(this);
        var selected_val = el.val();
        var child_select = $(el.data('select-child'));
        var parent_fallback = el.data('fallback');
        var fallback = child_select.data('fallback');
        var disable_child = el.data('disable-child') || false;

        if (selected_val) {
            var name_field = child_select.data('name-field') || 'name';
            var id_field = child_select.data('id-field') || 'id';
            var url = child_select.data('select-ajax-url');
            var filter = child_select.data('filter-field');

            url = url.replace(':value', selected_val);

            var params = {
                fields: id_field + ',' + name_field,
                per_page: -1
            };
            params['include'] = '';
            params['append'] = '';
            params['filter'] = {};
            params['filter'][filter] = selected_val;

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

                    if ( fallback ) {
                        if ( result.length ) {
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
        } else {
            child_select.html('');
            child_select.prop('disabled', true);
            if ( fallback ) {
                child_select.next().hide();
                $(fallback).show();

                // if parent has fallback, and it's enabled
                if ( parent_fallback && !$(parent_fallback).prop('disabled') ) {
                    $(fallback).prop('disabled', false);
                } else {
                    $(fallback).prop('disabled', true);
                }

            }
            child_select.trigger('change');
        }
    });

    //Select2 Cascade trigger root select
    $('[data-first][data-select-child]:not(.no-auto-trigger)').trigger('change');

    //Select2 Cascade Multiple Children
    $('[data-select-children]').on('change', function () {
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

    //Select2 Cascade Children trigger root select
    $('[data-first][data-select-children]').trigger('change');

});
