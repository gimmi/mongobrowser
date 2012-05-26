var _ = require('underscore'),
	mongo = require('mongodb');

function buildServerCfg (txt) {
	var cfg, ret = {};

	eval('cfg = {' + txt + '};');

	ret.server = cfg.server || 'localhost';
	ret.port = parseInt(cfg.port || '27017', 10);
	ret.db = cfg.db || '';
	ret.coll = cfg.coll || '';
	ret.filter = cfg.filter || {};

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


		new mongo.Db(cfg.db, new mongo.Server(cfg.server, cfg.port, {auto_reconnect: true})).open(function(err, db) {
			if(err) {
				console.log("error");
				return;
			}

			db.collection(cfg.coll, {safe:true}, function(err, coll) {
				if(err) {
					console.log("error");
					db.close();
					return;
				}

				coll.count(cfg.filter, function (err, count) {
					if(err) {
						console.log("error");
						db.close();
						return;
					}
					coll.find(cfg.filter, {skip: start, limit: limit, fields: cfg.fields}).toArray(function (err, docs) {
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
