/**
 * Post Links
 */

import { __ } from './lang';
import { showValidationErrorMsg, redirectPage } from './utilities';
import { toggleLoading } from './loaders';

function bind(root_elem) {
    // post
    root_elem.find('[data-post-url]').click(function(e){
        e.preventDefault();
        var request_url = $(this).data('post-url');
        var redirect_url = $(this).data('redirect-url');
        var params = $(this).data('params') || {};
        var method = $(this).data('method') || 'POST';
        var is_delete = $(this).data('delete') || false;
        var _this = this;

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
                    },
                    complete: function () {
                        toggleLoading( $(_this), false );
                    },
                    success: function (result) {
                        redirectPage(redirect_url);
                    },
                    error: function (xhr) {
                        if (xhr.status == 422) {
                            showValidationErrorMsg(xhr);
                        } else {
                            Swal.fire({
                                title: __('Error!'),
                                text: __('An error occurred while performing the action.'),
                                icon: 'error',
                                scrollbarPadding: false,
                                heightAuto: false
                            });
                        }
                    }
                });
            }

            // get delete confirmation
            if ( is_delete ) {
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
                        do_request();
                    }
                });
            } else {
                do_request();
            }
        }
    });

    // delete
    root_elem.find('.delete-link').click(function(e){
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
                            heightAuto: false
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