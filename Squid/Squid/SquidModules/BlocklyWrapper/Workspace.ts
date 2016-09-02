import { BlockInfos } from "../Util/BlockInfos";
import { Decoder } from "../Util/Decoder";
import { Requests } from "../Request/server_request";
import { Onglet } from "./../Util/Onglet";

declare var Blockly: any;
declare var $: any;

export class Workspace {

    private id: number;
    private workspace: any;
    private decoder: Decoder;

    static Inject(anchor: string, trashcan: boolean, toolbox: any): Workspace {
        document.getElementById(anchor).innerHTML = "";
        const workspace = Blockly.inject(anchor,
        {
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
     * /!\ DO NOT USE IT
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

    //CreateProcedure(): any {
    //    //var block = goog.dom.createDom('block');
    //    //block.setAttribute('type', 'procedures_defnoreturn');
    //    //block.setAttribute('gap', '16');
    //    //return block; 
    //}

    Initialize(blocksXml?: string) {

        const proc = document.createElement("block");
        proc.setAttribute("type", "procedures_defnoreturn");
        //const metrics = this.workspace.getMetrics();
        //proc.setAttribute("x", `${metrics.viewWidth / 2}`);
        //proc.setAttribute("y", `${metrics.viewHeight / 2}`);
        const name = document.createElement("field");
        name.setAttribute("name", "NAME");
        name.innerHTML = this.decoder.Name || "Decoder";
        proc.appendChild(name);


        if (blocksXml) {
            const statement = document.createElement("statement");
            statement.setAttribute("name", "STACK");
            const block = Blockly.Xml.textToDom(blocksXml);
            const legalBlock = block.getElementsByTagName("block")[0];
            statement.appendChild(legalBlock);
            proc.appendChild(statement);

            /*var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(blocksXml, "text/xml");
            var validXml = xmlDoc.childNodes.toString();
            const childDom = Blockly.Xml.textToDom(validXml);
            let childBlock = Blockly.Xml.domToBlock(childDom, this.workspace);*/
            //childBlock.setParent(bloc);
        }
        const bloc = Blockly.Xml.domToBlock(proc, this.workspace);
        bloc.setDeletable(false);
    }

    BindDecoder(decoder: Decoder) {
        this.decoder = decoder;
    }

    /**
    * Complete the Name/Code/FrenchSpec/XML et editability for the decoder given in parameter
    * @param decoder
    */
    CompleteDecoder(paramDecoder?: Decoder) {
        const decoder = paramDecoder || this.decoder;
        if (decoder == null) {
            throw "You should bind a decoder to this";
        };
        if (this.IsADecoder() && decoder.Editable) {
            decoder.Name = this.GetName();
            decoder.Code = this.GenerateCSharp();
            decoder.FrenchSpec = this.GenerateFrench();
            decoder.BlocklyDef = this.GetStringXML();
        }
    }

    GetName(): string {
        return (this.IsADecoder() ? this.workspace.getTopBlocks()[0].getProcedureDef()[0] : null);
    }

    /**
     * Checks if the workspace contains only one element and that element is a decoder.
     * @return true if the workspace is storable as a decoder.
     */
    IsADecoder(): boolean {
        const blocks = this.workspace.getTopBlocks();
        return (blocks.length == 1 && blocks[0].getProcedureDef);
    }

    Resize() {
        Blockly.resizeSvgContents(this.workspace);
    }

    Clear() {
        this.workspace.clear();
    }

    SetVisible(visible?: boolean) {
        if (visible !== undefined)
            this.workspace.setVisible(visible);
        else {
            this.workspace.setVisible(!this.workspace.rendered);
        }
    }

    /* =================== About XML ================= */

    GetXML(): HTMLElement {
        return Blockly.Xml.workspaceToDom(this.workspace);
    }

    GetStringXML(): string {
        return Blockly.Xml.domToText(this.GetXML());
    }


    GetPrettyStringXML(): string {
        return Blockly.Xml.domToPrettyText(this.GetXML());
    }

    /* ============= Workspace and storage ============== */

    SaveLocal(location: any) {
        // TODO if we implement a local storage
    }

    RestoreBlocks(xml: string);
    RestoreBlocks(decoder: Decoder);
    RestoreBlocks(blocks?: any) {
        const Xml = Blockly.Xml.textToDom(blocks.BlocklyDef || blocks);
        Blockly.Xml.domToWorkspace(Xml, this.workspace);
        this.workspace.getTopBlocks()[0].setDeletable(false);
    }

    /* ================== Toolbox ==================== */

    UpdateToolbox(toolboxTree: HTMLElement) {
        this.workspace.updateToolbox(toolboxTree);
        const tbDiv = document.getElementsByClassName("blocklyToolboxDiv")[0] as HTMLElement;
        const bDiv = document.getElementsByClassName("blocklyDiv")[0] as HTMLElement;
        bDiv.appendChild(tbDiv);
    }

    AddCustomContextMenu(caller: any) {
        Blockly.BlockSvg.customContextMenuOption = {
            text: "Encapsuler dans un nouveau décodeur",
            enabled: true,
            block: null,
            callback: () => {
                if ("localStorage" in window) {
                    const newWorkspace = new Blockly.Workspace();
                    newWorkspace.addTopBlock(Blockly.BlockSvg.currentThis);
                    const dom = Blockly.Xml.workspaceToDom(newWorkspace);
                    const xml = Blockly.Xml.domToText(dom);
                    window.localStorage.setItem(Onglet.GetBaseUrl(), xml);
                    const url = Onglet.CreateIdUrl(-1);
                    window.open(url);
                } else {
                    console.warn("Opération impossible car sauvegarde locale désactivée");
                }
            }
        };

        Blockly.Blocks["procedures_callnoreturn"].customContextMenu = function(options: any) {
            const option = { enabled: true } as any;
            option.enabled = true;
            option.text = "Ouvrir la définition du décodeur";

            var blockName = this.getFieldValue("NAME");
            option.callback = () => {
                caller["opendef"](blockName);
            };
            options.push(option);
        };


    }
}