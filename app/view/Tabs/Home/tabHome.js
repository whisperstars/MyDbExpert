Ext.define('MDBE.view.Tabs.Home.tabHome', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.hometab',
   
   
    initComponent: function() {
		this.closable = true;
		this.id = 'homeTab';
		this.title = 'Home';
		this.iconCls = 'home';
		this.html = 'Home ...Home ...Home ...Home ...Home ...';
		
        this.callParent(arguments);
    }
});