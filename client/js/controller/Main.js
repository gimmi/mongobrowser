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

	_evalCfg: function (txt) {
		var ret;

		eval('ret = ' + txt + ';');

		return ret;
	},

	onQueryButtonClick: function () {
		var cfgTxt = this.getQueryField().getValue() || '{}',
			cfg = this._evalCfg(cfgTxt),
			grid = this.getGrid(),
			pager = this.getPagingToolbar();

		Ext.log({ dump: cfg });

		var columns = Ext.Array.map(cfg.fields, function (field) {
			return { header: field, dataIndex: field };
		}, this);

		var fields = Ext.Array.map(cfg.fields, function (field) {
			return { name: field };
		}, this);

		var store = Ext.create('Ext.data.Store', {
			fields: fields,
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

		grid.reconfigure(store, columns);

		store.loadPage(1);
	}
});