/**
 * File Upload Input
 */

import { __ } from './lang';
import { showValidationErrorMsg, redirectPage, notify } from './utilities';
import { toggleLoading } from './loaders';

let uploading_file = false;

function bind(root_elem) {
    /**
     * File upload input
     */
    root_elem.find('[data-provides="fileinput-upload"] input[type=file]').on('change', function (e) {
        // return if already uploading
        if (uploading_file) return;

        var files = e.target.files || e.dataTransfer.files;

        // abort if no files selected
        if (! files.length) return;

        // get the specific file
        var file = files[0];

        // get the file size in kb
        var max_file_size = $(this).data('max-file-size') || (2 * 1024); // default to 2MB
        var file_size_kb = Math.round((file.size / 1024));

        // validate file size
        if (file_size_kb > max_file_size) {
            var max_file_size_mb = Math.round(max_file_size / 1024);
            notify('', __('File size cannot be greater than :size MB', {'size': max_file_size_mb}), 'danger');

            // abort
            return;
        }

        // get the accepted file types
        var accepted_types = this.accept.split(',');
        var num_accepted = accepted_types.length;

        // validate file type
        var accepted = false;
        for (var i = 0; i < num_accepted; i++) {
            var MIMEtype = new RegExp(accepted_types[i].trim().replace( '*', '.\*' ));
            if (MIMEtype.test(file.type)) {
                accepted = true;
                break;
            }
        }

        if (! accepted) {
            notify('', __('Only :accept files are allowed.', {'accept': this.accept}), 'danger');
            return;
        }

        // get the upload button
        var upload_btn = $(this).siblings('.upload-btn');

        // get the url
        var form = $(this).closest('form');
        if (! form.length) return; // abort if form

        var upload_url = form.prop('action');
        var form_method = form.find('input[name="_method"]');
        var upload_method = form.prop('method') || 'POST';
        if (form_method.length) {
            upload_method = form_method.val();
        }

        // prepare the formdata
        var form_data = new FormData();
        form_data.append(this.name, file);

        if (upload_method != 'POST') {
            form_data.append('_method', upload_method);
            upload_method = 'POST';
        }

        // save the previous btn html
        var btn_html = upload_btn.html();

        $.ajax({
            url: upload_url,
            type: upload_method,
            data: form_data,

            // Tell jQuery not to process data or worry about content-type
            // You *must* include these options!
            cache: false,
            contentType: false,
            processData: false,

            beforeSend: function () {
                uploading_file = true;
                upload_btn.html('<i></i> ' + __('Uploading...'));
                toggleLoading(upload_btn, true);
            },

            complete: function () {
                uploading_file = false;
                /*toggleLoading(upload_btn, false);
                upload_btn.html(btn_html);*/
            },

            success: function (result) {
                redirectPage();
            },

            error: function (xhr) {
                toggleLoading(upload_btn, false);
                upload_btn.html(btn_html);

                if (xhr.status == 422) {
                    showValidationErrorMsg(xhr);
                } else {
                    Swal.fire({
                        title: __('Error!'),
                        text: __('An error occurred while uploading the file.'),
                        icon: 'error'
                    });
                }
            }
        });
    });

    /**
     * File upload remove
     */
    root_elem.find('[data-provides="fileinput-upload"] [data-dismiss="fileinput"]').on('click', function (e) {
        e.preventDefault();

        // return if uploading
        if (uploading_file) return;

        var remove_btn = $(this);

        // get the url
        var form = $(this).closest('form');
        if (!form.length) return; // abort if form

        var file_input = remove_btn.siblings('.btn-file').find('input[type=file]');
        var input_name = file_input.prop('name');

        var upload_url = form.prop('action');
        var form_method = form.find('input[name="_method"]');
        var upload_method = form.prop('method') || 'POST';
        if (form_method.length) {
            upload_method = form_method.val();
        }

        // prepare the formdata
        var form_data = {};
        form_data[input_name] = '';

        if (upload_method != 'POST') {
            form_data['_method'] = upload_method;
            upload_method = 'POST';
        }

        function do_remove_file() {
            // save the previous btn html
            var btn_html = remove_btn.html();

            $.ajax({
                url: upload_url,
                type: upload_method,
                data: form_data,

                beforeSend: function () {
                    uploading_file = true;
                    remove_btn.html('<i></i> ' + __('Removing...'));
                    toggleLoading(remove_btn, true);
                },

                complete: function () {
                    uploading_file = false;
                    /*toggleLoading(remove_btn, false);
                    remove_btn.html(btn_html);*/
                },

                success: function (result) {
                    redirectPage();
                },

                error: function (xhr) {
                    toggleLoading(remove_btn, false);
                    remove_btn.html(btn_html);

                    if (xhr.status == 422) {
                        showValidationErrorMsg(xhr);
                    } else {
                        Swal.fire({
                            title: __('Error!'),
                            text: __('An error occurred while removing the file.'),
                            icon: 'error'
                        });
                    }
                }
            });
        }

        // get delete confirmation
        Swal.fire({
            title: __('Are you sure?'),
            text: __('You will not be able to undo deleting this file!'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: __('Yes, remove it!'),
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-light'
            }
        }).then(function(result){
            if (result.value) {
                do_remove_file();
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