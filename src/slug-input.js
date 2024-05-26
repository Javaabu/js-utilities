/**
 * Conditional Display
 */

import { slugify } from './utilities';

let config = {
    iconPrefix: 'fa',
}

config.editIcon = config.iconPrefix + '-edit';
config.saveIcon = config.iconPrefix + '-check';

function bind(root_elem) {
    /**
     * Slug
     */
    root_elem.find('.slug.input-group').each(function(e) {

        var _this = $(this);
        var input = _this.find('input');
        var toggled = _this.data('toggled') || false;
        var toggle_icon = _this.data('tg-icon') || config.editIcon;
        var save_icon = config.saveIcon;
        var cancel_btn = _this.find('.cancel');
        var edit_btn = _this.find('.edit');
        var link = _this.find('.url');
        var url_prefix = _this.find('.url-prefix');
        var prefix = url_prefix.text().trim();

        // save the value
        _this.data('val', input.val());

        // Hide inputs
        function hideInput() {
            // change the input type to hidden
            input.prop('type', 'hidden');

            // change icon to edit
            edit_btn.find('i')
                .removeClass(save_icon)
                .addClass(toggle_icon);

            // hide the cancel button
            cancel_btn.addClass('d-none');

            // hide the url prefix
            url_prefix.addClass('d-none');

            // change the link
            link.text(prefix + input.val())
                .removeClass('d-none');

            _this.removeClass('toggled');

            toggled = false;
        }

        // Save inputs
        function saveInput(val) {
            // save the current value
            input.val(slugify(val));
            _this.data('val', val);

            // enable the input
            input.prop('disabled', false);
        }

        _this.on('slug.change', function (e, val) {
            if (! toggled) {
                saveInput(val);
                hideInput();
            }
        });

        // slug toggle
        edit_btn.on('click', function (e) {
            e.preventDefault();

            saveInput(input.val());

            // saving
            if (toggled) {
                hideInput();
            } else {
                // editing

                // change the input type to text
                input.prop('type', 'text');

                // hide the link
                link.addClass('d-none');

                // show the url prefix
                url_prefix.removeClass('d-none');

                // change icon to save
                $(this).find('i')
                    .removeClass(toggle_icon)
                    .addClass(save_icon);

                // show the cancel button
                cancel_btn.removeClass('d-none');

                _this.addClass('toggled');

                toggled = true;
            }
        });

        // cancel slug update
        cancel_btn.on('click', function (e) {
            e.preventDefault();

            // reset the value
            input.val(_this.data('val'));

            // disable the input
            input.prop('disabled', true);

            // hide the input
            hideInput();
        });
    });
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export { bind, init, config };