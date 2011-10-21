VPSApp = new Ext.Application({
    name: 'VPSApp',
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    launch: function(){
        window.generateData = function(n, floor) {
            var data = [],
                p = (Math.random() * 11) + 1,
                i;

            floor = (!floor && floor !== 0) ? 20 : floor;

            for (i = 0; i < (n || 12); i++) {
                data.push({
                    name: Date.monthNames[i % 12],
                    data1: Math.floor(Math.max((Math.random() * 100), floor)),
                    data2: Math.floor(Math.max((Math.random() * 100), floor)),
                    data3: Math.floor(Math.max((Math.random() * 100), floor)),
                    data4: Math.floor(Math.max((Math.random() * 100), floor)),
                    data5: Math.floor(Math.max((Math.random() * 100), floor)),
                    data6: Math.floor(Math.max((Math.random() * 100), floor)),
                    data7: Math.floor(Math.max((Math.random() * 100), floor)),
                    data8: Math.floor(Math.max((Math.random() * 100), floor)),
                    data9: Math.floor(Math.max((Math.random() * 100), floor))
                });
            }
            return data;
        };
        
        window.store1 = new Ext.data.JsonStore({
            fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
            data: generateData(5, 20)
        });

    	this.views.viewport = new this.views.Viewport({title: 'Server Performance Visualization'});
    }
});

VPSApp.config = new Object({
	totalMemory : 8000000000,
	statServer : 'http://67.217.170.57:3001/'
});


// Touch 1.x doesn't have a beforetabswitch event to hook...
Ext.override(Ext.TabBar, {
    onTouchStart : function(e, t) {
        t = e.getTarget('.x-tab');
        if (t) {
            var newTab = Ext.getCmp(t.id);
            if (!newTab.hasBeenShown) {
                newTab.hasBeenShown = true;
                var loadMask = new Ext.LoadMask(VPSApp.views.viewport.getActiveItem().el, {
                    msg: 'Loading...'
                });
                loadMask.show();
                newTab.on('activate', function() {
                    loadMask.destroy();
                }, undefined, { delay: 10 });
            }
            Ext.defer(this.onTabTap, 10, this, [newTab]);
        }
    }
});

VPSApp.commify = function(nStr) {
    return(nStr / 1000000).toFixed(2);
};

VPSApp.loadPieAtYear = function(time) {
    VPSApp.currentYear = time = time || VPSApp.currentYear || 2008;
    var store = VPSApp.stores.ChartStore,
        record = store.getAt(0); //store.find('time', time));
    
    console.log(time);
    
    VPSApp.stores.YearStore.loadData([
        {type: 'Cache Memory', data: record.get('cm')},
        {type: 'Unused Memory', data: record.get('um')},
        {type: 'Free Memory', data: record.get('fm')}
    ]);
};


VPSApp.popup = function(item, panel) {
    var storeItem = item.storeItem,
        commify = VPSApp.commify;
    panel.update([
        '<ul><li><b>TimeStamp: </b>' + storeItem.get('statId') + '</li>',
        '<li><b>CPU: </b> ' + commify(storeItem.get('cpu')) + '</li>',
        '<li><b>FreeMemory: </b> ' + commify(storeItem.get('fm')) + '</li>',
        '<li><b>CacheMemory: </b> ' + commify(storeItem.get('cm')) + '</li>',
        '<li><b>UnusedMemory: </b> ' + commify(storeItem.get('um')) + '</li>',
        '</ul>'
    ].join(''));
};

VPSApp.popupYear = function(item, panel) {
    var storeItem = item.storeItem,
        commify = VPSApp.commify;
    panel.update([
        '<ul><li><b>Type: </b>' + storeItem.get('type') + '</li>',
        '<li><b>BTUs: </b> ' + commify(storeItem.get('data')) + '</li>',
        '</ul>'
    ].join(''));
};