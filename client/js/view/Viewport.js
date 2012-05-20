Ext.define('MongoBrowser.view.Viewport', {
	extend: 'Ext.container.Viewport',

	padding: 5,
	layout: 'border',

	items: [ {
		region: 'west',
		split: true,
		xtype: 'treepanel',
		width: 150,
		collapsed: false,
		collapsible: true,
		title: 'My Tree Panel'
	}, {
		region: 'center',
		xtype: 'panel',
		border: 0,
		layout: 'border',
		items: [ {
			region: 'center',
			xtype: 'panel'
		}, {
			region: 'south',
			split: true,
			collapsible: true,
			xtype: 'panel',
			height: 150,
			title: 'My Panel'
		}, {
			region: 'north',
			split: true,
			collapsible: true,
			xtype: 'panel',
			height: 150,
			title: 'My Panel'
		} ]
	} ]
});
