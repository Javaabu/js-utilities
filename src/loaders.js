/**
 * Loaders
 */

let iconPrefix = 'fa';
let loadingClass = 'loading';
let loadingTag = 'i';
let loaderIcon = iconPrefix + '-loader';
let loaderAnimation = iconPrefix + '-spin';
let loadingElem = `<${loadingTag} class="${iconPrefix} ${loaderIcon} ${loaderAnimation} added-loader ${loadingClass} me-2"></${loadingTag}> `;
let preloaderClass = 'page-loading';

/**
 * Show loading
 */
function toggleLoading(elem, show) {
    if (elem.hasClass(iconPrefix)) {
        if (show) {
            elem.addClass(loadingClass);
        } else {
            elem.removeClass(loadingClass);
        }
    } else if (elem.find('.' + iconPrefix + ':not(.added-loader)').length > 0) {
        if (show) {
            elem.children('.' + iconPrefix).addClass(loadingClass);
        } else {
            elem.children('.' + iconPrefix).removeClass(loadingClass);
        }
    } else {
        if (show) {
            var loading = loadingElem;
            elem.children(loadingTag).hide();
            elem.prepend(loading);
        } else {
            elem.children('.' + loadingClass).remove();
            elem.children(loadingTag).show();
        }
    }
}

/**
 * Toggle preloader
 */
function togglePreloader(show) {
    if (show) {
        $('body').addClass(preloaderClass + ' ' + preloaderClass + '-fadein');
    } else {
        $('.' + preloaderClass).removeClass(preloaderClass + ' ' + preloaderClass + '-fadeout');
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
    iconPrefix,
    loadingClass,
    loadingTag,
    loaderIcon,
    loaderAnimation,
    loadingElem,
    preloaderClass,
    toggleLoading,
    togglePreloader,
    init
};