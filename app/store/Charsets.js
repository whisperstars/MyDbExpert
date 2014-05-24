Ext.define('MDBE.store.Charsets', {
    extend: 'Ext.data.Store',
    model: 'MDBE.model.Charset',
	proxy: {
        type: 'ajax',
        url : 'data/charsets.json',
        reader: {
            type: 'json',
            root: 'charsets',
			successProperty: 'success'
        }
	},
    autoLoad: true
});