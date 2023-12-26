/**
 * We'll register a HTTP interceptor to attach the "CSRF" header to each of
 * the outgoing requests issued by this application. The CSRF middleware
 * included with Laravel will automatically verify the header's value.
 */
(function () {
    var token = document.head.querySelector('meta[name="csrf-token"]');

    if (token) {
        var op = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            var resp = op.apply(this, arguments);
            this.setRequestHeader('X-CSRF-Token', token.content);
            return resp;
        };
    } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }
}());

/**
 * Restrict input characters
 * http://www.qodo.co.uk/blog/javascript-restrict-keyboard-character-input/
 */
window.restrictCharacters = function (myfield, e, restrictionType) {
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    // if they pressed esc... remove focus from field...
    if (code == 27) {
        this.blur();
        return false;
    }
    // ignore if they are press other keys
    // strange because code: 39 is the down key AND ' key...
    // and DEL also equals .
    if (!e.ctrlKey && code != 9 && code != 8 && code != 36 && code != 37 && code != 38 && (code != 39 || (code == 39 && character == "'")) && code != 40) {
        if (character.match(restrictionType)) {
            return true;
        } else {
            return false;
        }
    }
};

/**
 * checks if a given coordinate is in the correct format
 */
window.check_lat_lng = function (lat, lon) {
    ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
    ck_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
    var validLat = ck_lat.test(lat);
    var validLon = ck_lon.test(lon);
    if (validLat && validLon) {
        return true;
    } else {
        return false;
    }
};

/**
 * Convert url to slug
 */
window.slugify = function (str, special_char) {
    if (typeof (special_char) === 'undefined') special_char = '-';
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, special_char) // collapse whitespace and replace by -
        .replace(/-+/g, special_char); // collapse .

    return str;
};

/**
 * Remove string from beginnig
 */
window.removeFromHead = function (needle, haystack) {
    needle = needle.toLowerCase();
    var ls_haystack = haystack.toLowerCase();
    while (needle.length > 0) {
        if (ls_haystack.indexOf(needle) == 0) {
            return haystack.substring(needle.length);
        } else {
            needle = needle.slice(0, -1);
        }
    }
    return haystack;
};

/**
 * Generate a random string
 *
 * @return string
 */
window.randString = function (len) {
    var string = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
        string += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return string;
};

/**
 * Show loading
 */
window.toggleLoading = function (elem, show) {
    if (elem.hasClass('zmdi')) {
        if (show) {
            elem.addClass('loading');
        } else {
            elem.removeClass('loading');
        }
    } else {
        if (show) {
            var loading = '<i class="zmdi zmdi-spinner zmdi-spin zmdi-pulse loading"> ';
            elem.children('i').hide();
            elem.prepend(loading);
        } else {
            elem.children('.loading').remove();
            elem.children('i').show();
        }
    }

    togglePreloader(show);
};

/**
 * Toggle preloader
 */
window.togglePreloader = function (show) {
    if (show) {
        $('.page-loader').show();
    } else {
        $('.page-loader').hide();
    }
};

/**
 * Convert to title case
 */
window.titleCase = function (str, delimiter) {
    return str.split(delimiter).map(function (val) {
        return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
    }).join(' ');
};

/**
 * Display validation errors
 */
