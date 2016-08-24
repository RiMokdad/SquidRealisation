"use strict";
var Messages = (function () {
    function Messages() {
    }
    Messages.Alert = function (message) {
        var formatedMessage = message.replace(/\n/g, "<br>");
        bootbox.alert(formatedMessage);
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
                    }
                },
                cancel: {
                    label: "Annuler",
                    className: "btn-primary",
                    callback: function () {
                        Messages.Notify("Suppression annulée");
                    }
                }
            }
        });
    };
    Messages.Update = function () {
        Example.show("Mise à jour des décodeurs");
    };
    Messages.Notify = function (text) {
        Example.show(text);
    };
    return Messages;
}());
exports.Messages = Messages;
//# sourceMappingURL=Messages.js.map