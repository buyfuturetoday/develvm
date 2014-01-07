// --------
//
// 2012-10-07, Jonas Colmsjö
//
// Copyright Gizur AB
//
// Playing aroung the the Git REST API and Backbone.js at the same time
//
// Documentation is created using docco (installed with npm). Put comments on separate
// rows. Markdown can also be used for nice formatting. 
//
// --------

//  Load the application once the DOM is ready
window.onload = function(){

	// Gists Model
	// ----------
	//
	// Calling https://api.github.com/users/colmsjo/gists will give JSON looking like this. Each object in teh array is 
	// parsed as one Gist by Backbone.Collection
	//
	//  ```
	//	[
	//	  {
	//	    "comments": 1,
	//	    "created_at": "2012-09-09T12:50:41Z",
	//	    "git_pull_url": "git://gist.github.com/3684138.git",
	//	    "git_push_url": "git@gist.github.com:3684138.git",
	//	    "updated_at": "2012-09-09T12:50:41Z",
	//	    "public": true,
	//	    "html_url": "https://gist.github.com/3684138",
	//	    "user": {
	//	      "gravatar_id": "131fe77c7762c5421d1023c73cb61076",
	//	      "avatar_url": "https://secure.gravatar.com/avatar/131fe77c7762c5421d1023c73cb61076?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
	//	      "login": "colmsjo",
	//	      "url": "https://api.github.com/users/colmsjo",
	//	      "urls": {
	//	        "self": "https://api.github.com/users/colmsjo"
	//	      },
	//	      "id": 1313294
	//	    },
	//	    "url": "https://api.github.com/gists/3684138",
	//	    "id": "3684138",
	//	    "description": "My first test Gist",
	//	    "files": {
	//	      "test1.md": {
	//	        "type": "text/plain",
	//	        "filename": "test1.md",
	//	        "raw_url": "https://gist.github.com/raw/3684138/80430a520c23c93825120c948d82059a7fd58fa1/test1.md",
	//	        "size": 60,
	//	        "language": "Markdown"
	//	      }
	//	    }
	//	  }
	//	]
	// ```
	//


	// extend Backbone
	var Gist = Backbone.Model.extend({

	});


	// Gist Collection
	// ---------------

	var GistList = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: Gist,

		// REST function to use
		url: 'https://api.github.com/users/colmsjo/gists'

	});

	// create one global instance of the **GistView**
	var View = new GistView;

	// Create our global collection of **Gists**.
	var Gists = new GistList;


	// Gist Item View
	// --------------

	// The DOM element for a Gist item...
	var GistView = Backbone.View.extend({

		//... is a list tag.
		tagName:  "li",

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item
		// Format:  "event DOM-element : function"
		// Example: "keypress .edit"  : "updateOnEnter",
		events: {
		},

		// Re-render the titles of the Gist item.
		render: function(gists) {

/*			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', this.model.get('done'));
			this.input = this.$('.edit');	 	
*/
		 	return this;

		},

	});


	// Setup error handling
 	// --------------------

	// Register ajax error handler
	$.ajaxSetup({

		// Log whenever an error occurs
        error: function (x, status, error) {
			log('Got an error: ' + status + 'Error details:' + error);
        },

        // what to do for different error codes
		statusCode: {
			// Both this and the error function below will be called for 4XX
			403: function() {
				log('Got an 403, forbidden...');
			},
			404: function() {
				log('Got an 404...');
			},
			302: function() {
				log('Got a re-direct, 302...');
			}
		}
	});

	// Register my own window error handler
	window.onerror = function(errorMsg, url, lineNumber) {
		log('Got window.onerror: ' + errorMsg + ' for URL: ' + url + ' on line number: ' + lineNumber);
	};


	// Setup crossroads
 	// ----------------
				
	// setup crossroads, using the global object. 
	// It is also possible to have several independent Routers
	crossroads.addRoute('route1', function() { 
		log('logging static route1...');


		// Fetch the list of gists
		Gists.fetch({	
			dataType: 'jsonp',
			type:     'GET',
			// currently not used, headers: {'Access-Control-Allow-Origin':'*'},
		});

		// Render the view
		View.render(Gists.model);

	});
	
	
	// default listener, log all routes that has been matched
	crossroads.routed.add(console.log, console); 
	
	// Also log routes that did not match anything (useful for debugging)
	crossroads.bypassed.add(function(request){
		log("A route that wasn't matched:"+request); 
	});
	

	// setup hasher - is used by crossroads
	// ------------

	function parseHash(newHash, oldHash){
		crossroads.parse(newHash); 
	}

	// parse initial hash 
	hasher.initialized.add(parseHash);

	// parse hash changes 		
	hasher.changed.add(parseHash);

	// start listening for history change
	hasher.init(); 
	
	//update URL fragment generating new history record 
	hasher.setHash('route1');


};