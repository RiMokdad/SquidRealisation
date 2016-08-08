var Workspace = (function () {
    function Workspace(cur_workspace) {
        this.workspace = cur_workspace;
        //this.workspace = new Blockly.Workspace();
    }
    Workspace.prototype.Inject = function (anchor, trashcan, toolbox) {
        var workspace = Blockly.inject(anchor, {
            toolbox: toolbox,
            zoom: {
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
    };
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
    Workspace.prototype.B_getTopBlocks = function () {
        return this.workspace.getTopBlocks();
    };
    Workspace.prototype.B_addTopBlock = function (block) {
        this.workspace.addTopBlock(block);
    };
    Workspace.prototype.B_newWorkspace = function () {
        return new Blockly.Workspace();
    };
    Workspace.prototype.B_getLinkedWorkspace = function () {
        return this.workspace.getLinkedWorkspace();
    };
    Workspace.prototype.B_Xml_workspaceToDom = function (workspace) {
        return Blockly.Xml.workspaceToDom(workspace);
    };
    // vérifier les types des parametres : any ou element).
    Workspace.prototype.B_Xml_workspaceToPrettyText = function (xml) {
        return Blockly.Xml.domToPrettyText(xml);
    };
    return Workspace;
}());
//# sourceMappingURL=BlocklyTS.js.map