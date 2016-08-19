export enum VariablesType {
    CONFIG,
    INVENTORY
}

export class VariablesSet {
    Name: string;
    private variables: Array<[string, any]>;
    private prefix: string;
    private type: VariablesType;

    constructor(type, name?) {
        this.type = type;
        this.SetPrefix();
        this.Name = name || "New set";
        this.variables = new Array<[string, any]>();
    }

    private SetPrefix() {
        switch (this.type) {
        case VariablesType.CONFIG:
            this.prefix = "C_";
            break;
        case VariablesType.INVENTORY:
            this.prefix = "I_";
            break;
        default:
            this.prefix = "";
        }
    }

    GetPrefix() { return this.prefix; }

    GetType() { return this.type; }

    Count() { return this.variables.length; }

    Value(name: string, value?: any): any {
        for (let i = 0; i < this.Count(); i++) {
            if (this.variables[i][0] == name) {
                if (value) {
                    this.variables[i][1] = value;
                }
                return this.variables[i][1];
            }
        }
        return null;
    }

    Create(name?: string, value?: any) {
        name = name || "variable";
        let nameTest = name;
        let num = 1;
        //Avoid to have double names
        for (let i = 0; i < this.Count(); i++) {
            if (this.variables[i][0] == nameTest) {
                nameTest = name + num++;
                i = -1;
                console.log(nameTest);
            }
        }
        this.variables.push([nameTest, value || null]);
    }

    Delete(name: string): [string, any] {
        for (let i = 0; i < this.Count(); i++) {
            if (this.variables[i][0] == name) {
                return this.variables.splice(i, 1)[0];
            }
        }
        return null;
    }

    Rename(oldname: string, newname: string): boolean {
        const tuple = this.Delete(oldname)[1];
        if (tuple != null) {
            this.Create(newname, tuple[1]);
            return true;
        } else {
            return false;
        }
    }

    Clear() {
        this.variables.length = 0;
    }

    List(copy?: boolean) {
        if (copy) {
            const list = [];
            for (let i = 0; i < this.Count(); i++) {
                list.push([this.variables[i][0], this.variables[i][1]]);
            }
            return list;
        } else {
            return this.variables;
        }
    }

    Names(prefix?: boolean): Array<string> {
        const list = [];
        for (let i = 0; i < this.Count(); i++) {
            list.push((prefix ? this.prefix : "") + this.variables[i][0]);
        }
        return list;
    }
}