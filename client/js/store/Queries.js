Ext.define('MongoBrowser.store.Queries', {
	extend: 'Ext.data.Store',
	model: 'MongoBrowser.model.Query',
	proxy: {
		type: 'localstorage',
		id  : 'mongobrowser-queries'
	}
});
