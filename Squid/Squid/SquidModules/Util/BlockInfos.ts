﻿/**
 * BlocksInfo holds all important information for a bloc to generate is call in
 * the toolbox. It's also a starting point is you want to know if you can ask the server
 * for the definition.
 */
export class BlockInfos {
    id: number;
    name: string;
    parameters: string;
    editable: boolean;
    tags: string;
    version: string;
    category: string;

    constructor();
    constructor(name: string, parameters: string, tags: string, category: string, version: string, id: number, editable: boolean);
    constructor(name: string, parameters: string, tags: string[], category: string,  version: string, id: number,  editable: boolean) ;
    
    constructor(name?: string, parameters?: string, tags?: any, category?: string, version?: string, id?: number, editable?: boolean) {
        this.id = id || null;
        this.name = name || "Decodeur";
        this.parameters = parameters || "";
        if (tags) {
            if (typeof (tags) == "string") {
                this.tags = tags;
            } else {
                this.tags = tags.join(",");
            }
        } else {
            this.tags = "";
        }
        this.category = category || "";
        this.version = version || "0.0";
        this.editable = (editable !== false);
    }

    CreateFlyout(): HTMLElement {
        const elem = document.createElement("block");
        elem.setAttribute("type", "procedures_callnoreturn");
        elem.setAttribute("id", (this.id as any) as string);
        elem.setAttribute("gap", "16");
        const mutation = document.createElement("mutation");
        mutation.setAttribute("name", this.name);
        if (this.parameters!=="") {
            const params = this.parameters.split(',');
            for (let i = 0; i < params.length; i++) {
                const arg = document.createElement("arg");
                arg.setAttribute("name", params[i]);
                mutation.appendChild(arg);
            }
        }
        elem.appendChild(mutation);
        return elem;
    }

    IsTagged(tag: string): boolean;
    IsTagged(tags: string[]): boolean;

    IsTagged(tags: any): boolean {
        const innerTags = this.tags.split(",");    
        if (typeof (tags) == "string") {
            //Parameter is a single string
            for (let i = 0; i < innerTags.length; i++) {
                if (innerTags[i] == tags) {
                    return true;
                }
            }
        } else {
            //Parameter is a tab of strings
            for (let j = 0; j < tags.length; j++) {
                for (let i = 0; i < innerTags.length; i++) {
                    if (innerTags[i] == tags[j]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    static ObjectToBlockInfos(object: any):BlockInfos {
        return new BlockInfos(
            object.name,
            object.parameters,
            object.tags,
            object.category,
            object.version,
            object.id,
            object.editable);
    }
}