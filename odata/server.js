$data.Class.define("test.Product", $data.Entity, null, {
    Id: { type: "id", key: true, computed: true, nullable: false },
    Name: { type: "string" },
    Price: { type: "integer" }
}, null);
$data.Class.defineEx("test.Context", [$data.EntityContext,$data.ServiceBase], null, {
    Products: { type: $data.EntitySet, elementType: test.Product }
});
exports = test.Context;

var c = require('express');
require('jaydata');
window.DOMParser=require('xmldom').DOMParser;
require('q');
require('./model.js');
var app = c();
app.use(c.query());
app.use(c.bodyParser());
app.use(c.cookieParser());
app.use(c.methodOverride());
app.use(c.session({ secret: 'session key' }));
app.use("/test", $data.JayService.OData.Utils.simpleBodyReader());
app.use("/test", $data.JayService.createAdapter(test.Context, function (req, res) {
    return new test.Context({name: "mongoDB", databaseName:"test", address: "localhost", port: 27017 });
}));
app.use("/", c.static(__dirname));
app.use(c.errorHandler());
app.listen(8080);