/**
 * Lang
 */

function init() {
    if (typeof window.Lang === 'undefined') {
        return;
    }

    var locale = document.documentElement.lang;

    if (locale) {
        Lang.setLocale(locale);
    } else {
        Lang.setLocale('en');
    }
}

function __(key, params, locale) {
    if (typeof window.Lang === 'undefined') {
        return key;
    }

    if (params === undefined) {
        params = {};
    }

    if (locale === undefined) {
        locale = Lang.getLocale();
    }

    // https://github.com/rmariuzzo/Laravel-JS-Localization/issues/105#issuecomment-723641837
    if ((! Lang.has(key)) && Lang.has('strings.' + key)) {
        key = 'strings.' + key;
    }

    return Lang.get(key, params, locale);
}

export { __, init };