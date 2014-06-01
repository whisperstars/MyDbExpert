Ext.define('MDBE.util.Utils', {
	singleton: true,

	loadStory: function(story, parameters, callback, scope) {
		Ext.Ajax.request({
			url: 'php/index.php',
			params: parameters,
			success: function(response) { 
				var data = Ext.JSON.decode(response.responseText);
				if(!data.error.exist_error) {
					if(!data.auth.need_auth || (data.auth.need_auth && data.auth.need_auth)) {
						story.loadData(data.data);
						console.log(story);
					}
					else {
						Ext.create('Ext.window.Window', {
							title: 'MySQL Login ',
							iconCls: 'server_key',
							layout: 'fit',
							closable: false, 
							width: 300,
							modal: true,
							items: [{
								xtype: 'formlogin',
								connectionData: connectionData,
								node: node
							}],
							listeners: {
								show: function(w){ 
									w.down('form').getForm().findField('User').focus(true,100);
								}
							}
						}).show();
					}
				}
				else {
					alert(data.error.error_message);
				}
			},
			method: "POST"
		});
	},

	checkDBConnect: function(connectionData, options){
		Ext.Ajax.request({ //�������� ������
			url: 'php/index.php',
			params: {
				host: connectionData.host,
				port: connectionData.port,
				user_name: connectionData.user,
				password: connectionData.password,
                script_name: 'check_db_connect',
                submit: 'true'
			},
			success: function(response) { 
				var chk = Ext.decode(response.responseText)['auth']['result'];
				options.success.call(this, chk);
			},
			failure: function(response, opts) {
				options.failure.call(this);
			}
		});			
	},
	
	addChildNodes: function(node){
		//var connName = this.getConnectionFromNode(node).connectionName;
		var connNode = this.getConnectionNode(node);
		var connectionData = this.getConnectionFromNode(connNode);
		var cls = '';
		var params = {host: connectionData.host, port: connectionData.port, user_name: connectionData.user, password: connectionData.password, sql_str: ''};
		var isLeaf = false;
		var saveNode = node.data.iconCls;
        
		switch (node.data.depth){
			case 1: //�������� ������ ���
				params.sql_str = "select SCHEMA_NAME from schemata where SCHEMA_NAME<>'information_schema'";
				cls = 'database';
				break;
			case 2: //���������� ���� �� ����� �������� (tables, views, procedures, ...)
				node.removeAll(true);
				node.appendChild([
					{id: MDBE.nodeId++, text: 'Tables', iconCls: 'folder_table'},
					{id: MDBE.nodeId++, text: 'Views', iconCls: 'folder_view'},
					{id: MDBE.nodeId++, text: 'Procedures', iconCls: 'folder_procedure'},
					{id: MDBE.nodeId++, text: 'Functions', iconCls: 'folder_function'},
					{id: MDBE.nodeId++, text: 'Triggers', iconCls: 'folder_trigger'}
				]);
                node.data.loaded = true;
				return;
			case 3: //�������� ������ �������� ������� ����
				var dbName = node.parentNode.data.text;
                node.set('iconCls', 'loading');
                
				switch (node.data.text){
					case 'Tables':
						params.sql_str = "select TABLE_NAME from TABLES where TABLE_SCHEMA='"+dbName+"' AND TABLE_TYPE='BASE TABLE'";
						cls = 'table';
						break;
					case 'Views':
						params.sql_str = "select TABLE_NAME from VIEWS where TABLE_SCHEMA='"+dbName+"'";
						cls = 'view';
						break;
					case 'Procedures':
						params.sql_str = "select ROUTINE_NAME from routines where ROUTINE_SCHEMA='"+dbName+"' AND ROUTINE_TYPE='PROCEDURE'";
						cls = 'procedure';
						break;
					case 'Functions':
						params.sql_str = "select ROUTINE_NAME from routines where ROUTINE_SCHEMA='"+dbName+"' AND ROUTINE_TYPE='FUNCTION'";
						cls = 'function';
						break;
					case 'Triggers':
						params.sql_str = "select TRIGGER_NAME from triggers where TRIGGER_SCHEMA='"+dbName+"'";
						cls = 'trigger';
						break;
				}
				break;
				
			case 4: //���������� ������ ������: ������� �� ��������, ������������, ��������, ...
				node.removeAll(true);
                
				var str = node.parentNode.data.text;
				var txt = str.substring(0, str.indexOf('(')).trim();
				switch (txt){
					case 'Tables':
						node.appendChild([
							{id: MDBE.nodeId++, text: 'Columns', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Constraints', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Indexes', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Triggers', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Depend on', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Uses in', iconCls: ''}
						]);
						break;
					case 'Views':
						node.appendChild([
							{id: MDBE.nodeId++, text: 'Columns', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Depend on', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Uses in', iconCls: ''}
						]);
						break;
					case 'Procedures':
						node.appendChild([
							{id: MDBE.nodeId++, text: 'Depend on', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Uses in', iconCls: ''}
						]);
						break;
					case 'Functions':
						node.appendChild([
							{id: MDBE.nodeId++, text: 'Depend on', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Uses in', iconCls: ''}
						]);
						break;
					case 'Triggers':
						node.appendChild([
							{id: MDBE.nodeId++, text: 'Depend on', iconCls: ''},
							{id: MDBE.nodeId++, text: 'Uses in', iconCls: ''}
						]);
						break;
				}
                node.data.loaded = true;
				return;

			case 5:
				var dbName = node.parentNode.parentNode.parentNode.data.text;
				var tableName = node.parentNode.data.text;
				switch (node.data.text){
					case 'Columns':
						params.sql_str = "select COLUMN_NAME from COLUMNS where TABLE_SCHEMA='"+dbName+"' AND TABLE_NAME='"+tableName+"'";
						cls = 'column';
						isLeaf = true;
						break;
					case 'Constraints':
						//params.sql_str = "select distinct CONSTRAINT_NAME from key_column_usage where TABLE_SCHEMA='"+dbName+"' AND TABLE_NAME='"+tableName+"'";
						params.sql_str = "select distinct CONSTRAINT_NAME from table_constraints where TABLE_SCHEMA='"+dbName+"' AND TABLE_NAME='"+tableName+"' AND CONSTRAINT_TYPE<>'UNIQUE'";
						cls = '?PRIMARY?';
						break;
					case 'Indexes':
						params.sql_str = "select distinct INDEX_NAME from statistics where TABLE_SCHEMA='"+dbName+"' AND TABLE_NAME='"+tableName+"' AND INDEX_NAME<>'PRIMARY'";
						cls = 'index';
						break;
					case 'Triggers':
						params.sql_str = "select TRIGGER_NAME from triggers where TRIGGER_SCHEMA='"+dbName+"' AND EVENT_OBJECT_TABLE='"+tableName+"'";
						cls = 'trigger';
						isLeaf = true;
						break;
					case 'Depend on':

						break;
					case 'Uses in':

						break;
				}
				break;
			
			case 6:
				var dbName = node.parentNode.parentNode.parentNode.parentNode.data.text;
				var tableName = node.parentNode.parentNode.data.text;	
				var constraintName = node.data.text;
				params.sql_str = "select COLUMN_NAME from key_column_usage where TABLE_SCHEMA='"+dbName+"' AND TABLE_NAME='"+tableName+"' AND CONSTRAINT_NAME='"+constraintName+"' ORDER BY ORDINAL_POSITION";

				cls = 'column';
				isLeaf = true;
				break;
		}
		
		Ext.Ajax.request({
			url: 'php/getChildNodes.php',
			params: params,
			success: function(response, me){
				if (response.responseText>''){
					var arr_list = response.responseText.split(',');
					var nodes = [];
					var _cls = cls;
					for (var i=0; i<arr_list.length; i++){
						if (_cls==='?PRIMARY?'){ //���������� ������ ����� ������ �������� ��� constraint
							cls = (arr_list[i]==='PRIMARY')?'key':'gray_key';
						}
						nodes.push({
							id: MDBE.nodeId++, //����� ������������� "������" ����� �������
							text: arr_list[i],
							iconCls: cls,
							leaf: isLeaf
						});
					}
					if (node.data.depth===3){
						node.data.text = node.data.text + ' (' + arr_list.length + ')';
					};
                    node.data.loaded = true;
					node.appendChild(nodes);
				}
                node.set('iconCls', saveNode);
			}
		});	
	},
	
	refreshNode: function(node, nodes_list){
		var connectionData = this.getConnectionFromNode(this.getConnectionNode(node));
		Ext.Ajax.request({
			url: 'php/refreshNode.php',
			params: {
				node: node.data['id'],
				nodes_list: nodes_list,
				host: connectionData.host,
				port: connectionData.port,
				user_name: connectionData.user,
				password: connectionData.password			  
			},
			success: function(response, me){
				var data = Ext.decode(response.responseText);
				if (data.success === true) {
					node.removeAll(true);
					node.appendChild(data.children);
					node.expand(true);
				}
			}
		});	
	
	},
	
	expandTreeExplorerNode: function(node){
		if ( node.data.depth === 1) {
			var connectionData = this.getConnectionFromNode(node);
			if ( !connectionData.connected ){ //����� ������� ������ �� �������
				Ext.create('Ext.window.Window', {
					title: 'MySQL Login ',
					iconCls: 'server_key',
					layout: 'fit',
					closable: false, 
					width: 300,
					modal: true,
					items: [{
						xtype: 'formlogin',
						connectionData: connectionData,
						node: node
					}],
					listeners: {
						show: function(w){ 
							w.down('form').getForm().findField('User').focus(true,100);
						}
					}
				}).show();			
			}
		} else {  //��� ��������� ���� ������, ����� ������
			if( !node.data.loaded ){
                this.addChildNodes(node);
            }
		}
	},
	
	closeConnection: function(node){
		//var nodeId = node.data.id;
		if ( node.data.depth === 1 ){
			var connName = this.getConnectionFromNode(node).connectionName;
			var idx = MDBE.ConnectionsStore.find('connectionName', connName);
			if ( idx > -1 ){
				MDBE.ConnectionsStore.getAt(idx).data.connected = false;
			}		
			node.removeAll(true);
			node.appendChild({text:'', leaf:true, iconCls:'empty'});  //������, ����� ����������� "������" �� ����
			node.loaded = false;
			node.collapse();
		}	
	},	

	getConnectionFromNode: function(node){
		if (node){
			var connectionNode = this.getConnectionNode(node);
			var idx = MDBE.ConnectionsStore.find('connectionName', connectionNode.data.text);
			if ( idx > -1 ){
				return MDBE.ConnectionsStore.getAt(idx).data;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}	
	},
	
	getCurrentConnectionName: function(){
		var selNode = Ext.getCmp('TreeExplorer').getSelectionModel().getSelection()[0];
		if (selNode){
			return this.getConnectionFromNode(selNode).connectionName;
		} else {
			if (MDBE.ConnectionsStore.getCount() === 1){
				return MDBE.ConnectionsStore.first().data.connectionName;
			} else {
				return undefined;
			}
		}
	},
	
	getDefaultCharset: function(){
		var idx = MDBE.CharsetStore.find('IS_DEFAULT','true');
		if (idx > -1)
			return MDBE.CharsetStore.getAt(idx).data.CHARACTER_SET_NAME;
		else
			return udefined;
	},
	
	getDefaultCollation: function(){
		var idx = MDBE.CollationStore.find("IS_DEFAULT","true");
		var collation = MDBE.CollationStore.getAt(idx).data.COLLATION_NAME;
		if (idx > -1)
			return collation;
		else
			return udefined;
	},

	/*===�������� ���� ���������������� �����===*/
	getConnectionNode: function(node){
		var i = (node.data.parentId != 'root');
		while ( node.data.parentId != 'root' ) {
			node = node.parentNode;
			var k = node;
		}
		return node;
	},
	
	getHostNameForNodeId: function(connectionData){
		return connectionData.host + ':' + connectionData.port + '[' + connectionData.connectionName + ']';
	},
	
	getChildNodesRecursively: function(node, r){
		node.eachChild(function(n){
			var o = {
				nodeId: n.data.id,
				hasChild: n.hasChildNodes(),
				expanded: n.isExpanded()
			};
			r.push(o);
			if (n.hasChildNodes()){
				this.getChildNodesRecursively(n, r);
			}
		});
	}
});