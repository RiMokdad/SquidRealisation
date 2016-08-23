import { Component } from "@angular/core";
import { EditorComponent, RefreshState } from "./../Editor/editor.viewmodel";
import { ToolboxManager } from "../Toolbox/toolboxManager";

export class EventHandler {

    private static editor: EditorComponent;

    static SetEditorComponent(editor: EditorComponent) {
        EventHandler.editor = editor;
    }

    static OnLoad() {
        EventHandler.editor.OnLoad();
        var caller = {};
        caller["opendef"] = (param: any) => { EventHandler.editor.OpenTab(param) };
        EventHandler.editor.workspace.AddCustomContextMenu(caller);
    }

    static NotifyRefresh() {
        EventHandler.editor.refreshState = RefreshState.OUT_DATED;
    }
}

export class SingleAccess {
    private static toolboxMan: ToolboxManager;

    static GetToolboxManager() : ToolboxManager {
        if (!this.toolboxMan) {
            this.toolboxMan = new ToolboxManager();   
        }
        return this.toolboxMan;
    }
}