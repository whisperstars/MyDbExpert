Ext.define('MDBE.view.Forms.formDatabase', {
	extend: 'Ext.form.Panel',
    alias: 'widget.formdatabase',

	requires: ['MDBE.util.Utils'],
	
	config: {
		connectionNode: null
	},
	
    initComponent: function() {
	/*
		var connectionCombo = {
			xtype: 'combobox',
			name: 'connectionName',
			editable: false,
			queryMode: 'local',
			store: MDBE.ConnectionsStore,
			displayField: 'connectionName',
			valueField: 'connectionName',		
			//width: 265,
			flex: 1,
			margin: '0 0 5 0',
			allowBlank: false,
			fieldLabel: 'Connection name',
			labelAlign: 'top'
		};	
	*/
		var connectionName = {
			xtype: 'textfield',
			name: 'connectionName',
			flex: 1,
			margin: '0 0 5 0',
			labelAlign: 'top',
			fieldLabel: 'Connection Name',
			//disabled: true,
			readOnly: true,
			value: this.connectionNode.data.text
		};		
		
		var DBName = {
			xtype: 'textfield',
			name: 'DBName',
			flex: 1,
			margin: '0 0 5 0',
			labelAlign: 'top',
			fieldLabel: 'Database Name'
		};
		
		var charSetCombo = {
			xtype: 'combobox',
			name: 'charSet',
			flex: 1,
			margin: '0 0 5 0',
			editable: false,
			fieldLabel: 'Character Set',
			queryMode: 'local',
			store: MDBE.CharsetStore,
			displayField: 'CHARACTER_SET_NAME',
			valueField: 'CHARACTER_SET_NAME'
		};

		var collationCombo = {
			xtype: 'combobox',
			name: 'collation',
			flex: 1,
			margin: '0 0 5 0',
			editable: false,
			fieldLabel: 'Collation',
			queryMode: 'local',
			store: MDBE.CollationStore,
			displayField: 'COLLATION_NAME',
			valueField: 'COLLATION_NAME'
		};		

		this.bodyPadding = '5 5 5 5';

		this.items = [
			{
				xtype:'container',
				layout: 'fit',
				margin: '0 0 5 0',
				items: [
					connectionName,
					DBName
				]			
			},
			{
				xtype: 'fieldset',
				layout: 'fit',
				title: 'Options',
				margin: '0 0 5 0',
				items: [
					charSetCombo,
					collationCombo							
				]
			}			
		];
		
		this.buttons = [{
				text: 'OK',
				itemId: 'btnOK'
			},{
				text: 'Cancel',
				//iconCls: '',
				itemId: 'btnCancel'
			}	
		]		
		
        this.callParent(arguments);
    }

});

