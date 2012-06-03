load('tools/jslint/jslint.js');
load('tools/jsmake.javascript.JavascriptUtils.js');

var fs = jsmake.Fs;
var utils = jsmake.Utils;
var sys = jsmake.Sys;
var javascript = new jsmake.javascript.JavascriptUtils();

task('default', 'init');

task('init', function () {
	sys.run('cmd', '/C', '"cd server && npm install"');
});

task('jslint', function () {
	var files, options, globals;

	files = fs.createScanner('client')
		.include('**/*.js')
		.exclude('extjs')
		.scan();
	options = { browser: true, nomen: true, sloppy: true };
	globals = { 'Ext': false };
	javascript.jslint(files, options, globals);

	files = fs.createScanner('server')
		.include('**/*.js')
		.exclude('node_modules')
		.scan();
	options = { node: true, nomen: true };
	globals = { };
	javascript.jslint(files, options, globals);
});

task('release', ['init', 'jslint'], function () {
	fs.deletePath('build');
	fs.copyPath('client', 'build/client');
	fs.copyPath('server', 'build/server');
	fs.writeFile('build/client/index.html', fs.readFile('build/client/index.html').replace('extjs/ext-dev.js', 'extjs/ext-all.js'));
	fs.writeFile('build/start.cmd', [
		'@echo off',
		'set NODE_ENV=production',
		'set NODE_PORT=5000',
		'start node server/app.js',
		'start http://localhost:%NODE_PORT%'
	].join('\n'));
});
