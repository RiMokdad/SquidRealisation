"use strict";
var editor_viewmodel_1 = require("./../Editor/editor.viewmodel");
var EventHandler = (function () {
    function EventHandler() {
        this.editorViewModel = new editor_viewmodel_1.EditorComponent();
        EventHandler.singleton = this;
    }
    EventHandler.GetInstance = function () {
        return EventHandler.singleton;
    };
    EventHandler.prototype.OnLoadEvent = function () {
        this.editorViewModel.OnLoad();
    };
    EventHandler.OnLoadEvent = function () {
        EventHandler.singleton.OnLoadEvent();
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
//# sourceMappingURL=EventHandler.js.map