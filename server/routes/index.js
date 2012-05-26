var _ = require('underscore');

module.exports = {
	query: function (req, res) {
		var start = parseInt(req.param('start', '0'), 10),
			limit = parseInt(req.param('limit', '50'), 10),
			cfg = JSON.parse(req.param('cfg', '{}'));

		console.dir(start);
		console.dir(limit);
		console.dir(cfg);

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
