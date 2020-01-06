
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {}
});

// 存储插件开关数据
function SetSwitchValue(user1) {
    chrome.storage.sync.set({ 'user1': user1 }, function () {
        //console.log('保存成功');
    });
}

//插件是否展开
function SetMessageCloseValue(nowtime) {
    chrome.storage.sync.set({ 'CloseMainList': nowtime }, function () {
        //console.log('收起状态保存成功');
    });
}

chrome.tabs.onCreated.addListener(function (tab) {
    var updateProperties = { "active": true };
    chrome.tabs.update(tab.id, updateProperties, function (tab) { });
});

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

//处理CSP权限问题，清空CSP
var responseListener = function (details) {
    var notFound = true;
    for (var i = 0; i < details.responseHeaders.length; ++i) {
        if (details.responseHeaders[i].name === 'content-security-policy') {
            details.responseHeaders[i].value = "";
            //break;
            notFound = false;
        }
        if (details.responseHeaders[i].name == 'x-frame-options' || details.responseHeaders[i].name == 'frame-options') {
            details.responseHeaders.splice(i, 1);
        }
    }

    if (notFound == false) {
        var rule = {
            "name": "content-security-policy",
            "value": ""
        };
        details.responseHeaders.push(rule);
    }

    return { responseHeaders: details.responseHeaders };
};

chrome.webRequest.onHeadersReceived.addListener(responseListener,
    {
        urls: ["<all_urls>"],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking", "responseHeaders"]
);

chrome.notifications.onClicked.addListener((myNotificationId) => {
    if (myNotificationId == 'haopintui') window.open('https://www.haopintui.net');
});

var myNotificationId = "haopintui";
function showNotification(listmsg) {
    var opt = {
        type: "basic",
        title: "好品推插件更新通知",
        message: listmsg,
        iconUrl: "images/icon-64.png",
        // 文字列表
        // items: listmsg,
        //按钮功能,设置标题和图片
        buttons: [{ title: "打开我的插件" }, { title: "更多更新记录" }]
    }
    //创建并显示
    chrome.notifications.create(myNotificationId, opt, function (id) { console.log("notifacition created ,id : " + id); })
}

var zhihuid = "zhihu"
function showNewNotification(listmsg) {
    var title = listmsg.title;
    var msg = listmsg.msg;
    var opt = {
        type: "basic",
        title: title,
        message: msg,
        iconUrl: "images/icon-64.png",
        // 文字列表
        // items: msg,
        //按钮功能,设置标题和图片
        buttons: [{ title: "知道了" }]
    }
    //创建并显示
    chrome.notifications.create(zhihuid, opt, function (id) { console.log("notifacition created ,id : " + id); })

}

chrome.notifications.onButtonClicked.addListener(function (notifId, btnIdx) {
    if (notifId === myNotificationId) {
        if (btnIdx === 1) {//第一个按钮
            window.open('https://www.haopintui.net');
        } else if (btnIdx === 0) {
            SetSwitchValue("ON");
            chrome.storage.sync.get('CloseMainList', function (result) {
                getvalue = result['CloseMainList'];
                if (getvalue == 0) {
                    SetMessageCloseValue(1);

                    getCurrentTabId(tabId => {
                        chrome.tabs.reload(tabId);
                    })
                }
            });

        }
    }
    if (notifId === zhihuid) {
        if (btnIdx === 0) {
            chrome.notifications.clear(zhihuid, function callback() {

            })
        }
    }
});

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        let timesversion = getdatetime('H');
        if (request.greeting === "send_relod_info") {
            getCurrentTabId(tabId => {
                chrome.tabs.reload(tabId);
            })
        }
        
        if (request.greeting === "add_hpt_js") {
            const jqurl = "https://static.youdanhui.com/static/js/jquery.js";
            let xhr = new XMLHttpRequest();
            xhr.open("GET", jqurl, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    getCurrentTabId(tabId => {
                        chrome.tabs.executeScript(tabId, { code: this.responseText, runAt: "document_start" });
                        config_url = "https://static.youdanhui.com/config.json?p=" + timesversion;
                        let xhr = new XMLHttpRequest();
                        xhr.open("GET", config_url, true);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                let responseText = this.responseText;
                                let configinfo = JSON.parse(responseText);
                                var timesversion = '';
                                for (key in configinfo) {
                                    let type = configinfo[key]["type"];
                                    let url = configinfo[key]["url"];
                                    if (type == "date") {
                                        timesversion = url;
                                    }
                                    if (type == "js") {
                                        GetOnlineJs(url + "?p=" + timesversion);
                                    }

                                    if (type == "css") {
                                        GetOnlineCss(url + "?p=" + timesversion);
                                    }
                                }
                            }
                        }
                        xhr.send();
                    });
                }
            }
            xhr.send();
        }

        if (request.greeting === "changeversion") {
            chrome.browserAction.setBadgeText({ text: '新' });
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });

            if (request.listmsg != "" && typeof (request.listmsg) != "undefined") {
                showNotification(request.listmsg);
            }
            ClearCaChe(7);
        }

        if (request.greeting === "showusermsg") {
            showNewNotification(request.sendusermsg);
        }

        if (request.greeting === 'getpageid') {
            getCurrentTabId(tabId => {
                sendResponse({ setpageid: tabId });
            });
        }

        if (request.greeting === 'gethtmlinfo') {
            try {
                let method = request.method || "GET";
                let overrideMimeType = request.overrideMimeType || null;
                let param_info = request.param || "";
                let headers = request.headers || {};

                req = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        sendResponse({ sendhtmlinfo: this.responseText, status: this.status });
                    }
                    if (this.status == 404) {
                        sendResponse({ sendhtmlinfo: this.responseText, status: this.status });
                    }
                };

                req.onerror = function () { sendResponse({ sendhtmlinfo: '读取错误' }); };
                req.upload.onerror = function () { sendResponse({ sendhtmlinfo: '读取错误' }); };

                req.open(method, request.geturl, true);
                for (_key in headers)
                    req.setRequestHeader(_key, headers[_key]);
                if (overrideMimeType)
                    req.setRequestHeader("Content-Type", overrideMimeType);
                req.send(param_info);

            }
            catch (e) {
                sendResponse({ sendhtmlinfo: '读取错误' });
            }
        }

        if (request.greeting === 'getjumpurl') {
            try {
                let jump_url = request.geturl;
                var req = new XMLHttpRequest();
                req.withCredentials = false;
                req.onreadystatechange = function () {
                    if (req.readyState == 2) {
                        var jump_true_url = req.responseURL;
                        req.abort();
                        sendResponse({ sendjumpurl: jump_true_url });
                    }
                }
                req.onerror = function () { sendResponse({ sendjumpurl: '读取错误' }); };

                req.upload.onerror = function () { sendResponse({ sendjumpurl: '读取错误' }); };
                req.open("GET", jump_url, true);
                req.send();
            }
            catch (e) {
                sendResponse({ sendjumpurl: '读取错误' });
            }
        }

        if (request.greeting === 'ClearCaChe') {
            ClearCaChe(request.days)
        }
        return true;
    }
);


