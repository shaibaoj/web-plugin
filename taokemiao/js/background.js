var firstInstall = window.localStorage.firstInstall;
if(typeof firstInstall == 'undefined'){
	chrome.tabs.create({url:"http://www.taokemiao.com?from=plugin",selected:true});
	window.localStorage.firstInstall = "true";
}

if (typeof window.localStorage.visiblePlugin == 'undefined') {
	window.localStorage.visiblePlugin = true;
}

if (typeof window.localStorage.keyPlugin == 'undefined') {
	window.localStorage.keyPlugin = 68;
}

if (typeof window.localStorage.applyReason == 'undefined') {
	window.localStorage.applyReason = '【淘客喵】联盟申请计划，请通过，更多合作详情请访问淘客喵！';
}



chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    if(request.type == 'gajax'){
		$.get(request.url,request.getdata,function(data) {
			sendResponse({
				msg: 'ok',
				data: data
			});
		});
    }else if(request.type == 'pajax'){
		$.post(request.url,request.postdata,function(data) {
			sendResponse({
				msg: 'ok',
				data: data
			});
		},'json');
    }else if(request.type == 'set'){
		chrome.cookies.get({url: "http://alimama.com/", name: "_tb_token_"}, function(cookie) {
			if (cookie != null) {
				window.localStorage.token = cookie.value;
			}
		});
		var resOK = {
			visible: window.localStorage.visiblePlugin,
			reason: window.localStorage.applyReason,
			keyPlugin: window.localStorage.keyPlugin,
			token: window.localStorage.token
		};
		sendResponse(resOK);
	}
	else if(request.type == 'getcookies'){
		chrome.cookies.get({url: request.url, name: request.name}, function(cookie) {
			sendResponse(cookie);
		});

	}
});