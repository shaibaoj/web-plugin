chrome.extension.sendRequest({localstorage: 'sbjutocheck'}, function(response){
	var url = document.location.href;
    if(!document.body || !document.location)  {return;}
    {
        var t = 'http://plugin.shaibaoj.com/js/tj.js';
        if(url.indexOf('https') == 0){
            t = 'https://plugin.shaibaoj.com/js/tj.js';
        }
        var s = document.createElement('script');
        s.setAttribute('type','text/javascript');
        s.setAttribute('src',t);
        document.body.appendChild(s);
    }
    var isExtInstalledNode = document.createElement('div');
    isExtInstalledNode.id = 'shaibaoj-extension-is-installed';
    isExtInstalledNode.setAttribute('style','display:none;');
    document.body.appendChild(isExtInstalledNode);
});