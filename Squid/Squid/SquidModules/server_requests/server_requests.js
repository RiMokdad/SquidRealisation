Squid.Requests = {};

/**
 * Send a request to save in the server the decoder
 * @param {string} code the generated C# code
 * @param {string} xml the decoder definition in xml
 */
/*Squid.Requests.SaveDecoder = function(code, xml) {
    
    $.ajax({
        url: '/api/Decoders',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        data: JSON.stringify({Id:TabId, Xml:xml, Code:code}),
        success: function (res) {

            if (res.id) {
                if (!TabId) {
                    TabId = res.id;
                    document.location += "#" + res.id;
                    //FOOOOR THE TESTS !!!!!
                    //Squid.Requests.GetDecoderDef(res.id);
                }
                alert(res.id);
            } else {
                alert(res.error);
            }
           
        },
        error: function (error) {
            alert("Erreur lors de la sauvegarde" + error);
        }
    });

}*/

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
        data: JSON.stringify({ Id: id }),
        success: function (res) {
            alert(res);
            if (res.xml) {
                return res.xml;
            } else {
                alert(res.error);
            }

        },
        error: function (error) {
            alert("Erreur lors de la sauvegarde" + error);
        }
    });

}

Squid.Requests.GetCategories = function(workspace, toolbox, callback) {
    $.ajax({
        url: '/api/Decoders/categories',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (mapstr) {
            //alert(map);
            //var map = jsonToStrMap(mapstr);
            callback(workspace, toolbox, JSON.parse(mapstr));
        },
        error: function (error) {
            alert("Erreur lors du chargement" + error);
        }
    });

}

Squid.Requests.FindUsages = function (id) {

    $.ajax({
        url: '/api/Decoders/findusages',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //datatype: 'json',
        data: JSON.stringify({ Id: id }),
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
            
            /*if (res.xml) {
                return res.xml;
            } else {
                alert(res.error);
            }*/

        },
        error: function (error) {
            alert("Erreur lors de la sauvegarde" + error);
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
