Ext.define('MongoBrowser.view.Viewport', {
	extend: 'Ext.container.Viewport',

	requires: [
		'MongoBrowser.view.Grid'
	],

	padding: 5,
	layout: 'border',

	items: [ {
		region: 'north',
		split: true,
		xtype: 'panel',
		height: 200,
		bodyPadding: 5,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			flex: 1,
			xtype: 'textareafield',
			itemId: 'queryfield',
			fieldStyle: 'font-family: monospace;',
			value: "db: 'scretch', coll: 'zips', fields: ['city', 'zip']"
		}, {
			xtype: 'container',
			layout: 'hbox',
			items: [{
				xtype: 'button',
				itemId: 'querybutton',
				text: 'run'
			}]
		}]
	}, {
		region: 'center',
		xtype: 'mongobrowsergrid'
	} ]
});
