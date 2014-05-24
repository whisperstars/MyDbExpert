Ext.define('MDBE.view.Forms.formConnection', {
	extend: 'Ext.form.Panel',
    alias: 'widget.connectionform',
	
	config: {
		action: 'new',
		connectionStoreIndex: -1
	},

    initComponent: function() {
	
		var Host = {
			xtype: 'textfield',
			name: 'Host',
			flex: 1,
			margin: '0 0 5 0',
			labelWidth: 50,
			allowBlank: false,
			fieldLabel: 'Host'
		};	
		
		var Port = {
			xtype: 'numberfield',
			name: 'Port',
			flex: 1,
			margin: '0 0 10 0',
			labelWidth: 50,
			allowBlank: false,
			fieldLabel: 'Port',
			value: 3306
		};
		
		var connectionName = {
			xtype: 'textfield',
			name: 'connectionName',
			flex: 1,
			margin: '0 0 10 0',
			labelAlign: 'top',
			//allowBlank: false,
			fieldLabel: 'Connection Name',
			enableKeyEvents: true
		};		
		
		var User = {
			xtype: 'textfield',
			name: 'User',
			flex: 1,
			margin: '0 0 5 0',
			labelWidth: 50,
			labelAlign: 'top',
			fieldLabel: 'User'
		};	
		
		var Password = {
			xtype: 'textfield',
			name: 'Password',
			inputType: 'password',
			flex: 1,
			margin: '0 0 10 0',
			labelWidth: 50,
			labelAlign: 'top',
			fieldLabel: 'Password',
			enableKeyEvents: true
		};		

		this.bodyPadding = '5 5 5 5';
	
		this.items = [
			{
				xtype:'container',
				layout: 'fit',
				items: [
					Host,
					Port,
					connectionName
				]			
			}, {
				xtype: 'fieldset',
				layout: 'fit',
				itemId: 'login',
				title: 'Open connection after save',
				checkboxToggle: true,
				collapsed: true,				
				items: [
					User,
					Password
				]
			}
		];
		
		this.buttons = [
			{
				text: 'Test Connection',
				itemId: 'btnTest'
			},
			{xtype: 'tbfill'},
			{
				text: 'OK',
				//disabled: true,
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

