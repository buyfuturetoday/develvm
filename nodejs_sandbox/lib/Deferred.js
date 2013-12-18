var Deferred = (function () {

    var states = {
            SUCCESS: 1,
            FAILURE: 2,
            COMPLETE: 3
        },
        Deferred;

    function updateCallbacks(requiredStates, callback) {
        var that = this;
        if (this.callbackTuples === undefined) {
            this.callbackTuples = [];
        }
        if (requiredStates !== undefined) {
            this.callbackTuples.push({
                requiredStates: requiredStates,
                callback: callback
            });
        }
        if (this.isComplete()) {
            [states.SUCCESS, states.FAILURE, states.COMPLETE].forEach(function (state) {
                that.callbackTuples = that.callbackTuples.filter(function (callbackTuple) {
                    if (callbackTuple.requiredStates & that.state & state) {
                        callbackTuple.callback.call(that, that.value);
                        return true;
                    } else {
                        return false;
                    }
                });
            });
        }
    }

    Deferred = {
        succeeded: function (value) {
            if (!this.isComplete()) {
                this.value = value;
                this.state = states.SUCCESS;
            }
            updateCallbacks.call(this);
            return this;
        },
        failed: function () {
            if (!this.isComplete()) {
                this.state = states.FAILURE;
            }
            updateCallbacks.call(this);
            return this;
        },
        onSuccess: function (callback) {
            updateCallbacks.call(this, states.SUCCESS, callback);
            return this;
        },
        onFailure: function (callback) {
            updateCallbacks.call(this, states.FAILURE, callback);
            return this;
        },
        onComplete: function (callback) {
            updateCallbacks.call(this, states.COMPLETE, callback);
            return this;
        },
        isSuccess: function () {
            return !!(this.state & states.SUCCESS);
        },
        isFailure: function () {
            return !!(this.state & states.FAILURE);
        },
        isComplete: function () {
            return !!(this.state & states.COMPLETE);
        },
        getPromise: function () {
            var that = this;
            return {
                onSuccess: function () {
                    that.onSuccess.apply(that, arguments);
                    return this;
                },
                onFailure: function () {
                    that.onFailure.apply(that, arguments);
                    return this;
                },
                onComplete: function () {
                    that.onComplete.apply(that, arguments);
                    return this;
                },
                isSuccess: function () {
                    return that.isSuccess.apply(that, arguments);
                },
                isFailure: function () {
                    return that.isFailure.apply(that, arguments);
                },
                isComplete: function () {
                    return that.isComplete.apply(that, arguments);
                }
            };
        }
    };

    return {
        create: function () {
            function F() {}
            F.prototype = Deferred;
            return new F();
        },
        states: states
    };

}());