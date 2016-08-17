var myHubProxy = $.connection.myHub;

myHubProxy.client.notifyRefresh = function () {
    console.log("new version of the toolbox available");
};

$.connection.hub.disconnected(function () {
    setTimeout(function () {
        $.connection.hub.start();
    }, 5000); // Restart connection after 5 seconds.
});


$.connection.hub.start()
    .done(function () {
        console.log('Now connected, connection ID=' + $.connection.hub.id);
    })
    .fail(function () { console.log('Could not Connect!'); });


