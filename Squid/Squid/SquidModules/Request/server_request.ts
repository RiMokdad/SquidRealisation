﻿import { Decoder } from "../Util/Decoder";
import {Messages} from "./../Util/Messages";

declare var $: any;

export class Requests {

    /**
     * Send a request to save in the server the decoder
     * @param decoder
     */
    static SaveDecoder(decoder: Decoder){
        $.ajax({
            url: "/api/Decoders",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            //data: JSON.stringify({Id:TabId, Xml:xml, Code:code}),
            data: JSON.stringify(decoder),
            success(res) {
                if (!decoder.Id) {
                    decoder.Id = res.id;
                    Messages.Alert(`Décodeur sauvegardé avec l'Id : ${res.id}`);
                }
                //alert(res.id);
            },
            error(resp) {
                //TODO  move to the view. not the responsibility of the model.
                console.log(resp.responseText);
                alert("Erreur lors de la sauvegarde,\nAfficher la console pour voir les détails de l'erreur");
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
                decoder.update(newDecoder); 
                callback();
            },
            error(resp) {
                console.log(resp.responseText);
                alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    }

    /**
     * 
     * @param callback
     */
    static GetCategories(callback: any) {
        $.ajax({
            url: "/api/Decoders/categories",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success(mapstr) {
                //console.log(JSON.parse(mapstr));
                callback(JSON.parse(mapstr));
            },
            error(resp) {
                console.log(resp.responseText);
                alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur");
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
                alert("Erreur lors de la recherche de dépendances,\nAfficher la console pour voir les détails de l'erreur");
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
                alert("Erreur lors de la suppression\nAfficher la console pour voir les détails de l'erreur");
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
