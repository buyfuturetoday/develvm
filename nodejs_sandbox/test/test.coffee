# Unit test
#-------------------------------------------------------------------------------------------------
# Basic tests that just calls the functions to make sure that execute ok



exports['test_jacc'] = {

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
                this._helpers.logDebug('test: results of async functions - ' + results + ' errors (if any) - ' + err)
            )


    'test_status': (test) =>
        # There should be X tests
        test.expect(1)

        test.equal(true,  true, 'jacc status')

        # _j.status is async so test.done will likely be executed too early
        this._j.status()

        test.done()

    'test_add': (test) =>
        # There should be X tests
        test.expect(1)

        test.equal(true,  true, 'jacc add')

        # _j.add is async so test.done will likely be executed too early
        this._j.add(process.env.JACC_TEST_CONTAINERID,
                    process.env.JACC_TEST_URL,
                    process.env.JACC_TEST_DNS)

        test.done()

    # This test relies on that the previous one was executed first (not ideal, should be managed with asycn etc.)
    'test_check_added': (test) =>
        # There should be X tests
        test.expect(1)


        this._onJaccConfig( (image) =>
            this._redis("get", [image], (res) =>
                # decomposing, just to make sure things are ok
                {URL, internal_port, DNS} = JSON.parse(res)

                test.equal(URL,  process.env.JACC_TEST_URL, 'checking URL')
                test.equal(DNS,  process.env.JACC_TEST_DNS, 'checking URL')
                test.done()
            )
        )


    'test_update': (test) =>
        # There should be X tests
        test.expect(1)

        test.equal(true,  true, 'jacc update')

        # _j.update is async so test.done will likely be executed too early
        this._j.update(process.env.JACC_TEST_CONTAINERID,
                    process.env.JACC_TEST_URL,
                    process.env.JACC_TEST_DNS)

        test.done()

}

