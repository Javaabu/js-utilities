/**
 * Lang
 */

function init() {
    if (Lang === undefined) {
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
    if (Lang === undefined) {
        return key;
    }

    if (params === undefined) {
        params = {};
    }

    if (locale === undefined) {
        locale = Lang.getLocale();
    }

    // https://github.com/rmariuzzo/Laravel-JS-Localization/issues/105#issuecomment-723641837
    if (Lang.has('strings.' + key)) {
        return Lang.get('strings.' + key, params, locale);
    } else {
        return key;
    }
}

export { __, init };