/**
 * Select All Checkbox
 */

function bind(root_elem) {
    // check all boxes when select all clicked
    root_elem.find('input[type="checkbox"][data-all]').on('change', function (e) {
        e.preventDefault();
        var select_all_name = $(this).data('all');
        var is_checked = $(this).prop('checked');
        $('input[type="checkbox"][data-check="'+select_all_name+'"]').each(function () {
            $(this).prop('checked', is_checked);
        });
    });

    // uncheck select all when one box unchecked
    root_elem.find('input[type="checkbox"][data-check]').on('change', function (e) {
        e.preventDefault();
        var is_checked = $(this).prop('checked');
        if ( !is_checked ) {
            var select_all_name = $(this).data('check');
            var select_all = $('input[type="checkbox"][data-all="'+select_all_name+'"]');
            if ( select_all ) {
                select_all.prop('checked', false);
            }
        }
    });
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export {bind, init};