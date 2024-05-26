/**
 * Submit Confirmation
 */

import { __ } from './lang';

function bind(root_elem) {
    // confirm button
    root_elem.find('[data-confirm]').on('click', function(e){
        e.preventDefault();

        var target_form = $(this).closest('form');
        var _this = $(this);

        if (target_form.length)  {
            Swal.fire({
                title: __('Are you sure?'),
                text: _this.data('confirm') || __('Just checking if you wanted to really do this.'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: __('Yes, continue!'),
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-light'
                }
            }).then(function(result){
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

    // delete form
    root_elem.find('.delete-form').submit( function(e){
        var action_control = $(this).find('[name=action]');
        var action = action_control ? action_control.val() : '';

        if ( action == 'delete' || action == 'force_delete' ) {
            e.preventDefault();
            Swal.fire({
                title: __('Are you sure?'),
                text: __('You will not be able to undo this delete operation!'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: __('Yes, delete it!'),
                customClass: {
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-light'
                }
            }).then(function(result){
                if (result.value) {
                    e.currentTarget.submit();
                }
            });
        }
    });
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export { bind, init };