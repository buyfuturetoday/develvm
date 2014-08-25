var s = 'http://user:pass@host.com:8080/schema/table?query=string&query2=string2#hash';

var parseQuery = function(s) {
    var u      = require('url');
    var url    = u.parse(s,true,false);
    var q      = {};

    var a      = url.pathname.split("/")    
    q.schema   = a[1];
    q.table    = a[2];
    q.query    = url.query;

console.log(url);

    return q;

}

var o = parseQuery(s);

console.log("url: "+s);
console.log("Parsed URL: "+JSON.stringify(o,0,4));
