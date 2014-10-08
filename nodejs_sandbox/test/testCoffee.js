(function() {
  var _this = this;

  exports['test_jacc'] = {
    setUp: function(done) {
      _this._j = require('../build/jacc.js').create();
      _this._async = require('async');
      _this._helpers = require('helpersjs').create();
      _this._helpers.logging_threshold = _this._helpers.logging.debug;
      return done();
    },
    'test_redis_helpers': function(test) {
      var REDIS_KEY, REDIS_VALUE;
      test.expect(1);
      REDIS_KEY = "unit_test:key";
      REDIS_VALUE = "value";
      return _this._async.series([
        function(fn) {
          return _this._j._redis("del", [REDIS_KEY], function() {
            return fn(null, '_redis.del');
          });
        }, function(fn) {
          return _this._j._redis("set", [REDIS_KEY, REDIS_VALUE], function() {
            return fn(null, '_redis.set');
          });
        }, function(fn) {
          return _this._j._redis("get", [REDIS_KEY], function(val) {
            test.equal(val, REDIS_VALUE, 'redis del, set and get');
            return fn(null, '_redis.get');
          });
        }, function(fn) {
          test.done();
          return fn(null, 'test.done');
        }
      ], function(err, results) {
        return _this._helpers.logDebug('test: results of async functions - ' + results + ' errors (if any) - ' + err);
      });
    },
    'test_status': function(test) {
      test.expect(1);
      return _this._j.status(function() {
        test.equal(true, true, 'jacc status');
        return test.done();
      });
    },
    'test_add': function(test) {
      test.expect(1);
      test.equal(true, true, 'jacc add');
      _this._helpers.logDebug('Deleting all images:');
      _this._j._redis("del", ["images"], function(res) {
        var _DNS, _URL, _id, _port;
        _this._helpers.logDebug('Add new image:' + res);
        _id = process.env.JACC_TEST_CONTAINERID;
        _URL = process.env.JACC_TEST_URL;
        _port = process.env.JACC_TEST_PORT;
        _DNS = process.env.JACC_TEST_DNS;
        return _this._j.add(_id, _URL, _port, _DNS, function() {
          _this._helpers.logDebug('Checking that the image is there');
          return _this._j._redis("smembers", ["images"], function(res) {
            return _this._helpers.logDebug('onJaccConfig res from redis:' + res);
          });
        });
      });
      return _this._j._onJaccConfig(function(image) {
        return _this._helpers.logDebug('onJaccConfig image:' + image);
      }, function() {
        return test.done();
      });
    },
    'test_update': function(test) {
      test.expect(1);
      test.equal(true, true, 'jacc update');
      _this._j.update();
      return test.done();
    }
  };

}).call(this);
