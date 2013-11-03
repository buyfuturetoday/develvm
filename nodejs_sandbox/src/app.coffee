#
# 2013-11-03 Jonas Colmsjö
#
# Jacc - simple PaaS based on docker.io, hipache, redis-dns and supervisord
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


# Docker functions
# ======================================================================

this.list = () ->

	# all options listed in the REST documentation for Docker are supported.
	_options = {}

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

				docker.containers.inspect(container.Id, options, (err, res) ->
					if (err)
						throw err

					this.helpers.logDebug("data returned from Docker as JS object: ", res)
					console.log(res.ID[0..12] + ":" + res.NetworkSettings.IPAddress)
				)
			)

			# async processing can continue
			fn(null, 'containers.inspect')

		]

		# Manage errors
		(err, results) =>
			this.helpers.logDebug( 'results of async functions - ' + results + ' and errors (if any) - ' + err )
	)


# main
# ======================================================================

this._isset(argv._ , 'jacc requires a command - node app.js ' + _commands)

switch argv._[0]
	when "list" then this.list()

	when "help"
		console.log('list')
		console.log('help: show this message')

	else console.log('No such command: ' + argv._)



