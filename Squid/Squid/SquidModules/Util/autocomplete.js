
Ac = {};
var acTags;

Ac.SetTagsAutocomplete = function (getTags) {
    var anchor = document.getElementById("tags");
    var tags = getTags();
    acTags = goog.ui.ac
        .createSimpleAutoComplete(tags, anchor, false);
    acTags.setAutoHilite(false);
}

Ac.RefreshTags = function (getTags) {
    acTags.matcher_ = new goog.ui.ac.ArrayMatcher(getTags(), true);
}

Ac.SetCategoryAutocomplete = function (getCategories) {
    var anchor = document.getElementById("category");
    var categories = getCategories();
    acTags = goog.ui.ac
        .createSimpleAutoComplete(categories, anchor, false);
    acTags.setAutoHilite(false);
}

Ac.RefreshCategories = function (getCategories) {
    acTags.matcher_ = new goog.ui.ac.ArrayMatcher(getCategories(), true);
}