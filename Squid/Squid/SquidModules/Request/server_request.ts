import { Decoder } from "../Util/Decoder";

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
                    alert(`Id saved: ${res.id}`);
                }
                alert(`Id saved: ${res.id}`);
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
    static GetDecoderDef(id: number) {
        $.ajax({
            url: "/api/Decoders/decoderdef",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success(decoder) {
                console.log(decoder);
                //TODO convert as a decoder
                return decoder;
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
                console.log(JSON.parse(mapstr));
                //alert(map);
                //var map = jsonToStrMap(mapstr);
                callback(JSON.parse(mapstr));
            },
            error(resp) {
                console.log(resp.responseText);
                alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur");
            }
        });
    }

    static FindUsages(id: number) {
        $.ajax({
            url: "/api/Decoders/findusages",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success(res) {
                if (res.error) {
                    //an error occured
                    alert(res.error);
                } else {
                    if (res.length > 0) {
                        //////alert(res);
                        ////var msgBody = res.join('<br>- ');
                        ////var confMsg =
                        ////    "Les fonctions suivantes utlisent la fonction à supprimer (ou une de même nom) :<br>- " +
                        ////    msgBody +
                        ////    "<br> Etes-vous sûr de vouloir continuer ?";
                        //////var retVal = confirm(confMsg);
                        ////bootbox.dialog({
                        ////    message: confMsg,
                        ////    title: "Custom title",
                        ////    buttons: {
                        ////        ok: {
                        ////            label: "Supprimer",
                        ////            className: "btn-success",
                        ////            callback: function () {
                        ////                //Example.show("great success");
                        ////                bootbox.alert("Décodeur supprimé");
                        ////            }
                        ////        },

                        ////        cancel: {
                        ////            label: "Annuler",
                        ////            className: "btn-primary",
                        ////            callback: function () {
                        ////                //window.show("Suppression annulée");
                        ////            }
                        ////        }
                        ////    }
                        ////});

                    } else {
                        const retVal = confirm("La fonction à supprimer n'est utilisé nulle part.");
                        if (retVal) {
                            //delete function
                        }
                    }
                }
            },
            error(resp) {
                console.log(resp.responseText);
                alert("Erreur lors de la recherche de dépendances,\nAfficher la console pour voir les détails de l'erreur");
            }
        });

    }

    static DeleteDecoder(id: number) {
        $.ajax({
            url: "/api/Decoders/delete",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //datatype: 'json',
            data: JSON.stringify(id),
            success() {
                alert("Décodeur supprimé");
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
