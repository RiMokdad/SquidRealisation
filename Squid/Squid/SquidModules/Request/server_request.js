"use strict";
var Messages_1 = require("./../Util/Messages");
var Requests = (function () {
    function Requests() {
    }
    /**
     * Send a request to save in the server the decoder
     * @param decoder
     */
    Requests.SaveDecoder = function (decoder) {
        //console.warn(decoder);
        $.ajax({
            url: "/api/Decoders",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: JSON.stringify(decoder),
            success: function (res) {
                if (!decoder.Id) {
                    decoder.Id = res.id;
                    Messages_1.Messages.Alert("D\u00E9codeur sauvegard\u00E9 avec l'Id : " + res.id);
                }
                else {
                    Messages_1.Messages.Notify("Décodeur sauvegardé");
                }
                //alert(res.id);
            },
            error: function (resp) {
                //TODO  move to the view. not the responsibility of the model.
                console.log(resp.responseText);
                Messages_1.Messages.Alert("Erreur lors de la sauvegarde,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    /**
     *
     * @param id
     */
    Requests.GetDecoderDef = function (id, decoder, callback) {
        $.ajax({
            url: "/api/Decoders/decoderdef",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success: function (newDecoder) {
                decoder.update(newDecoder);
                callback();
            },
            error: function (resp) {
                console.log(resp.responseText);
                Messages_1.Messages.Alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    /**
     *
     * @param callback
     */
    Requests.GetBlocksInfos = function (callback) {
        $.ajax({
            url: "/api/Decoders/blocksinfos",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (res) {
                console.log(res);
                if (Array.isArray(res)) {
                    callback(res);
                }
                else {
                    callback(JSON.parse(res));
                }
            },
            error: function (resp) {
                console.log(resp.responseText);
                Messages_1.Messages.Alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    Requests.FindUsages = function (id, deleteMethod) {
        $.ajax({
            url: "/api/Decoders/findusages",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success: function (list) {
                Messages_1.Messages.ConfirmDelete(deleteMethod, list);
            },
            error: function (resp) {
                console.log(resp.responseText);
                Messages_1.Messages.Alert("Erreur lors de la recherche de dépendances,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    Requests.DeleteDecoder = function (decoder, callback) {
        $.ajax({
            url: "/api/Decoders/delete",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(decoder.Id),
            success: function () {
                callback();
            },
            error: function (resp) {
                console.log(resp.responseText);
                Messages_1.Messages.Alert("Erreur lors de la suppression\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    return Requests;
}());
exports.Requests = Requests;
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
//# sourceMappingURL=server_request.js.map