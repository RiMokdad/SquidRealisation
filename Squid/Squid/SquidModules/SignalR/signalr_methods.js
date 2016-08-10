var myHubProxy = $.connection.myHub;

var decoder = {};
decoder.Id = null;
decoder.Name = "a function";
decoder.Version = "1.0";
decoder.Category = "category1";
decoder.Tags = "tag1, tag2";
decoder.Code = "decode machin bidule";
decoder.Xml = '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="procedures_defnoreturn" id="Bxhu7`7CiyHNhEJqzxOJ" x="230" y="61"><mutation><arg name="x"></arg><arg name="y"></arg><arg name="z"></arg></mutation><field name="NAME">sfsf</field><field name="version">version</field><field name="category">category</field><field name="tags">t1, t2</field><comment pinned="false" h="80" w="160">Décrire cette fonction…</comment></block></xml>';
decoder.FrenchSpec = "de la spec";


myHubProxy.client.hello = function () {
    alert("hello !");
};

myHubProxy.client.notifyRefresh = function () {
    console.log("new version of the toolbox available");
};


myHubProxy.client.displayMessage = function (message) {
    //bootbox.alert(message);
    alert(message);
};

$.connection.hub.disconnected(function () {
    setTimeout(function () {
        $.connection.hub.start();
    }, 5000); // Restart connection after 5 seconds.
});


$.connection.hub.start()
    .done(function () {
        console.log('Now connected, connection ID=' + $.connection.hub.id);
        $('#hello').click(function () {
            // Call the Send method on the hub. 
            //myHubProxy.server.refresh();
            myHubProxy.server.sendDecoderDef(6).done(function(decoderDef) {
                console.log(decoderDef);
            });
        });
    })
    .fail(function () { console.log('Could not Connect!'); });

function Save() {
    myHubProxy.server.save(decoder).done(function (id) {
        if (!decoder.Id && id) {
            alert(id);
            decoder.Id = id;
        }
    });
}

