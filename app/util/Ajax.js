Ext.define('MDBE.util.Ajax', {
	singleton: true,
	
	send: function(scipt_name, host, port, login, data, success_f, failure_f){
		Ext.Ajax.request(){
			url: 'php/index.php',
			params{
				host: host,
				port: port,
				login: login,
				scipt_name: scipt_name,
				data: Ext.JSON.encode(data)
			},
			success: success_f,
			failure: failure_f
		};
	},
});