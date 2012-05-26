Ext.define('MongoBrowser.app.Main', {
	extend: 'Ext.app.Application',

	requires: [
		'MongoBrowser.view.Viewport',
		'MongoBrowser.controller.Main'
	],

	controllers: [
		'Main'
	],

	launch: function () {
		Ext.create('MongoBrowser.view.Viewport');
	}
});
