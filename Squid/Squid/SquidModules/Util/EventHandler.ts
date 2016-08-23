import { Component } from "@angular/core";
import { EditorComponent, RefreshState } from "./../Editor/editor.viewmodel";
import { Decoder } from "./Decoder";
import { ToolboxManager } from "../Toolbox/toolboxManager";

export class EventHandler {

    private static editor: EditorComponent;

    static SetEditorComponent(editor: EditorComponent) {
        EventHandler.editor = editor;
    }

    static OnLoad() {
        EventHandler.editor.OnLoad();
        const callback = (param: any) => { EventHandler.editor.OpenTab(param) };
        EventHandler.editor.workspace.AddCustomContextMenu(callback);
    }

    static NotifyRefresh() {
        EventHandler.editor.refreshState = RefreshState.OUT_DATED;
    }
}

export class SingleAccess {
    private static toolboxMan: ToolboxManager;
    private static decoder: Decoder;

    static GetToolboxManager() : ToolboxManager {
        if (!this.toolboxMan) {
            this.toolboxMan = new ToolboxManager();   
        }
        return this.toolboxMan;
    }

    static GetDecoder(): Decoder {
        if (!this.decoder) {
            this.decoder = new Decoder();
        }
        return this.decoder;
    }

}