/**
 * Script for small notifications on the window
 */
var Example = (function () {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function (options) {
        elem = $(options.selector);
    };

    that.show = function (text) {
        clearTimeout(hideHandler);

        elem.find("span").html(text);
        elem.delay(200).fadeIn().delay(3000).fadeOut();
    };

    return that;
}());