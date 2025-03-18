/**
 * Post Links
 */

import { __ } from './lang';
import { showValidationErrorMsg, redirectPage } from './utilities';
import { toggleLoading } from './loaders';

function bind(root_elem) {
    // post
    $('body').on('click', '[data-post-url]', function (e) {
        e.preventDefault();
        var request_url = $(this).data('post-url');
        var redirect_url = $(this).data('redirect-url');
        var params = $(this).data('params') || {};
        var method = $(this).data('method') || 'POST';
        var is_delete = $(this).data('delete') || false;
        var should_confirm = $(this).data('should-confirm') || false;
        var loading_target = $(this).data('loading-target');
        var loading_class = $(this).data('loading-class') || 'loading';
        var loading_target_elem = null;
        var confirm_title = $(this).data('confirm-title') || __('Are you sure?');
        var confirm_message = $(this).data('confirm-message') || __('You will not be able to undo this delete operation!');
        var confirm_button = $(this).data('confirm-button-text') ||__('Yes, delete it!')
        var _this = this;

        if (loading_target) {
            loading_target_elem = $(loading_target);
        }

        if ( request_url ) {

            // process the params
            var request_params = {};
            for(var key in params) {
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
                        toggleLoading( $(_this), true );

                        if (loading_target_elem && loading_target_elem.length) {
                            loading_target_elem.addClass(loading_class).trigger('loading');
                        }
                    },
                    complete: function () {
                        toggleLoading( $(_this), false );

                        if (loading_target_elem && loading_target_elem.length) {
                            loading_target_elem.removeClass(loading_class).trigger('loading-complete');
                        }
                    },
                    success: function (result) {
                        redirectPage(redirect_url);
                    },
                    error: function (xhr) {
                        if (xhr.status == 422) {
                            showValidationErrorMsg(xhr);
                        } else {
                            var response = xhr.responseText;

                            try {
                                response = JSON.parse(response);
                            } catch (e) {
                            }

                            Swal.fire({
                                title: __('Error!'),
                                text: response.message || __('An error occurred while performing the action.'),
                                icon: 'error',
                                scrollbarPadding: false,
                                heightAuto: false,
                                confirmButtonText: __('OK'),
                            });
                        }
                    }
                });
            }

            // get delete confirmation
            if ( is_delete || should_confirm ) {
                Swal.fire({
                    title:  confirm_title,
                    text: confirm_message,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: confirm_button,
                    cancelButtonText: __('Cancel'),
                    scrollbarPadding: false,
                    heightAuto: false,
                    customClass: {
                        confirmButton: 'btn btn-danger',
                        cancelButton: 'btn btn-light'
                    }
                }).then(function(result){
                    if (result.value) {
                        do_request();
                    }
                });
            } else {
                do_request();
            }
        }
    });

    // delete
    $('body').on('click', '.delete-link', function (e) {
        e.preventDefault();
        var request_url = $(this).data('request-url');
        var redirect_url = $(this).data('redirect-url');
        var _this = this;
        Swal.fire({
            title: __('Are you sure?'),
            text: __('You will not be able to undo this delete operation!'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: __('Yes, delete it!'),
            cancelButtonText: __('Cancel'),
            scrollbarPadding: false,
            heightAuto: false,
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-light'
            }
        }).then(function(result){
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
                            title: __('Deleted!'),
                            text: __('The record has been deleted.'),
                            confirmButtonText: __('OK'),
                            icon: 'success',
                            scrollbarPadding: false,
                            heightAuto: false
                        }).then(
                            function () {
                                redirectPage(redirect_url);
                            }
                        );
                    },
                    error: function () {
                        Swal.fire({
                            title: __('Error!'),
                            text: __('An error occurred while deleting.'),
                            icon: 'error',
                            scrollbarPadding: false,
                            heightAuto: false,
                            confirmButtonText: __('OK'),
                        });
                    }
                });
            }
        });
    });
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export { bind, init };