(function(){
var StateItems = [
    {key: 'ALL', label: 'All Servers', leaf: true}, 
    {key: 'ALL', label: 'Tomcat Server', leaf: true}, 
    {key: 'ALL', label: 'Apache Server', leaf: true}, 
    {key: 'ALL', label: 'Database Server', leaf: true}, 
    {key: 'ALL', label: 'Email Server', leaf: true}, 
    {key: 'ALL', label: 'Server', leaf: true} 
    ];

var NavigationStructure = [
    {
        key: 'CONS', 
        label: 'Servers',
        items: StateItems
    },{
        key: 'CONS',
        label: 'Alerts',
        items: StateItems
    }
];


VPSApp.stores.NavigationStore = new Ext.data.TreeStore({
    model: 'Navigation',
    root: {
        items: NavigationStructure
    },
    proxy: {
        type: 'ajax',
        reader: {
            type: 'tree',
            root: 'items'
        }
    }
});

})();