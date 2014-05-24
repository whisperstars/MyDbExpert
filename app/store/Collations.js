Ext.define('MDBE.store.Collations', {
    extend: 'Ext.data.Store',
    model: 'MDBE.model.Collation',
	proxy: {
        type: 'ajax',
        url : 'data/collations.json',
        reader: {
            type: 'json',
            root: 'collations',
			successProperty: 'success'
        }
	},
    autoLoad: true
});