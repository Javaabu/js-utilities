/**
 * Utilities
 */


/**
 * Restrict input characters
 * http://www.qodo.co.uk/blog/javascript-restrict-keyboard-character-input/
 */
function restrictCharacters(myfield, e, restrictionType) {
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    // if they pressed esc... remove focus from field...
    if (code == 27) {
        this.blur();
        return false;
    }
    // ignore if they are press other keys
    // strange because code: 39 is the down key AND ' key...
    // and DEL also equals .
    if (!e.ctrlKey && code != 9 && code != 8 && code != 36 && code != 37 && code != 38 && (code != 39 || (code == 39 && character == "'")) && code != 40) {
        if (character.match(restrictionType)) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * Convert url to slug
 */
function slugify(str, special_char) {
    if (typeof(special_char)==='undefined') special_char = '-';
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, special_char) // collapse whitespace and replace by -
        .replace(/-+/g, special_char); // collapse .

    return str;
}

/**
 * Remove string from beginnig
 */
function removeFromHead(needle, haystack) {
    needle = needle.toLowerCase();
    var ls_haystack = haystack.toLowerCase();
    while (needle.length > 0) {
        if ( ls_haystack.indexOf(needle) == 0 ) {
            return haystack.substring(needle.length);
        } else {
            needle = needle.slice(0, -1);
        }
    }
    return haystack;
}

/**
 * Generate a random string
 *
 * @return string
 */
function randString(len) {
    var string = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
        string += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return string;
}

/**
 * Convert to title case
 */
function titleCase(str, delimiter) {
    return str.split(delimiter).map(function(val){
        return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
    }).join(' ');
}

/**
 * Redirects the page
 */
function redirectPage(redirect_url) {
    if (redirect_url) {
        if (redirect_url.indexOf('#') == 0) {
            window.location.hash = redirect_url;
            window.location.reload();
        } else {
            window.location.replace(redirect_url);
        }
    } else {
        window.location.reload();
    }
}

/**
 * Serialize to json form data
 */
function getJsonFormData(form) {
    var unindexed_array = form.serializeArray();
    var indexed_array = {};


    $.map(unindexed_array, function (n, i) {
        var elem = form.filter('[name="' + n['name'] + '"]');
        var is_multiple = elem.length && elem.prop('multiple');

        // check if already exists, if so it's an array
        if (indexed_array[n['name']] || is_multiple) {
            // init array
            if (! indexed_array.hasOwnProperty(n['name'])) {
                // make a blank array
                indexed_array[n['name']] = [];
            } else if (! indexed_array[n['name']].push) {
                // make an array using the existing value
                indexed_array[n['name']] = [indexed_array[n['name']]];
            }

            // append new value
            indexed_array[n['name']].push(n['value']);
        } else {
            indexed_array[n['name']] = n['value'];
        }
    });

    return indexed_array;
}

/**
 * Show the tooltip
 *
 * @param el
 * @param message
 */
function setTooltip(el, message) {
    $(el).tooltip('hide')
        .attr('data-actual-title', $(el).attr('data-original-title'))
        .attr('data-original-title', message)
        .tooltip('show');
}

/**
 * Hide the tooltip
 *
 * @param el
 */
function hideTooltip(el) {
    setTimeout(function() {
        $(el).tooltip('hide')
            .attr('data-original-title',  $(el).attr('data-actual-title'));
    }, 1000);
}

/**
 * Escapes html
 */
function e(text) {
    return $('<div />').text(text).html();
}

export {
    restrictCharacters,
    slugify,
    removeFromHead,
    randString,
    titleCase,
    redirectPage,
    getJsonFormData,
    setTooltip,
    hideTooltip,
    e
};