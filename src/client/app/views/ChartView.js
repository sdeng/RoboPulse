var areaChart = new Ext.chart.Chart({
    title: 'Area',
    iconCls: 'area',
    cls: 'chartpanel',
    theme: 'Energy',
    interactions: ['reset', {
        type: 'panzoom',
        axes: {
            right: {}
        }
    },
    {
        type: 'iteminfo',
        gesture: 'tap',
        listeners: {
            show: function(interaction, item, panel) {
                VPSApp.popup(item, panel);
            }
        }
    }],
    animate: false,
    store: VPSApp.stores.ChartStore,
    axes: [{
        type: 'Numeric',
        position: 'right',
        minimum: 0,
        label: {
            renderer: VPSApp.commify
        },
        adjustMinimumByMajorUnit: 0,
        fields: ['fm', 'cm', 'um','bm'],
        title: '% Usage'
    },
    {
        type: 'Category',
        position: 'bottom',
        fields: ['timeHour'],
        title: 'Time',
        label: {
            rotate: {
                degrees: 45
            }
        }
    }],
    legend: {
        position: Ext.is.Phone ? 'left' : 'top'
    },
    series: [{
        type: 'area',
        highlight: false,
        title: ['Free Available Memory', 'Cached Memory', 'Used Memory', 'CPU Usage Per Core'],
        axis: 'right',
        xField: 'time',
    	yField: ['fm', 'cm', 'um', 'bm']
    }],
    listeners: {
        afterrender: function(me) {
            me.on('beforerefresh', function() {
                if (me.ownerCt.getActiveItem().id !== me.id) {
                    return false;
                }
            }, me);
        }
    }
});

var lineChart = new Ext.chart.Chart({
    title: 'Line',
    iconCls: 'line',
    cls: 'chartpanel',
    interactions: ['reset', {
        type: 'panzoom',
        axes: {
            right: {}
        }
    },{
        type: 'iteminfo',
        gesture: 'tap',
        listeners: {
            show: function(interaction, item, panel) {
                VPSApp.popup(item, panel);
            }
        }
    }],
    animate: false,
    store: VPSApp.stores.ChartStore,
    axes: [{
        type: 'Numeric',
        position: 'right',
        minimum: 0,
        label: {
            renderer: VPSApp.commify
        },
        adjustMinimumByMajorUnit: 0,
        fields: ['fm','cpuAll', 'cm', 'um'],
        title: '%Usage',
        grid: {
            odd: {
                stroke: '#777'
            },
            even: {
                stroke: '#555'
            }
        }
    },
    {
        type: 'Category',
        position: 'bottom',
        fields: ['timeHour'],
        title: 'Time',
        label: {
            rotate: {
                degrees: 45
            }
        }
    }],
    legend: {
        position: Ext.is.Phone ? 'left' : 'top'
    },
    theme: 'Energy',
    series: [{
        type: 'line',
        highlight: false,
        showMarkers: false,
        fill: true,
        smooth: true,
        axis: 'right',
        xField: 'time',
        yField: 'fm',
        title: ['Buffer Memory']
    }, {
        type: 'line',
        highlight: false,
        showMarkers: false,
        fill: true,
        smooth: true,
        axis: 'right',
        xField: 'time',
        yField: 'cm',
        title: ['Cache Memory']
    }, {
        type: 'line',
        highlight: false,
        showMarkers: false,
        fill: true,
        smooth: true,
        axis: 'right',
        xField: 'time',
        yField: 'um',
        title: ['Used Memory']
    }, {
        type: 'line',
        highlight: false,
        showMarkers: false,
        fill: true,
        smooth: true,
        axis: 'right',
        xField: 'time',
        yField: 'bm',
        title: ['Free Memory']
    }],
    listeners: {
        afterrender: function(me) {
            me.on('beforerefresh', function() {
                if (me.ownerCt.getActiveItem().id !== me.id) {
                    return false;
                }
            }, me);
        }
    }
});

