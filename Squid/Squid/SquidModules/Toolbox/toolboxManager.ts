import { BlockInfos } from "../Util/BlockInfos";

const BLOCKS: any[] = [
    [
        { name: "Briques de base", colour: 250 },
        ["compute", "execute", "switch", "case", "default", "check_frame_length", "custom_controls_if"]
    ],
    [
        { name: "Blocks de décodage", colour: 270 },
        ["decodebytes", "decodeboolean", "decodesignedinterger", "decodeunsignedinteger"]
    ],
    [
        { name: "sep", gap: 8 }, []
    ],
    [
        { name: "Mes décodeurs", colour: 180 },
        []
    ],
    [
        { name: "Recherche", colour: 200 },
        []
    ]
];

export class ToolboxManager {
    toolboxHTML: HTMLElement;
    BlocksInformations: BlockInfos[];

    constructor() {
        this.toolboxHTML = document.createElement("xml");
        this.CreateCategories(BLOCKS);
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
    }

    UpdateBlocksInfos(blocksInfos: BlockInfos[]) {
       //TODO insert code to update the BlocksInformations 
    }

    UpdateCategories() {
       //TODO insert code the nesting categories 
    }

    UpdateResearch(tags: string[]);
    UpdateResearch(tag: string);

    UpdateResearch(tags: any) {
        //TODO insert code for research
        if (typeof (tags) == "string") {
            //Parameter is a single string
        } else {
            //Parameter is a tab of strings
        }
    }
}