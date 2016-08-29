import { Utils } from "./Utils";

module SimpleVariables {
    var variables: { [key: string]: string } = {};

    export function AddVariable(key: string, value: string) {
        if (value.substring(0, 1) !== "$") {
            variables[key] = value;
        }       
    }

    export function RemoveVariable(key: string) {
        delete variables[key];
    }

    export function UpdateVariables(newVariables) {
        variables = newVariables;
    }

    export function GetNames() {
        let names: Array<string> = [];
        const keys = Object.keys(variables);
        for (let i = 0; i < keys.length; i++) {
            names.push(variables[keys[i]]);
        }
        return Utils.RemoveDuplicates(names);
    }

    //deep copy, not reference
    export function GetVariablesAsJson(): string{
        return JSON.stringify(variables);
    }
}