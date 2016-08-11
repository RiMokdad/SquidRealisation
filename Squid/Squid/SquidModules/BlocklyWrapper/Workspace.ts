﻿import { BlockInfos } from "../Util/BlockInfos";
import { Decoder } from "../Util/Decoder";
import { Requests } from "../Request/server_request";

declare var Blockly: any;

export class Workspace {

    private static singleton: Workspace;

    private id: number;
    private workspace: any;   

    static Inject(anchor: string, trashcan: boolean, toolbox: any): Workspace {
        if (Workspace.singleton) {
            return Workspace.singleton;
        }
        document.getElementById(anchor).innerHTML = "";
        const workspace = Blockly.inject(anchor, {
            toolbox: toolbox,
            zoom:
            {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.2,
                scaleSpeed: 1.2
            },
            trashcan: trashcan
        });
        return new Workspace(workspace);
    }

    static GetInstance(): Workspace {
        return Workspace.singleton;
    }

    /**
     * /!\ DO NOT USE IT
     * @param cur_workspace
     */
    constructor(cur_workspace: any) {  
        this.id = null;
        this.workspace = cur_workspace || new Blockly.Workspace();
        Workspace.singleton = this;
    }

    /**
     * Generate the CSharp corresponding to the datas in the workspace
     */
    GenerateCSharp(): string {
        return Blockly.CSharp.workspaceToCode(this.workspace);
    }

    static GenerateCSharp(): string {
        return Workspace.singleton.GenerateCSharp();
    }

    /**
     * Generate the French corresponding to the datas in the workspace
     */
    GenerateFrench(): string {
        return Blockly.French.workspaceToCode(this.workspace);
    }

    static GenerateFrench(): string {
        return Workspace.singleton.GenerateFrench();
    }

    GetBlockInfos(): BlockInfos {
        const blocks = this.workspace.getTopBlocks();
        const id = blocks[0].id;
        const name = blocks[0].getProcedureDef()[0];
        const parametersArray = blocks[0].arguments_;
        return new BlockInfos(id, name, parametersArray, null, null, true);
    }

    static GetBlockInfos(): BlockInfos {
        return Workspace.singleton.GetBlockInfos();
    }

    //GetDecoder(): Decoder {
    //    if (this.IsADecoder()) {
    //        const decoder = this.workspace.getTopBlocks()[0];
    //        const id = decoder.id;
    //        const name = decoder.getProcedureDef()[0];
    //        const xml = this.GetStringXML();
    //        const code = this.GenerateCSharp();
    //        const spec = this.GenerateFrench();
    //        return new Decoder(id, name, null, null, null, xml, code, spec, true);
    //    } 
    //    return null;      
    //}

    GetName(): string {
        return (this.IsADecoder() ? null : this.workspace.getTopBlocks()[0].getProcedureDef()[0]);
    }

    static GetName(): string {
        return Workspace.singleton.GetName();
    }

    IsADecoder(): boolean {
        const blocks = this.workspace.getTopBlocks();
        return (blocks.length == 1 && blocks[0].getProcedureDef);
    }

    static IsADecoder(): boolean {
        return Workspace.singleton.IsADecoder();
    }



    Clear() {
        this.workspace.clear();
    }

    static Clear() {
        Workspace.singleton.Clear();
    }

    GetXML(): Element {
        return Blockly.Xml.workspaceToDom(this.workspace);
    }

    static GetXML(): Element {
        return Workspace.singleton.GetXML();
    }

    GetStringXML(): string {
        return Blockly.Xml.workspaceToDom(this.workspace);
    }

    static GetStringXML(): string {
        return Workspace.singleton.GetStringXML();
    }

    StringyfiedXML(): string {
        return Blockly.Xml.domToText(this.GetXML());
    }

    static StringyfieldXML(): string {
        return Workspace.singleton.StringyfiedXML();
    }

    PrettyStringyfiedXML(): string {
        return Blockly.Xml.domToPrettyText(this.GetXML());
    }

    static PrettyStringyfieldXML(): string {
        return Workspace.singleton.PrettyStringyfiedXML();
    }

    /************************ Workspace and storage **************************************************/

    SaveLocal(location: any) {
        // TODO if we implement a local storage
    }

    RestoreBlock(decoder: Decoder) {
        //TODO ask the server for the block definition corresponding to the id
    }

    static RestoreBlock(decoder: Decoder) {
        this.RestoreBlock(decoder);
    }

    /**************************** Variables **********************************/

    UpdateToolbox(toolboxTree: HTMLElement) {
        this.workspace.updateToolbox(toolboxTree);
    }

    static UpdateToolbox(toolboxTree: HTMLElement) {
        Workspace.singleton.UpdateToolbox(toolboxTree);
    }
}