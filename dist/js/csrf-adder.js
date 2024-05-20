/**
 * We'll register a HTTP interceptor to attach the "CSRF" header to each of
 * the outgoing requests issued by this application. The CSRF middleware
 * included with Laravel will automatically verify the header's value.
 */
(function () {
    var token = document.head.querySelector('meta[name="csrf-token"]');
    var site_domain = window.location.origin;

    if (token) {
        var op = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function (method, url) {
            var resp = op.apply(this, arguments);
            var internal_request = url.indexOf(site_domain, 0) === 0 || url.indexOf('http') !== 0;

            if (internal_request) {
                this.setRequestHeader('X-CSRF-Token', token.content);
            }

            return resp;
        };
    }
}());