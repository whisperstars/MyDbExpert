Ext.define('MDBE.view.Tabs.Tables.tabTable', {
	extend: 'Ext.tab.Panel',
    alias: 'widget.tabletab',
   
	requires: [
		'MDBE.view.Tabs.Tables.tabs.tabGeneral',
		'MDBE.view.Tabs.Tables.tabs.tabConstraints'
	],
   
    initComponent: function() {
		this.closable = true;
		this.title = 'Table';
		this.iconCls = 'table';
		//this.tabPosition = 'left';
		this.items = [
			{xtype: 'tabletabgeneral'},
			{xtype: 'tabletabconstraints'}
		];
		
        this.callParent(arguments);
    }
});