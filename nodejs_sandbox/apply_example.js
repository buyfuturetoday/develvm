// example of howto use apply
var f1 = function() { console.log(arguments)};
f1('this is a string');

var f2 = function() { console.log.apply(this,arguments)};
f2('this is a string');


// Example of howto use call
var animals = [
  {species: 'Lion', name: 'King'},
  {species: 'Whale', name: 'Fail'}
];

for (var i = 0; i < animals.length; i++) {
  (function (i) { 
    this.print = function () { 
      console.log('#' + i  + ' ' + this.species + ': ' + this.name); 
    } 
    this.print();
  }).call(animals[i], i);
}


