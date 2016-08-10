import { BlockInfos } from "../Util/BlockInfos";
import { Decoder } from "../Util/Decoder";

declare var Blockly: any;

export class Workspace {
    workspace: any;
    id: number;

    static Inject(anchor: string, trashcan: boolean, toolbox: any): Workspace {
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

    /**
     * /!\ THIS CONSTRUCTOR IS VISIBLE BUT PLEASE, PREFER THE STATIC INJECT
     * @param cur_workspace
     */
    constructor(cur_workspace: any) {
        this.id = null;
        this.workspace = cur_workspace || new Blockly.Workspace();
    }

    /**
     * Generate the CSharp corresponding to the datas in the workspace
     */
    GenerateCSharp(): string {
        return Blockly.CSharp.workspaceToCode(this.workspace);
    }

    /**
     * Generate the French corresponding to the datas in the workspace
     */
    GenerateFrench(): string {
        return Blockly.French.workspaceToCode(this.workspace);
    }

    GetBlockInfos(): BlockInfos {
        const blocks = this.workspace.getTopBlocks();
        const id = blocks[0].id;
        const name = blocks[0].getProcedureDef()[0];
        const parametersArray = blocks[0].arguments_;
        return new BlockInfos(id, name, parametersArray, null, null, true);
    }

    IsADecoder(): boolean {
        const blocks = this.workspace.getTopBlocks();
        return (blocks.length == 1 && blocks[0].getDef);
    }

    Clear() {
        this.workspace.clear();
    }

    GetXML(): Element {
        return Blockly.Xml.workspaceToDom(this.workspace);
    }

    StringyfiedXML(): string {
        return Blockly.Xml.domToText(this.GetXML());
    }

    PrettyStringyfiedXML(): string {
        return Blockly.Xml.domToPrettyText(this.GetXML());
    }

    /************************ Workspace and storage **************************************************/

    SaveLocal(location: any) {
        // TODO if we implement a local storage
    }
    
    SaveAsDecoderToServer(): boolean { 
        if (this.IsADecoder()) {
            var blockId = this.GetBlockInfos().id;
            //TODO request the server to save the block 
            return true;         
        } else {
            return false;
        }
    }

    ////BackupBlocks(url: any) {
    ////    if ("localStorage" in window) {
    ////        var prettyText = this.PrettyStringyfiedXML();
    ////        var xmlText = this.StringyfiedXML();
    ////        var code = this.GenerateCSharp();
    ////        //Request.SaveDecoder(code, xmlTesx);
    ////    }
    ////}

    RestoreBlock(id: number) {
        //TODO ask the server for the block definition corresponding to the id
    }

    /**************************** Variables **********************************/

    UpdateToolbox(toolboxTree: HTMLElement) {
        this.workspace.updateToolbox(toolboxTree);
    }

}