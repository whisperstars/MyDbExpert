Ext.define('MDBE.controller.Forms.formDBObject', {
    extend: 'Ext.app.Controller',

	views: [
		'MDBE.view.Forms.formDBObject',
		'MDBE.view.Tabs.Tables.tabTable'
	],

    init: function() {
        this.control({
			'dbobjectform button[itemId=btnOK]': {
				click: this.onBtnOKClick
			},
		
			'dbobjectform button[itemId=btnCancel]': {
				click: this.onBtnCancelClick
			},
			
			'dbobjectform': {
				//render: function(){alert('newdbobject.render!')}
			}
			
        });
    },
	
	onBtnOKClick: function(button){
		//alert('newdbobjectform button[itemId=btnOK]');
		Ext.getCmp('tabArea').add({xtype: 'tabletab'}).show();
		button.up('window').destroy();	
		
	}, 
	
	onBtnCancelClick: function(button){
		//alert('newdbobjectform button[itemId=btnCancel]');
		button.up('window').destroy();
	}

});