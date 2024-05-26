/**
 * URL Input
 */
import {removeFromHead} from './utilities';

function bind(root_elem) {
    //url input
    root_elem.find("input[type='url']").keyup(function (e) {
        var string = $(this).val();
        if (!(/^(http|https):\/\//i.test(string))) {
            var protocol = 'http';
            var removed = removeFromHead("http", string);
            if (removed.indexOf('s') == 0) {
                removed = removeFromHead("s://", removed);
                protocol += 's';
            } else {
                removed = removeFromHead("://", removed);
            }
            if (removed != '') {
                string = protocol + "://" + removed;
            }
        }
        $(this).val(string);
    });
}

function init() {
    $(document).ready(function () {
        bind($(document));
    });
}

export {bind, init};