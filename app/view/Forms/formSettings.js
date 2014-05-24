Ext.define('MDBE.view.Forms.formSettings', {
	extend: 'Ext.form.Panel',
    alias: 'widget.formsettings',

    initComponent: function() {
	
		var settingsName = {
			xtype: 'textfield',
			name: 'SettingsName',
			flex: 1,
			margin: '0 0 5 0',
			labelWidth: 50,
			labelAlign: 'top',
			fieldLabel: 'Settings Name'
		};	
		
		var password = {
			xtype: 'textfield',
			name: 'Password',
			inputType: 'password',
			flex: 1,
			margin: '0 0 10 0',
			labelWidth: 50,
			labelAlign: 'top',
			fieldLabel: 'Password (if need)'
		};
		
		this.bodyPadding = '5 5 5 5';
	
		this.items = [
			{
				xtype:'container',
				layout: 'fit',
				items: [
					settingsName,
					password
				]			
			}		
		];
		
		this.buttons = [
			{
				text: 'OK',
				itemId: 'btnOK'
				//iconCls: 'btn-disk',
			},
			{
				xtype: 'button',
				text: 'Cancel',
				iconCls: '',
				itemId: 'btnCancel'
			}	
		]		
		
        this.callParent(arguments);
    }

});

