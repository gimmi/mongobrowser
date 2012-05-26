var _ = require('underscore');

module.exports = {
	query: function (req, res) {
		var cfg = req.param('cfg', {});

		var rows = _(_(100).range()).map(function (i) {
			var row = {};
			_(cfg.fields).each(function (field) {
				row[field] = field + i;
			}, this);
			return row;
		}, this);

		res.json(rows);
	}
};
