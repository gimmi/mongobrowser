load('tools/jslint/jslint.js');
load('tools/jsmake.javascript.JavascriptUtils.js');

var fs = jsmake.Fs;
var utils = jsmake.Utils;
var sys = jsmake.Sys;
var javascript = new jsmake.javascript.JavascriptUtils();

task('default', 'jslint');

task('jslint', function () {
	var files = fs.createScanner('client')
		.include('**/*.js')
		.exclude('extjs')
		.scan();
	var options = { browser: true, nomen: true, sloppy: true };
	var globals = { 'Ext': false };
	javascript.jslint(files, options, globals);
});

task('release', 'jslint', function () {
	sys.log('TODO');
});
