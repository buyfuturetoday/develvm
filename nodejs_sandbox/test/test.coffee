# Unit test
#-------------------------------------------------------------------------------------------------
# Basic tests that just calls the functions to make sure that execute ok

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

}

