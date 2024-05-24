/**
 * Date Input
 */

let config = {
    iconPrefix: 'fa',
}

config.nextArrowIcon = config.iconPrefix + '-long-arrow-right';
config.prevArrowIcon = config.iconPrefix + '-long-arrow-left';

function bind(root_elem) {
    // clear date
    root_elem.find('[data-date-clear]').on('click', function (e) {
        e.preventDefault();

        var date_el = $($(this).data('date-clear'));

        if (date_el.length && (!date_el.prop('disabled'))) {
            date_el.val('');
        }
    });

    /*------------------------------------------------
        Datetime picker (Flatpickr)
    ------------------------------------------------*/
    // Date and time
    if (root_elem.find('.datetime-picker')[0]) {
        root_elem.find('.datetime-picker').flatpickr({
            allowInput: true,
            enableTime: true,
            nextArrow: `<i class="${config.iconPrefix} ${config.nextArrowIcon}" />`,
            prevArrow: `<i class="${config.iconPrefix} ${config.prevArrowIcon}" />`
        });
    }

    // Date only
    if (root_elem.find('.date-picker')[0]) {
        root_elem.find('.date-picker').flatpickr({
            allowInput: true,
            enableTime: false,
            nextArrow: `<i class="${config.iconPrefix} ${config.nextArrowIcon}" />`,
            prevArrow: `<i class="${config.iconPrefix} ${config.prevArrowIcon}" />`
        });
    }

    // Time only
    if (root_elem.find('.time-picker')[0]) {
        root_elem.find('.time-picker').flatpickr({
            allowInput: true,
            noCalendar: true,
            enableTime: true
        });
    }
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export {bind, init, config};