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