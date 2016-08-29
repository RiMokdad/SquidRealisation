"use strict";
var DisplayTools = (function () {
    function DisplayTools() {
    }
    DisplayTools.switch = function (value, elements) {
        var n = elements.length;
        value = MyMath.mod(value, n);
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
        return MyMath.mod(value + 1, n);
    };
    return DisplayTools;
}());
exports.DisplayTools = DisplayTools;
var MyMath = (function () {
    function MyMath() {
    }
    /**
     * The modulo of n ranging from 0 to m.
     * @param n
     * @param m
     */
    MyMath.mod = function (n, m) {
        return ((n % m) + m) % m;
    };
    return MyMath;
}());
exports.MyMath = MyMath;
//# sourceMappingURL=utils.js.map