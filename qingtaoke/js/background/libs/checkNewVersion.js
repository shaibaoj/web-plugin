define("checkNewVersion",["jquery","underscore","qtk","common"],function(a,b,c,d){return function(){function a(){this.start()}return a.prototype.start=function(){var a;return a=this,setInterval(function(){return a.getNewVersion()},6e5),this.getNewVersion()},a.prototype.getNewVersion=function(){var a,b;return b=new c,a=b.update(),a.done(function(a){return function(a){if(0!==a.status)return d.notify("update_plugin","\u8f7b\u6dd8\u5ba2\u66f4\u65b0\u63d0\u793a",a.txt)}}())},a}()});