var timeChart = new Ext.Panel({
    title: 'Cache Utilization',
    iconCls: 'line',
    cls: 'chartpanel',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    listeners: {
        activate: function() {
            var slider = Ext.getCmp('mySlider');
            slider.initValue();
            slider.setValue(2009);
        },
        single: true
    },
    dockedItems: [{
        dock: 'bottom',
        xtype: 'toolbar',
        height: 70,
        items: [{
            xtype: 'component',
            cls: 'timelabel',
            html: '1'
        }, {
            flex: 1,
            ui: 'light',
            id: 'mySlider',
            xtype: 'sliderfield',
            name: 'time',
            maxValue : 0,
            minValue : 10,
            value: 1,
            listeners: {
                change: function(slider, thumb, value) {
                    if (value) {
                        Ext.getCmp('timeToolbar').setTitle('No of days');
                        VPSApp.loadPieAtYear(value);
                    }
                }
            }
        }, {
            xtype: 'component',
            cls: 'timelabel',
            html: '10'
        }]
    },  {
        id: 'timeToolbar',
        dock: 'bottom',
        xtype: 'toolbar',
        title: 'No of days'
    }],
    items: [{
        flex: 1,
        xtype: 'chart',
        theme: 'Energy',
        cls: 'radar',
        store: VPSApp.stores.YearStore,
        shadow: false,
        animate: true,
        interactions: [{
            type: 'iteminfo',
            listeners: {
                show: function(interaction, item, panel) {
                    VPSApp.popupYear(item, panel);
                }
            }
        }, 'rotate', 'reset'],
        axes: [{
            steps: 5,
            type: 'Radial',
            position: 'radial',
            label: {
                // display: 'none'
            }
        }],
        series: [{
            type: 'radar',
            xField: 'type',
            yField: 'data',
            style: {
                opacity: 0.4
            }
        }],
        listeners: {
            afterrender: function(me) {
                me.on('beforerefresh', function() {
                    if (me.ownerCt.ownerCt.ownerCt.getActiveItem().id !== me.ownerCt.ownerCt.id) {
                        return false;
                    }
                }, me);
            }
        }
    }, {
        flex: 1,
        xtype: 'chart',
        store: VPSApp.stores.YearStore,
        shadow: false,
        animate: true,
        insetPadding: 30,
        interactions: [{
            type: 'rotate'
        }, {
            type: 'iteminfo',
            listeners: {
                show: function(interaction, item, panel) {
                    VPSApp.popupYear(item, panel);
                }
            }
        }],
        series: [{
            type: 'pie',
            field: 'data',
	        interactions: ['rotate', 'reset'],
            highlight: false,
            label: {
                field: 'type',
                display: 'rotate',
                contrast: true,
                font: '12px Arial'
            },
            listeners: {
                'labelOverflow': function(label, item) {
                    item.useCallout = true;
                }
            },
            callouts: {
                renderer: function(callout, storeItem) {
                    callout.label.setAttributes({
                        text: storeItem.get('type')
                    }, true);
                },
                filter: function() {
                    return false;
                },
                lines: {
                    'stroke-width': 2,
                    offsetFromViz: 20
                },
                label: {
                    font: '12px Arial',
                    fill: '#fff'
                }
            }
        }],
        listeners: {
            afterrender: function(me) {
                me.on('beforerefresh', function() {
                    if (me.ownerCt.ownerCt.ownerCt.getActiveItem().id !== me.ownerCt.ownerCt.id) {
                        return false;
                    }
                }, me);
            }
        }
    }]
});




if (Ext.is.Phone) {
    VPSApp.views.ChartView = new Ext.TabPanel({
        tabBar: {
            dock: 'top',
            layout: {
                pack: 'center'
            }
        },
        ui: 'light',
        cardSwitchAnimation: {
            type: 'slide'
        },
        items: [homeView, lineChart, areaChart ]
    });
}
else {
    VPSApp.views.ChartView = new Ext.TabPanel({
        tabBar: {
            dock: 'top',
            layout: {
                pack: 'center'
            }
        },
        ui: 'light',
        cardSwitchAnimation: {
            type: 'slide'
        },
        items: [homeView, lineChart,areaChart 
                //]
                , timeChart]
    });
}
