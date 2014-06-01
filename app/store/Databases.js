Ext.define('MDBE.store.Databases', {
    extend: 'Ext.data.Store',
    model: 'MDBE.model.Database',
    proxy: {
         type: 'ajax',
         url: 'php/index.php',
         reader: {
             type: 'json',
             root: 'data'
         }
     },
    autoLoad: false
});