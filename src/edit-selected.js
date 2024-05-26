/**
 * Sortable
 */

function bind(root_elem) {
    /**
     * Edit the selected model
     */
    root_elem.find('[data-edit-selected]').each(function(e) {
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
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export {bind, init};