var se_show_config=null;
var SE={
	domain : "",
	se_config : {
		"百度":{
			"show":1,
			"收录":{"show":1, cfg:["http://www.baidu.com/s?wd=site%3A#d", "找到相关结果数", "个", "抱歉，没有找到"]},
			"外链":{"show":1, cfg:["http://www.baidu.com/s?wd=domain%3A#d", "找到相关结果", "个", "抱歉，没有找到"]},
			"快照日期":{"show":1, cfg:["http://www.baidu.com/s?wd=#d", "<span class=\"g\">", "</span>", "抱歉，没有找到", function(ret){return ret.split('/ ')[1];}]},
			"首页位置":{"show":1, cfg:["http://www.baidu.com/s?wd=site%3A#d", "站长帮助</a></font><br></p>", "<br clear=all>", "抱歉，没有找到", function(ret){var i=0, k=0; var ss=''; while((ss=SE_Tool.get_middleStr(ret, "<br><font color=\"#008000\">", "</font>"))!=""){ret=ret.replace("<br><font color=\"#008000\">"+ss+"</font>", "");i=i+1; if(ss.split(' ')[0].toLowerCase()==tab_url.toLowerCase()+"/"){k=1;break;}}return k==1?i:0;}]}
			},
		"近期":{
			"show":1,
			"一天":{"show":1, cfg:["http://www.baidu.com/s?q1=&q2=&q3=&q4=&rn=10&lm=1&ct=0&ft=&q5=&tn=baiduadv&q6=#d", "找到相关结果数", "个", "找不到和您的查询"]}, 
			"七天":{"show":1, cfg:["http://www.baidu.com/s?q1=&q2=&q3=&q4=&rn=10&lm=7&ct=0&ft=&q5=&tn=baiduadv&q6=#d", "找到相关结果数", "个", "找不到和您的查询"]},
			"一月":{"show":1, cfg:["http://www.baidu.com/s?q1=&q2=&q3=&q4=&rn=10&lm=30&ct=0&ft=&q5=&tn=baiduadv&q6=#d", "找到相关结果数", "个", "找不到和您的查询"]},
			"一年":{"show":1, cfg:["http://www.baidu.com/s?q1=&q2=&q3=&q4=&rn=10&lm=360&ct=0&ft=&q5=&tn=baiduadv&q6=#d", "找到相关结果数", "个", "找不到和您的查询"]},
			},
		"链接":{
			"show":1,
			//"yahoo外链":{"show":1, cfg:["http://siteexplorer.search.yahoo.com/search;_ylt=A0oGk.pycKNOx.IA_._al8kF?p=#d&fr=sfp&bwm=i", "<li><span class=\"btn\">Inlinks (", ")</span>", "We were unable to find any results for the given URL in our index"]},
			//"opensite外链":{"show":1, cfg:["http://www.opensiteexplorer.org/links.html?site=#d", "This data is in beta.</div>", "<td class", "o match", null, null, "utf-8"]},
			//"爱站外链总数":{"show":1, cfg:["http://link.aizhan.com/?url=#d&vt=s", "<strong class=\"red\">", "</strong>", "o match", null, null, "utf-8"]},
			//"爱站首页外链":{"show":1, cfg:["http://link.aizhan.com/?url=#d&vt=s", "共有首页外链 <strong class=\"red\">", "</strong>", "o match", null, null, "utf-8"]},
			//"首页外链":{"show":1, cfg:["http://inlink.linkhelper.cn/?url=#d", "共有首页外链：<font color=red>", "</font>", "o match", null, null, "gb2312"]},
			//"导出链接":{"show":1, cfg:["http://i.linkhelper.cn/getOutLinkCount.asp?i=0&from=check&backlinkurl=http://#d", "导出链接数量：", "</div>", "o match", null, null, "gb2312"]},
			"linkhelper外链":{"show":1, cfg:["http://inlink.linkhelper.cn/domain/#d/", "页 共", "条记录", "o match", null, null, "gb2312"]},
			"爱站外链":{"show":1, cfg:["http://link.aizhan.com/?url=#d&vt=a", "<strong class=\"red\">", "</strong>", "o match", null, null, "utf-8"]},
			"Chinaz外链":{"show":1, cfg:["http://outlink.chinaz.com/?h=#d&t=&sf=oc&s=0&p=1", "<font color=red>", "</font>", "o match", null, null, "gb2312"]},
			"ahrefs外链":{"show":0, cfg:["http://ahrefs.com/site-explorer/overview/subdomains/#d", "filter backlink in backlinks']);\">", "</a>", "o match", null, null, "utf-8"]},
			"首页导出链接":{"show":0, cfg:["http://tool.zbole.com/BaiduCheck/ExportLink.aspx?url=#d", "导出外链:", ",", "o match", null, null, "gb2312"]},
			"PR输出值":{"show":1, cfg:["http://tool.jz123.cn/ExportPR.asp?weburl=#d&gocx=", "PR输出值</td>", "</td>", "o match", null, null, "gb2312"]}

			},
		"爱站":{
			"show":1,
			"词数":{"show":1, cfg:["http://www.aizhan.com/baidu/#d/", "<td colspan=\"5\" align=\"left\"><span class=\"red\">", "</span>", "o match", null, null, "gbk"]},
			"百度带来流量":{"show":1, cfg:["http://www.aizhan.com/baidu/#d/", "预计百度来路: <span class=\"red\">", "</span>", "o match", null, null, "gbk"]},
			"百度权重值":{"show":1, cfg:["http://www.aizhan.com/baidu/#d/", "http://static.aizhan.com/images/brs/", ".gif", "o match", null, null, "gbk"]},
			"网站历史":{"show":1, cfg:["http://lishi.aizhan.com/?url=#d&t=1", "<title>网站", "_爱站网", "o match", null, null, "utf-8"]}
			},
		//"伯乐":{
		//	"show":0,
		//	"记录数":{"show":1, cfg:["http://tool.zbole.com/baidu/#d/", "伯乐收录：", "</p>", "o match", null, null, "gb2312"]},
		//	"百度带来流量":{"show":1, cfg:["http://tool.zbole.com/baidu/#d/", "<p class=\"tc1\">", "</p>", "o match", null, null, "gb2312"]},
		//	"百度权重值":{"show":1, cfg:["http://tool.zbole.com/BaiduCheck/CheckBaiduBR.aspx?url=#d", "百度权重:", ",", "o match", null, null, "gb2312"]},
		//	"alexa排名":{"show":1, cfg:["http://tool.zbole.com/alexa.aspx?url=#d", "alexapm\":\"", "\",", "o match", null, null, "gb2312"]}
		//	},
		"去查":{
			"show":1,
			"记录数":{"show":1, cfg:["http://www.7c.com/baidu/#d/", "累计找到<strong>", "</strong>", "o match", null, null, "gbk"]},
			"百度带来流量":{"show":1, cfg:["http://www.7c.com/baidu/#d/", "预计百度大概给该网站的流量为", "</td>", "o match", null, null, "gbk"]},
			"百度权重值":{"show":1, cfg:["http://www.7c.com/baidu/#d/", "<div id=\"weightfont\">", "</div>", "o match", null, null, "gbk"]}
			//"alexa排名":{"show":1, cfg:["http://tool.zbole.com/alexa.aspx?url=#d", "alexapm\":\"", "\",", "o match", null, null, "gb2312"]}
			},
		"站长":{
			"show":1,
			"记录数":{"show":1, cfg:["http://mytool.chinaz.com/baidusort.aspx?host=#d&sortType=0", "共找到 <font color=\"blue\">", "</font>", "o match", null, null, "utf-8"]},
			"百度带来流量":{"show":1, cfg:["http://mytool.chinaz.com/baidusort.aspx?host=#d&sortType=0", "预计从百度来访 <font color=\"blue\">", "</font>", "o match", null, null, "utf-8"]},
			"百度权重值":{"show":1, cfg:["http://mytool.chinaz.com/baidusort.aspx?host=#d&sortType=0", "百度权重为 <font color=\"\">", "</font>", "o match", null, null, "utf-8"]}
			},
		"谷歌":{
			"show":1,
			"收录":{"show":1, cfg:["http://www.google.com.hk/search?hl=zh-CN&q=site%3A#d", "id=resultStats>", " 条结果<nobr>", "找不到和您的查询", function(ret){return ret.replace("约 ","").replace("找到", "").replace("获得", "");}]}, 
			"外链":{"show":1, cfg:["http://www.google.com.hk/search?hl=zh-CN&q=link%3A#d", "id=resultStats>", " 条结果<nobr>", "找不到和您的查询", function(ret){return ret.replace("约 ","").replace("找到", "").replace("获得", "");}]},
			"ＰＲ":{"show":1, cfg:["http://pr.linkhelper.cn/querypr.asp?url=#d", "</a>的PR：<img src='http://www.linkhelper.cn/pagerank", ".gif' border=0>", this.domain+"该网址错误！", null, null, "gb2312"]}
			},
		//"雅虎":{
			//"show":0,
		//	"收录":{"show":1, cfg:["http://www.yahoo.cn/s?q=site%3A#d", "<div class=\"rltnum\">", "</div>", "o match", null, null, "utf-8"]},
			//"外链":{"show":1, cfg:["http://siteexplorer.search.yahoo.com/search;_ylt=A0oGk.pycKNOx.IA_._al8kF?p=#d&fr=sfp&bwm=i", "<li><span class=\"btn\">Inlinks (", ")</span>", "We were unable to find any results for the given URL in our index"]}
		//	},
		"搜狗":{
			"show":0,
			"收录":{"show":1, cfg:["http://www.sogou.com/web?query=site%3A#d", "<div class=\"resultstats\" >找到约 <span id=\"scd_num\">", "</span>", "<div class=\"no-result\" id=\"noresult_part1_container\">没有找到"]},
			"外链":{"show":1, cfg:["http://www.sogou.com/web?query=link%3A#d", "<div class=\"resultstats\" >找到约 <span id=\"scd_num\">", "</span>", "<div class=\"no-result\" id=\"noresult_part1_container\">没有找到"]},
			"评级":{"show":0, cfg:["http://rank.ie.sogou.com/sogourank.php?ur=http%3A%2F%2F#d%2F", "sogourank=", "", "all"]}
			},
		"搜搜":{
			"show":0,
			"收录":{"show":1, cfg:["http://www.soso.com/q?w=site%3A#d", "搜索到约", "项结果", "<font color=#DA3145>", null, null, "gb2312"]},
			"外链":{"show":1, cfg:["http://www.soso.com/q?w=link%3A#d", "搜索到约", "项结果", "<font color=#DA3145>", null, null, "gb2312"]}
			},
		"奇虎":{
			"show":0,
			"收录":{"show":1, cfg:["http://so.360.cn/s?ie=utf-8&src=hao_phome&q=site%3A#d", "找到相关结果约", "个", "<font color=#DA3145>", null, null, "utf-8"]}
			},
		"有道":{
			"show":0,
			"收录":{"show":1, cfg:["http://www.youdao.com/search?q=site%3A#d", "<span class=\"srd\">共", "条结果</span>", "抱歉，没有找到与", function(ret){ret=ret.replace("约","");if(ret.indexOf("万")>0){var tmp=ret.split('万'); return tmp[0]*10000+(tmp[1].length>0?parseInt(tmp[1]):0);} return ret;}]},
			"外链":{"show":1, cfg:["http://www.youdao.com/search?q=link%3A#d", "<span class=\"srd\">共", "条结果</span>", "抱歉，没有找到与", function(ret){ret=ret.replace("约","");if(ret.indexOf("万")>0){var tmp=ret.split('万'); return tmp[0]*10000+(tmp[1].length>0?parseInt(tmp[1]):0);} return ret;}]}
			},

		"必应":{
			"show":0,
			"收录":{"show":1, cfg:["http://cn.bing.com/search?q=site%3A#d", "条结果(共 ", " 条)</span>", "<div id=\"no_results\"><h1>未找到 <strong>site:"]},
			"外链":{"show":1, cfg:["http://cn.bing.com/search?q=link%3A#d", "条结果(共 ", " 条)</span>", "<div id=\"no_results\"><h1>未找到 <strong>site:"]}
			},
		"alexa":{
			"show":0,
			"全球排名":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "style=\"margin-bottom:-2px;\"/>", "</div>", this.domain+"该网址错误"]},
			"昨天排名":{"show":0, cfg:["http://www.alexa.com/siteinfo/#d", "<th>Yesterday</th>", "</td>", this.domain+"该网址错误"]},
			"地区排名":{"show":0, cfg:["http://www.alexa.com/search?q=#d", "Traffic Rank in </span>", "</span>", this.domain+"该网址错误"]},
			//"七天排名":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "<th>7 day</th> <td class=\"avg \">", "</div>", this.domain+"该网址错误"]},
			//"一月排名":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "<th>1 month</th>", "</div>", this.domain+"该网址错误"]},
			//"三月排名":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "<th>3 month</th>", "</div>", this.domain+"该网址错误"]},
			//"DMOZ分类":{"show":1, cfg:["http://data.alexa.com/data/TCaX/0+qO000fV?cli=10&dat=snba&ver=7.0&cdt=alx_vw=20&wid=31472&act=00000000000&ss=1024x768&bw=639&t=0&ttl=4907&vis=1&rq=23&url=#d", "Top/", "TITLE", this.domain+"该网址错误"]},
			"外链":{"show":1, cfg:["http://www.alexa.com/search?q=#d", "Sites Linking In: </span>", "</span>", this.domain+"该网址错误"]}
			},
		//"Majestic":{
			//"show":0,
			//"链接数":{"show":1, cfg:["http://www.majesticseo.com/reports/site-explorer/summary/#d?IndexDataSource=F", "条结果(共 ", " 条)</span>", "<div id=\"no_results\"><h1>未找到 <strong>site:"]},
			//"域名数":{"show":1, cfg:["http://www.majesticseo.com/reports/site-explorer/summary/#d?IndexDataSource=F", "条结果(共 ", " 条)</span>", "<div id=\"no_results\"><h1>未找到 <strong>site:"]},
			//"C地址段":{"show":1, cfg:["http://www.majesticseo.com/reports/site-explorer/summary/#d?IndexDataSource=F", "条结果(共 ", " 条)</span>", "<div id=\"no_results\"><h1>未找到 <strong>site:"]},
			//},
		"域名":{
			"show":1,
			//"注册时间":{"show":1, cfg:["http://whois.zbole.com/whois/?url=#nd", "创建时间：", "到期时间", "o match", null, null, "gb2312"]},
			//"域名年龄":{"show":0, cfg:["http://whois.zbole.com/whois/?url=#nd", "域名年龄：", "创建时间", "o match", null, null, "gb2312"]},
			//"到期时间":{"show":1, cfg:["http://whois.zbole.com/whois/?url=#nd", "到期时间：", "删除时间", "o match", null, null, "gb2312"]},
			//"删除时间":{"show":0, cfg:["http://whois.zbole.com/whois/?url=#nd", "删除时间：", "</p>", "o match", null, null, "gb2312"]},
			"注册日期":{"show":1, cfg:["http://tool.chinaz.com/DomainDel/?wd=#nd", "域名创建时间</td><td class=\"deltd1\">", "</td>", "o match", null, null, "utf-8"]},
			"到期日期":{"show":1, cfg:["http://tool.chinaz.com/DomainDel/?wd=#nd", "域名到期时间</td><td class=\"deltd1\">", "</td>", "o match", null, null, "utf-8"]},
			//"注册时间":{"show":1, cfg:["http://www.cnwzml.com/#nd", "注册日期:</em>", " &nbsp;<em>", "o match", null, null, "utf-8"]},
			//"到期时间":{"show":1, cfg:["http://www.cnwzml.com/#nd", "到期时间:</em>", "<br>", "o match", null, null, "utf-8"]},
      "域名年龄":{"show":0, cfg:["http://tool.chinaz.com/DomainDel/?wd=#nd", "域名年龄</td><td class=\"deltd1\">", "(近似值)</td>", "o match", null, null, "utf-8"]},
			"删除日期":{"show":0, cfg:["http://tool.chinaz.com/DomainDel/?wd=#nd", "域名删除时间</td><td class=\"deltd1\">", "</td>", "o match", null, null, "utf-8"]},
			"删除剩余天数":{"show":0, cfg:["http://tool.chinaz.com/DomainDel/?wd=#nd", "还剩：", "天", "o match", null, null, "utf-8"]},
			"注册人反查":{"show":1, cfg:["http://whois.aizhan.com/reverse-whois/?q=#nd&t=domain", "</u></a> 拥有 <b>", "</b> 个站点", "o match", null, null, "utf-8"]},
			"邮箱反查":{"show":0, cfg:["http://whois.aizhan.com/reverse-whois/?q=#nd&t=domain", "align=\"absmiddle\" /></a> 与 <b>", "</b> 个站点有关联", "o match", null, null, "utf-8"]}
			},
	  "服务器":{
			"show":1,
			"所在地":{"show":1, cfg:["http://dns.aizhan.com/?q=#d", "所在地区为：<font color=\"#FF0000\">", "</font>", this.domain+"该网址错误"]},
			"IP地址":{"show":1, cfg:["http://dns.aizhan.com/?q=#d", "IP地址是 <font color=\"#008000\">", "</font>", this.domain+"该网址错误"]},
			"同服务器域名数量":{"show":1, cfg:["http://dns.aizhan.com/?q=#d", "共有 <font color=\"#FF0000\">", "</font>", this.domain+"该网址错误"]},
			"响应速度":{"show":1, cfg:["http://speed.linkhelper.cn/?weburl=#d", "响应速度：<font color=red>", "</font>", this.domain+"该网址错误"]},
		  "360网站检测":{"show":1, cfg:["http://webscan.360.cn/index/checkwebsite/url/#d", "<p class=\"fc_", "</p>", "o match",function(ret){return ret.replace("security\">","").replace("serious\">", "").replace("warning\">", "").replace("dangerous\">", "").replace("weizhi\">", "");}, "utf-8"]}
			},
