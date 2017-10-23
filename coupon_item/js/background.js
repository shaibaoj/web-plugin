if (!chrome.cookies) {
    chrome.cookies = chrome.experimental.cookies;
}

function get_url(cookie) {
    var prefix = cookie.secure ? "https://" : "http://";
    if (cookie.domain.charAt(0) == ".")
        prefix += "www";

    return prefix + cookie.domain + cookie.path;
}

function get_suffix(url) {
    var cookiestr = '';
    var domain = url.replace('http://', '').replace('https://').split('/')[0];
    var segs = domain.split('.');
    if(segs.length < 2) {
        return null;
    }
	
    var suffix = '.' + [segs[segs.length-2], segs[segs.length-1]].join('.');
    return suffix;
}

function get_domain(url){
    var domain = url.replace('http://', '').replace('https://').split('/')[0];
    return domain;
}

function clear_cookie(url, callback) {
    chrome.cookies.getAll({}, function(cookies) {
        var suffix = get_suffix(url);
        var sub_domain = get_domain(url);

        for (var i in cookies) {
            if(cookies[i].domain == suffix || cookies[i].domain == sub_domain) {
                chrome.cookies.remove({url: get_url(cookies[i]), name: cookies[i].name}, function() {});
            }
        }
        callback('');
    });
}

function get_cookie(url, callback) {
    chrome.cookies.getAll({}, function(cookies) {
        var cookiestr = '';
        var suffix = get_suffix(url);
        var sub_domain = get_domain(url);
        var subcookie = '';
		
        for (var i in cookies) {
            if(cookies[i].domain == suffix) {
                cookiestr += (cookies[i].name + '=' + cookies[i].value + ';');
            }else if(cookies[i].domain == sub_domain){
                subcookie += (cookies[i].name + '=' + cookies[i].value + ';');
            }
        }
        callback({'suffix': cookiestr, 'subdomain': subcookie});
    });
}

function getAjax(url, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            msg_cache = xhr.responseText; 
            cb(xhr.responseText);
        }
    };
    xhr.send();
}

function postAjax(url, data, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            msg_cache = xhr.responseText;
            cb(xhr.responseText);
        }
    };
    xhr.send(data);
}

function timedGetText( url, time, callback ){
    var request = new XMLHttpRequest();
    var timeout = false;
    var timer = setTimeout( function(){
        timeout = true;
        request.abort();
    }, time );
    request.open( "GET", url );
	request.setRequestHeader("Referer " , "http://www.shihuizhu.com");
    request.onreadystatechange = function(){
        if( request.readyState !== 4 ) return;
        if( timeout ) return;
        clearTimeout( timer );
        if( request.status === 200 ){
            callback( request.responseText );
        }
    }
    request.send( null );
}

function show() {
	var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
	var hour = time[1] % 12 || 12;               // The prettyprinted hour.
	var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
	new Notification(hour + time[2] + ' ' + period, {
		icon: '48.png',
		body: '<a href = \'http://baidu.com\'>Time to make the toast.</a>'
	});
}

chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		if(msg.act == 'get'){
			getAjax(msg.reurl, function(msg) { 
				port.postMessage({content: "getback", question : msg}); 
			});
		}
		else if (msg.act == 'post') {
			postAjax (msg.reurl, msg.redata, function(msg) {
				port.postMessage({content: "postback", question : msg});
			});
		}
		else if (msg.act == 'new') {
			chrome.browserAction.setBadgeBackgroundColor({color:[255,0,0,255]});
			chrome.browserAction.setBadgeText({text:'new'});
		}
		else if (msg.act == 'cookie') {
			get_cookie(msg.reurl, function(cookie){
				port.postMessage({content: "cookieback", question : cookie.suffix}); 
			});
		}
		else if (msg.act == 'warring') {
		}
		else{
			console.log("error");
		}
	});
});