define("tableorder",["jquery"],function($){!function($){$.extend({tablesorter:new function(){function benchmark(a,b){log(a+","+((new Date).getTime()-b.getTime())+"ms")}function log(a){"undefined"!=typeof console&&void 0!==console.debug||alert(a)}function buildParserCache(a,b){if(a.config.debug)var c="";if(0!=a.tBodies.length){var d=a.tBodies[0].rows;if(d[0])for(var e=[],f=d[0].cells,g=f.length,h=0;h<g;h++){var i=!1;$.metadata&&$(b[h]).metadata()&&$(b[h]).metadata().sorter?i=getParserById($(b[h]).metadata().sorter):a.config.headers[h]&&a.config.headers[h].sorter&&(i=getParserById(a.config.headers[h].sorter)),i||(i=detectParserForColumn(a,d,-1,h)),a.config.debug&&(c+="column:"+h+" parser:"+i.id+"\n"),e.push(i)}return a.config.debug&&log(c),e}}function detectParserForColumn(a,b,c,d){for(var e=parsers.length,f=!1,g=!1,h=!0;""==g&&h;)c++,b[c]?(f=getNodeFromRowAndCellIndex(b,c,d),g=trimAndGetNodeText(a.config,f),a.config.debug&&log("Checking if value was empty on row:"+c)):h=!1;for(var i=1;i<e;i++)if(parsers[i].is(g,a,f))return parsers[i];return parsers[0]}function getNodeFromRowAndCellIndex(a,b,c){return a[b].cells[c]}function trimAndGetNodeText(a,b){return $.trim(getElementText(a,b))}function getParserById(a){for(var b=parsers.length,c=0;c<b;c++)if(parsers[c].id.toLowerCase()==a.toLowerCase())return parsers[c];return!1}function buildCache(a){if(a.config.debug)var b=new Date;for(var c=a.tBodies[0]&&a.tBodies[0].rows.length||0,d=a.tBodies[0].rows[0]&&a.tBodies[0].rows[0].cells.length||0,e=a.config.parsers,f={row:[],normalized:[]},g=0;g<c;++g){var h=$(a.tBodies[0].rows[g]),i=[];if(h.hasClass(a.config.cssChildRow))f.row[f.row.length-1]=f.row[f.row.length-1].add(h);else{f.row.push(h);for(var j=0;j<d;++j)i.push(e[j].format(getElementText(a.config,h[0].cells[j]),a,h[0].cells[j]));i.push(f.normalized.length),f.normalized.push(i),i=null}}return a.config.debug&&benchmark("Building cache for "+c+" rows:",b),f}function getElementText(a,b){return b?(a.supportsTextContent||(a.supportsTextContent=b.textContent||!1),"simple"==a.textExtraction?a.supportsTextContent?b.textContent:b.childNodes[0]&&b.childNodes[0].hasChildNodes()?b.childNodes[0].innerHTML:b.innerHTML:"function"==typeof a.textExtraction?a.textExtraction(b):$(b).text()):""}function appendToTable(a,b){if(a.config.debug)var c=new Date;for(var d=b,e=d.row,f=d.normalized,g=f.length,h=f[0].length-1,i=$(a.tBodies[0]),j=[],k=0;k<g;k++){var l=f[k][h];if(j.push(e[l]),!a.config.appender)for(var m=e[l].length,n=0;n<m;n++)i[0].appendChild(e[l][n])}a.config.appender&&a.config.appender(a,j),j=null,a.config.debug&&benchmark("Rebuilt table:",c),applyWidget(a),setTimeout(function(){$(a).trigger("sortEnd")},0)}function buildHeaders(a){if(a.config.debug)var b=new Date;var c=($.metadata,computeTableHeaderCellIndexes(a));return $tableHeaders=$(a.config.selectorHeaders,a).each(function(b){if(this.column=c[this.parentNode.rowIndex+"-"+this.cellIndex],this.order=formatSortingOrder(a.config.sortInitialOrder),this.count=this.order,(checkHeaderMetadata(this)||checkHeaderOptions(a,b))&&(this.sortDisabled=!0),checkHeaderOptionsSortingLocked(a,b)&&(this.order=this.lockedOrder=checkHeaderOptionsSortingLocked(a,b)),!this.sortDisabled){var d=$(this).addClass(a.config.cssHeader);a.config.onRenderHeader&&a.config.onRenderHeader.apply(d)}a.config.headerList[b]=this}),a.config.debug&&(benchmark("Built headers:",b),log($tableHeaders)),$tableHeaders}function computeTableHeaderCellIndexes(a){for(var b=[],c={},d=a.getElementsByTagName("THEAD")[0],e=d.getElementsByTagName("TR"),f=0;f<e.length;f++)for(var g=e[f].cells,h=0;h<g.length;h++){var i,j=g[h],k=j.parentNode.rowIndex,l=k+"-"+j.cellIndex,m=j.rowSpan||1,n=j.colSpan||1;void 0===b[k]&&(b[k]=[]);for(var o=0;o<b[k].length+1;o++)if(void 0===b[k][o]){i=o;break}c[l]=i;for(var o=k;o<k+m;o++){void 0===b[o]&&(b[o]=[]);for(var p=b[o],q=i;q<i+n;q++)p[q]="x"}}return c}function checkCellColSpan(a,b,c){for(var d=[],e=a.tHead.rows,f=e[c].cells,g=0;g<f.length;g++){var h=f[g];h.colSpan>1?d=d.concat(checkCellColSpan(a,headerArr,c++)):(1==a.tHead.length||h.rowSpan>1||!e[c+1])&&d.push(h)}return d}function checkHeaderMetadata(a){return!(!$.metadata||!1!==$(a).metadata().sorter)}function checkHeaderOptions(a,b){return!(!a.config.headers[b]||!1!==a.config.headers[b].sorter)}function checkHeaderOptionsSortingLocked(a,b){return!(!a.config.headers[b]||!a.config.headers[b].lockedOrder)&&a.config.headers[b].lockedOrder}function applyWidget(a){for(var b=a.config.widgets,c=b.length,d=0;d<c;d++)getWidgetById(b[d]).format(a)}function getWidgetById(a){for(var b=widgets.length,c=0;c<b;c++)if(widgets[c].id.toLowerCase()==a.toLowerCase())return widgets[c]}function formatSortingOrder(a){return"Number"!=typeof a?"desc"==a.toLowerCase()?1:0:1==a?1:0}function isValueInArray(a,b){for(var c=b.length,d=0;d<c;d++)if(b[d][0]==a)return!0;return!1}function setHeadersCss(a,b,c,d){b.removeClass(d[0]).removeClass(d[1]);var e=[];b.each(function(a){this.sortDisabled||(e[this.column]=$(this))});for(var f=c.length,g=0;g<f;g++)e[c[g][0]].addClass(d[c[g][1]])}function fixColumnWidth(a,b){if(a.config.widthFixed){var c=$("<colgroup>");$("tr:first td",a.tBodies[0]).each(function(){c.append($("<col>").css("width",$(this).width()))}),$(a).prepend(c)}}function updateHeaderSortCount(a,b){for(var c=a.config,d=b.length,e=0;e<d;e++){var f=b[e],g=c.headerList[f[0]];g.count=f[1],g.count++}}function multisort(table,sortList,cache){if(table.config.debug)var sortTime=new Date;for(var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length,i=0;i<l;i++){var c=sortList[i][0],order=sortList[i][1],s="text"==table.config.parsers[c].type?0==order?makeSortFunction("text","asc",c):makeSortFunction("text","desc",c):0==order?makeSortFunction("numeric","asc",c):makeSortFunction("numeric","desc",c),e="e"+i;dynamicExp+="var "+e+" = "+s,dynamicExp+="if("+e+") { return "+e+"; } ",dynamicExp+="else { "}var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++)dynamicExp+="}; ";return dynamicExp+="return 0; ",dynamicExp+="}; ",table.config.debug&&benchmark("Evaling expression:"+dynamicExp,new Date),eval(dynamicExp),cache.normalized.sort(sortWrapper),table.config.debug&&benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime),cache}function makeSortFunction(a,b,c){var d="a["+c+"]",e="b["+c+"]";return"text"==a&&"asc"==b?"("+d+" == "+e+" ? 0 : ("+d+" === null ? Number.POSITIVE_INFINITY : ("+e+" === null ? Number.NEGATIVE_INFINITY : ("+d+" < "+e+") ? -1 : 1 )));":"text"==a&&"desc"==b?"("+d+" == "+e+" ? 0 : ("+d+" === null ? Number.POSITIVE_INFINITY : ("+e+" === null ? Number.NEGATIVE_INFINITY : ("+e+" < "+d+") ? -1 : 1 )));":"numeric"==a&&"asc"==b?"("+d+" === null && "+e+" === null) ? 0 :("+d+" === null ? Number.POSITIVE_INFINITY : ("+e+" === null ? Number.NEGATIVE_INFINITY : "+d+" - "+e+"));":"numeric"==a&&"desc"==b?"("+d+" === null && "+e+" === null) ? 0 :("+d+" === null ? Number.POSITIVE_INFINITY : ("+e+" === null ? Number.NEGATIVE_INFINITY : "+e+" - "+d+"));":void 0}function makeSortText(a){return"((a["+a+"] < b["+a+"]) ? -1 : ((a["+a+"] > b["+a+"]) ? 1 : 0));"}function makeSortTextDesc(a){return"((b["+a+"] < a["+a+"]) ? -1 : ((b["+a+"] > a["+a+"]) ? 1 : 0));"}function makeSortNumeric(a){return"a["+a+"]-b["+a+"];"}function makeSortNumericDesc(a){return"b["+a+"]-a["+a+"];"}function sortText(a,b){return table.config.sortLocaleCompare?a.localeCompare(b):a<b?-1:a>b?1:0}function sortTextDesc(a,b){return table.config.sortLocaleCompare?b.localeCompare(a):b<a?-1:b>a?1:0}function sortNumeric(a,b){return a-b}function sortNumericDesc(a,b){return b-a}function getCachedSortType(a,b){return a[b].type}var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",cssChildRow:"expand-child",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,sortLocaleCompare:!0,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:!1,cancelSelection:!0,sortList:[],headerList:[],dateFormat:"us",decimal:"/.|,/g",onRenderHeader:null,selectorHeaders:"thead th",debug:!1},this.benchmark=benchmark,this.construct=function(a){return this.each(function(){if(this.tHead&&this.tBodies){var b,c,d,e;this.config={},e=$.extend(this.config,$.tablesorter.defaults,a),b=$(this),$.data(this,"tablesorter",e),c=buildHeaders(this),this.config.parsers=buildParserCache(this,c),d=buildCache(this);var f=[e.cssDesc,e.cssAsc];fixColumnWidth(this),c.click(function(a){var g=b[0].tBodies[0]&&b[0].tBodies[0].rows.length||0;if(!this.sortDisabled&&g>0){b.trigger("sortStart");var h=($(this),this.column);if(this.order=this.count++%2,this.lockedOrder&&(this.order=this.lockedOrder),a[e.sortMultiSortKey])if(isValueInArray(h,e.sortList))for(var i=0;i<e.sortList.length;i++){var j=e.sortList[i],k=e.headerList[j[0]];j[0]==h&&(k.count=j[1],k.count++,j[1]=k.count%2)}else e.sortList.push([h,this.order]);else{if(e.sortList=[],null!=e.sortForce)for(var l=e.sortForce,i=0;i<l.length;i++)l[i][0]!=h&&e.sortList.push(l[i]);e.sortList.push([h,this.order])}return setTimeout(function(){setHeadersCss(b[0],c,e.sortList,f),appendToTable(b[0],multisort(b[0],e.sortList,d))},1),!1}}).mousedown(function(){if(e.cancelSelection)return this.onselectstart=function(){return!1},!1}),b.bind("update",function(){var a=this;setTimeout(function(){a.config.parsers=buildParserCache(a,c),d=buildCache(a)},1)}).bind("updateCell",function(a,b){var c=this.config,e=[b.parentNode.rowIndex-1,b.cellIndex];d.normalized[e[0]][e[1]]=c.parsers[e[1]].format(getElementText(c,b),b)}).bind("sorton",function(a,b){$(this).trigger("sortStart"),e.sortList=b;var g=e.sortList;updateHeaderSortCount(this,g),setHeadersCss(this,c,g,f),appendToTable(this,multisort(this,g,d))}).bind("appendCache",function(){appendToTable(this,d)}).bind("applyWidgetId",function(a,b){getWidgetById(b).format(this)}).bind("applyWidgets",function(){applyWidget(this)}),$.metadata&&$(this).metadata()&&$(this).metadata().sortlist&&(e.sortList=$(this).metadata().sortlist),e.sortList.length>0&&b.trigger("sorton",[e.sortList]),applyWidget(this)}})},this.addParser=function(a){for(var b=parsers.length,c=!0,d=0;d<b;d++)parsers[d].id.toLowerCase()==a.id.toLowerCase()&&(c=!1);c&&parsers.push(a)},this.addWidget=function(a){widgets.push(a)},this.formatFloat=function(a){var b=parseFloat(a);return isNaN(b)?0:b},this.formatInt=function(a){var b=parseInt(a);return isNaN(b)?0:b},this.isDigit=function(a,b){return/^[-+]?\d*$/.test($.trim(a.replace(/[,.']/g,"")))},this.clearTableBody=function(a){function b(){for(;this.firstChild;)this.removeChild(this.firstChild)}$.browser.msie?b.apply(a.tBodies[0]):a.tBodies[0].innerHTML=""}}}),$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(a){return!0},format:function(a){return $.trim(a.toLocaleLowerCase())},type:"text"}),ts.addParser({id:"digit",is:function(a,b){var c=b.config;return $.tablesorter.isDigit(a,c)},format:function(a){return $.tablesorter.formatFloat(a)},type:"numeric"}),ts.addParser({id:"currency",is:function(a){return/^[\xa3$\u20ac?.]/.test(a)},format:function(a){return $.tablesorter.formatFloat(a.replace(new RegExp(/[\xa3$\u20ac]/g),""))},type:"numeric"}),ts.addParser({id:"ipAddress",is:function(a){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(a)},format:function(a){for(var b=a.split("."),c="",d=b.length,e=0;e<d;e++){var f=b[e];2==f.length?c+="0"+f:c+=f}return $.tablesorter.formatFloat(c)},type:"numeric"}),ts.addParser({id:"url",is:function(a){return/^(https?|ftp|file):\/\/$/.test(a)},format:function(a){return jQuery.trim(a.replace(new RegExp(/(https?|ftp|file):\/\//),""))},type:"text"}),ts.addParser({id:"isoDate",is:function(a){return/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},format:function(a){return $.tablesorter.formatFloat(""!=a?new Date(a.replace(new RegExp(/-/g),"/")).getTime():"0")},type:"numeric"}),ts.addParser({id:"percent",is:function(a){return/\%$/.test($.trim(a))},format:function(a){return $.tablesorter.formatFloat(a.replace(new RegExp(/%/g),""))},type:"numeric"}),ts.addParser({id:"usLongDate",is:function(a){return a.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/))},format:function(a){return $.tablesorter.formatFloat(new Date(a).getTime())},type:"numeric"}),ts.addParser({id:"shortDate",is:function(a){return/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(a)},format:function(a,b){var c=b.config;return a=a.replace(/\-/g,"/"),"us"==c.dateFormat?a=a.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2"):"uk"==c.dateFormat?a=a.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1"):"dd/mm/yy"!=c.dateFormat&&"dd-mm-yy"!=c.dateFormat||(a=a.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3")),$.tablesorter.formatFloat(new Date(a).getTime())},type:"numeric"}),ts.addParser({id:"time",is:function(a){return/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(a)},format:function(a){return $.tablesorter.formatFloat(new Date("2000/01/01 "+a).getTime())},type:"numeric"}),ts.addParser({id:"metadata",is:function(a){return!1},format:function(a,b,c){var d=b.config,e=d.parserMetadataName?d.parserMetadataName:"sortValue";return $(c).metadata()[e]},type:"numeric"}),ts.addWidget({id:"zebra",format:function(a){if(a.config.debug)var b=new Date;var c,d,e=-1;$("tr:visible",a.tBodies[0]).each(function(b){c=$(this),c.hasClass(a.config.cssChildRow)||e++,d=e%2==0,c.removeClass(a.config.widgetZebra.css[d?0:1]).addClass(a.config.widgetZebra.css[d?1:0])}),a.config.debug&&$.tablesorter.benchmark("Applying Zebra widget",b)}})}(jQuery)});