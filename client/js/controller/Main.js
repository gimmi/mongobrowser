Ext.define('MongoBrowser.controller.Main', {
	extend: 'Ext.app.Controller',

	requires: [
		'MongoBrowser.util.SettingStorage'
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
		var queryField = this.getQueryField();

		queryField.setValue(MongoBrowser.util.SettingStorage.getData([
			"server: 'localhost', // optional",
			"port: 27017, // optional",
			"db: 'scretch',",
			"coll: 'zips',",
			"filter: {},",
			"fields: [",
			"   'fieldName', // simplest format, just property name",
			"   { header: 'City', dataIndex: 'city' },",
			"   { header: 'Zip code', dataIndex: 'zip', flex: 1 }",
			"],",
			"sort: ['zip', 'city'] // optional, you can also specify direction and order with this format: { zip: -1, city: 2 }",
			""
		].join('\n')));
	},

	_buildClientCfg: function (txt) {
		var cfg, ret = {};

		eval(Ext.String.format('cfg = {{0}};', txt));

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
		var cfgTxt = this.getQueryField().getValue(),
			cfg = this._buildClientCfg(cfgTxt),
			grid = this.getGrid(),
			pager = this.getPagingToolbar();

		MongoBrowser.util.SettingStorage.setData(cfgTxt);

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