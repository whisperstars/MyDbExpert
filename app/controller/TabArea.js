Ext.define('MDBE.controller.TabArea', {    extend: 'Ext.app.Controller',    requires: [		'MDBE.view.Tabs.Home.tabHome'    ],		views: ['MDBE.view.TabArea'],	    init: function() {        this.control({            '#tabArea': {                render: this.addHomeTab            }        });    },    addHomeTab: function(p) {        //alert('addHomeTab !');		//p.items = [{xtype: 'hometab'}];		//p.items = [{title: 'hometab'}];				//p.add({xtype: 'hometab'}).show();    }	});