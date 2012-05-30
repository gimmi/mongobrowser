Ext.define('MongoBrowser.controller.Main', {
	extend: 'Ext.app.Controller',

	requires: [
		'Ext.window.MessageBox'
	],

	stores: [ 'Queries' ],

	refs: [
		{ ref: 'grid', selector: 'mongobrowsergrid' },
		{ ref: 'pagingToolbar', selector: 'mongobrowsergrid pagingtoolbar' },
		{ ref: 'queryField', selector: '#queryfield' },
		{ ref: 'queryButton', selector: '#querybutton' },
		{ ref: 'queryCombo', selector: '#querycombo' }
	],

	init: function () {
		this.control({
			'#querybutton': {
				'click': this.onQueryButtonClick
			},
			'#querycombo': {
				'select': this.onQueryComboSelect
			}
		});
		this.application.addListener({
			scope: this
		});
	},

	onLaunch: function () {
		var store = this.getQueriesStore();

		store.load({
			callback: this._dataReady,
			scope: this
		});
	},

	_dataReady: function () {
		var store = this.getQueriesStore();

		if (store.getCount() !== 0) {
			this.selectRecord(store.getAt(0));
		} else {
			store.add(Ext.create('MongoBrowser.model.Query', {
				name: 'sample',
				text: [
					"url: 'mongodb://localhost:27017/default', // see www.mongodb.org/display/DOCS/Connections",
					"coll: 'zips',",
					"filter: {},",
					"fields: [",
					"   'fieldName', // simplest format, just property name",
					"   { header: 'City', dataIndex: 'city' },",
					"   { header: 'Zip code', dataIndex: 'zip', flex: 1 }",
					"],",
					"sort: ['zip', 'city'] // optional, you can also specify direction and order with this format: { zip: -1, city: 2 }"
				].join('\n')
			}));
			store.sync({
				success: this._dataReady,
				scope: this
			});
		}
	},

	_buildClientCfg: function (txt) {
		var cfg, ret = {};

		txt = Ext.String.format('cfg = {{0}\n};', txt);

		try {
			eval(txt);
		} catch(e) {
			return e.toString();
		}

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

		if (Ext.isString(cfg)) {
			Ext.Msg.alert('Error', cfg);
			return;
		}

		// TODO save query

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
				},
				listeners: {
					exception: this.onProxyException,
					scope: this
				}
			}
		});

		pager.bindStore(store);

		grid.reconfigure(store, cfg.columns);

		store.loadPage(1, {});
	},

	onProxyException: function (sender, resp) {
		Ext.Msg.alert('Error', resp.responseText);
	},

	onQueryComboSelect: function (sender, records) {
		this.selectRecord(records[0]);
	},

	selectRecord: function (record) {
		var field = this.getQueryField(),
			combo = this.getQueryCombo();

		combo.select(record);
		field.setValue(record.get('text'));
	}
});