﻿import { BlockInfos } from "../Util/BlockInfos";
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
    private BlocksInformations: BlockInfos[];
    private BlocksInCat: BlocksCat[];

    constructor() {
        this.toolboxHTML = document.createElement("xml");
        this.BlocksInformations = new Array<BlockInfos>();
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

    UpdateBlocksInfos(blocks: Array<Object>, flatList: boolean);
    UpdateBlocksInfos(map: Object);

    UpdateBlocksInfos(list?: any, flatList?: boolean) {
        this.BlocksInformations = new Array<BlockInfos>();

        if (!flatList) {
            this.GenerateBlocksListFromMap(list);      
        } else {
            for (let i = 0; i < list.length; i++) {
                this.BlocksInformations.push(BlockInfos.ObjectToBlockInfos(list[i]));
            }
            this.GenerateBlocksInCatFromList(this.BlocksInformations);
        }

        this.UpdateCategories();
        Workspace.GetInstance().UpdateToolbox(this.toolboxHTML);
    } 

    private GenerateBlocksListFromMap(map: Object) {
        this.BlocksInCat = new Array<BlocksCat>();
        for (let category in map) {
            const cat = new BlocksCat(category);
            for (let i = 0; i < map[category].length; i++) {
                cat.blocks.push(BlockInfos.ObjectToBlockInfos(map[category][i]));//BlocksInCat
                this.BlocksInformations.push(map[category][i]);//BlocksInformations
            }
            this.BlocksInCat.push(cat);
        }
    }

    private GenerateBlocksInCatFromList(list: Array<BlockInfos>) {
        this.BlocksInCat = new Array<BlocksCat>();
        //For each block we place it in the good category
        for (let i = 0; i < list.length; i++) { 
            let newCat = true;
            for (let j = 0; j < this.BlocksInCat.length; j++) {
                if (this.BlocksInCat[j].category == list[i].category) {
                    newCat = false;
                    this.BlocksInCat[j].blocks.push(list[i]);
                    break;
                }
            }
            if (newCat) {
                const cat = new BlocksCat(list[i].category);
                cat.blocks.push(list[i]);
                this.BlocksInCat.push(cat);
            }
        }
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

        for (let i = 0; i < this.BlocksInCat.length; i++) {
            const catName = this.BlocksInCat[i].category;
            let valName = 0;
            for (let j = 0; j < catName.length; j++) {
                valName += catName.charCodeAt(j);
            }
            const blocks = this.BlocksInCat[i].blocks;

            const cat = document.createElement("category");
            cat.setAttribute("name", catName);
            cat.setAttribute("colour", <string><any>(valName % 360 + 1));
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
        for (let i = 0; i < this.BlocksInCat.length; i++) {
            const blocks = this.BlocksInCat[i].blocks;
            for (let j = 0; j < blocks.length; j++) {
                if (blocks[j].IsTagged(tags)) {
                    this.research.appendChild(blocks[j].CreateFlyout());
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

    GetTagsList(): Array<string> {
        const tagsList = new Array<string>();
        for (let i = 0; i < this.BlocksInformations.length; i++) {//For each block...
            const tagsBloc = this.BlocksInformations[i].tags.split(",");
            for (let j = 0; j < tagsBloc.length; j++) {//...and each tag...
                if(tagsList.indexOf(tagsBloc[j]) == -1) {//...if it's new, add it
                    tagsList.push(tagsBloc[j]);
                }
            }
        }
        return tagsList;
    }

    GetCategoryList(): Array<string> {
        const catList = new Array<string>();
        for (let i = 0; i < this.BlocksInCat.length; i++) {
            catList.push(this.BlocksInCat[i].category);
        }
        return catList;
    }
}