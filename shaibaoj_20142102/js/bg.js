var curmaxid=localStorage.maxCnDealId;
if(!curmaxid)
{
	chrome.browserAction.setBadgeBackgroundColor({color:[255, 68, 68, 255]});
	chrome.browserAction.setBadgeText({text:"+"});
	chrome.browserAction.setTitle({title:"里面这么多好东西您不点开看，鼠标在这悬着干嘛啊您！"});
}
else
{
	$.get("http://www.shaibaoj.com/zhushou/checknewfeed.jsp?maxid="+(curmaxid), function(data){
		if(data>0)
		{
			chrome.browserAction.setBadgeBackgroundColor({color:[255, 68, 68, 255]});
			chrome.browserAction.setBadgeText({text:data});
			chrome.browserAction.setTitle({title:"您上次看过以后，这都"+data+"条儿更新了"});
		}
	});
}
var sh=setInterval(function(){
	var curmaxidloop=localStorage.maxCnDealId;
	$.get("http://www.shaibaoj.com/zhushou/checknewfeed.jsp?maxid="+curmaxidloop, function(data){
		if(data>99)
		{
			clearInterval(sh);
			chrome.browserAction.setBadgeBackgroundColor({color:[255, 68, 68, 255]});
			chrome.browserAction.setBadgeText({text:"99+"});
			chrome.browserAction.setTitle({title:"更新条数太多了，您快来看看吧"});
		}
		else if(data>10)
		{
			chrome.browserAction.setBadgeBackgroundColor({color:[255, 68, 68, 255]});
			chrome.browserAction.setBadgeText({text:data});
			chrome.browserAction.setTitle({title:"您上次看过以后，这都"+data+"条儿更新了"});
		}
	});
},113000);
