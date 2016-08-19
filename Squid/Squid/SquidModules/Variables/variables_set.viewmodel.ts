import { Component } from "@angular/core";
import { VariablesSet, VariablesType } from "./variables_set";

class VariablesSetComponent {
    protected name: string;
    protected sets: Array<VariablesSet>;
    protected set: VariablesSet;
    type: VariablesType;

    constructor(name: string, type: VariablesType) {
        this.name = name;
        this.sets = new Array<VariablesSet>();
        this.type = type;
        this.NewSet();
    }

    NewSet() {
        this.set = new VariablesSet(this.type);
        this.sets.push(this.set);
    }
}

@Component({
    selector: "config-set",
    templateUrl: "SquidModules/Variables/variables_set.view.html"
})
export class ConfigSetComponent extends VariablesSetComponent {

    constructor() {
        super("Configuration", VariablesType.CONFIG);
    }
}

@Component({
    selector: "inventory-set",
    templateUrl: "SquidModules/Variables/variables_set.view.html"
})
export class InventorySetComponent extends VariablesSetComponent{
    constructor() {
        super("Inventaire", VariablesType.INVENTORY);
    }

}