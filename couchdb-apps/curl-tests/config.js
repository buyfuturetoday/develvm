(function(exports) {

    exports.create = function() {

        return {

			COUCHDB_HOSTNAME    : "app1.jacc.local",
			COUCHDB_PORT        : 8080,
			COUCHDB_ADMIN       : "admin",
			COUCHDB_ADMIN_PASS  : "mysecretpassword",
			COUCHDB_USER        : "username",
			COUCHDB_USER_PASS   : "xxx"

//			COUCHDB1            : "http://"+this.COUCHDB_ADMIN+":"+COUCHDB_ADMIN_PASS+"@"+COUCHDB_IP_AND_PORT,
//			COUCHDB2            : "http://"+COUCHDB_USER+":"+COUCHDB_USER_PASS+"@"+COUCHDB_IP_AND_PORT
		};
	};

}(typeof exports === 'undefined' ? this['config']={} : exports));