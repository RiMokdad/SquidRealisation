Squid = {};
Squid.Requests = {};

/**
 * Send a request to save in the server the decoder
 * @param {Object} the decoder
 */
Squid.Requests.SaveDecoder = function(decoder) {
    
    $.ajax({
        url: '/api/Decoders',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
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

}

/**
 * 
 * @param {} id l'id du décodeur à récup
 * @returns {string} la définition du block en xml
 */
Squid.Requests.GetDecoderDef = function (id) {

    $.ajax({
        url: '/api/Decoders/decoderdef',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //datatype: 'json',
        data: JSON.stringify(id),
        success: function (decoder) {
            console.log(decoder);
            return decoder;
        },
        error: function (resp) {
            console.log(resp.responseText);
            alert("Erreur lors de la récupération,\nAfficher la console pour voir les détails de l'erreur");
        }
    });
}

Squid.Requests.GetCategories = function(callback) {
    $.ajax({
        url: '/api/Decoders/categories',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
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

}

Squid.Requests.FindUsages = function (id) {

    $.ajax({
        url: '/api/Decoders/findusages',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //datatype: 'json',
        data: JSON.stringify(id),
        success: function (res) {
            if (res.error) {
                //an error occured
                alert(res.error);
            } else {
                if (res.length > 0) {
                    //alert(res);
                    var msgBody = res.join('<br>- ');
                    var confMsg =
                        "Les fonctions suivantes utlisent la fonction à supprimer (ou une de même nom) :<br>- " +
                            msgBody +
                            "<br> Etes-vous sûr de vouloir continuer ?";
                    //var retVal = confirm(confMsg);
                    bootbox.dialog({
                        message: confMsg,
                        title: "Custom title",
                        buttons: {
                            ok: {
                                label: "Supprimer",
                                className: "btn-success",
                                callback: function () {
                                    //Example.show("great success");
                                    bootbox.alert("Décodeur supprimé");
                                }
                            },
                          
                            cancel: {
                                label: "Annuler",
                                className: "btn-primary",
                                callback: function () {
                                    //window.show("Suppression annulée");
                                }
                            }
                        }
                    });

                } else {
                    var retVal = confirm("La fonction à supprimer n'est utilisé nulle part.");
                    if (retVal === true) {
                        //delete function
                    }
                }
            }
        },
        error: function (resp) {
            console.log(resp.responseText);
            alert("Erreur lors de la recherche de dépendances,\nAfficher la console pour voir les détails de l'erreur");
        }
    });

}

Squid.Requests.DeleteDecoder = function(id) {
    $.ajax({
        url: '/api/Decoders/delete',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
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
}


//UTILS

 function mapToJson(map) {
     return JSON.stringify([...map]);
 }
 function jsonToMap(jsonStr) {
     return new Map(JSON.parse(jsonStr));
 }

 function jsonToStrMap(jsonStr) {
     return objToStrMap(JSON.parse(jsonStr));
 }

 function objToStrMap(obj) {
     var strMap = new Map();
     for (var category in obj) {
         if (obj.hasOwnProperty(category)) {
             strMap.set(category, obj[category]);
         }       
     }
     return strMap;
 }
