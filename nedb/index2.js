window.onload = function(){

	document.getElementById("log").innerHTML = "onload fired!<br>";
	console.log("onload fired!");

	localStorage.removeItem('database');

	// Type 3: Persistent datastore with automatic loading
	// var Datastore = require('nedb');
	var db = new Nedb({ filename: 'database', autoload: true });

		document.getElementById("log").innerHTML += "after new NeDB<br>";


	var doc = { hello: 'world'
	               , n: 5
	               , today: new Date()
	               , nedbIsAwesome: true
	               , notthere: null
	               , notToBeSaved: undefined  // Will not be saved
	               , fruits: [ 'apple', 'orange', 'pear' ]
	               , infos: { name: 'nedb' }
	               };

	var docs =  [
		{ _id: 'id1', planet: 'Mars', system: 'solar', inhabited: false, satellites: ['Phobos', 'Deimos'] },
		{ _id: 'id2', planet: 'Earth', system: 'solar', inhabited: true, humans: { genders: 2, eyes: true } },
		{ _id: 'id3', planet: 'Jupiter', system: 'solar', inhabited: false },
		{ _id: 'id4', planet: 'Omicron Persei 8', system: 'futurama', inhabited: true, humans: { genders: 7 } },
		{ _id: 'id5', completeData: { planets: [ { name: 'Earth', number: 3 }, { name: 'Mars', number: 2 }, { name: 'Pluton', number: 9 } ] } }
		];

	db.insert(docs, function (err, newDoc) {   

			document.getElementById("log").innerHTML += "In db.insert<br>";

		if(err) {
			console.log("Error inserring doc: " + err);
			document.getElementById("log").innerHTML += "Error inserring doc: " + err + "<br>";

		} else {

			console.log("Insert into nedb ok: " + JSON.stringify(newDoc) );  	
			document.getElementById("log").innerHTML += "Insert into nedb ok: " + JSON.stringify(newDoc) + 
					"<br>";
		}
	});


	// Finding all planets in the solar system
	db.find({ system: 'solar' }, function (err, docs) {

		document.getElementById("log").innerHTML += "In db.find<br>";

		if (err) {
			console.log("Error: " + err);
		} else {
			console.log("Found these documents: " + JSON.stringify(docs ) );  	
		}
	});
};