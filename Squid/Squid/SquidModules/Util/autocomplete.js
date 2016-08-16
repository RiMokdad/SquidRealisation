
Ac = {};
var acTags;

Ac.SetTagsAutocomplete = function (getTags) {
    var anchor = document.getElementById("tags");
    acTags = goog.ui.ac
        .createSimpleAutoComplete(["toto", "titi"], anchor, false).setAutoHilite(false);
}

Ac.RefreshTags=function() {
    acTags.matcher_ = new goog.ui.ac.ArrayMatcher(["toutou", "titi"], true);
}