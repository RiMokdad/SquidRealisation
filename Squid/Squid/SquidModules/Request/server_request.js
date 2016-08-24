"use strict";
var Messages_1 = require("./../Util/Messages");
var Requests = (function () {
    function Requests() {
    }
    /**
     * Send a request to save in the server the decoder
     * @param decoder
     */
    Requests.SaveDecoder = function (decoder, success, fail) {
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
                    success();
                }
                else {
                    Messages_1.Messages.Notify("Décodeur sauvegardé");
                }
            },
            error: function (resp) {
                fail(resp.responseText);
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
                callback(newDecoder);
            },
            error: function (resp) {
                console.log(resp.responseText);
                Messages_1.Messages
                    .Alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur.");
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
                Messages_1.Messages
                    .Alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur.");
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
                Messages_1.Messages
                    .Alert("Erreur lors de la recherche de dépendances,\nAfficher la console pour voir les détails de l'erreur.");
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
                Messages_1.Messages.Alert("Erreur lors de la suppression\nAfficher la console pour voir les détails de l'erreur.");
            }
        });
    };
    /**
     * Get all descendant of a decoder in order to generate spec or code
     * @param decoder
     */
    Requests.FindDescendants = function (decoder, callback) {
        $.ajax({
            url: "/api/Decoders/descendants",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(decoder.Id),
            success: function (res) {
                callback(res);
            },
            error: function (resp) {
                console.log(resp.responseText);
                Messages_1.Messages.Alert("Erreur lors de la récupération des spécifications\n" +
                    " Afficher la console pour voir les détails de l'erreur.");
            }
        });
    };
    // TEST SIMPLE VARIABLES
    Requests.SaveVariables = function (map) {
        $.ajax({
            url: "/api/variables/save",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: map,
            //traditional: true,
            success: function (res) {
            },
            error: function (error) {
                Messages_1.Messages.Alert("Failure in save : " + error);
            }
        });
    };
    /**
     * Retrieve the simples variables from the server
     * and update the client accordingly
     */
    Requests.ReloadVariables = function (callback) {
        $.ajax({
            url: "/api/variables/reload",
            type: "POST",
            //contentType: 'application/json; charset=utf-8',
            datatype: "json",
            //traditional: true,
            success: function (res) {
                var variables = JSON.parse(res);
                callback(variables);
            },
            error: function (error) {
                Messages_1.Messages.Alert("Failure while reloading variables" + error);
            }
        });
    };
    return Requests;
}());
exports.Requests = Requests;
//# sourceMappingURL=server_request.js.map