var homeView = new Ext.Panel({
	title : 'DashBoard',
	ui : 'light',
	theme : 'Energy',
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	dockedItems : {
		dock : 'top',
		xtype : 'toolbar',
		ui : 'light',
		title : 'Current Status',
		items : [ {
			xtype : 'spacer'
		}, {
			xtype : 'button',
			iconCls : 'shuffle',
			iconMask : true
		} ]
	},
	defaults : {
		flex : 1,
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		defaults : {
			xtype : 'chart',
			flex : 1,
			insetPadding : 25
		}
	},
    items: [{
        items: [{
            animate: {
                easing: 'elasticIn',
                duration: 1000
            },
			store : VPSApp.stores.GuageStore,
            axes: [{
                type: 'gauge',
                position: 'gauge',
                minimum: 0,
                maximum: 100,
                steps: 10,
                margin: 10
            }],
            series: [{
                type: 'gauge',
                field: 'cpuAll',
                donut: 30,
                colorSet: ['#82B525', '#ddd']
            }]
        }, {
            animate: true,
			store : VPSApp.stores.GuageStore,
            axes: [{
                type: 'gauge',
                position: 'gauge',
                minimum: 0,
                maximum: 100,
                steps: 10,
                margin: 7
            }],
            series: [{
                type: 'gauge',
                field: 'fm',
                donut: 30,
                colorSet: ['#82B525', '#ddd']
            }]
        }]
    },{
        flex: 1,
        items: [{
            animate: true,
			store : VPSApp.stores.GuageStore,
            axes: [{
                type: 'gauge',
                position: 'gauge',
                minimum: 0,
                maximum: 100,
                steps: 10,
                margin: 7
            }],
            series: [{
                type: 'gauge',
                field: 'cm',
                donut: 30,
                colorSet: ['#82B525', '#ddd']
            }]
        }, {
            animate: {
                easing: 'bounceOut',
                duration: 500
            },
			store : VPSApp.stores.GuageStore,
            axes: [{
                type: 'gauge',
                position: 'gauge',
                minimum: 0,
                maximum: 100,
                steps: 10,
                margin: 7
            }],
            series: [{
                type: 'gauge',
                field: 'um',
                donut: 30,
                colorSet: ['#82B525', '#ddd']
            }]
        }]
    }]

});
