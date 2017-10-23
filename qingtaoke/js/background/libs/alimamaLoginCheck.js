define("alimamaLoginCheck",["jquery","underscore","alimama","common","config","cookie","errorCode","qtk","loadConfig"],function(a,b,c,d,e,f,g,h,i){return function(){function b(){this.isShowTip=!1}return b.prototype.autoCheck=function(){},b.prototype.bindTimer=function(){return setInterval(function(a){return function(){return a.start()}}(this),e.alimamaLoginCheckInterval)},b.prototype.start=function(){var a,b;return e.username||(b=new i(!1),b.load()),a=new f,a.getAlimamaCookie("_tb_token_").done(function(a){return function(b){var d;return a.alimama=new c(b?b.value:null),a.alimama?(d=a.alimama.checkLoginStatus(),d.fail(function(a){}),d.done(function(b){if(b)return a.onLogin(),e.isLoginAlimama=!0})):void dtd.reject({errorCode:g.ERROR_NETWORK,errorText:"\u7f51\u7edc\u9519\u8bef\u6216\u670d\u52a1\u5668\u9519\u8bef"})}}(this))},b.prototype.onOpenAlimamaPage=function(){var b,d;return d=a.Deferred(),b=new f,b.getAlimamaCookie("_tb_token_").done(function(a){return function(b){a.alimama=new c(b?b.value:null),a.alimama||d.reject({errorCode:g.ERROR_NETWORK,errorText:"\u7f51\u7edc\u9519\u8bef\u6216\u670d\u52a1\u5668\u9519\u8bef"})}}(this)),d},b.prototype.onLogin=function(){return this.initConfig()},b.prototype.initConfig=function(){var a;return a=this.getTaoKeInfo(),a.done(function(a){return function(b){var c,d,f,g,h;g=[],h=e.pidListAll;for(c in h){f=h[c];for(c in f)d=f[c],e.pidList.push(d)}if(g||a.showBindPage(b.memberId),e.tkMemberId=b.memberId,e.tkRank=b.rank,e.tkNickname=b.nickname,g)return e.pidList=g}}(this))},b.prototype.getTaoKeInfo=function(){var b,d;return d=a.Deferred(),b=new f,b.getAlimamaCookie("_tb_token_").done(function(a){return function(b){var e;return a.alimama=new c(b?b.value:null),a.alimama?(e=a.alimama.getUnionContextInfo(),e.fail(function(a){return d.reject(a)}),e.done(function(a){var b,c;return b=a.memberid,c=a.tkMemberRank,d.resolve({memberId:b,rank:c,nickname:""})})):void d.reject({errorCode:g.ERROR_NETWORK,errorText:"\u7f51\u7edc\u9519\u8bef\u6216\u670d\u52a1\u5668\u9519\u8bef"})}}(this)),d},b.prototype.showBindPage=function(a){if(!(e["_isShowedBindPage_"+a]||e.boundUnionAccount&&e.boundUnionAccount[""+a]))return e["_isShowedBindPage_"+a]=!0},b.prototype.onLogOut=function(){return e.tkMemberId=null,e.tkRank=null,e.tkNickname=null,e.pidList=[]},b}()});