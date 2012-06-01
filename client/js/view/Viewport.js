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
		bodyPadding: '5 5 0 5',
		layout: {
			type: 'vbox',
			align: 'stretch',
			defaultMargins: { bottom: 5 }
		},
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox',
				defaultMargins: { right: 5 }
			},
			items: [{
				xtype: 'combo',
				itemId: 'querycombo',
				store: 'Queries',
				displayField: 'name',
				width: 400
			}, {
				xtype: 'button',
				itemId: 'savebutton',
				text: 'Save'
			}, {
				xtype: 'button',
				itemId: 'deletebutton',
				text: 'Delete'
			}]
		}, {
			flex: 1,
			xtype: 'textareafield',
			itemId: 'queryfield',
			fieldStyle: 'font-family: monospace; white-space: nowrap;'
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				defaultMargins: { right: 5 }
			},
			items: [{
				xtype: 'button',
				itemId: 'querybutton',
				text: 'Run'
			}]
		}]
	}, {
		region: 'center',
		xtype: 'mongobrowsergrid'
	} ]
});
