function getCurrentWindowCallback(window) {	
		chrome.tabs.getSelected(window.id,getCurrentTabCallback)
	}
function getCurrentTabCallback(tab){
		tab_url=tab.url.toLowerCase().replace("http://", "").replace("https://", "").split('/')[0];
		SE.show(2,tab_url);
};

$(document).ready(function(e) {
	

	chrome.windows.getCurrent(getCurrentWindowCallback);
});
