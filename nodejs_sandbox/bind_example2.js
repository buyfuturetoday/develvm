var delayed = function(str, args, callback) {
  setTimeout(
    function() {
      console.log('running callback:' + str + ':' + callback(args));
    }
    , 1000);
};

var lib = {
  i   : 2,
  inc : function(x){return x+this.i;},
  sq  : function(x){return x*x;},
  I   : function(x){return x;}
};

delayed('should see string', 'echo this string', lib.I);
delayed('should see 4', 2, lib.sq);

delayed('want to see 8 but will get NaN', 6, lib.inc);

delayed('Now I should see 8', 6, lib.inc.bind(lib) );
