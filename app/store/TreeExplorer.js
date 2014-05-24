Ext.define('MDBE.store.TreeExplorer', {
    extend: 'Ext.data.TreeStore',
	root: {
		//text: 'root',
		//iconCls: 'server_database',
		expanded: true
	},
	proxy: {
		type: 'ajax',
		//url: 'php/get-explorer-tree2.php'
		url: ''
	},
    autoLoad: false
});
