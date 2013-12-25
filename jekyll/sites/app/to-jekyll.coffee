#!/usr/bin/env coffee

_script   = 'convert'
_commands = '[jekyll|help]'
_helpers  = require('helpersjs').create()
argv      = require('optimist')
		.usage('Usage: $0 '+ _commands)
		.argv

# helpers
# ======================================================================

_isset = (a, message, dontexit) ->
	if (!_helpers.isset(a))
		console.log(message)
		if(dontexit != undefined && dontexit)
			return false
		else
			process.exit()
		return true


# convert file to jekyll format
# ======================================================================

jekyll = (inputFile) ->

	_isset(inputFile, 'Error: file to convert needs to be set!')

	_fs       = require('fs')
	_readline = require('readline')
	_status   = ""
	_noLines   = 0

	_rd = readline.createInterface({
		input: _fs.createReadStream(inputFile),
		output: process.stdout,
		terminal: false
	})

	rd.on('line', (line) =>
		_noLines      += 1
		_regex        = /^title: (.*)$/
		_result       = line.match(regex)

		if (_result?)
			console.log("something matched")

		# Print the unmodified result to output
		out.write(_line);
	)

	rd.on('close', () =>
		_outFile   = _fs.createWriteStream('./out/'+inputFile, { flags : 'w' })
		console.log(_script + ' result:')
		console.log('Number of lines processes: ' + _noLines)
	)


if(!argv._?)
	console.log(_script + ' requires a command - ' + _commands)
	process.exit()

switch argv._[0]
	when "jekyll" then jekyll(argv._[1])

	when "help"
		console.log('usage: ' + _script + ' '  + _commands)
		console.log(_script + ' jekyll fileToConvert')

	else console.log('No such command: ' + argv._[0])
