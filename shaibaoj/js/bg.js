var sh=setInterval(function(){
	var curmaxidloop=0;
	$.getJSON("http://www.shaibaoj.com/common/zhushou.do?action=maxTuan&maxid="+curmaxidloop+"&jsoncallback=?", {}, function(data){
		data = data.result.map;
		curmaxidloop = data.maxid;
		if(data.num>99)
		{
			clearInterval(sh);
			chrome.browserAction.setBadgeBackgroundColor({color:[255, 68, 68, 255]});
			chrome.browserAction.setBadgeText({text:"99+"});
			chrome.browserAction.setTitle({title:"更新条数太多了，您快来看看吧"});
		}
		else if(data.num>10)
		{
			chrome.browserAction.setBadgeBackgroundColor({color:[255, 68, 68, 255]});
			chrome.browserAction.setBadgeText({text:data.num});
			chrome.browserAction.setTitle({title:"您上次看过以后，这都"+data.num+"条儿更新了"});
		}
	});
},113000);
