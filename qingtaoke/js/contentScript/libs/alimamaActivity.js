define("alimamaActivity",["jquery","underscore","layer","qtkApi","alimama"],function(a,b,c,d,e){return function(){function b(){this.bindHashChange(),this.isSearching=!1}return b.prototype.bindHashChange=function(){return window.location.hash.startsWith("#!/manage/act/")&&(this.isSearching=!1,this.onActivityPage(),this.bindEvent()),a(window).on("hashchange",function(a){return function(){if(window.location.hash.startsWith("#!/manage/act/"))return a.isSearching=!1,a.onActivityPage(),a.bindEvent()}}(this))},b.prototype.onActivityPage=function(){return this.showButtonTimer=setInterval(function(a){return function(){return a.showButton()}}(this),1e3)},b.prototype.showButton=function(){var b,c;return!this.isSearching&&(c=a("th"),a(c).length>0&&(b=a(".qtk-header:visible"),a(b).length<1)?this.onClick():void 0)},b.prototype.bindEvent=function(){if(!this.isBindEvent)return this.isBindEvent=!0,a(document).on("click",".gaga-search",function(a){return function(){return a.onClick()}}(this)),a(document).on("click",".qtk-flagship-pass",function(a){return function(){return a.onOneKeyPass()}}(this)),a(document).on("click",".qtk-flagship-deny-low",function(a){return function(){return a.onOneKeyDeny()}}(this))},b.prototype.onClick=function(){var a,b;return b=this.getGoods(),b.length<1||(this.searchingLayerIndex=c.load(),this.isSearching=!0,a=this.getCommission(b),a.fail(function(a){return function(b){return clearInterval(a.showButtonTimer),c.close(a.searchingLayerIndex),c.alert("\u67e5\u8be2\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5!"),a.isSearching=!1}}(this)),a.done(function(a){return function(d){return c.close(a.searchingLayerIndex),a.onResult(b,d)}}(this)))},b.prototype.getGoods=function(){var b,c,d,e,f,g,h,i,j;for(g=a('table[bx-tmpl="list"] .title a'),c=[],e=0,f=g.length;e<f;e++)i=g[e],d=a(i).attr("href"),(h=/id=(\d{8,})/i.exec(d))&&(b=h[1],j=a(i).parents("tr"),a(j).attr("data-gid",b),c.push(b));return c},b.prototype.getCommission=function(a){var b;return b=new d,b.getCommission(a)},b.prototype.getCommissionRateIndex=function(){var b,c,d,e,f;for(d=0,f=a("th"),b=0,c=f.length;b<c;b++){if(e=f[b],a(e).text().startsWith("\u4f63\u91d1\u6bd4"))return d;d++}return 0},b.prototype.addHeader=function(){return a(".qtk-header").remove(),a("th:eq("+this.insertPosition+")").after("<th width='70' class='left qtk-header'>\u9e4a\u6865\u6700\u9ad8</th><th width='70' class='left qtk-header'>\u9e4a\u6865\u5206\u6210</th><th width='70' class='left qtk-header'>\u7ed3\u675f\u65f6\u95f4</th>")},b.prototype.onResult=function(b,c){var d,e,f,g,h,i,j,k,l;for(this.insertPosition=this.getCommissionRateIndex(),this.addHeader(),h=0,i=b.length;h<i;h++)if(f=b[h],l=a("tr[data-gid="+f+"]"),d="#333",k=a(l).find("td:eq("+this.insertPosition+")"),j=c[""+f],a(l).find(".qtk-td").remove(),j){try{e=parseFloat(a(l).find("td:eq(4)").text().replace("%","")),j.commissionRate>e?(d="#5aa62e",a(l).addClass("magpie-low")):(d="#ff0000",a(l).addClass("magpie-high-or-equal"))}catch(m){}g="<td width='70' class='left qtk-td'><a style='color:"+d+"' target='_blank' href='http://temai.taobao.com/preview.htm?id="+j.eventId+"' >"+j.commissionRate+"%</a></td><td  width='70' class='left qtk-td'>"+j.shareRate+"%</td><td width='70' class='left qtk-td'>"+j.endTime+"</td>",a(k).after(g)}else g="<td width='70' class='left qtk-td'>--</td><td width='70' class='left qtk-td'>--</td><td width='70' class='left qtk-td'>--</td>",a(l).addClass("magpie-empty"),a(k).after(g);return this.addBatchButton(),this.isSearching=!1},b.prototype.addBatchButton=function(){return a(".qtk-flagship-deny-low, .qtk-flagship-pass").remove(),a(".batch-group").parent().append('<span class="btn btn-size25 qtk-flagship-deny-low" style="margin: 0 9px">\u4e00\u952e\u62d2\u7edd\u4f4e\u4f63\u91d1</span><span class="btn btn-size25 qtk-flagship-pass">\u4e00\u952e\u901a\u8fc7\u9ad8\u4f63\u91d1</span>')},b.prototype.getCurrentEventId=function(){var a;return a=/eventId=(\d+)/i.exec(location.href),a?a[1]:null},b.prototype.onOneKeyDeny=function(){var b,d,f,g,h,i,j,k;if(this.oneKeyDenyIndex=c.load(),!(f=this.getCurrentEventId()))return c.close(this.oneKeyDenyIndex),c.alert("\u83b7\u53d6\u5f53\u524d\u9e4a\u6865\u7684ID\u5931\u8d25\uff01"),!0;for(d=a(".magpie-low"),g=[],h=0,i=d.length;h<i;h++)k=d[h],"\u5f85\u5ba1\u6838"===a(k).find("td:eq(9)").text()&&g.push(a(k).attr("data-gid"));return g.length?(b=new e,j=Promise.resolve(b.setActivityGoodsTag(3,g,void 0,f)),j.then(function(a){return function(){return c.close(a.oneKeyDenyIndex),c.alert("\u5df2\u8bbe\u7f6e",function(){return window.location.reload()})}}(this)).catch(function(a){return function(){return c.close(a.oneKeyDenyIndex),c.alert("\u62d2\u7edd\u901a\u8fc7\u5931\u8d25\uff01")}}(this))):(c.close(this.oneKeyDenyIndex),c.alert("\u5f53\u524d\u9875\u6ca1\u6709\u9700\u8981\u62d2\u7edd\u7684\u5546\u54c1\uff01"),!0)},b.prototype.onOneKeyPass=function(){var b,d,f,g,h,i,j,k;if(this.oneKeyPassLoadIndex=c.load(),!(f=this.getCurrentEventId()))return c.close(this.oneKeyPassLoadIndex),c.alert("\u83b7\u53d6\u5f53\u524d\u9e4a\u6865\u7684ID\u5931\u8d25\uff01"),!0;for(d=a(".magpie-empty, .magpie-high-or-equal"),g=[],h=0,i=d.length;h<i;h++)k=d[h],"\u5f85\u5ba1\u6838"===a(k).find("td:eq(9)").text()&&g.push(a(k).attr("data-gid"));return g.length?(b=new e,j=Promise.resolve(b.getActivityTags(f)),j.then(function(a){return function(d){var e,h,i,j,l,m;for(e=function(a){var b,c;for(c=[],b=0;b++<a&&g.length>0;)c.push(g.shift());return c},l=[],h=0,i=d.length;h<i;h++)if(k=d[h],!((j=100-k.curJoinNum)<1)){if(m=e(j),m.length<1)break;l.push(Promise.resolve(b.setActivityGoodsTag(2,m,k.tagId,f)))}return Promise.all(l).then(function(b){return c.close(a.oneKeyPassLoadIndex),c.alert("\u5df2\u8bbe\u7f6e",function(){return window.location.reload()})}).catch(function(){return c.close(a.oneKeyPassLoadIndex),c.alert("\u5168\u90e8\u6216\u90e8\u5206\u5546\u54c1\u8bbe\u7f6e\u201c\u5ba1\u6838\u901a\u8fc7\u201d\u5931\u8d25\uff01")})}}(this)).catch(function(a){return function(){return c.close(a.oneKeyPassLoadIndex),c.alert('\u83b7\u53d6"\u5206\u7c7b\u540d\u79f0"\u5931\u8d25\uff01')}}(this))):(c.close(this.oneKeyPassLoadIndex),c.alert("\u5f53\u524d\u9875\u6ca1\u6709\u9700\u8981\u901a\u8fc7\u7684\u5546\u54c1\uff01"),!0)},b}()});