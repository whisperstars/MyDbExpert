Ext.application({
    name: 'MDBE',
	appFolder: 'app',
	
	requires: ['MDBE.store.Charsets'],
	
    controllers: [
		'AppInit',
		'MainMenu',
		'TreeExplorer',
		'TabArea',
		'Forms.formConnection',
		'Forms.formDatabase',
		'Forms.formDBObject',
		//'Forms.formSettings',
		'Forms.formLogin',
        'ObjectProperty'
    ],

	autoCreateViewport: true

});