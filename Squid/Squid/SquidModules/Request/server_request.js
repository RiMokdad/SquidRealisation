"use strict";
var Messages_1 = require("./../Util/Messages");
var Requests = (function () {
    function Requests() {
    }
    /**
     * Send a request to save in the server the decoder
     * @param decoder
     */
    Requests.SaveDecoder = function (decoder, callback) {
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
                    callback();
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
                callback(decoder);
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
    Requests.GetBlocksInfos = function (success, fail) {
        $.ajax({
            url: "/api/Decoders/blocksinfos",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (res) {
                //console.log(res);
                if (Array.isArray(res)) {
                    success(res);
                }
                else {
                    success(JSON.parse(res));
                }
            },
            error: function (resp) {
                fail();
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
    Requests.FindDescendants = function (decoder) {
        $.ajax({
            url: "/api/Decoders/descendants",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(decoder.Id),
            success: function (res) {
                console.log(res);
            },
            error: function (resp) {
                console.log(resp.responseText);
                Messages_1.Messages.Alert("Erreur lors de la suppression\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    // TEST SIMPLE VARIABLES
    Requests.SaveVariables = function (map) {
        console.log(map);
        $.ajax({
            url: '/api/variables/save',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            data: map,
            //traditional: true,
            success: function (res) {
                //alert("Success " + res);
                console.log(res);
            },
            error: function (error) {
                alert("Wwoops something went wrong !" + error);
            }
        });
    };
    /**
     * Retrieve the simples variables from the server
     * and update the client accordingly
     */
    Requests.ReloadVariables = function (callback) {
        $.ajax({
            url: '/api/variables/reload',
            type: 'POST',
            //contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            //traditional: true,
            success: function (res) {
                //alert("Success " + res);
                var variables = JSON.parse(res);
                console.log(variables);
                callback(variables);
            },
            error: function (error) {
                alert("Wwoops something went wrong !" + error);
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