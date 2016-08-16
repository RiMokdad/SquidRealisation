import { Component } from "@angular/core";
import { EditorComponent} from "./../Editor/editor.viewmodel";

export class EventHandler {

    editorViewModel = new EditorComponent();

    private static singleton: EventHandler;

    static GetInstance(): EventHandler {
        return EventHandler.singleton;
    }

    constructor() {
        EventHandler.singleton = this;
    }

    OnLoadEvent() {
        this.editorViewModel.OnLoad();
    }

    static OnLoadEvent() {
        EventHandler.singleton.OnLoadEvent();
    }
}