"use strict";
var editor_viewmodel_1 = require("./../Editor/editor.viewmodel");
var Decoder_1 = require("./Decoder");
var toolboxManager_1 = require("../Toolbox/toolboxManager");
var EventHandler = (function () {
    function EventHandler() {
    }
    EventHandler.SetEditorComponent = function (editor) {
        EventHandler.editor = editor;
    };
    EventHandler.OnLoad = function () {
        EventHandler.editor.OnLoad();
        var callback = function (param) { EventHandler.editor.OpenTab(param); };
        EventHandler.editor.workspace.AddCustomContextMenu(callback);
    };
    EventHandler.NotifyRefresh = function () {
        EventHandler.editor.refreshState = editor_viewmodel_1.RefreshState.OUT_DATED;
    };
    return EventHandler;
}());
exports.EventHandler = EventHandler;
var SingleAccess = (function () {
    function SingleAccess() {
    }
    SingleAccess.GetToolboxManager = function () {
        if (!this.toolboxMan) {
            this.toolboxMan = new toolboxManager_1.ToolboxManager();
        }
        return this.toolboxMan;
    };
    SingleAccess.GetDecoder = function () {
        if (!this.decoder) {
            this.decoder = new Decoder_1.Decoder();
        }
        return this.decoder;
    };
    return SingleAccess;
}());
exports.SingleAccess = SingleAccess;
//# sourceMappingURL=EventHandler.js.map