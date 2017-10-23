/*chrome.extension.sendRequest({action: "execute_in_page"}, function() {
	//yahoo_link_list_fix
	if(document.domain.toLowerCase().indexOf('sitemap.cn.yahoo.com')>-1)
		$("div.sma_co5 li").css('height','auto').find("a").attr("target", "_blank");
});*/
/*
    (function(){
            var fromDOM = document.getElementsByTagName('a');
	chrome.runtime.sendMessage({method:'setTitle',title:fromDOM},function(response){
		console.log(response)
	});
    })();*/



(function(){
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		 if (request.action == "getDOM"){
		 	var dome = document.getElementsByTagName('a'),d = [window.location.href];
		 	for (var i = 0; i < dome.length; i++) {
		 		if (dome[i].rel !== "nofollow" && dome[i].href.indexOf("javascript:") == -1 && dome[i].href.length>3  && dome[i].href.indexOf("/#") == -1) {
		 			d.push(dome[i].href);
		 		};
		 	};
		 	sendResponse({dom: d});
		 }
	});
}())