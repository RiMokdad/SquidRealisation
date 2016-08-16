import { BlockInfos } from "../Util/BlockInfos";
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

    /**
     * Complete the Name/Code/FrenchSpec/XML et editability for the decoder given in parameter
     * @param decoder
     */
    CompleteDecoder(decoder: Decoder) {
        if (this.IsADecoder()) {
            decoder.Name = Workspace.GetName();
            decoder.Code = Workspace.GenerateCSharp();
            decoder.FrenchSpec = Workspace.GenerateFrench();
            decoder.Xml = Workspace.GetStringXML();
            decoder.Editable = true;
        }  
    }

    static CompleteDecoder(decoder: Decoder) {
        Workspace.singleton.CompleteDecoder(decoder);
    }

    GetName(): string {
        return (this.IsADecoder() ? this.workspace.getTopBlocks()[0].getProcedureDef()[0] : null);
    }
     
    static GetName(): string {
        return Workspace.singleton.GetName();
    }
    /**
     * Checks if the workspace contains only one element and that element is a decoder.
     */
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
        return Blockly.Xml.domToText(this.GetXML());
    }

    static GetStringXML(): string {
        return Workspace.singleton.GetStringXML();
    }

    GetPrettyStringXML(): string {
        return Blockly.Xml.domToPrettyText(this.GetXML());
    }

    static GetPrettyStringXML(): string {
        return Workspace.singleton.GetPrettyStringXML();
    }

    /************************ Workspace and storage **************************************************/

    SaveLocal(location: any) {
        // TODO if we implement a local storage
    }

    RestoreBlocks(xml: string); 
    RestoreBlocks(decoder: Decoder);
    RestoreBlocks(blocks?: any) {
        const Xml = Blockly.Xml.textToDom(blocks.Xml || blocks);
        Blockly.Xml.domToWorkspace(Xml, this.workspace);
    }

    static RestoreBlocks(decoder: Decoder);
    static RestoreBlocks(xml: string);
    static RestoreBlocks(blocks?: any) {
        Workspace.singleton.RestoreBlocks(blocks);
    }

    /**************************** Toolbox **********************************/

    UpdateToolbox(toolboxTree: HTMLElement) {
        this.workspace.updateToolbox(toolboxTree);
    }

    static UpdateToolbox(toolboxTree: HTMLElement) {
        Workspace.singleton.UpdateToolbox(toolboxTree);
    }
}