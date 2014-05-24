Ext.define('MDBE.view.Forms.formLogin', {
	extend: 'Ext.form.Panel',
    alias: 'widget.formlogin',

    config: {
		connectionData: {},
		node: null,
		instructions: '' //определяет, что делать после того, как успешно законнектились (см. контроллере метод openConnection)
    },

    initComponent: function() {
	
		var connectionHost = {
			xtype: 'label',
			text: 'Host: Localhost',
			flex: 1,
			margin: '0 0 5 0'
		};	

		var connectionPort = {
			xtype: 'label',
			text: 'Port: 3306',
			flex: 1,
			margin: '0 0 10 0'
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
				xtype: 'container',
				layout: 'vbox',
				items: [
					connectionHost,
					connectionPort
				]			
			}, {
				xtype: 'fieldset',
				layout: 'fit',
				title: 'MySQL Login',
				items: [
					User,
					Password
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

