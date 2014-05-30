Ext.define('MDBE.model.Host', {
    extend: 'Ext.data.Model',
	idgen: 'sequential',
    fields: [
		'connectionName', 
		'host', 
		'port', 
		'user', 
		'password', 
		'connected'
	]
});