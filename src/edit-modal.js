/**
 * Edit Modal
 */

import { __ } from './lang';
import { showValidationErrorMsg, redirectPage, getJsonFormData } from './utilities';
import { toggleLoading } from './loaders';

function bind(root_elem) {
    root_elem.find('[data-save-modal]').on('click', function (e) {
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
            if (! elem.checkValidity()) {
                elem.reportValidity();
                valid = false;
            }
        })

        if (! valid) {
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
        if (! id) {
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

                toggleLoading( $(_this), true );
            },
            complete: function () {
                toggleLoading( $(_this), false );
            },
            success: function (result) {
                if (result.message) {
                    Swal.fire({
                        title: result.title,
                        text: result.message,
                        confirmButtonText: __('OK'),
                        icon: 'success',
                        timer: 10 * 1000,
                        scrollbarPadding: false,
                        heightAuto: false
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
                    var response = xhr.responseText;

                    try {
                        response = JSON.parse(response);
                    } catch (e) {
                    }

                    Swal.fire({
                        title: __('Error!'),
                        text: response.message || __('An error occurred while saving.'),
                        icon: 'error',
                        scrollbarPadding: false,
                        heightAuto: false,
                        confirmButtonText: __('OK'),
                    });
                }
            }
        });
    });
}

function init() {
    $(document).ready(function () {
        $('body').on('click', '[data-edit-modal]', function (e) {
            e.preventDefault();

            var edit_data = $(this).data('edit-data');
            var modal = $($(this).data('edit-modal'));
            var title = $(this).data('modal-title') || '';
            var save_text = $(this).data('btn-text') || '';

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
                    } else if (type === 'radio') {
                        // uncheck other values
                        modal.find('input[type="radio"][name="' + field + '"]:not([value="' + value + '"])')
                            .prop('checked', false)
                            .trigger('change');

                        // check the value
                        modal.find('input[type="radio"][name="' + field + '"][value="' + value + '"]')
                            .prop('checked', true)
                            .trigger('change');
                    } else {
                        elem.val(value);
                    }

                    if (type !== 'radio') {
                        elem.trigger('change');
                    }
                }

                var readonly = modal.find('[data-readonly="' + field + '"]');
                if (readonly.length) {
                    readonly.text(value)
                }
            });

            modal.find('.invalid-feedback').hide();
            modal.find('.is-invalid').removeClass('is-invalid');

            if (title) {
                modal.find('.modal-title').text(title);
            } else {
                modal.find('.modal-title').hide();
            }

            if (save_text) {
                modal.find('[data-save-modal]').text(save_text);
            }

            modal.modal('show');
        });

        bind($(document));
    });
}

export { bind, init };