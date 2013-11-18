# Unit test
#-------------------------------------------------------------------------------------------------
# Basic tests that just calls the functions to make sure that execute ok



exports['test_jacc'] = {

    setUp: (done) =>
        # The functions to test
        this._j = require('../build/jacc.js').create()

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
                this._helpers.logDebug('test: results of async functions - ' + results + ' errors (if any) - ' + err)
            )


    'test_status': (test) =>
        # There should be X tests
        test.expect(1)

        this._j.status( () =>
            test.equal(true,  true, 'jacc status')
            test.done()
        )


    'test_add': (test) =>
        # There should be X tests
        test.expect(4)

        test.equal(true,  true, 'jacc add')

        # _j.add is async so test.done will likely be executed too early
        this._j.add(process.env.JACC_TEST_CONTAINERID,
                    process.env.JACC_TEST_URL,
                    process.env.JACC_TEST_PORT,
                    process.env.JACC_TEST_DNS
        )

        # just print the JaccConfig images
        this._j._onJaccConfig( 
            (image) =>
                this._helpers.logDebug('onJaccConfig image:' + image)

            , () -> 
                test.done()
        )

        

###
        # Wait for the operation above
        setTimeout(
            () =>
                this._j._onJaccConfig( (image) =>
                    this._j._redis("get", [image], (res) =>

                        console.log('jacc config: ' +  res + ' image: ' + image)

                        # decomposing, just to make sure things are ok
                        {_URL, _internal_port, _DNS} = JSON.parse(res)

                        test.equal(_URL,             process.env.JACC_TEST_URL, 'checking URL')
                        test.equal(_internal_port,   process.env.JACC_TEST_PORT, 'checking port')
                        test.equal(_DNS,             process.env.JACC_TEST_DNS, 'checking DNS')

                        test.done()
                    )
                )

            1000
        )
###


    'test_update': (test) =>
        # There should be X tests
        test.expect(1)

        test.equal(true,  true, 'jacc update')

        # _j.update is async so test.done will likely be executed too early
        this._j.update()

        test.done()

}

