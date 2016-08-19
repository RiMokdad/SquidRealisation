import { Decoder } from "./Decoder";
import { BlockInfos } from "./BlockInfos";

export class Onglet {
    /**
     * Open a new tab in the from sratch mode
     */
    static OpenTab();
    /**
     * Open a new tab with the bloc named after the string given in parameter in the editor
     * @param name
     */
    static OpenTab(decoder: BlockInfos);
    static OpenTab(decoder?: BlockInfos) {
        if (decoder) {
            window.open(Onglet.CreateIdUrl(decoder.id));
            return;
        }
        window.open(Onglet.GetBaseUrl());
    }

    /**
     * Get the base url of the page
     */
    static GetBaseUrl(): string {
        return "index.html";
    }

    /**
     * Create the url string with the given id
     * @param id
     */
    static CreateIdUrl(id: number) : string {
        return Onglet.GetBaseUrl() + "#" + id; 
    }

    /**
     * Get the id after the hash in the url
     * @return return the id as a number, or null if there is no id
     */
    static GetBlockIdInUrl(): number {
        return parseInt(window.location.hash.substring(1)) || null;
    }

    /**
     * Set the hash of this page to the decoder id
     */
    static SetUrl(decoder: Decoder) {
        window.location.hash = decoder.Id ? `${decoder.Id}` : "";
    }
}