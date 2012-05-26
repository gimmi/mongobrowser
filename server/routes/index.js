var _ = require('underscore'),
	mongo = require('mongodb');

module.exports = {
	query: function (req, res) {
		var start = parseInt(req.param('start', '0'), 10),
			limit = parseInt(req.param('limit', '50'), 10),
			cfg = JSON.parse(req.param('cfg', '{}'));

		console.dir(start);
		console.dir(limit);
		console.dir(cfg);

		new mongo.Db('log4net', new mongo.Server('localhost', 27017, {auto_reconnect: true})).open(function(err, db) {
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

				coll.find().toArray(function (err, docs) {
					if(err) {
						console.log("error");
						db.close();
						return;
					}

					console.dir(docs);

					db.close();
				});

			});
		});

		var rows = _(_.range(start, start + limit)).map(function (i) {
			var row = {};
			_(cfg.fields).each(function (field) {
				row[field] = field + i;
			}, this);
			return row;
		}, this);

		res.json({
			total: 1000,			
			rows: rows
		});
	}
};
