var Utils;
(function (Utils) {
    function GenerateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
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
//# sourceMappingURL=utils.js.map