//		"备案":{
//			"show":1,
//		  "备案号":{"show":1, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "网站备案/许可证号</td><td class=\"tdright\">", "</td>", "o match", null, null, "utf-8"]},
//		  "主办单位":{"show":1, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "主办单位名称</td><td class=\"tdright\">", "</td>", "o match", null, null, "utf-8"]},
//		  "主办单位性质":{"show":1, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "主办单位性质</td><td class=\"tdright\">", "</td>", "o match", null, null, "utf-8"]},
//		  "审核时间":{"show":1, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "审核时间</td><td class=\"tdright\">", "</td>", "o match", null, null, "utf-8"]}
//			},
		"备案":{
			"show":1,
		  "网站名称":{"show":0, cfg:["http://tool.qycn.com/icp/#d", "网站名称</th>", "</tr>", "o match", null, null, "utf-8"]},
		  "备案号":{"show":1, cfg:["http://tool.qycn.com/icp/#d", "网站备案/许可证号</th>", " </tr>", "o match", null, null, "utf-8"]},
		  "主办单位":{"show":1, cfg:["http://tool.qycn.com/icp/#d", "主办单位名称</th>", "</tr>", "o match", null, null, "utf-8"]},
		  "主办单位性质":{"show":1, cfg:["http://tool.qycn.com/icp/#d", "主办单位性质</th>", "</tr>", "o match", null, null, "utf-8"]},
		  "审核时间":{"show":1, cfg:["http://tool.qycn.com/icp/#d", "审核时间</th>", "</tr>", "o match", null, null, "utf-8"]},
		  "网站域名":{"show":0, cfg:["http://tool.qycn.com/icp/#d", "<td style=\"word-break:break-all;\">", "</td>", "o match",function(ret){return ret.replace("<br />","");}, "utf-8"]}
//		  "备案号":{"show":1, cfg:["http://icp.aizhan.com/#d/", "网站备案/许可证号</td>", "</tr>", "o match", null, null, "utf-8"]},
//		  "网站名称":{"show":1, cfg:["http://icp.aizhan.com/#d/", "网站名称</td>", "</tr>", "o match", null, null, "utf-8"]},
//		  "主办单位":{"show":1, cfg:["http://icp.aizhan.com/#d/", "主办单位名称</td>", "</tr>", "o match", null, null, "utf-8"]},
//		  "主办单位性质":{"show":1, cfg:["http://icp.aizhan.com/#d/", "主办单位性质</td>", "</tr>", "o match", null, null, "utf-8"]},
//		  "审核时间":{"show":1, cfg:["http://icp.aizhan.com/#d/", "审核时间</td>", "</tr>", "o match", null, null, "utf-8"]}
			},
		"工具":{
			"show":1,
		  //"links友链":{"show":1, cfg:["http://www.linkhelper.cn/?weburl=#d&robotstype=%B0%D9%B6%C8%D6%A9%D6%EB&checktype=%BE%AB%D7%BC&bnofollow=1&checkbaiducount=1&checkpr=1&checkbacklink=1&checkbaiducachetime=1&links=", "的友情", "结果", "o match", null, null, "gb2312"]},
		  "ping":{"show":1, cfg:["http://ping.7c.com/ping/#d", "<title>", "|", "o match", null, null, "utf-8"]},
		  "7c友链":{"show":1, cfg:["http://link.7c.com/link/#d", "<title>", "查询|", "o match", null, null, "utf-8"]},
		  "网站状态":{"show":1, cfg:["http://http.7c.com/http/#d", "<title>", "检测", "o match", null, null, "utf-8"]},
		  //"路由追踪":{"show":0, cfg:["http://tracert.gongju.com/#d", "<h1>", "跟踪</h1>", "o match", null, null, "utf-8"]},
		  //"域名解析":{"show":0, cfg:["http://dns.gongju.com/#d", "<h1>", "检测</h1>", "o match", null, null, "utf-8"]},
		  //"页面检测":{"show":1, cfg:["http://page.gongju.com/#d", "<h1>", "</h1>", "o match", null, null, "utf-8"]},
		  //"网站测速":{"show":1, cfg:["http://ce.gongju.com/#d", "<h1>网站", "</h1>", "o match", null, null, "utf-8"]},
		  //"查看首页源码":{"show":0, cfg:["http://html.gongju.com/#d", "<h1>网页", "查看</h1>", "o match", null, null, "utf-8"]},
		  "模拟百度":{"show":1, cfg:["http://i.linkhelper.cn/viewcode.asp?weburl=#d&hostip=&robotstype=%B0%D9%B6%C8%D6%A9%D6%EB", "请用本地搜索引擎模拟工具", "访问下", "o match", null, null, "gb2312"]}
			}
	},

	isShow : function(key, subKey){
		if( se_show_config==null ){
			
			var se_show_configStr='';
			if( localStorage["SeShowConfig"] == undefined ){
				
				var arr=[];
				for(var pkey in this.se_config){
					var arr1=[];
					for(var skey in this.se_config[pkey]){
						if(skey!="show")
							arr1.push("\""+skey+"\":"+this.se_config[pkey][skey]["show"]);
						else
							arr1.push("\"show\":"+this.se_config[pkey][skey]);
					}
					arr.push("\""+pkey+"\":{"+arr1.join(',')+"}");
				}
				//se_show_configStr="se_show_config={"+arr.join(',')+"};";
				se_show_configStr="{"+arr.join(',')+"}";
			}else{
				
				se_show_configStr=localStorage["SeShowConfig"];
				var re = /se_show_config=/i;
				se_show_configStr = se_show_configStr.replace(re,'');
				re = /;/;
				se_show_configStr = se_show_configStr.replace(re,'');
				
			}
			se_show_config = JSON.parse(se_show_configStr);
				
			//eval(se_show_configStr);
		}
		if(subKey=='' || subKey==null){
			if( se_show_config[key] != null )
				return se_show_config[key]["show"]==1;
			else
				return this.se_config[key]["show"];
		}else{
			if( se_show_config[key] != null && se_show_config[key][subKey] != null ){
				return se_show_config[key][subKey]==1;
			}else{
				return this.se_config[key][subKey]["show"]==1;
			}
		}
	},

	show : function(mode, d){
		this.domain=d||document.domain;
		
		if(this.domain.indexOf('.')==-1){
			$("body").append('<table><tr><td nowrap>无法获取域名</td></tr></table>');
			return;
		}
		var se_html=["<div id='se_wrapper'><a href='javascript:void(0);' id='se_config_link' title='进入选项' target='_self'>?</a><table id='se_wrapper_inner'>"];
	
		for(var pkey in this.se_config){
			if(this.isShow(pkey, '')){
			
				var tmp=[''];
				var h=0;
				for(var skey in this.se_config[pkey]){
					if(skey!="show" && this.isShow(pkey, skey))
						tmp.push((h++==0?"":"/")+"<em id='se_"+pkey+"_"+skey+"' title='"+pkey+skey+"'>..</em>");
				}
				if(h>0) se_html.push("<tr><td nowrap>"+pkey+" "+tmp.join('')+"</td></tr>");
			}
		}
		se_html.push("</table></div>");
		
		
		$("body").append(se_html.join(''));

		if(mode == 1){
			//set flash to be transparent
			$("embed").attr("wmode", "transparent");
			$("object").each(function(){
				var wmode=$("param[name='wmode']", this);
				if(wmode.length==0) $(this).append('<param name="wmode" value="transparent">');
				else wmode.attr("value", "transparent");
			});

			$("head").append("<style id='se_style'>#se_wrapper{opacity:0.5;border-radius:6px; color:#FFFF00; position:absolute; top:10px; right:10px; font-size:12px; margin:0px; background:#333; line-height:22px; overflow:hidden;font-size:12px; font-family:verdana; text-align:left !important; z-index:1111109; width:auto;} #se_wrapper_inner{margin:5px 8px 5px 8px;} #se_wrapper a{color:#fff; font-style:normal; margin:auto 3px; text-decoration:none; background:#333;} #se_wrapper *{color:#FFFF00; padding:0px; border:0px; background:#333; line-height:22px; font-weight:normal; font-style:normal;} #se_wrapper:hover{opacity:1; color:#FFFF00;} #se_config_link{position:absolute; right:1px; top:0px;} a#se_config_link{color:red; font-weight:bold;}</style>");

			$("#se_wrapper").dblclick(function(){ $(this).slideUp(); });
		}

		$("#se_wrapper_inner em").each(function(){
			var idArr=$(this).attr('id').split('_');
		
			
			
			var cfg=SE.se_config[idArr[1]][idArr[2]]['cfg'];
			
			
			SE_Tool.get_part( cfg[0].replace("#nd",SE.domain.replace("www.", "")).replace("#d", SE.domain), cfg[1], cfg[2], cfg[3], $(this), cfg[4], cfg[5]||null, cfg[6]||null );
		});

		$("#se_config_link").click(function(){
			chrome.extension.sendRequest({action: "open_options_page"});
		});
	},

	init : function(){
		
		if(localStorage['run_auto']=="1"){
			
			this.show(1);
		}
		
		$(document).keyup(function(e){
			if(SE_Tool.get_keyName(e)==localStorage['run_key']){
				if($("#se_wrapper").length>0)
					$("#se_wrapper").toggle();
				else{
					
					SE.show(1);
				}
			}
		});
	}
};

