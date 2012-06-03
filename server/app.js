"use strict";

var express = require('express'),
	routes = require('./routes');

var app = express.createServer();

app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express['static'](__dirname + '/../client'));
});

app.configure('development', function () {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function () {
	app.use(express.errorHandler());
});

app.get('/query', routes.query);

app.listen(process.env.NODE_PORT || 3000, function () {
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
