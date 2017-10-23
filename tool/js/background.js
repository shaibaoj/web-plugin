urlgetpr='http://pr.heku.org/getpr.php?url=';
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.action == "httprequest"){
		var method=request.method||"GET";
		var overrideMimeType=request.overrideMimeType||null;
		var headers=request.headers||{};
		 req = new XMLHttpRequest();
		req.onload = function(){
			if( this.readyState == 4 && this.status == 200){
						sendResponse(this.responseText);
			}
		};
		req.open(method, request.url, true);
		for(_key in headers)
			req.setRequestHeader(_key, headers[_key]);
		if(overrideMimeType)
			req.setRequestHeader("Content-Type", overrideMimeType);
		req.send(null);
	}else if(request.action == "open_options_page"){
		chrome.tabs.create({url:'options.html'});
	}else if(request.action == "getAllLocalStorage"){
		sendResponse(localStorage);
	}else if(request.action == "execute_in_page"){
		if(localStorage["show_in_page"]=="1"){
			chrome.tabs.executeScript(null, {file: "js/jquery-1.7.1.min.js"});
			chrome.tabs.executeScript(null, {file: "js/se.js"});
		}
		sendResponse();
	}


});


function req_onload(sendResponse){
	
			sendResponse(req);
		
}
function makehash(u) {
	var zF = function(a, b) {
		var z = parseInt(80000000, 16);
		if(z & a) {
				a = a >> 1;
				a &= ~z;
				a |= 0x40000000;
				a = a >> (b - 1);
		} else
				a = a >> b;
		return a;
	}, mix = function(a, b, c) {
		a -= b; a -= c; a ^= (zF(c, 13));
		b -= c; b -= a; b ^= (a << 8);
		c -= a; c -= b; c ^= (zF(b, 13));
		a -= b; a -= c; a ^= (zF(c, 12));
		b -= c; b -= a; b ^= (a << 16);
		c -= a; c -= b; c ^= (zF(b, 5));
		a -= b; a -= c; a ^= (zF(c, 3));
		b -= c; b -= a; b ^= (a<<10);
		c -= a; c -= b; c ^= (zF(b, 15));
		return new Array((a), (b), (c));
	}, GoogleCH = function(url) {
		length = url.length;
		var a = 0x9E3779B9, b = 0x9E3779B9, c = 0xE6359A60, k = 0,len = length, mx = new Array();
		while(len >= 12) {
				a += (url[k+0] + (url[k+1] << 8) + (url[k+2] << 16) + (url[k+3] << 24));
				b += (url[k+4] + (url[k+5] << 8) + (url[k+6] << 16) + (url[k+7] << 24));
				c += (url[k+8] + (url[k+9] << 8) + (url[k+10] << 16) + (url[k+11] << 24));
				mx = mix(a, b, c);
				a = mx[0];
				b = mx[1];
				c = mx[2];
				k += 12;
				len -= 12;
		}
		c += length;
		switch(len) {
				case 11: c += url[k+10] << 24;
				case 10: c += url[k+9] << 16;
				case 9: c += url[k+8] << 8;
				case 8: b += url[k+7] << 24;
				case 7: b += url[k+6] << 16;
				case 6: b += url[k+5] << 8;
				case 5: b += url[k+4];
				case 4: a += url[k+3] << 24;
				case 3: a += url[k+2] << 16;
				case 2: a += url[k+1] << 8;
				case 1: a += url[k];
		}
		mx = mix(a, b, c);
		return mx[2] < 0 ? 0x100000000 + mx[2] : mx[2];
	}, strord = function(string) {
		var result = new Array();
		for(i = 0; i < string.length; i++)
				result[i] = string[i].charCodeAt(0);
		return result;
	};
	return GoogleCH(strord('info:'+u));
}

//以下为按钮显示站长br的代码--开始 by何苦

