Ext.define('MongoBrowser.view.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.mongobrowsergrid',

	sortableColumns: false,
	enableColumnHide: false,

	columns: [
		{ header: 'Name',  dataIndex: 'name' },
		{ header: 'Email', dataIndex: 'email', flex: 1 },
		{ header: 'Phone', dataIndex: 'phone' }
	],

	dockedItems: [{
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		displayInfo: true
	}]
});
