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

/**
 * BlocksInfo holds all important information for a bloc to generate is call in
 * the toolbox. It's also a starting point is you want to know if you can ask the server
 * for the definition.
 */
export class BlockInfos {
    id: number;
    name: string;
    parameters: string[];
    editable: boolean;
    tags: string[];
    version: string;

    constructor(id: number, name: string, parameters: string[], tags: string[], version: string, editable: boolean) {
        this.id = id;
        this.name = name;
        this.parameters = parameters;
        this.tags = tags;
        this.version = version;
        if (editable !== false) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }

    IsTagged(tag: string): boolean;
    IsTagged(tags: string[]): boolean;

    IsTagged(tags: any): boolean {      
        if (typeof (tags) == "string") {
            //Parameter is a single string
            for (let i = 0; i < this.tags.length; i++) {
                if (this.tags[i] == tags) {
                    return true;
                }
            }
        } else {
            //Parameter is a tab of strings
            for (let j = 0; j < tags.length; j++) {
                for (let i = 0; i < this.tags.length; i++) {
                    if (this.tags[i] == tags[j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

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