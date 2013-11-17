exports = exports ? this

#
# 2013-11-03 Jonas Colmsjö
#
# Jacc - simple PaaS based on docker.io, hipache, redis-dns and supervisord
#
# Commands:
# + list - show list of configured apps
# + status - show running apps
# + add - add new app
# + delete - delete app
#
# Using Google JavaScript Style Guide when applicable - http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
#

exports.create = () ->

	_commands          : '[add|delete|list|update|status|help]'
	_dockerConnOptions : { socketPath: false, host: 'http://localhost', port: '4243'}


	# Includes
	# ======================================================================

	node_docker : require('node-docker').create()

	async      : require('async')

	redis      : require('redis')

	_ 			: require('underscore')


	# varaibles used within async needs to be defined like this
	_helpers     				: require('helpersjs').create()


	# helpers
	# ======================================================================

	_isset : (a, message, dontexit) ->
	  if (!this._helpers.isset(a))
	    console.log(message)
	    if(dontexit != undefined && dontexit)
	      return false
	    else
	      process.exit()
	  return true


	# Redis helper
	# -------------------------------------------------------------
	# operation = ”keys” | ”get” | ”del” | ”push” | "set"
	# args = [arg1, arg2, …, argn]
	# func = function to run on the result

	_f : (rc, err, res, func) =>
		if (err)
			throw err

		if(func != null)
			func(res)

		rc.quit()

	_redis : (operation, args, func) ->
		if(!args instanceof Array)
			throw new Error('_redis: argument not an array')

		redis_client = this.redis.createClient()

		redis_client.on("connect", () =>

			switch operation
				when "keys" then redis_client.keys( args[0], (err, res) => this._f(redis_client, err, res, func) )
				when "get" then redis_client.get( args[0], (err, res) => this._f(redis_client, err, res, func) )
				when "del" then redis_client.del( args[0], (err, res) => this._f(redis_client, err, res, func) )
				when "push" then redis_client.rpush( args[0], args[1], (err, res) => this._f(redis_client, err, res, func) )
				when "set" then redis_client.set( args[0], args[1], (err, res) => this._f(redis_client, err, res, func) )
				when "smembers" then redis_client.smembers( args[0], (err, res) => this._f(redis_client, err, res, func) )

		)


	# Helper for running function on each jacc image
	# -------------------------------------------------------------
	# redis jacc config: jacc_images:”012345678912” -> {URL, internal_port, DNS}
	_onJaccConfig : (func) ->
		this._redis( "smembers", ["images"], (res) =>
			_.each(res, (image) => func(image) )
		)



	# Run function with runing containers as input
	# ----------------------------------------------------------------------

	_onContainers : (func) ->

		# all options listed in the REST documentation for Docker are supported.
		_options 			= {}
		this._containers 	= {};
		docker 				= require('docker.io')( this._dockerConnOptions )


		this.async.series([
			# List the running containers
			(fn) =>
				docker.containers.list(
					_options, (err, res) =>
						if (err)
							throw err

						this._containers = res

						this._helpers.logDebug("_onContainers 1"+JSON.stringify(res))

						# async processing can continue
						fn(null, 'containers.list')
				)

			# Inspect each container
			(fn) =>
				this._helpers.logDebug("_onContainers 2"+JSON.stringify(this._containers))

				this._containers.forEach( (container,index,array) =>

					# all options listed in the REST documentation for Docker are supported.
					options = {}

					docker.containers.inspect(container.Id, options, (err, res) =>
						if (err)
							throw err

						func(res)
					)
				)

				# async processing can continue
				fn(null, 'containers.inspect')

			]

			# Manage errors
			(err, results) =>
				this._helpers.logDebug( 'results of async functions - ' + results + ' and errors (if any) - ' + err )
		)


	# Jacc Functions
	# ======================================================================


	# Update redis-dns and hipache configuration
	# ----------------------------------------------------------------------
	# NOTE: Only one container per image is currently supported

	update : () ->

		# Build list with running images
		# runningImages = image id->[{container id, IP}]
		this._runningImages = {}
		this._onContainers( (res) =>

			console.log(res)

			# create empty list if this image isn’t running
			if( this._runningImages[ res.Image[0..12] ] == undefined)
				this._runningImages[ res.Image[0..12] ] = []

			this._runningImages[ res.Image[0..12] ].push( { ID: res.ID[0..12], IP: res.NetworkSettings.IPAddress } )
		)

		# Iterate over Jacc configuration and generate hipache and redis-dns configuration
		# hipache configuration: image id ->external URL & [internal URL]
		# redis-dns configuration: dns->IP
		this._onJaccConfig( (image) =>
			this._redis("get", [image], (res) =>

				this._helpers.logDebug("_onJaccConfig - image: " + image + " res: " + JSON.parse(res))

				# decomposing, just to make sure things are ok
				{URL, internal_port, DNS} = JSON.parse(res)

				# Set hipache config
				_key = "frontend:"+image
				this._redis("del", [_key], () =>
					this._redis("rpush", [_key, URL], () =>
						_.each( this._runningImages[ image ], (res) =>
							this._redis("rpush", [_key, res["IP"]], null)
						)
					)
				)

				# Set redis-dns config, use the first IP in the list
				this._redis( "set", [DNS, this._runningImages[ image ][0]["IP"]], null )
				
			)
		)



	# Show running containers
	# ----------------------------------------------------------------------

	status : () ->
		console.log("Jacc: List of running containers")

		this._onContainers( (res) =>
				console.log("container:" + res.ID[0..12] + " image:" + res.Image[0..12] + " IP:" + res.NetworkSettings.IPAddress)
		)



	# Add image to Jacc configuration
	# ----------------------------------------------------------------------
	# 
	# TODO: Should check that the image exists (do an inspect)

	add : (image, URL, dns_name) ->
		console.log("Jacc: adding " + image)

		redis_client = this.redis.createClient()
		redis_client.on("connect", () =>
			redis_client.sadd("images", image, (err, res) =>
				redis_client.quit()
			)	
		)

		redis_client2 = redis.createClient()
		redis_client2.on("connect", () =>
			redis_client2.set(image, JSON.stringify({URL: URL; DNS: dns_name}), (err, res) =>
				redis_client2.quit()
			)	
		)


	# Delete image from Jacc configuration
	# ----------------------------------------------------------------------
	# 
	# TODO: Should check that the image exists (do an inspect)

	delete : (image) ->
		console.log("Jacc: deleting " + image)
		redis_client = this.redis.createClient()

		redis_client.on("connect", () =>
			redis_client.srem("images", image, (err, res) =>
				console.log("result - " + res)
				redis_client.quit()
			)	
		)


	# main
	# ======================================================================

	main : () ->

		this._helpers.logging_threshold = this._helpers.logging.debug

		argv        = require('optimist')
		              .usage('Usage: $0 '+ this._commands)
		              .argv

		this._isset(argv._ , 'jacc requires a command - node app.js ' + this._commands)

		switch argv._[0]
			when "add" then this.add(argv._[1], argv._[2], argv._[3])

			when "delete" then this.delete(argv._[1])

			when "update" then this.update()

			when "status" then this.status()

			when "list" then this.list()

			when "help"
				console.log('usage: jacc ' + _commands)
				console.log('jacc add image URL dns-name')
				console.log('jacc delete image')
				console.log('jacc update')
				console.log('jacc list')
				console.log('jacc status')
				console.log('help: show this message')

			else console.log('No such command: ' + argv._[0])

