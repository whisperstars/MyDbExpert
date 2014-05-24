Ext.define('MDBE.controller.Forms.formLogin', {
    extend: 'Ext.app.Controller',

	//views: ['MDBE.view.Forms.formLogin'],
	views: ['Forms.formLogin'],
	
	requires: ['MDBE.util.Utils'],
	
    init: function() {
        this.control({
			'formlogin button[itemId=btnOK]': {
				click: this.onBtnOKClick
			},
		
			'formlogin button[itemId=btnCancel]': {
				click: this.onBtnCancelClick
			},
			
			'formlogin textfield[name=Password]': {
				keypress: this.onKeyPress
			}		
        });
    },
	
	onBtnOKClick: function(button){
		this.openConnection(button.up('form'));
	}, 
	
	onBtnCancelClick: function(button){
		//alert('onBtnCancelClick');
		button.up('form').node.collapse();
		button.up('window').destroy();
	},
	
	onKeyPress: function(f,e){
		var key = e.getKey();
		if (key == e.ENTER) {
			this.openConnection(f.up('form'));
		}
	},
	
	openConnection: function(form){
		//var v = button.up('form');
		var vls = form.getForm().getValues();
		var connectionData = {
			connectionName: form.connectionData.connectionName, 
			host: form.connectionData.host,
			port: form.connectionData.port,
			user: 'root',//vls['User'],
			password: '1',//vls['Password'],	
			connected: false
		};
		
		MDBE.util.Utils.checkDBConnect(connectionData,	{
            success: function(param) {
				if (param){
					var idx = MDBE.ConnectionsStore.find('connectionName', connectionData.connectionName);
					if ( idx > -1 ){
						//connectionData.connected = true;
						var data = MDBE.ConnectionsStore.getAt(idx).data;
						data.user = connectionData.user;
						data.password = connectionData.password;
						data.connected = true;
					};
					form.node.removeAll(true);
					MDBE.util.Utils.addChildNodes(form.node);
					//������������ ���������� �����:
					if (form.instructions==='newDatabase'){
						Ext.create('Ext.window.Window', {
							title: 'New Database',
							iconCls: 'add_database',
							layout: 'fit',
							width: 400,
							modal: true,
							items: [{
								xtype: 'formdatabase',
								connectionNode: form.node
							}],
							listeners: {
								show: function(w){ 
									w.down('form').getForm().findField('DBName').focus(true,100);
								}
							}
						}).show();					
					};
					//�������
					form.up('window').destroy();
					form.destroy();					
				} else {
					alert('Incorrect user name or password');
				}
            },
            failure: function() {
				//alert('Connection failed!');
            }
		});
	}
	
});