var SE_Tool={
	get_part : function(url, start, end, notExistStr, obj, dealFun, cb, charset){
		var opt = {
			action:"httprequest",

			method: 'GET',
			overrideMimeType : charset?'text/plain;charset='+charset:null,
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
			}
		};
		
		
		chrome.extension.sendRequest(opt, function(responseDetails) {
			
			//var html = responseDetails.responseText;
			var html = responseDetails;
			if( url.indexOf("http://www.sogou.com/web?query=link%3A")>-1 && html.indexOf('<form name="authform" method="POST" action="thank.php">')>-1 ){
				obj.html("<a href=\""+url+"\" target=\"_blank\">点击输入验证码</a>");
			}else{
				var part = "";
				if( start == null || start == "" ){
					var match = html.match(new RegExp(end, 'i'));
					if( match && match.length>0 ){
						var tmp=[];
						for(var i=1; i<match.length; i++){
							if( match[i] != null && match[i].length>0 ) tmp.push(match[i]);
						}
						part = tmp.join('|');
					}
				}else
					part = SE_Tool.get_middleStr( html, start, end );
				part = $.trim(part).replace(/\,/ig, "").replace("约", "");
				if( dealFun ) part = dealFun(part);
				if( part == null || part.length == 0 || html.indexOf( notExistStr ) > -1 ) part = "<font color='#aaaaaa'>无</font>";
				if( obj != null )
					obj.html("<a href=\""+url+"\" target=\"_blank\">"+$.trim(part)+"</a>");	
				if( cb ) cb( part );
			}
		});
	},

	get_middleStr : function(sourceStr, startStr, endStr){
		var middleStr = sourceStr;
		if( middleStr.indexOf( startStr ) > -1 )
		{
			middleStr = middleStr.substring( middleStr.indexOf( startStr ) + startStr.length );
			if( endStr && middleStr.indexOf( endStr ) > -1 )
				middleStr = middleStr.substring( 0, middleStr.indexOf( endStr ) );
		}
		if( middleStr == sourceStr )
			return "";
		else
			return middleStr;
	},

	get_keyName : function(e){var keyName;switch(e.keyCode){case 8:keyName="退格";break;case 9:keyName="Tab";break;case 13:keyName="Enter";break;case 16:keyName="Shift";break;case 17:keyName="Ctrl";break;case 18:keyName="Alt";break;case 19:keyName="PauseBreak";break;case 20:keyName="Caps Lock";break;case 27:keyName="Esc";break;case 32:keyName="空格";break;case 33:keyName="PageUp";break;case 34:keyName="PageDown";break;case 35:keyName="End";break;case 36:keyName="Home";break;case 37:keyName="方向键左";break;case 38:keyName="方向键上";break;case 39:keyName="方向键右";break;case 40:keyName="方向键下";break;case 45:keyName="Insert";break;case 46:keyName="Delete";break;case 91:keyName="左Win";break;case 92:keyName="右Win";break;case 93:keyName="快捷菜单键";break;case 95:keyName="Sleep";break;case 96:keyName="小键盘区0";break;case 97:keyName="小键盘区1";break;case 98:keyName="小键盘区2";break;case 99:keyName="小键盘区3";break;case 100:keyName="小键盘区4";break;case 101:keyName="小键盘区5";break;case 102:keyName="小键盘区6";break;case 103:keyName="小键盘区7";break;case 104:keyName="小键盘区8";break;case 105:keyName="小键盘区9";break;case 106:keyName="*";break;case 107:keyName="+";break;case 109:keyName="-";break;case 110:keyName=".";break;case 111:keyName="/";break;case 112:keyName="F1";break;case 113:keyName="F2";break;case 114:keyName="F3";break;case 115:keyName="F4";break;case 116:keyName="F5";break;case 117:keyName="F6";break;case 118:keyName="F7";break;case 119:keyName="F8";break;case 120:keyName="F9";break;case 121:keyName="F10";break;case 122:keyName="F11";break;case 123:keyName="F12";break;case 144:keyName="NumLock";break;case 145:keyName="ScrollLock";break;case 186:keyName=";";break;case 187:keyName="=";break;case 188:keyName=",";break;case 189:keyName="-";break;case 190:keyName=".";break;case 191:keyName="/";break;case 192:keyName="`";break;case 219:keyName="[";break;case 220:keyName="\\";break;case 221:keyName="]";break;case 222:keyName="'";break;case 255:keyName="Wake";break;default:keyName=""+String.fromCharCode(e.keyCode)+"";break;};if((e.shiftKey)&&(e.keyCode!=16)) {keyName="Shift + "+keyName;};if((e.altKey)&&(e.keyCode!=18)) {keyName="Alt + "+keyName;};if((e.ctrlKey)&&(e.keyCode!=17)) {keyName="Ctrl + "+keyName;};return keyName;}
};

if(document.location.href.toLowerCase().indexOf('http')==0){
	chrome.extension.sendRequest({action: "getAllLocalStorage"}, function(_localStorage) {
		for(var key in _localStorage)
			localStorage[key]=_localStorage[key];
	
		//run se
		SE.init();
	});
}