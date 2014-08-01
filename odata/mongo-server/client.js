/*
 *
 * Use like this:
 *
 * >npm instal jaydata
 * >node client.js
 *
 */


var $data = require('jaydata');

//$data.createODataServer(require('./newsreader/context.js'), '/newsreader.svc', 52999, 'localhost');

var contextType = require('./newsreader/context.js');
var context = new $news.Types.NewsContext({ 
            name:             'oData',
            oDataServiceHost: 'http://172.17.0.19:52999/newsreader.svc',
            user:             'admin', 
        	password:         'admin'
});

context.onReady(function(cb){

	context.Categories.toArray(function (categories) {
	    categories.forEach(function (category) {
	        console.log(category+"\n");
	    });
	});

});