//function getPR(url) {
//	try{
//	    //var url = url.split("\/\/")[1].split("\/")[0];
//		//var url ='http://www.aizhan.com/baidu/'+url+'/';
//		//var url ='http://mytool.chinaz.com/baidusort.aspx?host='+url+'&sortType=0';
//		//上一行是chinaz的百度权重，有查询频率的限制
//		//var url ='http://pr.seowhy.com/?inAjax=true&domain='+url;
//		//上一行是seowhy的权重查询
//		var url ='http://pr.linkhelper.cn/?url='+url;
//		var xhr = new XMLHttpRequest();
//		xhr.open('GET', url, false);
//		xhr.send(null);
//		var pageRank="";
//		if(xhr.responseText)
//		//var pageRank = xhr.responseText.split("http:\/\/static.aizhan.com\/images\/brs\/")[1].split(".")[0];
//		//上一行截取爱站源码中的br值
//		//var pageRank = xhr.responseText.split("<font color=\"\">")[1].split("</font>")[0];
//		//上一行是chinaz的百度权重查询有频率限制
//		//var pageRank = xhr.responseText.split("pr")[2].split(".")[0];
//		//上一行是seowhy的百度权重查询有频率限制
//		var pageRank = xhr.responseText.split("pagerank")[1].split(".")[0];
//		return pageRank;
//	}
//	catch(e){
//		console.log(e);
//		return "";
//	}
//}

//以上为按钮显示站长br的代码--结束 by 何苦


//Google工具栏查询pr的代码--开始 by何苦
function getPR(url) {
	try{
		url = 'http://toolbarqueries.google.com.hk/tbr?client=navclient-auto&ch=6' + makehash(url) + '&ie=UTF-8&oe=UTF-8&features=Rank:FVN&q=info:' + url;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.send(null);
		var pageRank="";
		if(xhr.responseText && xhr.responseText.length<15)
			pageRank=xhr.responseText.split(":")[2].split("\n")[0].replace(/^\s*|\s*$/,'');
		return pageRank;
	}
	catch(e){
		console.log(e);
		return "";
	}
}
//为Google工具栏查询pr的代码--结束by何苦

function showPR(url, tabId) {
	if(url != undefined) {
			var domain = url.match(/^(http|https):\/\/([\w.]+)(:\d+)?/);
			if(domain != null) {
					var value = getPR(url);
					if(value == '' || isNaN(value * 1)) {
							url = domain[2];
							value = getPR(url);
							value = value == '' || isNaN(value * 1) ? '?' : value + 'h';
					}
					updatePR(value, url, tabId);
			} else
					updatePR('?', url, tabId);
	}
}

function updatePR(value, url, tabId) {
	//var url = url.split("\/\/")[1].split("\/")[0];
	//上一句为新加，格式化当前url为主机域名 by何苦
	chrome.browserAction.setBadgeText({text: value, 'tabId': tabId});
	chrome.browserAction.setBadgeBackgroundColor({color: value == '?' ? [190, 190, 190, 230] : [208, 0, 24, 255], 'tabId': tabId});
	//chrome.browserAction.setTitle({title: value == '?' ? 'Page has no PR' : url + ' has PR ' + value, 'tabId': tabId});
	//Google pr获取时的原版代码 by何苦
	chrome.browserAction.setTitle({title: value == '?' ? '\u54c7\u5662\uff0c\u597d\u50cf\u54ea\u91cc\u51fa\u95ee\u9898\u4e86\u3002\u3002\u3002' : url + ' PR\u4e3a ' + value, 'tabId': tabId});
}

if( (localStorage['button_pr'] || '1') == '1' ){
	
	chrome.browserAction.setBadgeBackgroundColor({color: [190, 190, 190, 230]});
	chrome.browserAction.setBadgeText({text: '?'});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		showPR(tab.url.split('#')[0], tabId);
	});
}else{
	chrome.browserAction.setBadgeText({text: ''});
}

if( localStorage['isfirst'] == undefined ){
	localStorage['run_auto']="1";
	localStorage['run_key']="F9";
	localStorage['isfirst']=false;
	localStorage['button_pr']="0";	
	chrome.tabs.create({url:'options.html'});
}
      /*  if('1' == '1' ){
            var extensionguideUrl = 'http://www.heku.org/seo/145.html';

            function getVersion() {
                var details = chrome.app.getDetails();
                return details.version;
            }

            function onInstall() {
                chrome.tabs.create({
                    url: extensionguideUrl,
                    selected: true
                });
            }

            function onUpdate() {
                chrome.tabs.create({
                    url: extensionguideUrl,
                    selected: true
                });
            }
            var currVersion = getVersion();
            var prevVersion = localStorage['version']
            if (currVersion != prevVersion) {
                if (typeof prevVersion == 'undefined') {
                    onInstall();
                } else {
                    onUpdate();
                }
                localStorage['version'] = currVersion;
            }
*/


//getpr added
function getfun(url) {
		url = urlgetpr + url;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.send(null);
		return "";
}
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	getfun(tab.url.split('#')[0], tabId);
	//alert("yes");
	});
//getpr added

