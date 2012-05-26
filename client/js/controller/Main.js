Ext.define('MongoBrowser.controller.Main', {
	extend: 'Ext.app.Controller',

	requires: [
	],

	refs: [
		{ ref: 'grid', selector: 'mongobrowsergrid' },
		{ ref: 'pagingToolbar', selector: 'mongobrowsergrid pagingtoolbar' },
		{ ref: 'queryField', selector: '#queryfield' },
		{ ref: 'queryButton', selector: '#querybutton' }
	],

	init: function () {
		this.control({
			'#querybutton': {
				'click': this.onQueryButtonClick
			}
		});
		this.application.addListener({
			scope: this
		});
	},

	onLaunch: function () {
	},

	_buildClientCfg: function (txt) {
		var cfg, ret = {};

		eval(Ext.String.format('cfg = {0};', txt));

		cfg.fields = Ext.Array.from(cfg.fields);

		ret.columns = Ext.Array.map(cfg.fields, function (field) {
			if (Ext.isString(field)) {
				return { header: field, dataIndex: field };
			}
			return field;
		}, this);

		ret.fields = Ext.Array.map(cfg.fields, function (field) {
			if (Ext.isString(field)) {
				return field;
			}
			return field.dataIndex;
		}, this);

		return ret;
	},

	onQueryButtonClick: function () {
		var cfgTxt = this.getQueryField().getValue() || '{}',
			cfg = this._buildClientCfg(cfgTxt),
			grid = this.getGrid(),
			pager = this.getPagingToolbar();

		Ext.log({ dump: cfg });

		var store = Ext.create('Ext.data.Store', {
			fields: cfg.fields,
			pageSize: 50,
			proxy: {
				type: 'ajax',
				url : 'query',
				reader: {
					type: 'json',
					root: 'rows'
				},
				extraParams: {
					cfg: cfgTxt
				}
			}
		});

		pager.bindStore(store);

		grid.reconfigure(store, cfg.columns);

		store.loadPage(1, {});
	}
});