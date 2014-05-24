Ext.define('MDBE.view.Forms.formDBObject', {
	extend: 'Ext.form.Panel',
    alias: 'widget.dbobjectform',

    initComponent: function() {
	
		var hostCombo = {
			xtype: 'combobox',
			name: 'hostName',
			editable: false,
			queryMode: 'local',
			//store: getLocalSchemas(),
			displayField: 'HOST_NAME',
			valueField: 'HOST_NAME',		
			//width: 265,
			flex: 1,
			allowBlank: false,
			fieldLabel: 'Host name',
			labelAlign: 'top',
			value: ''
		};	
		
		var schemaCombo = {
			xtype: 'combobox',
			name: 'schemaName',
			editable: false,
			queryMode: 'local',
			//store: getLocalSchemas(),
			displayField: 'SCHEMA_NAME',
			valueField: 'SCHEMA_NAME',		
			//width: 265,
			flex: 1,
			allowBlank: false,
			fieldLabel: 'Schema name',
			labelAlign: 'top',
			value: ''
		};
		
		var dbObjName = {
			xtype: 'textfield',
			name: 'DBObjectName',
			flex: 1,
			labelAlign: 'top',
			//componentLayout: 'fit',
			fieldLabel: 'DB Object name'
		};		

		//this.layout = 'absolute',;
		this.bodyPadding = '5 5 5 5';
	
		this.items = [
			{
				xtype:'container',
				layout: 'fit',
				items: [
					hostCombo,
					schemaCombo,
					dbObjName
				]			
			}		
		];
		
		this.buttons = [
			{
				text: 'OK',
				//disabled: true,
				itemId: 'btnOK'
				//iconCls: 'btn-disk',
				/*
				handler: function() {
					var win = this.up('window');
					var form = this.up('form').getForm();
					
					if (form.isValid()) {
						var v = form.getValues();
						if (typeof callbackFunction == "function")
							callbackFunction({schemaName:v.schemaName, dbObjectType:v.dbObject}); //вызываем наш callback и передаем параметр
						
						win.destroy();
					}						
				}*/
			},
			{
				xtype: 'button',
				text: 'Cancel',
				iconCls: '',
				//id: 'idbtnCancel',
				itemId: 'btnCancel'
			}	
		]		
		
        this.callParent(arguments);
    }

});

