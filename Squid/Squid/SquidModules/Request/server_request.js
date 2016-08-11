"use strict";
var Requests = (function () {
    function Requests() {
    }
    /**
     * Send a request to save in the server the decoder
     * @param decoder
     */
    Requests.SaveDecoder = function (decoder) {
        $.ajax({
            url: "/api/Decoders",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            //data: JSON.stringify({Id:TabId, Xml:xml, Code:code}),
            data: JSON.stringify(decoder),
            success: function (res) {
                if (!decoder.Id) {
                    decoder.Id = res.id;
                }
                alert(res.id);
            },
            error: function (resp) {
                console.log(resp.responseText);
                alert("Erreur lors de la sauvegarde,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    /**
     *
     * @param id
     */
    Requests.GetDecoderDef = function (id) {
        $.ajax({
            url: "/api/Decoders/decoderdef",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success: function (decoder) {
                console.log(decoder);
                //TODO convert as a decoder
                return decoder;
            },
            error: function (resp) {
                console.log(resp.responseText);
                alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    /**
     *
     * @param callback
     */
    Requests.GetCategories = function (callback) {
        $.ajax({
            url: "/api/Decoders/categories",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (mapstr) {
                console.log(JSON.parse(mapstr));
                //alert(map);
                //var map = jsonToStrMap(mapstr);
                callback(JSON.parse(mapstr));
            },
            error: function (resp) {
                console.log(resp.responseText);
                alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    Requests.FindUsages = function (id) {
        $.ajax({
            url: "/api/Decoders/findusages",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success: function (res) {
                if (res.error) {
                    //an error occured
                    alert(res.error);
                }
                else {
                    if (res.length > 0) {
                    }
                    else {
                        var retVal = confirm("La fonction à supprimer n'est utilisé nulle part.");
                        if (retVal) {
                        }
                    }
                }
            },
            error: function (resp) {
                console.log(resp.responseText);
                alert("Erreur lors de la recherche de dépendances,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    };
    Requests.DeleteDecoder = function (id) {
        $.ajax({
            url: "/api/Decoders/delete",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success: function () {
                alert("Décodeur supprimé");
            },
            error: function (resp) {
                console.log(resp.responseText);
                alert("Erreur lors de la suppression\nAfficher la console pour voir les détails de l'erreur");
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