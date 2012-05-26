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
			grid = this.getGrid(),
			store;

		Ext.log({ dump: cfg });

		var columns = Ext.Array.map(cfg.fields, function (field) {
			return { header: field, dataIndex: field };
		}, this);

		var fields = Ext.Array.map(cfg.fields, function (field) {
			return { name: field };
		}, this);

		store = Ext.create('Ext.data.Store', {
			fields: fields,
			data: {
				items: [
					{ 'f1': 'Lisa', "f2":"lisa@simpsons.com" },
					{ 'f1': 'Marge', "f2":"marge@simpsons.com" }
				]
			},
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'items'
				}
			}
		});

		grid.reconfigure(store, columns);
	}
});