"use strict";
var Onglet = (function () {
    function Onglet() {
    }
    Onglet.OpenTab = function (decoder) {
        if (decoder) {
            window.open(Onglet.CreateIdUrl(decoder.id));
            return;
        }
        window.open(Onglet.GetBaseUrl());
    };
    /**
     * Get the base url of the page
     */
    Onglet.GetBaseUrl = function () {
        return "index.html";
    };
    /**
     * Create the url string with the given id
     * @param id
     */
    Onglet.CreateIdUrl = function (id) {
        return Onglet.GetBaseUrl() + "#" + id;
    };
    /**
     * Get the id after the hash in the url
     * @return return the id as a number, or null if there is no id
     */
    Onglet.GetBlockIdInUrl = function () {
        return parseInt(window.location.hash.substring(1)) || null;
    };
    /**
     * Set the hash of this page to the decoder id
     */
    Onglet.SetUrl = function (decoder) {
        window.location.hash = decoder.Id ? "" + decoder.Id : "";
    };
    return Onglet;
}());
exports.Onglet = Onglet;
//# sourceMappingURL=Onglet.js.map