//获取当前时间
function getdatetime(typename = "") {
    let myDate = new Date();
    let gettime;
    var tf = function (i) { return (i < 10 ? '0' : '') + i };
    if (typename == "D") {
        gettime = myDate.getFullYear().toString() + tf((myDate.getMonth() + 1).toString()) + tf(myDate.getDate().toString());
    } else if (typename == "H") {
        gettime = myDate.getFullYear().toString() + tf((myDate.getMonth() + 1).toString()) + tf(myDate.getDate().toString()) + tf(myDate.getHours().toString());
    } else {
        gettime = myDate.getFullYear().toString() + tf((myDate.getMonth() + 1).toString()) + tf(myDate.getDate().toString()) + tf(myDate.getHours().toString()) + tf(myDate.getMinutes().toString());
    }

    return gettime;
}

function GetOnlineJs(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            getCurrentTabId(tabId => {
                chrome.tabs.executeScript(tabId, { code: this.responseText, runAt: "document_start" });
            });
        }
    }
    xhr.send();
}

function GetOnlineCss(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            getCurrentTabId(tabId => {
                chrome.tabs.insertCSS(tabId, { code: this.responseText, runAt: "document_start" });
            });
        }
    }
    xhr.send();
}

function GetOnlineiframeJs(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            getCurrentTabId(tabId => {
                chrome.tabs.executeScript(tabId, { code: this.responseText, allFrames: true, runAt: "document_start" });
            });
        }
    }
    xhr.send();
}


function ClearCaChe(days) {
    var millisecondsPerWeek = 1000 * 60 * 60 * 24 * days;
    var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;
    chrome.browsingData.removeCache({
        "since": oneWeekAgo
    })
}


