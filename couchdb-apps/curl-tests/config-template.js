(function(exports) {

    exports.create = function() {

        return {

                        COUCHDB_HOSTNAME : "app1.jacc.local",
                        COUCHDB_PORT : 8080,
                        COUCHDB_ADMIN : "admin",
                        COUCHDB_ADMIN_PASS : "mysecretpassword",
                        COUCHDB_USER : "username",
                        COUCHDB_USER_PASS : "xxx"

                };
        };

}(typeof exports === 'undefined' ? this['config']={} : exports));