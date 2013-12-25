#!/usr/bin/env coffee

_         = require('underscore')
async     = require('async')
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

jekyll = (path) ->
	_isset(path, 'Error: path with files to convert needs to be set!')

	files = require('fs').readdirSync(path)

	async.mapSeries(
		files

		(file, fn) =>
			_name = file.match(/(.*).html.md/i)
			if(!_name)
				_name = file
			_name = _name[1]

			jekyllFile(path+'/'+file, _name+'.md', fn)

		(err, results) =>
			console.log('End of async.map '+ err)

	)

jekyllFile = (inputFile, outputFile, fn) ->

	_isset(inputFile, 'Error: file to convert needs to be set!')

	_fs       = require('fs')
	_readline = require('readline')
	_output   = ''
	_noLines  = 0
	_date     = null

	_rd = _readline.createInterface({
		input: _fs.createReadStream(inputFile),
		output: process.stdout,
		terminal: false
	})

	_rd.on('line', (line) =>
		if(_noLines==0 && line=='\n')
			return

		_noLines      += 1

		# Copy title to description
		_result = line.match(/title: (.*)/i)
		if (_result? && _result!=false)
			_output += 'description: ' + _result[1] + '\n'

		# Save the date
		if(!_date? && line.match(/date: (.*)/i)?)
			_date = line.match(/date: (.*)/i)[1]

		# Sage the line to the output
		_output += line
	)

	_rd.on('error', (err) =>
		console.log('ERROR: '+ err)
		process.exit()
	)

	_rd.on('close', () =>
		if(_date == null)
			_date = '2000-01-01'

		_out   = _fs.createWriteStream('./out/' + _date + '-' + outputFile, { flags : 'w' })

		_out.on('error', (err) =>
			console.log('ERROR: '+ err)
			process.exit()
		)

		_out.on('open', () =>
			# Print the unmodified result to output
			_out.write(_output);
			_out.end()

			console.log(inputFile + ' number of lines processes: ' + _noLines)
		)

		fn() if fn?
	)


if(!argv._?)
	console.log(_script + ' requires a command - ' + _commands)
	process.exit()

switch argv._[0]
	when "jekyll" then jekyll(argv._[1])

	when "help"
		console.log('usage: ' + _script + ' '  + _commands)
		console.log('files in the ./in folder are processed and saved in the ./out folder')
		console.log(_script + ' jekyll fileToConvert')

	else console.log('No such command: ' + argv._[0] + " - '" + _script + " help' will show the help")
