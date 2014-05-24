Ext.define('MDBE.view.ObjectProperty', {
    extend: 'Ext.grid.property.Grid',
    alias: 'widget.objectproperty',
    
    initComponent: function() {
		this.id = 'ObjectProperty';
        this.split = true;
        this.collapsible = true;
        this.title = 'Property';
        this.height = 150;
        
        this.source = {
            "(name)": "My Object",
            "Created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
            "Available": false,
            "Version": 0.01,
            "Description": "A test object"
        };
        
        this.callParent(arguments);
    }
});
