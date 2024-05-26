/**
 * Content Search
 */

function bind(root_elem) {
    root_elem.find('[data-filter-checkboxes]').on('keyup', function() {
        var query = $(this).val().toLowerCase();
        var checkboxes = $(this).data('filter-checkboxes');
        var search_elem = $(this).data('search-elem') || ' > .checkbox';

        $(checkboxes + search_elem).each(function() {
            if ($(this).text().toLowerCase().indexOf(query) != -1) {
                $(this).show();
            }else{
                $(this).hide();
            }
        });
    });

    root_elem.find('[data-filter-links]').on('keyup', function() {
        var query = $(this).val().toLowerCase();
        var links_ul = $(this).data('filter-links');
        var search_elem = $(this).data('search-elem') || ' li';

        $(links_ul + search_elem).each(function() {
            if ($(this).text().toLowerCase().indexOf(query) != -1) {
                $(this).show();
            }else{
                $(this).hide();
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