window.showValidationErrorMsg = function (xhr, form) {
    var response = xhr.responseText;

    try {
        response = JSON.parse(response);
    } catch (e) {
    }

    var msg_title = response.hasOwnProperty('errors') ? 'There are some errors in your inputs.' : response.message;
    var msg = '<br/><br/>';

    if (response.hasOwnProperty('errors')) {
        var errors = response.errors;
        for (var field in errors) {
            msg += '<div class="mb-2 bd-text-left">';
            if (errors.hasOwnProperty(field)) {
                var field_errors = errors[field];
                msg += '<strong>' + titleCase(field, '_') + ':</strong><ul>';
                var lis = '';

                for (var i = 0; i < field_errors.length; i++) {
                    var text = field_errors[i];
                    text = $('<div />').text(text).html(); // escape html

                    lis += '<li>' + text + '</li>';
                }

                if (form) {
                    var key = field.replace(/[^a-z0-9 -]/g, '-');
                    var second_key = '';

                    // check for array validation
                    if (field.indexOf('.') > -1) {
                        second_key = field.substring(0, field.indexOf('.'));
                        second_key = second_key.replace(/[^a-z0-9 -]/g, '-') + '-\\.';
                    }

                    form.find('#' + key + '-error').html(lis).show();

                    if (second_key) {
                        form.find('#' + second_key + '-error').html(lis).show();
                    }

                    form.find('[name="' + field + '"]').addClass('is-invalid');
                }

                msg += lis;
                msg += '</ul><div>';
            }
        }

        if (form) {
            var first_error = form.find('.is-invalid').first();
            if (first_error.length) {
                $('html, body').animate({
                    scrollTop: first_error.offset().top - 85
                }, 1000);
            }
        }
    }

    Swal.fire({
        title: 'Error!',
        html: form ? msg_title : msg_title + msg,
        icon: 'error',
        confirmButtonText: 'Ok'
    });
};

/**
 * Redirects the page
 */
window.redirectPage = function (redirect_url) {
    if (redirect_url) {
        if (redirect_url.indexOf('#') == 0) {
            window.location.hash = redirect_url;
            window.location.reload();
        } else {
            window.location.replace(redirect_url);
        }
    } else {
        window.location.reload();
    }
};

/**
 * Serialize to json form data
 */
window.getJsonFormData = function (form) {
    var unindexed_array = form.serializeArray();
    var indexed_array = {};


    $.map(unindexed_array, function (n, i) {
        var elem = form.filter('[name="' + n['name'] + '"]');
        var is_multiple = elem.length && elem.prop('multiple');

        // check if already exists, if so it's an array
        if (indexed_array[n['name']] || is_multiple) {
            // init array
            if (!indexed_array.hasOwnProperty(n['name'])) {
                // make a blank array
                indexed_array[n['name']] = [];
            } else if (!indexed_array[n['name']].push) {
                // make an array using the existing value
                indexed_array[n['name']] = [indexed_array[n['name']]];
            }

            // append new value
            indexed_array[n['name']].push(n['value']);
        } else {
            indexed_array[n['name']] = n['value'];
        }
    });

    return indexed_array;
};

/**
 * Show the tooltip
 *
 * @param el
 * @param message
 */
window.setTooltip = function (el, message) {
    $(el).tooltip('hide')
        .attr('data-actual-title', $(el).attr('data-original-title'))
        .attr('data-original-title', message)
        .tooltip('show');
};

/**
 * Hide the tooltip
 *
 * @param el
 */
window.hideTooltip = function (el) {
    setTimeout(function () {
        $(el).tooltip('hide')
            .attr('data-original-title', $(el).attr('data-actual-title'));
    }, 1000);
};


