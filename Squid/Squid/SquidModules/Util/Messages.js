"use strict";
var Messages = (function () {
    function Messages() {
    }
    Messages.Alert = function (message) {
        bootbox.alert(message);
    };
    Messages.ConfirmDelete = function (deleteMethod, listFuncs) {
        var confMsg;
        if (listFuncs.length > 0) {
            var msgBody = listFuncs.join('<br>- ');
            confMsg =
                "Les fonctions suivantes utlisent la fonction à supprimer (ou une de même nom) :<br>- " +
                    msgBody +
                    "<br> Etes-vous sûr de vouloir continuer ?";
        }
        else {
            confMsg = "La fonction à supprimer n'est utilisé nulle part.";
        }
        bootbox.dialog({
            message: confMsg,
            title: "Demande de suppression",
            buttons: {
                ok: {
                    label: "Supprimer",
                    className: "btn-success",
                    callback: function () {
                        deleteMethod();
                        //Messages.Alert("Décodeur supprimé");
                    }
                },
                cancel: {
                    label: "Annuler",
                    className: "btn-primary"
                }
            }
        });
    };
    return Messages;
}());
exports.Messages = Messages;
//# sourceMappingURL=Messages.js.map