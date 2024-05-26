/**
 * Sortable
 */

function bind(root_elem) {
    // sortable
    root_elem.find('.sortable').sortable({
        placeholder: 'ui-state-highlight',
        helper: 'clone',
        update: function (event, ui) {
            var sort_url = $(this).data('sort-url');
            if ( sort_url ) {
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
    root_elem.find('[data-sort-field]').click(function(e){
        e.preventDefault();

        //find the parent form
        var parent_form_selector = $(this).closest('[data-form-sortable]').data('form-sortable');
        var parent_form = $('form'+parent_form_selector);
        if ( parent_form ) {

            var field = $(this).data('sort-field');
            var order = $(this).hasClass('sorting_asc') ? 'DESC' : 'ASC';

            parent_form.find('[name="orderby"]').val(field);
            parent_form.find('[name="order"]').val(order);
            parent_form.submit();
        }
    });
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export {bind, init};