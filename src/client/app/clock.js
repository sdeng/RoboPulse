function Clock (paramHandler, paramInterval) {
	var clockId = 0;
	var secs = 0;
	var handler = paramHandler;
	var interval = paramInterval;
	
	return {
		start: function( )
		{
			if(!interval){
				interval = 4000;
			}
		    clockId = setInterval ( this.increment, interval);
		},
		stop: function ( )
		{
		    clearInterval ( clockId);
		},
		reset: function ( )
		{
			secs = 0;
		    clearInterval ( clockId);
		},
		increment  : function ( )
		{
			secs+=1;
			//console.log('From inside'+secs);
			handler();
		},
		getSecs : function(){
			return secs;
		},
		getMins : function(){
			var formatmins = Math.floor(secs/60);
			var formatSecs = secs%60;
			if(formatSecs<10){
				formatSecs = '0'+formatSecs;
			}
			return formatmins+':'+formatSecs;
		},
		setSecs: function(paramSecs){
			secs = paramSecs;
		},
		setSecsFromStr: function(timeStr){
			secs = getSecsFromStr(timeStr);
		}
	};
};

function myalert(){

}

function startClock ( )
{
    clockId = setInterval ( "increment()", 1000 );
}

function stopClock ( )
{
    clearInterval ( clockId);
}

function increment ( )
{
	secs+=1;
}

function getSecsFromStr(timeStr){
	var pSecs = 0;
	var pMin  = 0;
	if(timeStr.indexOf(':')>0){
		pSecs = parseInt(timeStr.substring(timeStr.indexOf(':')+1));
		pMin  = parseInt(timeStr.substring(0, timeStr.indexOf(':')));
		if(!pMin){
			pMin = 0;
		}
		if(!pSecs){
			pSecs = 0;
		}
	}
	return pMin*60+pSecs;
}

function getMins (secs){
	var formatmins = Math.floor(secs/60);
	var formatSecs = secs%60;
	if(formatSecs<10){
		formatSecs = '0'+formatSecs;
	}
	return formatmins+':'+formatSecs;
}

