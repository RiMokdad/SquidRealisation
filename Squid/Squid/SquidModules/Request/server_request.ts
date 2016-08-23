import { Decoder } from "../Util/Decoder";
import {Messages} from "./../Util/Messages";

declare var $: any;

export class Requests {

    /**
     * Send a request to save in the server the decoder
     * @param decoder
     */
    static SaveDecoder(decoder: Decoder, success:any, fail: any) {
        //console.warn(decoder);
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
                //alert(res.id);
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
    static GetDecoderDef(id: number, decoder : Decoder, callback: any) {
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
                Messages.Alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur.");
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
                Messages.Alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur.");
            }
        });
    }

    static FindUsages(id: number, deleteMethod:any) {
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
                Messages.Alert("Erreur lors de la recherche de dépendances,\nAfficher la console pour voir les détails de l'erreur.");
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
            url: '/api/variables/save',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            data: map,
            //traditional: true,
            success(res) {
                //console.log(res);
            },
            error(error) {
                alert("Wwoops something went wrong !" + error);
            }
        });
    }

    /**
     * Retrieve the simples variables from the server
     * and update the client accordingly
     */
    static ReloadVariables(callback:any) {
        $.ajax({
            url: '/api/variables/reload',
            type: 'POST',
            //contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            //traditional: true,
            success(res) {
                //alert("Success " + res);
                var variables = JSON.parse(res);
                //console.log(variables);
                callback(variables);
            },
            error(error) {
                alert("Wwoops something went wrong !" + error);
            }
        });
    }

}

// Supposed to be usefull for variables :

////function mapToJson(map) {
////    return JSON.stringify([...map]);
////}
////function jsonToMap(jsonStr) {
////    return new Map(JSON.parse(jsonStr));
////}

////function jsonToStrMap(jsonStr) {
////    return objToStrMap(JSON.parse(jsonStr));
////}

////function objToStrMap(obj) {
////    var strMap = new Map();
////    for (var category in obj) {
////        if (obj.hasOwnProperty(category)) {
////            strMap.set(category, obj[category]);
////        }
////    }
////    return strMap;
////}
