Ext.define('MDBE.controller.Forms.formConnection', {
    extend: 'Ext.app.Controller',

	views: ['MDBE.view.Forms.formConnection'],
	
	requires: ['MDBE.util.Utils'],

    init: function() {
        this.control({
			'connectionform': {
				afterrender: this.onFormRender
			},
			'connectionform button[itemId=btnOK]': {
				click: this.onBtnOKClick
			},
			'connectionform button[itemId=btnCancel]': {
				click: this.onBtnCancelClick
			},
			'connectionform button[itemId=btnTest]': {
				click: this.onBtnTestClick
			},
			'connectionform textfield[name=connectionName]': {
				keypress: this.onKeyPress
			},
			'connectionform textfield[name=Password]': {
				keypress: this.onKeyPress
			},			
			'connectionform fieldset': {
				expand: this.onLoginBlockExpand
			}
        });
    },
	
	onFormRender: function(form){
		if (form.action === 'edit'){
			var node = Ext.getCmp('TreeExplorer').getSelectionModel().getSelection()[0];
			var connection = MDBE.util.Utils.getConnectionFromNode(node);
			form.up('window').setTitle('Change connection (' + connection.connectionName + ')');
			form.getForm().setValues({
				Host: connection.host,
				Port: connection.port,
				connectionName: connection.connectionName
			});
			if (connection.connected){
				form.down('fieldset[itemId=login]').checkboxToggle = false;
				form.down('fieldset[itemId=login]').setVisible(false);
				form.down('button[itemId=btnTest]').setVisible(false);
			}
		}
	},
	
	
	onBtnOKClick: function(button){
		this.saveConnection(button.up('form'));
	}, 
	
	onKeyPress: function(f,e){
		var key = e.getKey();
		if (key == e.ENTER) {
			this.saveConnection(f.up('form'));
		}
	},
	
	onBtnCancelClick: function(button){
		//alert('newconnectionform button[itemId=btnCancel]');
		button.up('window').destroy();
	},
	
	onBtnTestClick: function(button){
		//alert('newconnectionform button[itemId=btnCancel]');
		var form = button.up('form'),
			vls = form.getForm().getValues(),
			connectionInfo = {
				host: form.host,
				port: form.port,
				user_name: vls['User'],
				password: vls['Password']		
			};
		
		MDBE.util.Utils.checkDBConnect(connectionInfo,	{
            success: function(param) {
				if (param){
					alert('Connected!');
				} else {
					alert('Incorrect user name or password');
				}
            },
            failure: function() {
				//alert('Connection failed!');
            }
		});		
		
	},	
	
	saveConnection: function(form){
		var vls = form.getForm().getValues();
		
		if (form.getForm().isValid()) { //��������� ������������� ��������� �����
			var connName = (vls.connectionName==='') ? (vls.Host + ':' + vls.Port) : vls.connectionName;
			
			if (form.action === 'new') {  //���� ����� "����� ����������"
			
				//��������� ������������ ����� ����������
				var idx = MDBE.ConnectionsStore.find('connectionName', connName, 0, false, false, true);
				if (idx === -1) { //��� �������� ������� ���������
					MDBE.ConnectionsStore.add({
						//connectionId: MDBE.ConnectionId++,
						connectionName: connName,
						host: vls.Host,
						port: vls.Port/*, 
						user: vls.User,
						password: vls.Password*/
					});		
					
					var rootNode = Ext.getCmp('TreeExplorer').getRootNode(),
						newNode = rootNode.appendChild({
							id: '0,' + vls.Host + ':' + vls.Port + '[' + connName + ']',
							text: connName,
							iconCls: 'server_database',
							expanded: false,
							loaded: false,
							qtip: 'Host: ' + vls.Host + ', Port:' + vls.Port
						});
	
					var fs = form.down('fieldset[itemId=login]');
					if (!fs.collapsed){ //�������� ������� ����������
						//var vls = form.getForm().getValues();
						var connectionInfo = {
							host: vls['Host'],
							port: vls['Port'],
							user_name: vls['User'],
							password: vls['Password']
						};
						MDBE.util.Utils.checkDBConnect(connectionInfo,	{
	                        success: function(param) {
    							if (param){
									MDBE.util.Utils.addChildNodes(newNode);
									//newNode.expand();
								} else {
									alert('Incorrect user name or password');
								}
	                        },
                            failure: function() {
    							//alert('Connection failed!');
	                        }
    					});					
					}
	
					form.up('window').destroy();	
				}
                else {
					alert('Error! This connection name already exists!');
					return false;
				}
				
			}
			
			if (form.action === 'edit') {
				//��������� ������������ ����� ����������
				var idx = MDBE.ConnectionsStore.find('connectionName', connName, 0, false, false, true);
				if ((idx === -1) || (idx === form.connectionStoreIndex)){
					//Update TreeExplorer node
					var currentNode = Ext.getCmp('TreeExplorer').getSelectionModel().getSelection()[0];
					currentNode.set('text', connName);
					currentNode.set('id', '0,' + vls.Host + ':' + vls.Port + '[' + connName + ']');
					currentNode.set('qtip', 'Host: ' + vls.Host + ', Port:' + vls.Port);
					//Update Connections Store
					
					var data = MDBE.ConnectionsStore.getAt(form.connectionStoreIndex).data;
					data.connectionName = connName;
					data.host = vls.Host;
					data.port = vls.Port; 
					data.user = vls.User;
					data.password = vls.Password;
				}
				form.up('window').destroy();
			} else {
				alert('Error! This connection name already exists!');
				return false;
			}
			
		} else {
			alert('Error! Check required fields!');
			return false;
		};
	},
	
	onLoginBlockExpand: function(fs){
		var form = fs.up('form'),
			fld = form.getForm().findField('User');
		fld.focus(false,2000);  //??? �� ��������
	}

});