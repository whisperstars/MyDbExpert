Ext.define('MDBE.view.TabArea', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabarea',
   
    requires: [
		'MDBE.view.Tabs.Home.tabHome'
    ],   
   
    initComponent: function() {

		this.id = 'tabArea';
		this.items = [{xtype: 'hometab'}];
        this.callParent(arguments);
    }
});
