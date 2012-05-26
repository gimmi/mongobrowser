Ext.define('MongoBrowser.controller.Main', {
	extend: 'Ext.app.Controller',

	requires: [
	],

	refs: [
		{ ref: 'grid', selector: 'mongobrowsergrid' },
		{ ref: 'queryField', selector: '#queryfield' },
		{ ref: 'queryButton', selector: '#querybutton' },
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

	onQueryButtonClick: function () {
	},

	readCfg: function () {
		var json = this.getQueryField().getValue(),
			cfg = Ext.JSON.decode(json);

		return cfg;
	},

	onQueryButtonClick: function () {
		var cfg = this.readCfg(),
			grid = this.getGrid();

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
			remoteSort: true,
			remoteFilter: true,
			proxy: {
				type: 'ajax',
				url : 'query',
				reader: 'json'
			}
		});

		grid.reconfigure(store, columns);

		store.loadPage(1);
	}
});