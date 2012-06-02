"use strict";

var _ = require('underscore'),
	mongo = require('mongodb');

function buildServerCfg (txt) {
	var cfg, ret = {};

	eval('cfg = {' + txt + '\n};');

	ret.url = cfg.url || 'mongodb://localhost:27017/default';
	ret.coll = cfg.coll || '';
	ret.filter = cfg.filter || {};
	ret.sort = cfg.sort || {};

	ret.fields = {};
	_(cfg.fields).each(function (field) {
		ret.fields[_.isString(field) ? field : field.dataIndex ] = 1;
	});

	return ret;
}

module.exports = {
	query: function (req, res) {
		var cfg = buildServerCfg(req.param('cfg', '')),
			start = parseInt(req.param('start', '0'), 10),
			limit = parseInt(req.param('limit', '50'), 10);

		console.dir(start);
		console.dir(limit);
		console.dir(cfg.filter);
		console.dir(cfg.fields);

		mongo.connect(cfg.url, function(err, conn) {
			if(err) {
				res.send('Error connecting to the database: ' + err.message, 500);
				return;
			}

			conn.collection(cfg.coll, {safe:true}, function(err, coll) {
				if(err) {
					res.send('Error opening collection: ' + err.message, 500);
					conn.close();
					return;
				}

				coll.count(cfg.filter, function (err, count) {
					if(err) {
						res.send('Error counting query results: ' + err.message, 500);
						conn.close();
						return;
					}
					coll.find(cfg.filter, {skip: start, limit: limit, fields: cfg.fields, sort: cfg.sort}).toArray(function (err, docs) {
						if(err) {
							res.send('Error executing query: ' + err.message, 500);
							conn.close();
							return;
						}

						//console.dir(docs);

						res.json({ total: count, rows: docs });

						conn.close();
					});
				});
			});
		});
	}
};
