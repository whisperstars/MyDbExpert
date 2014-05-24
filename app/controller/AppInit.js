Ext.define('MDBE.controller.AppInit', {
    extend: 'Ext.app.Controller',
	
    init: function() {
        this.control({
			'viewport': {
				render: this.onRender
			}
        });
    },
	
	onRender: function(){
		MDBE.nodeId = 0;
		MDBE.ConnectionsStore = Ext.create('MDBE.store.Hosts');
		MDBE.ConnectionsStore.add({
			connectionName: 'localhost:3306',
			host: 'localhost',
			port: '3306'/*,
			user: '',
			password: '',
			connected: false*/
		});
		
		//���������� store, ���������� ���������  Charsets � Collations
		MDBE.CharsetStore = Ext.create('MDBE.store.Charsets');
		MDBE.CollationStore = Ext.create('MDBE.store.Collations');
	}
});