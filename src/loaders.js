/**
 * Loaders
 */


let config = {
    iconPrefix: 'fa',
    loadingClass: 'loading',
    loadingTag: 'i',
    preloaderClass: 'page-loading'
}

config.loaderIcon = config.iconPrefix + '-circle-notch';
config.loaderAnimation = config.iconPrefix + '-spin';
config.loadingElem = `<${config.loadingTag} class="${config.iconPrefix} ${config.loaderIcon} ${config.loaderAnimation} added-loader ${config.loadingClass} me-2"></${config.loadingTag}> `;

/**
 * Show loading
 */
function toggleLoading(elem, show) {
    if (elem.hasClass(config.iconPrefix)) {
        if (show) {
            elem.addClass(config.loadingClass);
        } else {
            elem.removeClass(config.loadingClass);
        }
    } else if (elem.find('.' + config.iconPrefix + ':not(.added-loader)').length > 0) {
        if (show) {
            elem.children('.' + config.iconPrefix).addClass(config.loadingClass);
        } else {
            elem.children('.' + config.iconPrefix).removeClass(config.loadingClass);
        }
    } else {
        if (show) {
            var loading = config.loadingElem;
            elem.children(config.loadingTag).hide();
            elem.prepend(loading);
        } else {
            elem.children('.' + config.loadingClass).remove();
            elem.children(config.loadingTag).show();
        }
    }
}

/**
 * Toggle preloader
 */
function togglePreloader(show) {
    if (show) {
        $('body').addClass(config.preloaderClass + ' ' + config.preloaderClass + '-fadein');
    } else {
        $('.' + config.preloaderClass).removeClass(config.preloaderClass + ' ' + config.preloaderClass + '-fadeout');
    }
}

function init() {
    $(document).ready(function () {
        $('.animate-submit').click(function(e) {
            var form_element = $(this).closest('form');

            if (form_element.length && form_element[0].checkValidity()) {
                toggleLoading($(this), true);
            }
        });
    });
}

export {
    config,
    toggleLoading,
    togglePreloader,
    init
};