Ext.define('MongoBrowser.view.Grid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.mongobrowsergrid',

	sortableColumns: false,
	enableColumnHide: false,
	enableColumnMove: false,

	columns: [],

	dockedItems: [{
		xtype: 'pagingtoolbar',
		dock: 'bottom',
		displayInfo: true
	}]
});
