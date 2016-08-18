import { Component } from "@angular/core";
import { EditorComponent, RefreshState } from "./../Editor/editor.viewmodel";

export class EventHandler {

    private static editor: EditorComponent;

    static SetEditorComponent(editor: EditorComponent) {
        EventHandler.editor = editor;
    }

    static OnLoad() {
        EventHandler.editor.OnLoad();
        EventHandler.editor.workspace.AddCustomContextMenu(EventHandler.editor.OpenTab);
    }

    static NotifyRefresh() {
        EventHandler.editor.refreshState = RefreshState.OUT_DATED;
    }
}