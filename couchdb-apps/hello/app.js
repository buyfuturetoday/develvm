// A Couch app that just says hello in a _show function.
module.exports = {
  'shows': {
    'hello': function(doc, req) {
      var who = req.query.who || "world"
      return "Hello, " + who
    }
  }
}
