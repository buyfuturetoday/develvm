var casper = require('casper').create();

casper.start('http://norwegian.com/', function() {
    this.echo(this.getTitle());
});

casper.thenOpen('http://airberlin.com', function() {
    this.echo(this.getTitle());
});

casper.run();
