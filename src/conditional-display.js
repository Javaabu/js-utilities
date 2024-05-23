/**
 * Conditional Display
 */

let config = {
    iconPrefix: 'fa',
}

config.editIcon = config.iconPrefix + '-edit';
config.closeIcon = config.iconPrefix + '-close';

function bind(root_elem) {
    // checkbox disable toggle
    root_elem.find('[data-toggle-checkbox]').change(function(){
        var input = $($(this).data('toggle-checkbox'));
        if ( input.length ) {
            var checked = $(this).is(':checked');
            input.each(function () {
                $(this).prop('disabled', checked);
            });
        }
    }).trigger('change');

    // checkbox enable toggle
    root_elem.find('[data-enable-checkbox]').change(function(){
        var fields = $($(this).data('enable-checkbox'));
        var checked = $(this).is(':checked');
        var enable = $(this).data('disable') ? !checked : checked;
        if ( fields.length ) {
            if ( enable ) {
                // if enable, select only auto-disabled
                fields.find('select.auto-disabled:disabled, input.auto-disabled:disabled').each(function () {
                    $(this).prop('disabled', false)
                        .removeClass('auto-disabled');
                });

                fields.slideDown();
            } else {
                // if disable, select only enabled
                fields.find('select:enabled, input:enabled').each(function () {
                    $(this).prop('disabled', true)
                        .addClass('auto-disabled');
                });

                fields.slideUp();
            }
        }
    }).trigger('change');

    // Enable the section only when check box is checked
    root_elem.find('[data-enable-section-checkbox]').each(function () {
        var _this = $(this);
        var checkbox = $(_this.data('enable-section-checkbox'));
        var hide_fields = _this.data('hide-fields') || false;
        var disable_on_select = _this.data('disable') || false;

        if (checkbox.length) {
            checkbox.on('change', function () {
                var matching_selected = checkbox.is(':checked');
                var enable = disable_on_select ? (!matching_selected) : matching_selected;

                if (enable) {
                    // if enable, enable only auto-disabled
                    _this.find('select.auto-disabled:disabled, input.auto-disabled:disabled, textarea.auto-disabled:disabled').each(function () {
                        $(this).prop('disabled', false)
                            .removeClass('auto-disabled');
                    });
                } else {
                    // if disable, enable only enabled
                    _this.find('select:enabled, input:enabled, textarea:enabled').each(function () {
                        $(this).prop('disabled', true)
                            .addClass('auto-disabled');
                    });
                }

                if (hide_fields) {
                    if (enable) {
                        _this.slideDown();
                    } else {
                        _this.slideUp();
                    }
                }
            }).trigger('change');
        }
    });

    // Enable the section only when another element is a
    // given value
    root_elem.find('[data-enable-section-value]').each(function () {
        var _this = $(this);
        var value = _this.data('enable-section-value');
        var element = $(_this.data('enable-elem'));
        var hide_fields = _this.data('hide-fields') || false;
        var disable_on_select = _this.data('disable') || false;

        if (element.length) {
            element.on('change', function () {
                var curr_val = $(this).val();
                var matching_selected = false;

                if (value instanceof Array) {
                    matching_selected = value.findIndex(function (e) {
                        return e == curr_val;
                    }) > -1;
                } else {
                    matching_selected = curr_val == value;
                }

                var enable = disable_on_select ? (!matching_selected) : matching_selected;

                if (enable) {
                    // if enable, enable only auto-disabled
                    _this.find('select.auto-disabled:disabled, input.auto-disabled:disabled, textarea.auto-disabled:disabled').each(function () {
                        $(this).prop('disabled', false)
                            .removeClass('auto-disabled');
                    });
                } else {
                    // if disable, enable only enabled
                    _this.find('select:enabled, input:enabled, textarea:enabled').each(function () {
                        $(this).prop('disabled', true)
                            .addClass('auto-disabled');
                    });
                }

                if (hide_fields) {
                    if (enable) {
                        _this.slideDown();
                    } else {
                        _this.slideUp();
                    }
                }
            }).trigger('change');
        }
    });

    // disable on select
    root_elem.find('[data-disable-on-select]').on('change', function(){
        var fields = $($(this).data('disable-on-select'));
        if ( fields.length ) {
            var disable = $(this).val() && true;
            var hide_fields = $(this).data('hide-fields') || false;

            if ( disable ) {
                // if disable, select only enabled
                fields.find('select:enabled, input:enabled').each(function () {
                    $(this).prop('disabled', true)
                        .addClass('auto-disabled');
                });
            } else {
                // if enable, select only auto-disabled
                fields.find('select.auto-disabled:disabled, input.auto-disabled:disabled').each(function () {
                    $(this).prop('disabled', false)
                        .removeClass('auto-disabled');
                });
            }

            if (hide_fields) {
                if (disable) {
                    fields.slideUp();
                } else {
                    fields.slideDown();
                }
            }
        }
    }).trigger('change');

    root_elem.find('[data-toggle-hide]').on('click', function (e) {
        e.preventDefault();
        var elem = $($(this).data('toggle-hide'));

        if (elem.length) {
            if (elem.data('toggled') || false) {
                elem.hide();
                elem.data('toggled', false);
            } else {
                elem.show();
                elem.data('toggled', true);
            }
        }
    });

    // toggle fields
    root_elem.find('[data-tg-toggle]').on('click', function(e){
        e.preventDefault();
        var toggle_block = $($(this).data('tg-toggle'));
        if ( toggle_block.length ) {
            toggle_block.toggleClass('toggled');
            var toggle_icon = $(this).data('tg-icon') || config.editIcon;
            $(this).toggleClass(toggle_icon + ' ' + config.closeIcon);
        }
    });

    // input toggle
    root_elem.find('[data-input-toggle]').on('click', function(e){
        e.preventDefault();
        var input = $($(this).data('input-toggle'));
        if ( input.length ) {
            input.prop('disabled', !input.prop('disabled'));
            var toggle_icon = $(this).data('tg-icon') || config.editIcon;
            $(this).find('i').toggleClass(toggle_icon + ' ' + config.closeIcon);
        }
    });
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export { bind, init, config };