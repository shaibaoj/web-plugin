$(function() {
    var ext = chrome.extension.getBackgroundPage(),
        swapButtons = function() {
            $('#start').toggle();
            $('#stop').toggle();
        };
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var timer = ext.timers.get(tabs[0].id);
        if(timer) {
            swapButtons();
            var min = timer.interval / (60 * 1000);
            $('#minutes').val(Math.floor(min));
            console.log(min - Math.floor(min) );
            $('#seconds').val(Math.round((min - Math.floor(min)) * 60));
        }
    });
    
    $('#start').on('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var interval = ($('#minutes').val() * 60 * 1000) + ($('#seconds').val() * 1000);
            ext.timers.set(tabs[0], interval);
        });
        swapButtons();
    });
    
    $('#stop').on('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            ext.timers.remove(tabs[0].id);
        });
        swapButtons();
    });
    
    setTimeout(function() {
        $('#seconds').focus()[0].select();
    }, 100);
    
    ext.aa();
    
//    var bg = chrome.extension.getBackgroundPage();
//  //再在返回的对象上调用background.js 里面的函数
//  bg.aa();
});


