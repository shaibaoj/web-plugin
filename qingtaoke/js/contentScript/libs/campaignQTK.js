define("campaignQTK",["jquery","underscore","layer","common","config","configInBackground","applyCampaign","qtkApi"],function(a,b,c,d,e,f,g,h){return function(){function e(){this.isApplying=!1,this.bindEvent()}return e.prototype.bindEvent=function(){return a(".apply").click(function(a){return function(){var b;return b=a.checkStatus(),b.done(function(){return a.onClick()})}}(this)),a(document).on("click","#apply-campaign-button",function(a){return function(){return a.onApplyStart()}}(this)),a(window).on("beforeunload",function(a){return function(){return a.onBeforeUnload()}}(this))},e.prototype.checkStatus=function(){var b,d,e;return e=a.Deferred(),b=new f,d=a.when(b.get("isLoginAlimama"),b.get("isValid"),b.get("isUnavailable")),d.done(function(a){return function(a,b,d){return d?(c.alert('\u60a8\u4f7f\u7528\u7684\u8f7b\u6dd8\u5ba2\u65d7\u8230\u7248\u7248\u672c\u592a\u8001\u5566\u3002<a target="_blank" style="color: #f40;" href="">\u70b9\u6211\u53bb\u4e0b\u8f7d\u65b0\u7248</a>'),e.reject("isUnavailable"),!0):a?e.resolve(!0):(c.alert('\u8bf7\u767b\u5f55\u6dd8\u5b9d\u8054\u76df\u3002<a target="_blank" style="color: #f40;" href="http://www.alimama.com">\u7acb\u5373\u767b\u5f55</a>'),e.reject("isLoginAlimama"),!0)}}()),e},e.prototype.onClick=function(){var d,e,f,g;for(e=a("#gids").val(),g=/id=(\d{9,})/gi,f=g.exec(e),d=[];f;)d.push(f[1]),f=g.exec(e);return this.gidList=b.uniq(d),this.gidList.length<1?(c.alert("\u8bf7\u586b\u5199\u5546\u54c1\u94fe\u63a5"),!1):this.openReasonLayer()},e.prototype.openReasonLayer=function(){var b,d;return b=new f,d=b.get("reason"),d.done(function(b){return function(d){var e,f;return b.applyReasonLayerIndex&&c.close(b.applyReasonLayerIndex),d||(d=""),f="<div style='display: none' id='qtk_flagship_apply_reason'><div class='title'>\u7533\u8bf7\u7406\u7531\uff1a</div><div class='reason-bar'><textarea name='apply-reason' id='apply-reason'>"+d+"</textarea></div> <div class='apply-button'><button id='apply-campaign-button'>\u5f00\u59cb\u7533\u8bf7</button></div> </div>",e=a("#qtk_flagship_apply_reason"),e.length<1&&a("body").append(f),b.applyReasonLayerIndex=c.open({type:1,title:"\u7533\u8bf7\u63a8\u5e7f\u8ba1\u5212\u539f\u56e0\u8bbe\u7f6e",content:a("#qtk_flagship_apply_reason"),closeBtn:!0,shade:!1,area:["800px","350px"],shift:2,maxmin:!0,success:function(){},end:function(){return b.applyReasonLayerIndex=null}})}}(this))},e.prototype.onApplyStart=function(){var b,e,f,i;return i=a("#apply-reason").val(),i=i.replace(/(^\s*|\s*$)/gi,""),(e=d.getStringLength(i))>200?(c.tips("\u7533\u8bf7\u7406\u7531\u4e0d\u80fd\u8d85\u8fc7200\u4e2a\u5b57\u7b26(100\u4e2a\u6c49\u5b57)",a("#apply-reason"),{time:4e3}),!0):e<1?(c.tips("\u5fc5\u987b\u586b\u5199\u7533\u8bf7\u7406\u7531",a("#apply-reason"),{time:4e3}),!0):(c.close(this.applyReasonLayerIndex),f=new h,f.saveReason(i),this.applyCampaign=new g(this.gidList,i),this.isApplying=!0,b=this.applyCampaign.runApply(),b.progress(function(a){return function(b){return a.onProgress(b)}}(this)),b.done(function(a){return function(b){return a.onFinish(b)}}(this)))},e.prototype.onProgress=function(a){},e.prototype.onFinish=function(a){return this.isApplying=!1,this.applyCampaign=null},e.prototype.onBeforeUnload=function(){if(this.isApplying)return"\u6b63\u5728\u7533\u8bf7\u63a8\u5e7f\u8ba1\u5212\u4e2d"},e}()});