Ext.define('MDBE.controller.Forms.formSettings', {
    extend: 'Ext.app.Controller',

	views: ['MDBE.view.Forms.formSettings'],
	
	models: [
		'Host'
	],
	
	stores: [
		'Hosts'
	],
	
    init: function() {
        this.control({
			'formsettings button[itemId=btnOK]': {
				click: this.onBtnOKClick
			},
		
			'formsettings button[itemId=btnCancel]': {
				click: this.onBtnCancelClick
			}
			
        });
    },
	
	onBtnOKClick: function(button){
		//alert('newconnectionform button[itemId=btnOK]');
		var formValues = button.up('form').getForm().getValues();
		//alert(val.SettingsName);
		
		var hStore = this.getHostsStore();
		hStore.proxy.url = 'data/users_settings/'+formValues.SettingsName+'.json';
		hStore.load({
			callback: function(records, operation, success) {
				if (success) {
					var s = '';
					for (var i=0; i<records.length; i++){
						s += records[i].data.host + ',';
					}
					alert(s);
					button.up('window').destroy();
					button.up('form').destroy();					
				} else {
					Ext.Msg.alert('Error!','Settings loading fail!');
				}
			}
		});
	}, 
	
	onBtnCancelClick: function(button){
		//alert('newconnectionform button[itemId=btnCancel]');
		button.up('window').destroy();
		button.up('form').destroy();
	}

});