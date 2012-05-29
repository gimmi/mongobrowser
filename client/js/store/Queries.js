Ext.define('MongoBrowser.store.Queries', {
	extend: 'Ext.data.Store',
	model: 'MongoBrowser.model.Query',
	autoSync: true,
	proxy: {
		type: 'localstorage',
		id  : 'queries'
	}
});
