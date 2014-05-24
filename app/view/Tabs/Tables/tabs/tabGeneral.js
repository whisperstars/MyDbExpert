Ext.define('MDBE.view.Tabs.Tables.tabs.tabGeneral', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.tabletabgeneral',
   
   
    initComponent: function() {
		this.closable = true;
		this.title = 'General';
		this.html = 'Table tab General';
		
		
        this.callParent(arguments);
    }
});