$(document).ready(function () {

    if ($('[data-toggle="tooltip"]')[0]) {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'click',
            delay: {show: 200, hide: 100}
        });
    }

    //post
    $('[data-post-url]').click(function (e) {
        e.preventDefault();
        var request_url = $(this).data('post-url');
        var redirect_url = $(this).data('redirect-url');
        var params = $(this).data('params') || {};
        var method = $(this).data('method') || 'POST';
        var is_delete = $(this).data('delete') || false;
        var _this = this;

        if (request_url) {

            // process the params
            var request_params = {};
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var val = params[key];

                    if (key.startsWith(':')) {
                        key = key.substring(1);
                        val = $(val).val();
                    }

                    request_params[key] = val;
                }
            }

            function do_request() {
                $.ajax({
                    url: request_url,
                    type: method,
                    data: request_params,
                    beforeSend: function () {
                        toggleLoading($(_this), true);
                    },
                    complete: function () {
                        toggleLoading($(_this), false);
                    },
                    success: function (result) {
                        redirectPage(redirect_url);
                    },
                    error: function (xhr) {
                        if (xhr.status == 422) {
                            showValidationErrorMsg(xhr);
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'An error occurred while performing the action.',
                                icon: 'error'
                            });
                        }
                    }
                });
            }

            // get delete confirmation
            if (is_delete) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to undo this delete operation!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                }).then(function (result) {
                    if (result.value) {
                        do_request();
                    }
                });
            } else {
                do_request();
            }
        }
    });

    //delete
    $('.delete-link').click(function (e) {
        e.preventDefault();
        var request_url = $(this).data('request-url');
        var redirect_url = $(this).data('redirect-url');
        var _this = this;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to undo this delete operation!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then(function (result) {
            if (result.value) {
                $.ajax({
                    url: request_url,
                    type: 'DELETE',
                    beforeSend: function () {
                        toggleLoading($(_this), true);
                    },
                    complete: function () {
                        toggleLoading($(_this), false);
                    },
                    success: function (result) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The record has been deleted.',
                            icon: 'success'
                        }).then(
                            function () {
                                redirectPage(redirect_url);
                            }
                        );
                    },
                    error: function () {
                        Swal.fire({
                            title: 'Error!',
                            text: 'An error occurred while deleting.',
                            icon: 'error'
                        });
                    }
                });
            }
        });
    });

    //url input
    $("input[type='url']").keyup(function (e) {
        string = $(this).val();
        if (!(/^(http|https):\/\//i.test(string))) {
            var protocol = 'http';
            var removed = removeFromHead("http", string);
            if (removed.indexOf('s') == 0) {
                removed = removeFromHead("s://", removed);
                protocol += 's';
            } else {
                removed = removeFromHead("://", removed);
            }
            if (removed != '') {
                string = protocol + "://" + removed;
            }
        }
        $(this).val(string);
    });

    // check all boxes when select all clicked
    $('input[type="checkbox"][data-all]').on('change', function (e) {
        e.preventDefault();
        var select_all_name = $(this).data('all');
        var is_checked = $(this).prop('checked');
        $('input[type="checkbox"][data-check="' + select_all_name + '"]').each(function () {
            $(this).prop('checked', is_checked);
        });
    });

    // uncheck select all when one box unchecked
    $('input[type="checkbox"][data-check]').on('change', function (e) {
        e.preventDefault();
        var is_checked = $(this).prop('checked');
        if (!is_checked) {
            var select_all_name = $(this).data('check');
            var select_all = $('input[type="checkbox"][data-all="' + select_all_name + '"]');
            if (select_all) {
                select_all.prop('checked', false);
            }
        }
    });

    //checkbox disable toggle
    $('[data-toggle-checkbox]').change(function () {
        var input = $($(this).data('toggle-checkbox'));
        if (input.length) {
            var checked = $(this).is(':checked');
            input.each(function () {
                $(this).prop('disabled', checked);
            });
        }
    }).trigger('change');

    // disable on select
    $('[data-disable-on-select]').on('change', function () {
        var fields = $($(this).data('disable-on-select'));
        if (fields.length) {
            var disable = $(this).val() && true;
            var hide_fields = $(this).data('hide-fields') || false;

            if (disable) {
                // if disable, select only enabled
                fields.find('select:enabled, input:enabled').each(function () {
                    $(this).prop('disabled', true)
                        .addClass('auto-disabled');
                });
            } else {
                // if enable, select only auto-disabled
                fields.find('select.auto-disabled:disabled, input.auto-disabled:disabled').each(function () {
                    $(this).prop('disabled', false)
                        .removeClass('auto-disabled');
                });
            }

            if (hide_fields) {
                if (disable) {
                    fields.slideUp();
                } else {
                    fields.slideDown();
                }
            }
        }
    }).trigger('change');

    //checkbox enable toggle
    $('[data-enable-checkbox]').change(function () {
        var fields = $($(this).data('enable-checkbox'));
        var checked = $(this).is(':checked');
        var enable = $(this).data('disable') ? !checked : checked;
        if (fields.length) {
            if (enable) {
                // if enable, select only auto-disabled
                fields.find('select.auto-disabled:disabled, input.auto-disabled:disabled').each(function () {
                    $(this).prop('disabled', false)
                        .removeClass('auto-disabled');
                });

                fields.slideDown();
            } else {
                // if disable, select only enabled
                fields.find('select:enabled, input:enabled').each(function () {
                    $(this).prop('disabled', true)
                        .addClass('auto-disabled');
                });

                fields.slideUp();
            }
        }
    }).trigger('change');

    // Enable the section only when another element is a
    // given value
    $('[data-enable-section-value]').each(function () {
        var _this = $(this);
        var value = _this.data('enable-section-value');
        var element = $(_this.data('enable-elem'));
        var hide_fields = _this.data('hide-fields') || false;
        var disable_on_select = _this.data('disable') || false;

        if (element.length) {
            element.on('change', function () {
                var curr_val = $(this).val();
                var matching_selected = false;

                if (value instanceof Array) {
                    matching_selected = value.findIndex(function (e) {
                        return e == curr_val;
                    }) > -1;
                } else {
                    matching_selected = curr_val == value;
                }

                var enable = disable_on_select ? (!matching_selected) : matching_selected;

                if (enable) {
                    // if enable, enable only auto-disabled
                    _this.find('select.auto-disabled:disabled, input.auto-disabled:disabled, textarea.auto-disabled:disabled').each(function () {
                        $(this).prop('disabled', false)
                            .removeClass('auto-disabled');
                    });
                } else {
                    // if disable, enable only enabled
                    _this.find('select:enabled, input:enabled, textarea:enabled').each(function () {
                        $(this).prop('disabled', true)
                            .addClass('auto-disabled');
                    });
                }

                if (hide_fields) {
                    if (enable) {
                        _this.slideDown();
                    } else {
                        _this.slideUp();
                    }
                }
            }).trigger('change');
        }
    });

    // Enable the section only when check box is checked
    $('[data-enable-section-checkbox]').each(function () {
        var _this = $(this);
        var checkbox = $(_this.data('enable-section-checkbox'));
        var hide_fields = _this.data('hide-fields') || false;
        var disable_on_select = _this.data('disable') || false;

        if (checkbox.length) {
            checkbox.on('change', function () {
                var matching_selected = checkbox.is(':checked');
                var enable = disable_on_select ? (!matching_selected) : matching_selected;

                if (enable) {
                    // if enable, enable only auto-disabled
                    _this.find('select.auto-disabled:disabled, input.auto-disabled:disabled, textarea.auto-disabled:disabled').each(function () {
                        $(this).prop('disabled', false)
                            .removeClass('auto-disabled');
                    });
                } else {
                    // if disable, enable only enabled
                    _this.find('select:enabled, input:enabled, textarea:enabled').each(function () {
                        $(this).prop('disabled', true)
                            .addClass('auto-disabled');
                    });
                }

                if (hide_fields) {
                    if (enable) {
                        _this.slideDown();
                    } else {
                        _this.slideUp();
                    }
                }
            }).trigger('change');
        }
    });

    //delete form
    $('.delete-form').submit(function (e) {
        var action_control = $(this).find('[name=action]');
        var action = action_control ? action_control.val() : '';

        if (action == 'delete' || action == 'force_delete') {
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to undo this delete operation!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
            }).then(function (result) {
                if (result.value) {
                    e.currentTarget.submit();
                }
            });
        }
    });

    //status
    $('.status-link').click(function (e) {
        e.preventDefault();
        var request_url = $(this).data('request-url');
        var redirect_url = $(this).data('redirect-url');
        var new_status = $(this).data('new-status');
        var _this = this;
        if (request_url) {
            $.ajax({
                url: request_url,
                type: 'PUT',
                data: {enable: new_status},
                beforeSend: function () {
                    toggleLoading($(_this), true);
                },
                complete: function () {
                    toggleLoading($(_this), false);
                },
                success: function (result) {
                    Swal.fire({
                        title: 'Updated!',
                        text: 'The record status has been updated.',
                        icon: 'success'
                    }).then(
                        function () {
                            redirectPage(redirect_url);
                        }
                    );
                },
                error: function () {
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while updating the status.',
                        icon: 'error'
                    });
                }
            });
        }
    });

    //allow TAB inside code textarea
    $(document).delegate('textarea.code-text', 'keydown', function (e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode == 9) {
            e.preventDefault();
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart =
                $(this).get(0).selectionEnd = start + 1;
        }
    });

    //js delete
    $('[data-deletable]').on('click', '[data-delete]', function (e) {
        e.preventDefault();
        $(this).closest($(this).data('delete')).remove();

        /*if ( $(this).hasClass('sortable') ) {
            $(this).sortable('refresh');
        }*/
    });

    //sortable
    $('.sortable').sortable({
        placeholder: 'ui-state-highlight',
        helper: 'clone',
        update: function (event, ui) {
            var sort_url = $(this).data('sort-url');
            if (sort_url) {
                var data = $(this).sortable('serialize');

                // POST to server using $.post or $.ajax
                $.ajax({
                    data: data,
                    type: 'PUT',
                    url: sort_url
                });
            }
        }
    });

    //form sort
    $('[data-sort-field]').click(function (e) {
        e.preventDefault();

        //find the parent form
        var parent_form_selector = $(this).closest('[data-form-sortable]').data('form-sortable');
        var parent_form = $('form' + parent_form_selector);
        if (parent_form) {

            var field = $(this).data('sort-field');
            var order = $(this).hasClass('sorting_asc') ? 'DESC' : 'ASC';

            parent_form.find('[name="orderby"]').val(field);
            parent_form.find('[name="order"]').val(order);
            parent_form.submit();
        }
    });

    //toggle fields
    $('[data-tg-toggle]').on('click', function (e) {
        e.preventDefault();
        var toggle_block = $($(this).data('tg-toggle'));
        if (toggle_block.length) {
            toggle_block.toggleClass('toggled');
            var toggle_icon = $(this).data('tg-icon') || 'zmdi-edit';
            $(this).toggleClass(toggle_icon + ' zmdi-close');
        }
    });

    //input toggle
    $('[data-input-toggle]').on('click', function (e) {
        e.preventDefault();
        var input = $($(this).data('input-toggle'));
        if (input.length) {
            input.prop('disabled', !input.prop('disabled'));
            var toggle_icon = $(this).data('tg-icon') || 'zmdi-edit';
            $(this).find('i').toggleClass(toggle_icon + ' zmdi-close');
        }
    });

    /**
     * Edit the selected model
     */
    $('[data-edit-selected]').each(function (e) {
        var selector = $(this).data('edit-selected');
        var url = $(this).data('edit-selected-url');
        var _this = this;

        $(selector).on('change', function () {
            var selected = $(this).val();

            if (selected) {
                var href = url.replace(/:id/g, selected);

                $(_this)
                    .removeClass('disabled')
                    .prop('href', href);
            } else {
                $(_this)
                    .addClass('disabled')
                    .prop('href', '#');
            }
        });
    });

    // clear date
    $('[data-date-clear]').on('click', function (e) {
        e.preventDefault();

        var date_el = $($(this).data('date-clear'));

        if (date_el.length && (!date_el.prop('disabled'))) {
            date_el.val('');
        }
    });

    /**
     * Slug
     */
    $('.slug.input-group').each(function (e) {

        var _this = $(this);
        var input = _this.find('input');
        var toggled = _this.data('toggled') || false;
        var toggle_icon = _this.data('tg-icon') || 'zmdi-edit';
        var save_icon = 'zmdi-check';
        var cancel_btn = _this.find('.cancel');
        var edit_btn = _this.find('.edit');
        var link = _this.find('.url');
        var url_prefix = _this.find('.url-prefix');
        var prefix = url_prefix.text().trim();

        // save the value
        _this.data('val', input.val());

        // Hide inputs
        function hideInput() {
            // change the input type to hidden
            input.prop('type', 'hidden');

            // change icon to edit
            edit_btn.find('i')
                .removeClass(save_icon)
                .addClass(toggle_icon);

            // hide the cancel button
            cancel_btn.addClass('d-none');

            // hide the url prefix
            url_prefix.addClass('d-none');

            // change the link
            link.text(prefix + input.val())
                .removeClass('d-none');

            _this.removeClass('toggled');

            toggled = false;
        }

        // Save inputs
        function saveInput(val) {
            // save the current value
            input.val(slugify(val));
            _this.data('val', val);

            // enable the input
            input.prop('disabled', false);
        }

        _this.on('slug.change', function (e, val) {
            if (!toggled) {
                saveInput(val);
                hideInput();
            }
        });

        //slug toggle
        edit_btn.on('click', function (e) {
            e.preventDefault();

            saveInput(input.val());

            // saving
            if (toggled) {
                hideInput();
            } else {
                // editing

                // change the input type to text
                input.prop('type', 'text');

                // hide the link
                link.addClass('d-none');

                // show the url prefix
                url_prefix.removeClass('d-none');

                // change icon to save
                $(this).find('i')
                    .removeClass(toggle_icon)
                    .addClass(save_icon);

                // show the cancel button
                cancel_btn.removeClass('d-none');

                _this.addClass('toggled');

                toggled = true;
            }
        });

        // cancel slug update
        cancel_btn.on('click', function (e) {
            e.preventDefault();

            // reset the value
            input.val(_this.data('val'));

            // disable the input
            input.prop('disabled', true);

            // hide the input
            hideInput();
        });
    });

    // confirm button
    $('[data-confirm]').on('click', function (e) {
        e.preventDefault();

        var target_form = $(this).closest('form');
        var _this = $(this);

        if (target_form.length) {
            Swal.fire({
                title: 'Are you sure?',
                text: _this.data('confirm') || 'Just checking if you wanted to really do this.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, continue!',
            }).then(function (result) {
                if (result.value) {
                    $('<input>', {
                        type: 'hidden',
                        name: _this.attr('name'),
                        value: _this.val()
                    }).appendTo(target_form);

                    target_form.submit();
                }
            });
        }
    });



    $('form.tab-form').on('submit', function (e) {
        togglePreloader(true);
    });

    $('[data-filter-checkboxes]').on('keyup', function () {
        var query = $(this).val().toLowerCase();
        var checkboxes = $(this).data('filter-checkboxes');

        $(checkboxes + ' > .checkbox').each(function () {
            if ($(this).text().toLowerCase().indexOf(query) != -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('[data-toggle-hide]').on('click', function (e) {
        e.preventDefault();
        var elem = $($(this).data('toggle-hide'));

        if (elem.length) {
            if (elem.data('toggled') || false) {
                elem.hide();
                elem.data('toggled', false);
            } else {
                elem.show();
                elem.data('toggled', true);
            }
        }
    });

    /**
     * Categories Card
     */
    /**
     * Categories Card
     */
    $('.categories-card').each(function (e) {
        var _this = $(this);
        var add_category_btn = _this.find('.add-category');
        var categories_list = _this.find('.categories-list');
        var adding_category = false;

        if (add_category_btn.length) {
            var post_url = add_category_btn.prop('href');
            var name_input = _this.find('input[name="category_name"]');
            var slug_input = _this.find('input[name="category_slug"]');
            var categories_name = categories_list.data('categories-name');

            slug_input.keypress(function (e) {
                return restrictCharacters($(this), e, /[ -A-Za-z0-9]/g);
            });

            name_input.keyup(function () {
                var str = $(this).val();
                slug_input.val(slugify(str, '-'));
            });

            add_category_btn.on('click', function (e) {
                e.preventDefault();
                if (!adding_category) {
                    var name_str = name_input.val();
                    var slug_str = slug_input.val();

                    $.ajax({
                        url: post_url,
                        type: 'POST',
                        data: {
                            name: name_str,
                            slug: slug_str
                        },
                        beforeSend: function () {
                            adding_category = true;
                            add_category_btn.addClass('disabled');
                            toggleLoading(add_category_btn, true);
                        },
                        complete: function () {
                            adding_category = false;
                            add_category_btn.removeClass('disabled');
                            toggleLoading(add_category_btn, false);
                        },
                        success: function (result) {
                            removeInputValidationErrors(_this);
                            var html =
                                '<div class="checkbox">' +
                                '<input id="new-' + categories_name + '-' + result.id + '" name="' + categories_name + '[]" value="' + result.id + '" type="checkbox" checked />' +
                                '<label class="checkbox__label" for="new-' + categories_name + '-' + result.id + '">' +
                                result.name +
                                '</label>' +
                                '</div>';

                            categories_list.prepend(html);
                            name_input.val('');
                            slug_input.val('').trigger('change');
                        },
                        error: function (xhr) {
                            if (xhr.status == 422) {
                                showInputValidationErrors(xhr, _this, 'category_');
                            } else {
                                swal('Error!', 'An error occurred while adding the category.', 'error');
                            }
                        }
                    });

                }
            });
        }
    });

    $('body').on('click', '[data-edit-modal]', function (e) {
        e.preventDefault();

        var edit_data = $(this).data('edit-data');
        var modal = $($(this).data('edit-modal'));
        var title = $(this).data('modal-title') || '';
        var save_text = $(this).data('btn-text') || 'Save';

        // escape html
        title = $('<div />').text(title).html();
        save_text = $('<div />').text(save_text).html();

        // populate edit fields
        $.each(edit_data, function (field, value) {
            var elem = modal.find('[name="' + field + '"]');
            if (elem.length) {
                var type = elem.attr('type');

                if (elem.is('select') && Array.isArray(value)) {
                    elem.val('');
                    $.each(value, function (i, v) {
                        elem.find('option[value="' + v + '"]').prop('selected', true);
                    });
                } else if (type === 'checkbox') {
                    elem.prop('checked', value == elem.val());
                } else {
                    elem.val(value);
                }

                elem.trigger('change');
            }
        });

        modal.find('.invalid-feedback').hide();

        if (title) {
            modal.find('.modal-title').text(title);
        } else {
            modal.find('.modal-title').hide();
        }

        modal.find('[data-save-modal]').text(save_text);

        modal.modal('show');
    });

    $('[data-save-modal]').on('click', function (e) {
        e.preventDefault();

        var _this = this;
        var modal = $(this).closest('.modal');
        var request_url = $(this).data('save-modal');
        var redirect_url = $(this).data('redirect-url');
        var inline_errors = $(this).data('inline-errors') || false;
        var method = $(this).data('method') || 'POST';
        var inputs = modal.find('select, textarea, input');

        // validate the inputs
        var valid = true;
        $.each(inputs, function (i, elem) {
            if (!elem.checkValidity()) {
                elem.reportValidity();
                valid = false;
            }
        })

        if (!valid) {
            return;
        }

        var serialized = getJsonFormData(inputs);

        var id = serialized.id;
        var request_params = serialized;

        // process request params
        delete request_params.id;

        // process request url
        request_url = request_url.replace(/:id/g, id ? id : '');
        request_url = request_url.replace(/\/+$/, ''); // remove trailing slash

        // creating new if no id
        if (!id) {
            method = 'POST';
        }

        $.ajax({
            url: request_url,
            type: method,
            data: JSON.stringify(request_params),
            contentType: 'application/json',
            beforeSend: function () {
                if (inline_errors) {
                    modal.find('.invalid-feedback').hide();
                    modal.find('.is-invalid').removeClass('is-invalid');
                }

                toggleLoading($(_this), true);
            },
            complete: function () {
                toggleLoading($(_this), false);
            },
            success: function (result) {
                if (result.message) {
                    Swal.fire({
                        title: result.title,
                        text: result.message,
                        icon: 'success',
                        timer: 10 * 1000
                    }).then(function (result) {
                        redirectPage(redirect_url);
                    });
                } else {
                    redirectPage(redirect_url);
                }
            },
            error: function (xhr) {
                if (xhr.status == 422) {
                    showValidationErrorMsg(xhr, inline_errors ? modal : null);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while saving.',
                        icon: 'error'
                    });
                }
            }
        });
    });

    $('[data-filter-links]').on('keyup', function () {
        var query = $(this).val().toLowerCase();
        var links_ul = $(this).data('filter-links');

        $(links_ul + ' li').each(function () {
            if ($(this).text().toLowerCase().indexOf(query) != -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

/**
 * Bootstrap hash link for tabs
 */
$(function () {
    var hash = window.location.hash;
    hash && $('ul.tab-nav a[href*="' + hash + '"]').tab('show');

    $('.tab-nav li:not(.disabled) > a[href*="#"]').click(function (e) {
        var href = $(this).prop('href');
        if (href.indexOf('#') != 0 && this.pathname.indexOf(window.location.pathname) != 0) {
            window.location.replace(href);
        }

        $(this).tab('show');
        var scrollmem = $('body').scrollTop() || $('html').scrollTop();
        window.location.hash = this.hash;
        $('html,body').scrollTop(scrollmem);
    });
});
