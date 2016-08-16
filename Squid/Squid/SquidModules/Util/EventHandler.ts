import { Component } from "@angular/core";
import { EditorComponent} from "./../Editor/editor.viewmodel";

export class EventHandler {

    private static editor: EditorComponent;

    static SetEditorComponent(editor: EditorComponent) {
        EventHandler.editor = editor;
    }

    OnLoad() {
        EventHandler.editor.OnLoad();
    }
}