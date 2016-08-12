declare var bootbox: any;

export class Messages {

    static Alert(message: any) {
        bootbox.alert(message);
    }

    static ConfirmDelete(bodyMsg) {
        var correctMsg: string = bodyMsg.replace(/\n/g, "<br>");
        bootbox.dialog({
            message: correctMsg,
            title: "Demande de suppression",
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
                    /*callback: function () {
                        //window.show("Suppression annulée");
                    }*/
                }
            }
        });
    }
}