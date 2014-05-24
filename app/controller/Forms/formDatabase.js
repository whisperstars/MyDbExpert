Ext.define('MDBE.controller.Forms.formDatabase', {
    extend: 'Ext.app.Controller',

	views: ['MDBE.view.Forms.formDatabase'],
	
	requires: ['MDBE.util.Utils'],

    init: function() {
        this.control({
			'formdatabase combobox[name=charSet]': {
				render: this.onCharsetRender,
				select: this.onSelect
			},
			
			'formdatabase combobox[name=collation]': {
				render: this.onCollationRender
			},

			'formdatabase button[itemId=btnOK]': {
				click: this.onBtnOKClick
			},
		
			'formdatabase button[itemId=btnCancel]': {
				click: this.onBtnCancelClick
			}			
        });
    },

	onCharsetRender: function(combo){
		combo.up('form').getForm().setValues({charSet: MDBE.util.Utils.getDefaultCharset()});
		MDBE.CollationStore.clearFilter();
		MDBE.CollationStore.filter("CHARACTER_SET_NAME", MDBE.util.Utils.getDefaultCharset());		
	},	
	
	onCollationRender: function(combo){
		combo.up('form').getForm().setValues({collation: MDBE.util.Utils.getDefaultCollation()});
	},
	
	onSelect: function(combo, rec){
		var charset = rec[0].data.CHARACTER_SET_NAME;
		MDBE.CollationStore.clearFilter();
		MDBE.CollationStore.filter("CHARACTER_SET_NAME", charset);
		combo.up('form').getForm().setValues({collation: MDBE.util.Utils.getDefaultCollation()});
	},
	
	onBtnOKClick: function(button){
		//alert('newconnectionform button[itemId=btnOK]');
		this.saveDatabase(button.up('form'));
	}, 
	
	onKeyPress: function(f,e){
		var key = e.getKey();
		if (key == e.ENTER) {
			this.saveDatabase(f.up('form'));
		}
	},
	
	onBtnCancelClick: function(button){
		button.up('window').destroy();
	},
	
	saveDatabase: function(form){
		var vls = form.getForm().getValues();
		var connectionData = MDBE.util.Utils.getConnectionFromNode(form.connectionNode);
		if (form.getForm().isValid()) { //��������� ������������� ��������� �����
			form.submit({
				url: 'php/save_database.php',
				params: {
					host: connectionData.host,
					port: connectionData.port,
					user_name: connectionData.user,
					password: connectionData.password
				},
				success: function(frm, act){
					//alert('success');
					//add new database tree node in alphabetical order
					var conn = MDBE.util.Utils.getHostNameForNodeId(connectionData);
					var o = {id:'1,'+conn+','+vls.DBName, text: vls.DBName, iconCls: 'database', loaded: false};
					for (var i=0; i<form.connectionNode.childNodes.length; i++){
						if (vls.DBName < form.connectionNode.childNodes[i].data.text){
							var node_before = form.connectionNode.childNodes[i];
							break;
						}											
					}	
					form.connectionNode.insertBefore(o,node_before);
					//�������
					form.up('window').destroy();
				},
				failure: function(form, action) {
					Ext.Msg.alert('Failed', action.result.msg);
				}
			});
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