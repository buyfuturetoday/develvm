# Unit test
#-------------------------------------------------------------------------------------------------
# Basic tests that just calls the functions to make sure that execute ok


# The functions to test
require('../build/jacc.js')

exports['test_node_docker'] = {

    setUp: (done) =>
        # setup here
        this._async      = require('async')

        # the functions to test
        this._node_docker = require('node-docker').create()
        this._helpers     = require('helpersjs').create()
        this._helpers.logging_threshold = this._helpers.logging.debug

        # setup finished
        done()

    'test1': (test) =>
        this._helpers.logDebug('--------- testing testing start ---------')

        # There should be X tests
        test.expect(1)

        REDIS_KEY = "unit_test:key"
        REDIS_VALUE = "value"

        this._async.series(
            [
                # Dummy test
                (fn) =>
                    # Remove old data
                    this._redis("del", [REDIS_KEY], () =>
                        fn(null, '_redis.del')
                    )

                (fn) => 
                    this._redis( "set", [REDIS_KEY, REDIS_VALUE], () =>
                        fn(null, '_redis.set')
                    )

                (fn) => 
                    this._redis( "get", [REDIS_KEY], (val) =>
                        test.equal(val,  REDIS_VALUE, 'redis del, set and get')
                        fn(null, '_redis.get')
                    )

                (fn) => 
                    # All tests performed
                    test.done()
                    fn(null, 'test.done')
            ],
            (err, results) =>
                this._helpers.logDebug('test: results of async functions - ' + results)
                this._helpers.logDebug('test: errors (if any) - ' + err)
            )

        this._helpers.logDebug('--------- testing testing end, async proccesing will continue ---------')



###
    'test1': (test) =>
        this._helpers.logDebug('testing testing')

        # There should be X tests
        test.expect(1)

        this._helpers.logDebug('test: Start...')

        _imageID       = "test-imageID"
        _name          = "test-name"
        _containerID   = "test-containerID"

        this._async.series(
            [
                # Dummy test
                (fn) =>
                    test.equal(true,  this._helpers.isEmptyObject({}), 'isEmptyObject')
                    fn(null, 'isEmptyObject')
                (fn) => 
                    # All tests performed
                    test.done()
                    fn(null, 'test.done')
            ],
            (err, results) =>
                this._helpers.logDebug('test: results of async functions - ' + results)
                this._helpers.logDebug('test: errors (if any) - ' + err)
            )
        this._helpers.logDebug('test: End of function, async processing will continue')
###

}

