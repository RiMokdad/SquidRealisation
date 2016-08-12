"use strict";
var Messages = (function () {
    function Messages() {
    }
    Messages.Alert = function (message) {
        bootbox.alert(message);
    };
    Messages.ConfirmDelete = function (bodyMsg) {
        var correctMsg = bodyMsg.replace(/\n/g, "<br>");
        bootbox.dialog({
            message: correctMsg,
            title: "Custom title",
            buttons: {
                ok: {
                    label: "Supprimer",
                    className: "btn-success",
                    callback: function () {
                        //Example.show("great success");
                        Messages.Alert("Décodeur supprimé");
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
//# sourceMappingURL=alerts.js.map