
Ac = {};
var acTags;

Ac.SetTagsAutocomplete=function(getTags) {
    acTags = goog.ui.ac
        .createSimpleAutoComplete(["toto", "titi"], document.getElementById("search-bar"), true, true).setAutoHilite(false);
    if (acTags) {
        return 0;
    }
}

Ac.RefreshTags=function() {
    acTags.matcher_ = new goog.ui.ac.ArrayMatcher(["toutou", "titi"], true);
}