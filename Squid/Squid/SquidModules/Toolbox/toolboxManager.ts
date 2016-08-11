import { BlockInfos } from "../Util/BlockInfos";
import { Workspace } from "./../BlocklyWrapper/Workspace";
const BLOCKS: any[] = [
    [
        { name: "Briques de base", colour: 250 },
        ["compute", "execute", "switch", "case", "default", "check_frame_length", "custom_controls_if"]
    ],
    [
        { name: "Blocks de décodage", colour: 270 },
        ["decodebytes", "decodeboolean", "decodesignedinteger", "decodeunsignedinteger"]
    ],
    [
        { name: "sep", gap: 8 }, []
    ]
];

export class BlocksCat {
    blocks: BlockInfos[];
    category: string;  
    constructor(cat: string, blocks?: BlockInfos[]) {
        this.category = cat;
        this.blocks = blocks || new Array<BlockInfos>();
    }


}

export class ToolboxManager {
    toolboxHTML: HTMLElement;
    private decoders: HTMLElement;
    private research: HTMLElement;
    private BlocksInformations: BlocksCat[];

    constructor() {
        this.toolboxHTML = document.createElement("xml");
        this.CreateCategories(BLOCKS);
        this.BlocksInformations = new Array<BlocksCat>();
    }

    private CreateCategories(blocks: any) {
        for (let i = 0; i < blocks.length; i++) {
            const name = blocks[i][0].name;
            if (name == "sep") {
                const gap = blocks[i][0].gap;
                const sep = document.createElement("sep");
                sep.setAttribute("gap", gap);
                this.toolboxHTML.appendChild(sep);
            } else {
                const colour = blocks[i][0].colour;
                const category = document.createElement("category");
                category.setAttribute("name", name);
                category.setAttribute("colour", colour);

                for (let j = 0; j < blocks[i][1].length; j++) {
                    const block = document.createElement("block");
                    block.setAttribute("type", blocks[i][1][j]);
                    category.appendChild(block);
                }

                this.toolboxHTML.appendChild(category);
            }
        }

        //Add user created decoders
        this.decoders = document.createElement("category");
        this.decoders.setAttribute("name", "Mes décodeurs");
        this.decoders.setAttribute("colour", "180");
        this.toolboxHTML.appendChild(this.decoders);

        //Add researched decoders
        this.research = document.createElement("category");
        this.research.setAttribute("name", "Recherches");
        this.research.setAttribute("colour", "200");
        this.toolboxHTML.appendChild(this.research);
    }

    /*UpdateBlocksInfos(blocksInfos: BlockInfos[]) {
        
    }*/

    UpdateBlocksInfos(map: Object) {
        this.BlocksInformations = new Array<BlocksCat>();
        for (var category in map) {
            var cat = new BlocksCat(category);
            for (let i=0; i<map[category].length; i++) {
                cat.blocks.push(BlockInfos.ObjectToBlockInfos(map[category][i]));               
            }
            this.BlocksInformations.push(cat);          
        }
        this.UpdateCategories();
        Workspace.GetInstance().UpdateToolbox(this.toolboxHTML);
    } 

    UpdateCategories() {
        //clear
        while (this.decoders.firstChild) {
            this.decoders.removeChild(this.decoders.firstChild);
        }
        //add
        const proc = document.createElement("block");
        proc.setAttribute("type", "procedures_defnoreturn");
        this.decoders.appendChild(proc);

        for (let i = 0; i < this.BlocksInformations.length; i++) {
            const catName = this.BlocksInformations[i].category;
            const blocks = this.BlocksInformations[i].blocks;

            const cat = document.createElement("category");
            cat.setAttribute("name", catName);
            cat.setAttribute("colour", "100");
            this.decoders.appendChild(cat);

            for (let j = 0; j < blocks.length; j++) {
                cat.appendChild(blocks[j].CreateFlyout());
            }
        }
    }

    UpdateResearch(tags: string[]);
    UpdateResearch(tag: string);

    UpdateResearch(tags: any) {
        //clear
        while (this.research.firstChild) {
            this.research.removeChild(this.research.firstChild);
        }
        //add
        if (typeof (tags) == "string") {
            //Parameter is a single string
            for (var i = 0; i < this.BlocksInformations.length; this.BlocksInformations) {
                var blocks = this.BlocksInformations[i].blocks;
                for (var j = 0; j < blocks.length; j++) {
                    if (blocks[j].IsTagged(tags)) {
                        this.research.appendChild(blocks[j].CreateFlyout());
                    }
                }
            }
        } else {
            //Parameter is a tab of strings
            for (var tag in tags) {
                for (var i = 0; i < this.BlocksInformations.length; this.BlocksInformations) {
                    var blocks = this.BlocksInformations[i].blocks;
                    for (var j = 0; j < blocks.length; j++) {
                        if (blocks[j].IsTagged(tag)) {
                            this.research.appendChild(blocks[j].CreateFlyout());
                        }
                    }
                }
            }
        }
        const l = this.research.childNodes.length;
        if (l > 0) {
            this.research.setAttribute("name", `Recherche: ${l}`);
        } else {
            this.research.setAttribute("name", "Pas de résultat");
        }
    }
}