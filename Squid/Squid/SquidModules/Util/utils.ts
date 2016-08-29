export module Utils {

    export function GenerateUUID() : any {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
            c => {
                const r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
            });
        return uuid;
    }

    export function RemoveDuplicates(array: Array<any>): Array<any> {
        var seen = {};
        return array.filter(item => (seen.hasOwnProperty(item) ? false : (seen[item] = true)));
    }
}

export class DisplayTools {

    /**
     * A call switch on the visibility of the "value" element from the list given in parameter
     * @param value
     * @param elements
     * @return The next value of the switch
     */
    static switch(value: number, elements: HTMLElement);
    static switch(value: number, elements: NodeList);
    static switch(value: number, elements: Element);
    static switch(value: number, elements: any): number {

        const n = elements.length;
        value = MyMath.mod(value, n) ;
        for (let i = 0; i < n; i++) {
            const side = elements[i] as HTMLElement;
            if ((i % n) === value) {
                side.style.visibility = "visible";
                side.style.transform = "rotateY(360deg)";
            } else {
                side.style.visibility = "hidden";
                side.style.transform = "rotateY(180deg)";
            }
        }
        return MyMath.mod(value + 1, n);
    }
}

export class MyMath {
    /**
     * The modulo of n ranging from 0 to m.
     * @param n
     * @param m
     */
    static mod(n: number, m: number) {
        return ((n % m) + m) % m;
    }
}