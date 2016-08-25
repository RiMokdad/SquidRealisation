"use strict";
var Utils;
(function (Utils) {
    function GenerateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    Utils.GenerateUUID = GenerateUUID;
    function RemoveDuplicates(array) {
        var seen = {};
        return array.filter(function (item) { return (seen.hasOwnProperty(item) ? false : (seen[item] = true)); });
    }
    Utils.RemoveDuplicates = RemoveDuplicates;
})(Utils || (Utils = {}));
var DisplayTools = (function () {
    function DisplayTools() {
    }
    DisplayTools.switch = function (value, elements) {
        var n = elements.length;
        value = Math.mod(value, n);
        for (var i = 0; i < n; i++) {
            var side = elements[i];
            if ((i % n) === value) {
                side.style.visibility = "visible";
                side.style.transform = "rotateY(360deg)";
            }
            else {
                side.style.visibility = "hidden";
                side.style.transform = "rotateY(180deg)";
            }
        }
        return Math.mod(value + 1, n);
    };
    return DisplayTools;
}());
exports.DisplayTools = DisplayTools;
var Math = (function () {
    function Math() {
    }
    /**
     * The modulo of n ranging from 0 to m.
     * @param n
     * @param m
     */
    Math.mod = function (n, m) {
        return ((n % m) + m) % m;
    };
    return Math;
}());
exports.Math = Math;
//# sourceMappingURL=utils.js.map