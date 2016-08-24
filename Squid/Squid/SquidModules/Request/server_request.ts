import { Decoder } from "../Util/Decoder";
import {Messages} from "./../Util/Messages";

declare var $: any;

export class Requests {

    /**
     * Send a request to save in the server the decoder
     * @param decoder
     */
    static SaveDecoder(decoder: Decoder, success: any, fail: any) {
        $.ajax({
            url: "/api/Decoders",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: JSON.stringify(decoder),
            success(res) {
                if (!decoder.Id) {
                    decoder.Id = res.id;
                    Messages.Alert(`Décodeur sauvegardé avec l'Id : ${res.id}`);
                    success();
                } else {
                    Messages.Notify("Décodeur sauvegardé");
                }
            },
            error(resp) {
                fail(resp.responseText);
            }
        });
    }

    /**
     * 
     * @param id
     */
    static GetDecoderDef(id: number, decoder: Decoder, callback: any) {
        $.ajax({
            url: "/api/Decoders/decoderdef",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success(newDecoder) {
                callback(newDecoder);
            },
            error(resp) {
                console.log(resp.responseText);
                Messages
                    .Alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur.");
            }
        });
    }

    /**
     * 
     * @param callback
     */
    static GetBlocksInfos(success: any, fail: any) {
        $.ajax({
            url: "/api/Decoders/blocksinfos",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success(res) {
                //console.log(res);
                if (Array.isArray(res)) {
                    success(res);
                } else {
                    success(JSON.parse(res));
                }
            },
            error(resp) {
                fail();
                console.log(resp.responseText);
                Messages
                    .Alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur.");
            }
        });
    }

    static FindUsages(id: number, deleteMethod: any) {
        $.ajax({
            url: "/api/Decoders/findusages",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success(list) {
                Messages.ConfirmDelete(deleteMethod, list);
            },
            error(resp) {
                console.log(resp.responseText);
                Messages
                    .Alert("Erreur lors de la recherche de dépendances,\nAfficher la console pour voir les détails de l'erreur.");
            }
        });

    }

    static DeleteDecoder(decoder: Decoder, callback: any) {
        $.ajax({
            url: "/api/Decoders/delete",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(decoder.Id),
            success() {
                callback();
            },
            error(resp) {
                console.log(resp.responseText);
                Messages.Alert("Erreur lors de la suppression\nAfficher la console pour voir les détails de l'erreur.");
            }
        });
    }

    /**
     * Get all descendant of a decoder in order to generate spec or code
     * @param decoder
     */
    static FindDescendants(decoder: Decoder, callback) {
        $.ajax({
            url: "/api/Decoders/descendants",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(decoder.Id),
            success(res) {
                callback(res);
            },
            error(resp) {
                console.log(resp.responseText);
                Messages.Alert("Erreur lors de la récupération des spécifications\n" +
                    " Afficher la console pour voir les détails de l'erreur.");
            }
        });
    }

    // TEST SIMPLE VARIABLES

    static SaveVariables(map: string) {
        $.ajax({
            url: "/api/variables/save",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: map,
            //traditional: true,
            success(res) {
            },
            error(error) {
                Messages.Alert(`Failure in save : ${error}`);
            }
        });
    }

    /**
     * Retrieve the simples variables from the server
     * and update the client accordingly
     */
    static ReloadVariables(callback: any) {
        $.ajax({
            url: "/api/variables/reload",
            type: "POST",
            //contentType: 'application/json; charset=utf-8',
            datatype: "json",
            //traditional: true,
            success(res) {
                const variables = JSON.parse(res);
                callback(variables);
            },
            error(error) {
                Messages.Alert(`Failure while reloading variables${error}`);
            }
        });
    }
}