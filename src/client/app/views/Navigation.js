

VPSApp.views.Navigation = new Ext.NestedList({
    store: VPSApp.stores.NavigationStore,
    dock: 'left',
    useTitleAsBackText: false,
    useToolbar: Ext.is.Phone ? false : true,
    title: 'Choose Data',
    displayField: 'label',
    hidden: !Ext.is.Phone && Ext.Viewport.orientation == 'portrait',
//    timerPanelClock : new Clock(timerEvent),
    listeners: {
        itemtap: function(subList, subIndex, el, e) {
            var store = subList.getStore(),
                record = store.getAt(subIndex),
                recordNode = record.node,
                parentNode = recordNode ? recordNode.parentNode : null;

            if(Ext.is.Phone){
                // toolbar title change and back button display
                var toolBar = VPSApp.views.viewport.toolBar;
                toolBar.setTitle(recordNode.attributes.record.data.label);
                toolBar.items.get(0).show();
            }

            if (recordNode.leaf) {
                // query parameters for data loading
                var chart = VPSApp.views.ChartView,
                    activeItem = VPSApp.views.viewport.getActiveItem(),
                    maskEl, loadMask;

                maskEl = (!Ext.is.Phone && activeItem) ? activeItem.el : Ext.getBody();
	            loadMask = new Ext.LoadMask(maskEl, {
	                msg: 'Loading...'
	            });
				loadMask.show();
				
				thisChart = chart;
				thisMask = loadMask;
				
				//renderData();
				localRenderData();

//				var socket = io.connect('http://67.217.170.57:3000/');
//				socket.on('data',function(data){
//					console.log(data);
//					var stats = data[0].server.stats;
//					console.log(stats);				
//					var items =  new Array();
//					for(var p in stats){
//						var stat = new Object();
//						stat.timeStamp = p;
//						stat.cm = stats[p].cm;
//						stat.fm = stats[p].fm;
//						stat.um = stats[p].um;
//						stat.cpuAll = stats[p].cpuAll;
//						stat.cpu1 = stats[p].cpu1;
//						stat.cpu2 = stats[p].cpu2;
//						stat.time = Date.parseDate(stat.timeStamp, "Y-m-d H:i:s");
//						stat.timeHour = stat.time.getHours()+":"+stat.time.getMinutes()+":"+stat.time.getSeconds();
//						items.push(stat);
//					}
//					console.log(items);
//					
//					// load it into the charts store: this will update the area series
//					VPSApp.stores.ChartStore.loadData(items);
//					//VPSApp.loadPieAtYear();
//					// This should only run once? Doesn't seem to be a problem at the moment.
//					VPSApp.views.viewport.setActiveItem(chart, 'slide');
//					    loadMask.destroy();
//				});                

            }
        }
    }
});


var thisChart = null; 
var thisMask = null; 
var clock = new Clock(renderData);

function renderData(){

//	Ext.Ajax.request({
//    url: 'app/data/CONS_ALL.json',
//    success: function(response, opts) {


	var socket = io.connect();
	socket.on('data',function(data){

//    	// decode responseText in order to create json object
//        var data = Ext.decode(response.responseText);
//    	console.log(data);
    	
//    	var stats = data.server.stats;
    	var stats = data.stats;
    	console.log(stats);

		var items =  new Array();
		
		for(var i =0 ; i< stats.length; i++){
			var stat = stats[i];
			var tStamp = Math.round(stat.timestamp/60);
			
			var sObj = VPSApp.stores.ChartStore.getById(tStamp);
			//console.log(sObj);
			
			for(var j=0 ; j< items.length; j++){
				var x = items[j];
				console.log(x.statId+':'+tStamp);
				if(x.statId == tStamp){
					sObj = items[j];
					break;
				} 
			}
			
			if(sObj == null){
				sObj = new Object();
				sObj.statId = tStamp;
				sObj.timeHour = tStamp;
				items.push(sObj);
			}else{
				//sObj = sObj.data;
			}

			var totalMemory = VPSApp.config.totalMemory;
			if(stat['type']=='memory free'){
				sObj.fm = Math.round(stat['value']*100/totalMemory);
			}else if(stat['type']=='memory used'){
				sObj.um = Math.round(stat['value']*100/totalMemory);
			}else if(stat['type']=='memory buffered'){
				sObj.bm = Math.round(stat['value']*100/totalMemory);
				sObj.fm = Math.round(stat['value']*100/totalMemory);
			}else if(stat['type']=='memory cached'){
				sObj.cm = Math.round(stat['value']*100/totalMemory);
			}
		}
		console.log(items);
    	
        // load it into the charts store: this will update the area series
        VPSApp.stores.ChartStore.loadData(items);
        
        var guageItems = new Array();
        var s = items[0];
		//s.cpu1 = 90;
        guageItems.push(s);
        
        VPSApp.stores.GuageStore.loadData(guageItems);
        VPSApp.loadPieAtYear();
        // This should only run once? Doesn't seem to be a problem at the moment.
        VPSApp.views.viewport.setActiveItem(thisChart, 'slide');
        thisMask.destroy();
    }
    );
}



function localRenderData(){

	Ext.Ajax.request({
    url: 'app/data/CONS_ALL.json',
    success: function(response, opts) {



//    	// decode responseText in order to create json object
        var data = Ext.decode(response.responseText);
    	console.log(data);
    	
    	var stats = data.server.stats;
//    	var stats = data.stats;
    	console.log(stats);

		var items =  new Array();
		
		for(var i =0 ; i< stats.length; i++){
			var stat = stats[i];
			var tStamp = Math.round(stat.timestamp/10);
			
			var sObj = VPSApp.stores.ChartStore.getById(tStamp);
			//console.log(sObj);
			
			for(var j=0 ; j< items.length; j++){
				var x = items[j];
				console.log(x.statId+':'+tStamp);
				if(x.statId == tStamp){
					sObj = items[j];
					break;
				} 
			}
			
			if(sObj == null){
				sObj = new Object();
				sObj.statId = tStamp;
				sObj.timeHour = tStamp;
				items.push(sObj);
			}else{
				//sObj = sObj.data;
			}

			var totalMemory = VPSApp.config.totalMemory;
			if(stat['type']=='memory free'){
				sObj.fm = Math.round(stat['value']*100/totalMemory);
			}else if(stat['type']=='memory used'){
				sObj.um = Math.round(stat['value']*100/totalMemory);
			}else if(stat['type']=='memory buffered'){
				sObj.bm = Math.round(stat['value']*100/totalMemory);
			}else if(stat['type']=='memory cached'){
				sObj.cm = Math.round(stat['value']*100/totalMemory);
			}
		}
		console.log(items);
    	
        // load it into the charts store: this will update the area series
        VPSApp.stores.ChartStore.loadData(items);
        
        var guageItems = new Array();
        var s = items[0];
		//s.cpu1 = 90;
        guageItems.push(s);
        
        VPSApp.stores.GuageStore.loadData(guageItems);
        VPSApp.loadPieAtYear();
        // This should only run once? Doesn't seem to be a problem at the moment.
        VPSApp.views.viewport.setActiveItem(thisChart, 'slide');
        thisMask.destroy();
    }
    });
}