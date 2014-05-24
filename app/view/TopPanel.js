Ext.define('MDBE.view.TopPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.toppanel',
   
    initComponent: function() {

		var newObjectsMenu = Ext.create('Ext.menu.Menu', {
			items: [
				{id: 'newTable', text: 'New table', iconCls: 'table'},
				{text: 'New view', iconCls: 'view'},
				{text: 'New procedure', iconCls: 'procedure'},
				{text: 'New function', iconCls: 'function'},
				{text: 'New trigger', iconCls: 'trigger'}
			]
		});	
		var contextMenu = Ext.create('Ext.menu.Menu', {
			items: [
				{text: 'New connection', itemId: 'mmNewConnection', iconCls: 'add_connection'},
				{text: 'New database', itemId: 'mmNewDataBase', iconCls: 'add_database'},
				//'-',
				{text: 'New DB Objects', iconCls: 'new_database_object', menu: newObjectsMenu},
				'-',
				{text: 'Export Data', iconCls: 'export', tooltip: 'Export Data'},
				{text: 'Import Data', iconCls: 'import', tooltip: 'Import Data'},			
				{text: 'Backup Data', iconCls: 'dbbackup', tooltip: 'Backup Data'},
				{text: 'Restore Data', iconCls: 'dbrestore', tooltip: 'Restore Data'},	
				'-',
				{text: 'SQL', iconCls: 'sql', tooltip: 'SQL tab'},
				//'-',
				{text: 'Security Manager', iconCls: 'security', tooltip: 'Security Manager'},
				{text: 'Configure', iconCls: 'configure', tooltip: 'Configure'},
			]
		});
		var mmButton = Ext.createWidget('splitbutton',{
			text: 'MyDBExpert',
			iconCls: 'dolphin',
			scale: 'large',
			menu: contextMenu	
		});
		
		var btnNewDBObject = {
			xtype: 'button',
			scale: 'large',
			iconCls:'new_database_object_large'
		};		
		
		var _separator_ = {xtype: 'tbseparator', height: 35};

		this.width = 40;
		this.tbar = [ 
			mmButton, 
			_separator_,
			{xtype: 'button', itemId: 'mmNewConnection',  iconCls:'add_connection_large', scale: 'large', tooltip: 'New Connection'},
			{xtype: 'button', itemId: 'mmNewDataBase',  iconCls:'add_database_large', scale: 'large', tooltip: 'New Database'},
			{xtype: 'splitbutton', iconCls:'new_database_object_large', scale: 'large', tooltip: 'New Database objects', menu: newObjectsMenu},
			_separator_,
			{xtype: 'button', iconCls: 'save_large', scale: 'large', tooltip: 'Save', disabled: true},
			_separator_,
			{xtype: 'button', iconCls: 'export_large', scale: 'large', tooltip: 'Export Data'},
			{xtype: 'button', iconCls: 'import_large', scale: 'large', tooltip: 'Import Data'},			
			{xtype: 'button', iconCls: 'dbbackup_large', scale: 'large', tooltip: 'Backup Data'},
			{xtype: 'button', iconCls: 'dbrestore_large', scale: 'large', tooltip: 'Restore Data'},	
			_separator_,
			{xtype: 'button', iconCls: 'sql_large', scale: 'large', tooltip: 'New SQL tab'},
			//_separator_,
			{xtype: 'button', iconCls: 'security_large', scale: 'large', tooltip: 'Security Manager'},
			{xtype: 'button', iconCls: 'configure_large', scale: 'large', tooltip: 'Configure'},
			{xtype: 'tbfill'},
			{xtype: 'button', itemId: 'btnLoadSettings', text: 'load settigs'},
			{xtype: 'button', itemId: 'btnSaveSettings', text: 'save settigs'}
		];
        this.collapsible = false;
		this.split = false;
		
        this.callParent(arguments);
    }
});
