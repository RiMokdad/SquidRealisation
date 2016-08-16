"use strict";
var EventHandler = (function () {
    function EventHandler() {
    }
    EventHandler.SetEditorComponent = function (editor) {
        EventHandler.editor = editor;
    };
    EventHandler.OnLoad = function () {
        EventHandler.editor.OnLoad();
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
//# sourceMappingURL=EventHandler.js.map