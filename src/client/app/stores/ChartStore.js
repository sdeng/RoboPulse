VPSApp.stores.ChartStore = new Ext.data.JsonStore({
    root: 'items',
    idProperty: 'statId',
    fields: [{
        name: 'time',
        type: 'date'
    }, {
        name: 'statId',
        type: 'int'
    }, {
        name: 'cpu',
        type: 'int'
    }, {
        name: 'fm',
        type: 'int'
    }, {
        name: 'cm',
        type: 'int'
    }, {
        name: 'bm',
        type: 'int'
    }, {
        name: 'um',
        type: 'int'
    }, {
        name: 'cpuAll',
        type: 'int'
    }, {
        name: 'cpu1',
        type: 'int'
    }, {
        name: 'cpu2',
        type: 'int'
    }, {
        name: 'cpu3',
        type: 'int'
    }, {
        name: 'cpu4',
        type: 'int'
    }, {
        name: 'timeHour'
    }]
});

VPSApp.stores.YearStore = new Ext.data.JsonStore({
    fields: ['type', 'data']
});


VPSApp.stores.GuageStore = new Ext.data.JsonStore({
    root: 'items',
    idProperty: 'time',
    fields: [{
        name: 'time',
        type: 'date'
    }, {
        name: 'cpu',
        type: 'int'
    }, {
        name: 'fm',
        type: 'int'
    }, {
        name: 'cm',
        type: 'int'
    }, {
        name: 'um',
        type: 'int'
    }, {
        name: 'cpuAll',
        type: 'int'
    }, {
        name: 'cpu1',
        type: 'int'
    }, {
        name: 'cpu2',
        type: 'int'
    }, {
        name: 'cpu3',
        type: 'int'
    }, {
        name: 'cpu4',
        type: 'int'
    }, {
        name: 'timeHour'
    }]
});
