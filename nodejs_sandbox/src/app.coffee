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


_commands          = '[add|delete|list|update|status|help]'
_dockerConnOptions = { socketPath: false, host: 'http://localhost', port: '4243'}


# Includes
# ======================================================================

docker            = require('docker.io')( _dockerConnOptions )

node_docker = require('node-docker').create()

argv        = require('optimist')
              .usage('Usage: $0 '+ _commands)
              .argv

async      = require('async')

redis      = require('redis')


# varaibles used within async needs to be defined like this
this.helpers     = require('helpersjs').create();
this.helpers.logging_threshold  = this.helpers.logging.debug;

this._containers = {};



# helpers
# ======================================================================

this._isset = (a, message, dontexit) ->
  if (!this.helpers.isset(a))
    console.log(message)
    if(dontexit != undefined && dontexit)
      return false
    else
      process.exit()
  return true


# Jacc Functions
# ======================================================================


# Show running containers
# ----------------------------------------------------------------------

this.onContainers = (func) ->

	# all options listed in the REST documentation for Docker are supported.
	_options = {}

	async.series([
		# List the running containers
		(fn) =>
			docker.containers.list(
				_options, (err, res) =>
					if (err)
						throw err

					this._containers = res

					# async processing can continue
					fn(null, 'containers.list')
			)

		# Inspect each container
		(fn) =>
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
			this.helpers.logDebug( 'results of async functions - ' + results + ' and errors (if any) - ' + err )
	)

this.status = () =>
	console.log("Jacc: List of running containers")

	this.onContainers( (res) =>
			console.log("container:" + res.ID[0..12] + " image:" + res.Image[0..12] + " IP:" + res.NetworkSettings.IPAddress)
	)


# Show Jacc configuration
# ----------------------------------------------------------------------

this.list = () ->
	redis_client = redis.createClient()

	redis_client.on("connect", () =>
		redis_client.smembers("images", (err, res) =>
			console.log("Jacc: list of images:" + res)
			redis_client.quit()
		)	
	)


# Add image to Jacc configuration
# ----------------------------------------------------------------------
# 
# TODO: Should check that the image exists (do an inspect)

this.add = (image, URL, dns_name) ->
	console.log("Jacc: adding " + image)

	redis_client = redis.createClient()
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

this.delete = (image) ->
	console.log("Jacc: deleting " + image)
	redis_client = redis.createClient()

	redis_client.on("connect", () =>
		redis_client.srem("images", image, (err, res) =>
			console.log("result - " + res)
			redis_client.quit()
		)	
	)


# Update redis-dns and hipache configuration
# ----------------------------------------------------------------------
# NOTE: Only one container per image is currently supported

# Associative array image->{container data}
# To support several container per image - Associative array image->[{container data}]
this.containers = {}

this.update = () =>
	console.log("Jacc: updating ")

	async.series([
		# Save running containers in list
		(fn) =>
			# Get list of running containers
			this.containers = {}
			this.onContainers( (container) =>
				this.containers[ container.Image[0..12] ] =
					container: container.ID[0..12]
					IP:        container.NetworkSettings.IPAddress

				# async processing can continue
				fn(null, 'update.list containers')
			)


		# Check what's in the Jacc configuration
		(fn) =>
			console.log("Jacc: list of containers:" + JSON.stringify(this.containers))

			redis_client = redis.createClient()
			redis_client.on("connect", () =>
				redis_client.smembers("images", (err, res) =>
					for image in res
						do (image) =>

							redis_client = redis.createClient()
							redis_client.on("connect", () =>
								redis_client.get(image, (err, res)=>
									this.updateHipache( this.containers[image]["container"], 
														res["URL"] )
									this.updateRedisDNS( this.containers[image]["container"], 
														res["DNS"] )
									redis_client.quit()

							)

							console.log("Jacc: configured image:" + image)
					redis_client.quit()

					# async processing can continue
					fn(null, 'update.get configuration')

				)	
			)


		]

		# Manage errors
		(err, results) =>
			this.helpers.logDebug( 'results of async functions - ' + results + ' and errors (if any) - ' + err )
	)


# main
# ======================================================================

this._isset(argv._ , 'jacc requires a command - node app.js ' + _commands)

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



