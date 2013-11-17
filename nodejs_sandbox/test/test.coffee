# Unit test
#-------------------------------------------------------------------------------------------------
# Basic tests that just calls the functions to make sure that execute ok



exports['test_node_docker'] = {

    setUp: (done) =>
        # The functions to test
        this._j = require('../build/jacc.js').create()
#        this._node_docker = require('node-docker').create()

        # setup here
        this._async      = require('async')


        this._helpers     = require('helpersjs').create()
        this._helpers.logging_threshold = this._helpers.logging.debug

        # setup finished
        done()

    'test_redis_helpers': (test) =>
        # There should be X tests
        test.expect(1)

        REDIS_KEY = "unit_test:key"
        REDIS_VALUE = "value"

        this._async.series(
            [
                # Dummy test
                (fn) =>
                    # Remove old data
                    this._j._redis("del", [REDIS_KEY], () =>
                        fn(null, '_redis.del')
                    )

                (fn) => 
                    this._j._redis( "set", [REDIS_KEY, REDIS_VALUE], () =>
                        fn(null, '_redis.set')
                    )

                (fn) => 
                    this._j._redis( "get", [REDIS_KEY], (val) =>
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


    'test_status': (test) =>
        # There should be X tests
        test.expect(1)

        this._j.status( ()=>
            test.done()
        )



    'dummy_test': (test) =>
        # There should be X tests
        test.expect(1)

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

}

