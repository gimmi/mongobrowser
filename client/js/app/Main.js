Ext.define('MongoBrowser.app.Main', {
	extend: 'Ext.app.Application',

	requires: ['MongoBrowser.view.Viewport'],

	controllers: [],

	launch: function () {
		Ext.create('MongoBrowser.view.Viewport');
	}
});
