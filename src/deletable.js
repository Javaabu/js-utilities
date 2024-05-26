/**
 * Deletable
 */

function bind(root_elem) {
    // js delete
    root_elem.find('[data-deletable]').on('click', '[data-delete]', function (e) {
        e.preventDefault();
        $(this).closest($(this).data('delete')).remove();

        /*if ( $(this).hasClass('sortable') ) {
            $(this).sortable('refresh');
        }*/
    });
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export {bind, init};