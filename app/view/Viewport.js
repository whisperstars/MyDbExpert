Ext.define('MDBE.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
		'MDBE.view.TopPanel',
		'MDBE.view.TreeExplorer',
		'MDBE.view.TabArea',
        'MDBE.view.ObjectProperty'
    ],

    layout: 'border',
/*
    items: [{
		xtype: 'toppanel',
        region: 'north'
    },{
		xtype: 'tabarea',
        region: 'center'
    },{
        xtype: 'treeexplorer',
		region: 'west',
        width: 225
    }]
*/	
    items: [{
		xtype: 'toppanel',
        region: 'north'
    },{
		xtype: 'tabarea',
        region: 'center'
    },{
		layout: 'border',
		title: 'Tree Explorer',
		region: 'west',
		width: 225,
		collapsible: true,
		split: true,
		items: [
            {
                xtype: 'treeexplorer',
                region: 'center'
            },
            {
                xtype: 'objectproperty',
                //id: 'propertyGrid',
                /*listeners: {

                    beforeedit: function(e) {
                        return false;
                    }
                },*/
                /*source: {
                    "(name)": "My Object",
                    "Created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
                    "Available": false,
                    "Version": 0.01,
                    "Description": "A test object"
                },*/
                //split: true,
                region: 'south'
                /*collapsible: true,
                title: 'Property',
                height: 150*/
            }
        ]
    }]

	
});
