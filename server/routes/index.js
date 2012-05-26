var _ = require('underscore'),
	mongo = require('mongodb');

function getFields(fields) {
	var ret = {};

	_(fields).each(function (field) {
		ret[field] = 1;
	});

	return ret;
}

function evalCfg (req) {
	var ret;

	eval('ret = ' + req.param('cfg', '{}') + ';');

	return ret;
}

module.exports = {
	query: function (req, res) {

		var cfg = evalCfg(req),
			start = parseInt(req.param('start', '0'), 10),
			limit = parseInt(req.param('limit', '50'), 10),
			server = cfg.server || 'localhost',
			port = parseInt(cfg.port || '27017', 10),
			db = cfg.db || '',
			coll = cfg.coll || '',
			filter = cfg.filter || {},
			fields = getFields(cfg.fields || []);

		console.dir(start);
		console.dir(limit);
		console.dir(filter);
		console.dir(fields);


		new mongo.Db(db, new mongo.Server(server, port, {auto_reconnect: true})).open(function(err, db) {
			if(err) {
				console.log("error");
				return;
			}

			db.collection(coll, {safe:true}, function(err, coll) {
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

						//console.dir(docs);

						res.json({ total: count, rows: docs });

						db.close();
					});
				});
			});
		});
	}
};
