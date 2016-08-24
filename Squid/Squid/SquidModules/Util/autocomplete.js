
Ac = function () {
    // PRIVATE
    this.acTags=null;
    this.acCategory = null;
    this.acSearchBar = null;

    this.tagsAnchor = document.getElementById("tags");
    this.categoryAnchor = document.getElementById("category");
    this.searchbarAnchor = document.getElementById("search-bar");

    /**
     * Create the autocompletion for a field input
     * @param {function} getList the method to get the list used by auto completion
     * @param {} anchor the field input
     * @param {} flag null if it is the first time we create auto completion
     * for this input, then will be set by this method
     * @param {boolean} multEntries true if the input can have multiple entries
     * separated by separators(commas usually), false otherwise
     * @returns {} 
     */
    var setFieldAutocomplete = function (getList, anchor, flag, multEntries) {
        var list = getList();
        if (!flag) {
            flag = goog.ui.ac
                .createSimpleAutoComplete(list, anchor, multEntries);
            flag.setAutoHilite(false);
        } else {
            flag.matcher_ = new goog.ui.ac.ArrayMatcher(getList(), true);
        }
    }

    // PUBLIC
    this.SetTagsAutoComplete = function (getTags) {
        setFieldAutocomplete(getTags, this.tagsAnchor, this.acTags, true);
    }


    this.SetCategoryAutoComplete = function (getCategories) {
        setFieldAutocomplete(getCategories, this.categoryAnchor, this.acCategory, false);
    }

    this.SetSearchBarAutoComplete = function (getTags) {
        setFieldAutocomplete(getTags, this.searchbarAnchor, this.acSearchBar, true);
    }
};



