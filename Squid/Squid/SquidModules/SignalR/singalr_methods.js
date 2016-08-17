"use strict";
var ServerNotifications = (function () {
    function ServerNotifications() {
        this.myHubProxy = $.connection.myHub;
        this.myHubProxy.client.notifyRefresh = function () {
            console.log("new version of the toolbox available");
        };
        $.connection.hub.disconnected(function () {
            setTimeout(function () {
                $.connection.hub.start();
            }, 5000); // Restart connection after 5 seconds.
        });
        $.connection.hub.start()
            .done(function () {
            console.log("Now connected, connection ID=" + $.connection.hub.id);
        })
            .fail(function () { console.log("Could not Connect!"); });
    }
    return ServerNotifications;
}());
exports.ServerNotifications = ServerNotifications;
;
//# sourceMappingURL=singalr_methods.js.map