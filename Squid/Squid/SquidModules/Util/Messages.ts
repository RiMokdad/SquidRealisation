declare var bootbox: any;
declare var Example: any;

export class Messages {

    static Alert(message: any) {
        bootbox.alert(message);
    }

    static ConfirmDelete(deleteMethod, listFuncs) {
        let confMsg:string;
        if (listFuncs.length > 0) {
            let msgBody = listFuncs.join('<br>- ');
            confMsg =
                "Les fonctions suivantes utlisent la fonction à supprimer (ou une de même nom) :<br>- " +
                msgBody +
                "<br> Etes-vous sûr de vouloir continuer ?";
        } else {
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
    }

    static Notify(text: string) {
        Example.show(text);
    }
}