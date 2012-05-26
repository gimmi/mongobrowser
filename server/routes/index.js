var _ = require('underscore'),
	mongo = require('mongodb');

function getFields(req) {
	var fields = JSON.parse(req.param('fields', '[]')),
		ret = {};

	_(fields).each(function (field) {
		ret[field] = 1;
	});

	return ret;
}

module.exports = {
	query: function (req, res) {
		var server = req.param('server', 'localhost'),
			port = parseInt(req.param('port', '27017'), 10),
			start = parseInt(req.param('start', '0'), 10),
			limit = parseInt(req.param('limit', '50'), 10),
			filter = JSON.parse(req.param('filter', '{}')),
			fields = getFields(req);

		console.dir(start);
		console.dir(limit);
		console.dir(filter);
		console.dir(fields);


		new mongo.Db('log4net', new mongo.Server(server, port, {auto_reconnect: true})).open(function(err, db) {
			if(err) {
				console.log("error");
				return;
			}

			db.collection('logs', {safe:true}, function(err, coll) {
				if(err) {
					console.log("error");
					db.close();
					return;
				}

				coll.count(filter, function (err, count) {
					if(err) {
						console.log("error");
						db.close();
						return;
					}
					coll.find(filter, {skip: start, limit: limit, fields: fields}).toArray(function (err, docs) {
						if(err) {
							console.log("error");
							db.close();
							return;
						}

						console.dir(docs);

						res.json({ total: count, rows: docs });

						db.close();
					});
				});
			});
		});
	}
};
