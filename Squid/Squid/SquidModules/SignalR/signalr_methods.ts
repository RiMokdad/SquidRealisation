import { EventHandler } from "../Util/EventHandler";

declare var $: any;

export class ServerNotifications {
    myHubProxy = $.connection.myHub;

    constructor() {
        this.myHubProxy.client.notifyRefresh = () => {
            EventHandler.NotifyRefresh();
            console.log("new version of the toolbox available");
        };

        $.connection.hub.disconnected(() => {
            setTimeout(() => {
                $.connection.hub.start();
            }, 5000); // Restart connection after 5 seconds.
        });


        $.connection.hub.start()
            .done(() => {
                console.log(`Now connected, connection ID=${$.connection.hub.id}`);
            })
            .fail(() => { console.log("Could not Connect!"); });
    }
};