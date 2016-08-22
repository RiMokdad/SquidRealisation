"use strict";
var editor_viewmodel_1 = require("./../Editor/editor.viewmodel");
var EventHandler = (function () {
    function EventHandler() {
    }
    EventHandler.SetEditorComponent = function (editor) {
        EventHandler.editor = editor;
    };
    EventHandler.OnLoad = function () {
        EventHandler.editor.OnLoad();
        var caller = {};
        caller["opendef"] = function (param) { EventHandler.editor.OpenTab(param); };
        EventHandler.editor.workspace.AddCustomContextMenu(caller);
    };
    EventHandler.NotifyRefresh = function () {
        EventHandler.editor.refreshState = editor_viewmodel_1.RefreshState.OUT_DATED;
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
//# sourceMappingURL=EventHandler.js.map