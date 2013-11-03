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


_commands          = '[list|status|help]'
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

this.status = () ->

	# all options listed in the REST documentation for Docker are supported.
	_options = {}

	console.log("Jacc: List of running containers")

	async.series([
		# List the running containers
		(fn) =>
			docker.containers.list(
				_options, (err, res) =>
					if (err)
						throw err

					# this.helpers.logDebug("data returned from Docker as JS object: ", res)
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

					#this.helpers.logDebug("data returned from Docker as JS object: ", res)
					console.log("container:" + res.ID[0..12] + " image:" + res.Image[0..12] + " IP:" + res.NetworkSettings.IPAddress)
				)
			)

			# async processing can continue
			fn(null, 'containers.inspect')

		]

		# Manage errors
		(err, results) =>
			this.helpers.logDebug( 'results of async functions - ' + results + ' and errors (if any) - ' + err )
	)


# Show Jacc configuration
# ----------------------------------------------------------------------

this.list = () ->
	redis_client = redis.createClient()

	redis_client.on("connect", () =>
		redis_client.smembers("containers", (err, res) =>
			console.log("SMEMBERS result:" + res)
			redis_client.quit()
		)	
	)

# main
# ======================================================================

this._isset(argv._ , 'jacc requires a command - node app.js ' + _commands)

switch argv._[0]
	when "status" then this.status()

	when "list" then this.list()

	when "help"
		console.log('uage: jacc ' + _commands)
		console.log('help: show this message')

	else console.log('No such command: ' + argv._[0])



