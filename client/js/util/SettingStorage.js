Ext.define('MongoBrowser.util.SettingStorage', {
	statics: {
		_storage: {},
		getData: function (def) {
			var ret;
			if (window.localStorage) {
				ret = window.localStorage.getItem('data');
			} else {
				ret = this._storage['data'];
			}
			return ret || def;
		},
		setData: function (value) {
			if (window.localStorage) {
				window.localStorage.setItem('data', value);
			} else {
				this._storage['data'] = value;
			}
		}
	}
});