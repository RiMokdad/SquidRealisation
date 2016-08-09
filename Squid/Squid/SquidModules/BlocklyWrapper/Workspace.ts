import { BlockInfos } from "../Util/BlockInfos";

declare var Blockly: any;

export class Workspace {
    workspace: any;

    static Inject(anchor: string, trashcan: boolean, toolbox: any): Workspace {
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
        this.workspace = cur_workspace || new Blockly.Workspace();
    }

    
    generateCSharp(): string {
        return Blockly.CSharp.workspaceToCode(this.workspace);
    }

    generateFrench(): string {
        return Blockly.French.workspaceToCode(this.workspace);
    }

    GetBlockInfos(): BlockInfos {
        //TODO give the good informations
        return new BlockInfos(null, null, null, null, null, true);
    }

    IsADecoder(): boolean {
        var blocks = this.workspace.getTopBlocks();
        if (blocks.length == 1 && blocks[0].getDef) {
            return true;
        }
        return false;
    }

    Clear() {
        this.workspace.clear();
    }

    GetXML(): Element {
        return Blockly.Xml.workspaceToDom(this.workspace);
    }

    StringyfiedXML() : string {
        return Blockly.Xml.domToText(this.GetXML());
    }

    PrettyStringyfiedXML(): string {
        return Blockly.Xml.domToPrettyText(this.GetXML());
    }
}