Ext.define('MDBE.model.Database', {
    extend: 'Ext.data.Model',
	idgen: 'sequential',
    fields: [
		'Name',
		'CharacterSetName',
		'CollationName',
		'ParrentId'
	]
});