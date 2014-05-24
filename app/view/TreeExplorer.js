Ext.define('MDBE.view.TreeExplorer', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.treeexplorer',
	
	config: {
	
		connectionContextMenu: Ext.create('Ext.menu.Menu', {
			items: [
				{text: 'New Connection', itemId: 'mmNewConnection', iconCls: 'add_connection'},
				{text: 'Open Connection', itemId: 'mmOpenConnection', iconCls: 'connect'},
				{text: 'Close Connection', itemId: 'mmCloseConnection', iconCls: 'disconnect'},
				{text: 'Change Connection', itemId: 'mmChangeConnection', iconCls: 'change_connect'},
				{text: 'Drop Connection', itemId: 'mmDropConnection', iconCls: 'cross'},
				'-',
				{text: 'New Database', itemId: 'mmNewDataBase', iconCls: 'add_database'},
				'-'
			]
		}),
		
		databaseContextMenu: Ext.create('Ext.menu.Menu', {
			items: [{
				text: 'New',
				iconCls: 'new_database_object',
				menu: {
					items: [
						{text: 'New table', iconCls: 'table'},
						{text: 'New view', iconCls: 'view'},
						{text: 'New procedure', iconCls: 'procedure'},
						{text: 'New function', iconCls: 'function'},
						{text: 'New trigger', iconCls: 'trigger'}
					]}
				},
				'-',
				{text: 'Change Database', itemId: 'mmChangeDatabase', iconCls: 'change_database'},
				{text: 'Drop Database', itemId: 'mmDropDatabase', iconCls: 'cross'},
				'-'
			]
		}),
		
		tablefolderContextMenu: Ext.create('Ext.menu.Menu', {
			items: [
				{text: 'New Table', itemId: 'mmNewTable', iconCls: 'table'},
				'-'
			]
		}),		
		
		viewfolderContextMenu: Ext.create('Ext.menu.Menu', {
			items: [
				{text: 'New View', itemId: 'mmNewView', iconCls: 'view'},
				'-'
			]
		}),

		procedurefolderContextMenu: Ext.create('Ext.menu.Menu', {
			items: [
				{text: 'New Procedure', itemId: 'mmNewProcedure', iconCls: 'procedure'},
				'-'
			]
		}),
		
		functionfolderContextMenu: Ext.create('Ext.menu.Menu', {
			items: [
				{text: 'New Function', itemId: 'mmNewFunction', iconCls: 'function'},
				'-'
			]
		}),
		
		triggerfolderContextMenu: Ext.create('Ext.menu.Menu', {
			items: [
				{text: 'New Trigger', itemId: 'mmNewTrigger', iconCls: 'trigger'},
				'-'
			]
		}),
        
        tableContextMenu: Ext.create('Ext.menu.Menu', {
            items: [
                {text: 'Edit Table', itemId: 'mmEditTable', iconCls: 'change_table'},
                {text: 'Clear Table', itemId: 'mmClearTable', iconCls: 'clear_table'},
                {text: 'Delete Table', itemId: 'mmDeleteTable', iconCls: 'delete_table'},
                /*{text: 'Extract Data', itemId: 'mmExtractTableData'},
                {text: 'Rename Table', itemId: 'mmRenameTable'},*/
                //{text: 'Update Table', itemId: 'mmUpdateTable'},
                '-',
            ]
        })
	},

    initComponent: function() {
		this.id = 'TreeExplorer';
		this.collapsible = false;
		this.margins = '0 0 0 0';
        this.split = false;
        this.width = 220;   
		//this.title = 'Explorer';
		this.rootVisible = false;
        this.store = 'TreeExplorer'; 
		this.viewConfig = {markDirty:false};
        
		var commonMenu1 = [
			{text: 'Security Manager', itemId: 'mmSecurityManager', iconCls: 'security'},
			'-',
			{text: 'Backup Data', itemId: 'mmBackup', iconCls: 'dbbackup'},
			{text: 'Restore	Data', itemId: 'mmrestore', iconCls: 'dbrestore'},
            '-'
		];

		var commonMenu2 = [
			{text: 'Export Data', itemId: 'mmExportData', iconCls: 'export'},
			{text: 'Import Data', itemId: 'mmImportData', iconCls: 'import'},
			'-'
		];
			
		var commonMenu3 = [
			{text: 'Info', itemId: 'mmGetInfo', iconCls: 'infocard'},
			{text: 'Refresh', itemId: 'mmRefresh', iconCls: 'btn-refresh'}		
		];
		
		this.connectionContextMenu.add(commonMenu1);
		this.connectionContextMenu.add(commonMenu2);
		this.connectionContextMenu.add(commonMenu3);
		
		this.databaseContextMenu.add(commonMenu1);
		this.databaseContextMenu.add(commonMenu2);
		this.databaseContextMenu.add(commonMenu3);
		
		this.tablefolderContextMenu.add(commonMenu2);
		this.tablefolderContextMenu.add(commonMenu3);

		this.viewfolderContextMenu.add(commonMenu2);
		this.viewfolderContextMenu.add(commonMenu3);
		
		this.procedurefolderContextMenu.add(commonMenu3);
		
		this.functionfolderContextMenu.add(commonMenu3);
		
		this.triggerfolderContextMenu.add(commonMenu3);
        
        this.tableContextMenu.add(
            [
                {text: 'Security Manager', itemId: 'mmSecurityManager', iconCls: 'security'},
                '-'
            ]
        );
        this.tableContextMenu.add(commonMenu2);
        this.tableContextMenu.add(commonMenu3);
        
                
        this.callParent(arguments);
    }
});
