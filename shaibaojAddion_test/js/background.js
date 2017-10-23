//loading animation
function LoadingAnimation() {
    this.timerId_ = 0;
    this.maxCount_ = 8;
    this.current_ = 0;
    this.maxDot_ = 4;
}

function openIKeepU(){
    var url = 'http://www.shaibaoj.com';
    if(localStorage.tabPosition && localStorage.tabPosition == 'next'){
        chrome.tabs.query( {'active' : true}, function(tabs){ 
            chrome.tabs.create({url:url,index: tabs[0].index + 1});
        })
    }else{
        chrome.tabs.create({url:url});
    }
}

LoadingAnimation.prototype.paintFrame = function () {
    var text = "";
    for (var i = 0; i < this.maxDot_; i++) {
        text += (i == this.current_) ? "." : " ";
    }
    if (this.current_ >= this.maxDot_) text += "";

    chrome.browserAction.setBadgeText({
        text: text
    });
    this.current_++;
    if (this.current_ == this.maxCount_) this.current_ = 0;
}

LoadingAnimation.prototype.start = function () {
    if (this.timerId_) return;
    var self = this;
    this.timerId_ = window.setInterval(function () {
        self.paintFrame();
    }, 100);
}

LoadingAnimation.prototype.stop = function () {
    if (!this.timerId_) return;
    window.clearInterval(this.timerId_);
    this.timerId_ = 0;
    chrome.browserAction.setBadgeText({
        text: ""
    });
}

var la = new LoadingAnimation();

var action_url = "javascript:var IKU_VERSION = 'CHROME.1.5';(function(){if(document.body&&!document.xmlVersion){var s=document.createElement('script');s.setAttribute('type','text/javascript');s.setAttribute('src','http://lib.shaibaoj.com/app/s.js');document.body.appendChild(s)}})();";

chrome.browserAction.onClicked.addListener(function(tab) {
    if (tab.url.indexOf('http:') != 0 && tab.url.indexOf('https:') != 0) {
        chrome.tabs.create({url: 'http://shaibaoj.com'});
    } else {
        la.start();
        chrome.tabs.update(tab.id, {url: action_url}, function(tab){setTimeout(function(){la.stop();}, 500);});
    }
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    if(request.localstorage == 'ikuautocheck'){
        sendResponse({
            autocheck: localStorage['autocheck']
        })
    }
});

chrome.contextMenus.create({
    "title": "收藏到晒宝街-测试", 
    onclick:function(info, tab){
        chrome.tabs.update(tab.id, {url: action_url});
    }
});