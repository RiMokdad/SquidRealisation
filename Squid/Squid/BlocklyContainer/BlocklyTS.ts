class Workspace {
    workspace: any

    constructor(cur_workspace: any) {
        this.workspace = cur_workspace;
        //this.workspace = new Blockly.Workspace();
    }

    Inject(anchor: string, trashcan: boolean, toolbox: any): Workspace {
        var workspace = Blockly.inject(anchor, {
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


    /*generateCode(workspace, CodeCSharp: string): string {

        //ajouter le dossier generateur pour que ça marche
        CodeCSharp = Blockly.CSharp.workspaceToCode(workspace);
        return CodeCSharp;
    }

    generateFrench(workspace, CodeCSharp : string, CodeFrench : string) : string {

        //ajouter le dossier generateur pour que ça marche
        CodeCSharp = Blockly.CSharp.workspaceToCode(workspace);
        CodeFrench = Blockly.French.workspaceToCode(workspace);

        if (CodeCSharp == "") {
            CodeFrench = "Rien à générer";
            CodeCSharp = "Rien à générer";
        }
        return CodeFrench;
    }*/

    B_getTopBlocks(): any {
        return this.workspace.getTopBlocks();
    }

    B_addTopBlock(block: any) {
        this.workspace.addTopBlock(block);
    }

    B_newWorkspace(): any {
        return new Blockly.Workspace();
    }

    B_getLinkedWorkspace(): any {
        return this.workspace.getLinkedWorkspace();
    }

    B_Xml_workspaceToDom(workspace): any {
        return Blockly.Xml.workspaceToDom(workspace);
    }

    // vérifier les types des parametres : any ou element).
    B_Xml_workspaceToPrettyText(xml: Element): any {
        return Blockly.Xml.domToPrettyText(xml);
    }




}