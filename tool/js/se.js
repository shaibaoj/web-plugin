var se_show_config=null;
var SE={
	domain : "",
	//参数区域开始
	se_config : {
		"百度":{
			"show":1,
			"收录":{"show":1, cfg:["http://www.baidu.com/s?wd=site%3A#d", "找到相关结果", "个", "o match",  function(ret){return ret.replace("约", "").replace("数", "");}, "utf-8"]},
			"外链":{"show":1, cfg:["http://www.baidu.com/s?wd=domain%3A#d", "找到相关结果", "个", "抱歉，没有找到"]},
				//郑重声明：本扩展代码版权属于www.heku.org，任何修改代码的行为都属于侵权。www.heku.org将保留追究的权利。
			//"快照日期1":{"show":1, cfg:["http://www.baidu.com/s?wd=#d", "</b>&nbsp;", "&nbsp;", "抱歉，没有找到"]},
			"快照日期":{"show":1, cfg:["http://www.baidu.com/s?wd=#d", "<span class=\"g\">", "&nbsp;</span>", "o match",  function(ret){return ret.split("&nbsp;")[1];}, "utf-8"]},
			//"首页位置":{"show":1, cfg:["http://www.baidu.com/s?wd=site%3A#d", "站长帮助</a></font><br></p>", "<br clear=all>", "抱歉，没有找到", function(ret){var i=0, k=0; var ss=''; while((ss=SE_Tool.get_middleStr(ret, "<br><font color=\"#008000\">", "</font>"))!=""){ret=ret.replace("<br><font color=\"#008000\">"+ss+"</font>", "");i=i+1; if(ss.split(' ')[0].toLowerCase()==tab_url.toLowerCase()+"/"){k=1;break;}}return k==1?i:0;}]},
			"快照历史":{"show":1, cfg:["http://chaojiseo.sinaapp.com/log_kz_bd/#d?seoinchina",  "百度", "-", "o match",null, "utf-8"]},
			},
		"百度官方":{
			"show":1,
			"站长平台外链":{"show":1, cfg:["http://zhanzhang.baidu.com/inbound/chartdata?d=#d&root=0&range=month", "{", "status", "o match",  function(ret){return ret.split("labelBigTip")[1].split("\"")[6].split("\"")[0];}, "utf-8"]},
			"站长平台索引":{"show":1, cfg:["http://www.baidu.com/s?wd=site%3A#d", "该网站共有<b style=\"color:#333\">", "</b>个", "o match",  function(ret){return ret.replace("约", "").replace("数", "");}, "utf-8"]},
			"网站运势神测":{"show":1, cfg:["http://zhanzhang.baidu.com/act/report2014/search?site=#d", "star-", "\"", "抱歉，没有找到"]},
				//郑重声明：本扩展代码版权属于www.heku.org，任何修改代码的行为都属于侵权。www.heku.org将保留追究的权利。
			"百度口碑好评":{"show":1, cfg:["http://koubei.baidu.com/s/#d", "pj-star-all", ";", "o match",  function(ret){return ret.split(":")[1];}, "utf-8"]},
			"百度口碑条数":{"show":1, cfg:["http://koubei.baidu.com/s/#d", "pj-comt-count", "条评论", "o match",  function(ret){return ret.split(">")[1].split("<")[0];}, "utf-8"]},
			},
		"近期收录":{
			"show":1,
			"一天":{"show":1, cfg:["http://www.baidu.com/s?q1=&q2=&q3=&q4=&rn=10&lm=1&ct=0&ft=&q5=&tn=baiduadv&q6=#d", "找到相关结果数", "个", "找不到和您的查询"]}, 
			"七天":{"show":1, cfg:["http://www.baidu.com/s?q1=&q2=&q3=&q4=&rn=10&lm=7&ct=0&ft=&q5=&tn=baiduadv&q6=#d", "找到相关结果数", "个", "找不到和您的查询"]},
			"一月":{"show":1, cfg:["http://www.baidu.com/s?q1=&q2=&q3=&q4=&rn=10&lm=30&ct=0&ft=&q5=&tn=baiduadv&q6=#d", "找到相关结果数", "个", "找不到和您的查询"]},
			"一年":{"show":1, cfg:["http://www.baidu.com/s?q1=&q2=&q3=&q4=&rn=10&lm=360&ct=0&ft=&q5=&tn=baiduadv&q6=#d", "找到相关结果数", "个", "找不到和您的查询"]},
			//"历史收录":{"show":0, cfg:["http://his.links.cn/queryhistory.asp?weburl=#d&startdate=&enddate=", "<h2>网站", "查询", "找不到和您的查询"]},
			"收录历史":{"show":1, cfg:["http://chaojiseo.sinaapp.com/log_sl_bd/#d?seoinchina",  "百度", "-", "o match",null, "utf-8"]},
			},
		"近期外链":{
			"show":1,
			"一天":{"show":1, cfg:["http://www.baidu.com/s?tn=baiduadv&lm=1&%29&f=8&rsv_bp=1&wd=domain%3A%28#d%29&rsv_sug3=6&rsv_sug1=6&rsv_sug4=467&inputT=2211", "百度为您找到相关结果", "个", "找不到和您的查询"]}, 
			"七天":{"show":1, cfg:["http://www.baidu.com/s?tn=baiduadv&lm=7&%29&f=8&rsv_bp=1&wd=domain%3A%28#d%29&rsv_sug3=6&rsv_sug1=6&rsv_sug4=467&inputT=2211", "百度为您找到相关结果", "个", "找不到和您的查询"]},
			"一月":{"show":1, cfg:["http://www.baidu.com/s?tn=baiduadv&lm=30&%29&f=8&rsv_bp=1&wd=domain%3A%28#d%29&rsv_sug3=6&rsv_sug1=6&rsv_sug4=467&inputT=2211", "百度为您找到相关结果", "个", "找不到和您的查询"]},
			"一年":{"show":1, cfg:["http://www.baidu.com/s?tn=baiduadv&lm=360&%29&f=8&rsv_bp=1&wd=domain%3A%28#d%29&rsv_sug3=6&rsv_sug1=6&rsv_sug4=467&inputT=2211", "百度为您找到相关结果", "个", "找不到和您的查询"]},
			},
		"链接":{
			"show":0,
			//"yahoo外链":{"show":1, cfg:["http://siteexplorer.search.yahoo.com/search;_ylt=A0oGk.pycKNOx.IA_._al8kF?p=#d&fr=sfp&bwm=i", "<li><span class=\"btn\">Inlinks (", ")</span>", "We were unable to find any results for the given URL in our index"]},
			//"opensite外链":{"show":1, cfg:["http://www.opensiteexplorer.org/links.html?site=#d", "This data is in beta.</div>", "<td class", "o match", null, null, "utf-8"]},
			//"爱站外链总数":{"show":1, cfg:["http://link.aizhan.com/?url=#d&vt=s", "<strong class=\"red\">", "</strong>", "o match", null, null, "utf-8"]},
			//"爱站首页外链":{"show":1, cfg:["http://link.aizhan.com/?url=#d&vt=s", "共有首页外链 <strong class=\"red\">", "</strong>", "o match", null, null, "utf-8"]},
			//"首页外链":{"show":1, cfg:["http://inlink.links.cn/?url=#d", "共有首页外链：<font color=red>", "</font>", "o match", null, null, "gb2312"]},
			//"导出链接":{"show":1, cfg:["http://i.links.cn/getOutLinkCount.asp?i=0&from=check&backlinkurl=http://#d", "导出链接数量：", "</div>", "o match", null, null, "gb2312"]},
			"links外链":{"show":0, cfg:["http://inlink.links.cn/domain/#d/", "页 共", "条记录", "o match", null, null, "gb2312"]},
			//"爱站外链":{"show":1, cfg:["http://link.aizhan.com/index.php?r=getajax/&url=#nd&vt=a&ob=br&p=1&linktext=&linktexttype=", "<strong class=\"red\">", "</strong>", "o match", null, null, "utf-8"]},
			//"Chinaz外链":{"show":0, cfg:["http://outlink.chinaz.com/?h=#d&t=&sf=oc&s=0&p=1", "总记录数：<font color=\"red\">", "</font>", "o match", null, null, "gb2312"]},
			//"7c外链":{"show":0, cfg:["http://f.7c.com/outlink/#d", "ymax:", "}", "o match", null, null, "utf-8"]},
			"ahrefs外链":{"show":0, cfg:["https://ahrefs.com/site-explorer/overview/subdomains/?target=#d", "<th>Total Backlinks</th>", "</a>", "o match", function(ret){return ret.split(">")[3];}, "utf-8"]},
			//"首页导出链接":{"show":0, cfg:["http://tool.zbole.com/BaiduCheck/ExportLink.aspx?url=#d", "导出外链:", ",", "o match", null, null, "gb2312"]},
			//"cnzzPR输出值":{"show":0, cfg:["http://tool.cnzz.cn/Rank/#d.html", "PR 输出值", "</tr>", "o match", function(ret){return ret.split(">")[2].split("<")[0];}, "gb2312"]},
			"导出链接数":{"show":0, cfg:["http://tool.chinaz.com/ExportPR/?q=#d", "PR输出值</li></ul><ul>", "</ul>", "o match", function(ret){return ret.split("<li>")[2].split("</li>")[0];}, "utf-8"]},
			"chinazPR输出值":{"show":0, cfg:["http://tool.chinaz.com/ExportPR/?q=#d", "PR输出值</li></ul><ul>", "</ul>", "o match", function(ret){return ret.split("<li>")[3].split("</li>")[0];}, "utf-8"]}
			},
		"爱站":{
			"show":1,
		  //"网站名称":{"show":0, cfg:["http://beian.links.cn/domain_#nd.html", "zbdwmc_", ".html", "o match",function(ret){return ret.replace("href","rel");}, "gb2312"]},
			"词数":{"show":1, cfg:["http://www.aizhan.com/baidu/#d/", "爱站词数</td>", "</span>",  "o match", function(ret){return ret.split(">")[3];}, "utf-8"]}, 
			"百度带来流量":{"show":1, cfg:["http://www.aizhan.com/baidu/#d/", "预计来路:", "IP", "找不到和您的查询", function(ret){return ret.replace("条记录","").replace("<td align=\"left\" colspan=\"5\">", "").replace("<span class=\"red\">", "").replace("</span>", "").replace("href", "name").replace("\n", "");}, "utf-8"]}, 
			"百度权重值":{"show":1, cfg:["http://www.aizhan.com/baidu/#d/", "http://static.aizhan.com/images/brs/", ".gif", "o match", null, null, "gbk"]},
			"网站历史":{"show":1, cfg:["http://lishi.aizhan.com/?url=#d&t=1", "<title>", "-", "o match", null, null, "utf-8"]}
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
			"百度带来流量":{"show":1, cfg:["http://www.7c.com/baidu/#d/", "预计百度大概给该网站的流量为", "</td>", "o match", function(ret){return ret.replace("<strong id=\"flowfont\">","").replace("</strong>", "").replace("<strong>", "");}, "gbk"]},
			"百度权重值":{"show":1, cfg:["http://www.7c.com/baidu/#d/", "<div id=\"weightfont\">", "</div>", "o match", null, null, "gbk"]}
			//"alexa排名":{"show":1, cfg:["http://tool.zbole.com/alexa.aspx?url=#d", "alexapm\":\"", "\",", "o match", null, null, "gb2312"]}
			},
		"站长":{
			"show":1,
			"记录数":{"show":1, cfg:["http://mytool.chinaz.com/baidusort.aspx?host=#d&sortType=0", "关键词数：<font color=\"blue\">", "</font>", "o match", null, null, "utf-8"]},
			"百度带来流量":{"show":1, cfg:["http://mytool.chinaz.com/baidusort.aspx?host=#d&sortType=0", "预估百度流量：<font color=\"blue\">", "</font>", "o match", null, null, "utf-8"]},
			"百度权重值":{"show":1, cfg:["http://mytool.chinaz.com/baidusort.aspx?host=#d&sortType=0", "百度权重：<font color=\"blue\">", "</font>", "o match", null, null, "utf-8"]}
			},
		"帮手":{
			"show":0,
			"记录数":{"show":1, cfg:["http://br.links.cn/baidu/#d/", "统计词数</td><td class=tdbody><font color=red>", "</font>", "o match", null, null, "gb2312"]},
			"百度带来流量":{"show":1, cfg:["http://br.links.cn/baidu/#d/", "预计百度来路约:<font color=red>", "IP", "o match",function(ret){return ret.replace("<font color=red>","").replace("</font>", "").replace("&nbsp;", "");}, "gb2312"]},
			"百度权重值":{"show":1, cfg:["http://br.links.cn/baidu/#d/", "http://statics.links.cn/images/br/", ".gif", "o match", null, null, "gb2312"]}
			},
		"360搜索":{
			"show":1,
			"360词数":{"show":0, cfg:["http://360.links.cn/rank/#d/", "统计词数</td><td class=tdbody><font color=red>", "</font>", "o match",null,null, "utf-8"]},
			"360流量":{"show":0, cfg:["http://360.links.cn/rank/#d/", "预计360搜索来路约:", "&nbsp;IP", "o match",function(ret){return ret.replace("<font color=red>","").replace("</font>", "").replace("&nbsp;", "").replace("<font color=red>","");}, "utf-8"]},
			"360权重":{"show":0, cfg:["http://360.links.cn/rank/#d/", "http://statics.links.cn/images/360/1/", ".", "o match",null,null, "utf-8"]},
				//郑重声明：本扩展代码版权属于www.heku.org，任何修改代码的行为都属于侵权。www.heku.org将保留追究的权利。
			"收录":{"show":1, cfg:["http://so.360.cn/s?ie=utf-8&src=hao_phome&q=site%3A#d", "找到相关结果约", "个", "<font color=#DA3145>", null, null, "utf-8"]},
			"快照":{"show":0, cfg:["http://so.360.cn/s?ie=utf-8&src=hao_phome&q=site%3A#d", "<cite>", "/cite>", "找不到和您的查询",function(ret){return ret.split(";")[1].split("<")[0];}, "utf-8"]},
			"收录历史":{"show":1, cfg:["http://chaojiseo.sinaapp.com/log_sl_360/#d?seoinchina",  "{360搜索}", "-", "o match",null, "utf-8"]},
			"快照历史":{"show":1, cfg:["http://chaojiseo.sinaapp.com/log_kz_360/#d?seoinchina",  "{360搜索}", "-", "o match",null, "utf-8"]},
			},
		"谷歌":{
			"show":0,
			"收录":{"show":1, cfg:["https://www.google.com.hk/search?hl=zh-CN&q=site%3A#d", "id=\"resultStats\">", " 条结果", "找不到和您的查询", function(ret){return ret.replace("约 ","").replace("找到", "").replace("获得", "");}]}, 
			"外链":{"show":0, cfg:["https://www.google.com.hk/search?hl=zh-CN&q=link%3A#d", "id=\"resultStats\">", " 条结果",  "找不到和您的查询", function(ret){return ret.replace("约 ","").replace("找到", "").replace("获得", "");}]},
			"ＰＲ":{"show":1, cfg:["http://pr.links.cn/getpr.asp?queryurl=#d", "Goolge PageRank(", "/", null, null, "gb2312"]},
			"ＰＲ历史":{"show":1, cfg:["http://chaojiseo.sinaapp.com/log_pr_gg/#d?seoinchina",  "站点报告</a></span> >", "<", "o match",null, "utf-8"]},

			},
		"搜狗":{
			"show":1,
			"收录":{"show":1, cfg:["http://www.sogou.com/web?query=site%3A#d", "<em>", "</em>", "<font color=#DA3145>", null, null, "gb2312"]},
			"外链":{"show":0, cfg:["http://www.sogou.com/web?query=links%3A#d","<resnum id=\"scd_num\">", "</resnum>", "<font color=#DA3145>", null, null, "gb2312"]},
			"评级":{"show":1, cfg:["http://rank.ie.sogou.com/sogourank.php?ur=http%3A%2F%2F#d%2F", "sogourank=", "", "all"]}
			},
		"ChinaSo":{
			"show":0,
			"收录":{"show":1, cfg:["http://www.chinaso.com/search/pagesearch.htm?q=site%3A#d","<span class=\"pageTotal\">共", "条相关结果",  "<font color=#DA3145>", null, null, "gb2312"]},
			"外链":{"show":1, cfg:["http://www.chinaso.com/search/pagesearch.htm?q=domain%3A#d", "<span class=\"pageTotal\">共", "条相关结果", "<font color=#DA3145>", null, null, "gb2312"]},
			},
		"alexa":{
			"show":0,
			"全球排名":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "Global rank icon", "</strong>","o match",function(ret){return ret.split(">")[2].split("<")[0];},"utf-8"]},
			"昨天排名":{"show":0, cfg:["http://www.alexa.com/siteinfo/#d", "China Flag'><strong class=\"metrics-data align-vmiddle\">", "</strong>", this.domain+"该网址错误"]},
			"中国排名":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "China Flag", "</strong>","o match",function(ret){return ret.split(">")[2].split("<")[0];},"utf-8"]},
			"外链":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "Total Sites Linking In", "</span>","o match",function(ret){return ret.split(">")[2].split("<")[0];},"utf-8"]},
			"跳出率":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "Bounce Rate", "</strong>","o match",function(ret){return ret.split(">")[3].split("<")[0];},"utf-8"]},
			"平均访问页数":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "Daily Pageviews per Visitor", "</strong>","o match",function(ret){return ret.split(">")[3].split("<")[0];},"utf-8"]},
			"平均访问时长":{"show":1, cfg:["http://www.alexa.com/siteinfo/#d", "Daily Time on Site", "</strong>","o match",function(ret){return ret.split(">")[3].split("<")[0];},"utf-8"]},
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
			//郑重声明：本扩展代码版权属于www.heku.org，任何修改代码的行为都属于侵权。www.heku.org将保留追究的权利。
			//"到期时间":{"show":1, cfg:["http://whois.zbole.com/whois/?url=#nd", "到期时间：", "删除时间", "o match", null, null, "gb2312"]},
			//"删除时间":{"show":0, cfg:["http://whois.zbole.com/whois/?url=#nd", "删除时间：", "</p>", "o match", null, null, "gb2312"]},
			//"注册日期":{"show":1, cfg:["http://tool.chinaz.com/DomainDel/?wd=#nd", "域名创建时间</td><td class=\"deltd1\">", "</td>", "o match", null, null, "utf-8"]},
			"注册日期":{"show":1, cfg:["http://whois.aizhan.com/index.php?r=site/searchDomain&_=1382332193247&ajax=yes&update=false&field=base&s=#d", "创建时间.....................:", "<", "o match",null, "utf-8"]},
			//"注册日期":{"show":1, cfg:["http://whois.22.cn/mindex.aspx?domain=#d", "注册时间", "</td>", "o match",function(ret){return ret.split(">")[2].split("<")[0];}, "utf-8"]},
			//"注册日":{"show":1, cfg:["http://domain.oray.com/whois/#nd", "注册日", "</html>", "o match",function(ret){return ret.split(">")[2].split("<")[0];}, "utf-8"]},
			"建站时间":{"show":0, cfg:["http://web.archive.org/web/*/http://#d/", "<a href=\"/web/", "/", "o match", function(ret){return ret.replace("/web/","http://web.archive.org/web/").substring(0,8);}, "utf-8"]},
			//"到期日期":{"show":1, cfg:["http://tool.chinaz.com/DomainDel/?wd=#nd", "域名到期时间</td><td class=\"deltd1\">", "</td>", "o match", null, null, "utf-8"]},
			"到期日期":{"show":1, cfg:["http://whois.aizhan.com/index.php?r=site/searchDomain&_=1382332193247&ajax=yes&update=false&field=base&s=#d", "过期时间.....................:", "<", "o match",null, "utf-8"]},
			//"到期日":{"show":1, cfg:["http://domain.oray.com/whois/#nd", "到期日", "</html>", "o match",function(ret){return ret.split(">")[2].split("<")[0];}, "utf-8"]},
			//"注册时间":{"show":1, cfg:["http://www.cnwzml.com/#nd", "注册日期:</em>", " &nbsp;<em>", "o match", null, null, "utf-8"]},
			//"到期时间":{"show":1, cfg:["http://www.cnwzml.com/#nd", "到期时间:</em>", "<br>", "o match", null, null, "utf-8"]},
            //"域名年龄":{"show":1, cfg:["http://www.cnwzml.com/#d", "域名年龄:", "<", "o match", null, null, "utf-8"]},
			//"域名年龄":{"show":1, cfg:["http://tool.admin5.com/whois/?q=#d", "域名注册信息</caption>", "</tr>", "o match",function(ret){return ret.split(">")[5].split("<")[0];}, "utf-8"]},
			"删除日期":{"show":0, cfg:["http://tool.chinaz.com/DomainDel/?wd=#nd", "域名删除时间</td><td class=\"deltd1\"><b>", "</b>", "o match", null, null, "utf-8"]},
			"删除剩余天数":{"show":0, cfg:["http://tool.chinaz.com/DomainDel/?wd=#nd", "还剩：", "天", "o match", null, null, "utf-8"]},
			"注册人反查":{"show":1, cfg:["http://whois.aizhan.com/reverse-whois/?q=#nd&t=domain", "</u></a> 拥有 <b>", "</b> 个站点", "o match", null, null, "utf-8"]},
			"邮箱反查":{"show":0, cfg:["http://whois.aizhan.com/reverse-whois/?q=#nd&t=domain", "align=\"absmiddle\" /></a>与 <b>", "</b> 个站点有关联", "o match", null, null, "utf-8"]}
			},
	  "服务器":{
			"show":1,
			"所在地":{"show":1, cfg:["http://dns.aizhan.com/?q=#d", "所在地区为：<font color=\"#FF0000\">", "</font>", this.domain+"该网址错误"]},
			"IP地址":{"show":1, cfg:["http://dns.aizhan.com/?q=#d", "IP地址是  <font color=\"#008000\">", "</font>", this.domain+"该网址错误"]},
			"同服务器域名数量":{"show":1, cfg:["http://dns.aizhan.com/?q=#d", "共有  <font color=\"#FF0000\">", "</font>", this.domain+"该网址错误"]},
			//"响应速度":{"show":0, cfg:["http://www.tool.la/SiteSpeed/?q=#d", "反应时间为: ", "</div>", this.domain+"该网址错误"]},
		    "360网站检测":{"show":1, cfg:["http://webscan.360.cn/index/checkwebsite/url/#d", "<p class=\"fc_", "</p>", "o match",function(ret){return ret.replace("security\">","").replace("serious\">", "").replace("warning\">", "").replace("dangerous\">", "").replace("weizhi\">", "");}, "utf-8"]},
     		"IP历史":{"show":1, cfg:["http://chaojiseo.sinaapp.com/log_status/#d?seoinchina",  "站点报告</a></span> >", "/", "o match",null, "utf-8"]},

			},
		"备案1":{
			"show":0,
//		  "网站名称":{"show":1, cfg:["http://tool.qycn.com/icp/#d", "网站名称</th>", "</tr>", "o match", null, null, "utf-8"]},
//		  "备案号":{"show":1, cfg:["http://tool.qycn.com/icp/#d", "网站备案/许可证号</th>", " </tr>", "o match", null, null, "utf-8"]},
//		  "主办单位":{"show":1, cfg:["http://tool.qycn.com/icp/#d", "主办单位名称</th>", "</tr>", "o match", null, null, "utf-8"]},
//		  "主办单位性质":{"show":1, cfg:["http://tool.qycn.com/icp/#d", "主办单位性质</th>", "</tr>", "o match", null, null, "utf-8"]},
//		  "审核时间":{"show":1, cfg:["http://tool.qycn.com/icp/#d", "审核时间</th>", "</tr>", "o match", null, null, "utf-8"]},
//		  "网站域名":{"show":0, cfg:["http://tool.qycn.com/icp/#d", "<td style=\"word-break:break-all;\">", "</td>", "o match",function(ret){return ret.replace("<br />","");}, "utf-8"]}
//		  "备案号":{"show":1, cfg:["http://icp.aizhan.com/#d/", "网站备案/许可证号</td>", "</tr>", "o match", null, null, "utf-8"]},
//郑重声明：本扩展代码版权属于www.heku.org，任何修改代码的行为都属于侵权。www.heku.org将保留追究的权利。
		  "网站名称":{"show":1, cfg:["http://icp.aizhan.com/#d/", "网站名称</td>", "</tr>", "o match", null, null, "utf-8"]},
		  "主办单位":{"show":1, cfg:["http://icp.aizhan.com/#d/", "主办单位名称</td>", "</tr>", "o match", null, null, "utf-8"]},
		  "主办单位性质":{"show":1, cfg:["http://icp.aizhan.com/#d/", "主办单位性质</td>", "</tr>", "o match", null, null, "utf-8"]},
		  "审核时间":{"show":1, cfg:["http://icp.aizhan.com/#d/", "审核时间</td>", "</tr>", "o match", null, null, "utf-8"]}
			},
		"备案2":{
			"show":0,
		  "网站名称":{"show":0, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "网站名称</td><td class=\"tdright\">", "</td></tr>", "o match", null, null, "utf-8"]},
		  "备案号":{"show":1, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "网站备案/许可证号</td><td class=\"tdright\">", "</td></tr>", "o match", null, null, "utf-8"]},
		  "主办单位":{"show":1, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "主办单位名称</td><td class=\"tdright\">", "</td></tr>", "o match", null, null, "utf-8"]},
		  "主办单位性质":{"show":1, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "主办单位性质</td><td class=\"tdright\">", "</td></tr>", "o match", null, null, "utf-8"]},
		  "审核时间":{"show":1, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "审核时间</td><td class=\"tdright\">", "</td></tr>", "o match", null, null, "utf-8"]},
		  "网站域名":{"show":0, cfg:["http://tool.chinaz.com/beian.aspx?s=#d", "网站首页网址</td><td class=\"tdright\">", "</td></tr>", "o match",function(ret){return ret.replace("<br />","");}, "utf-8"]}
			},
		"备案3":{
			"show":1,
		  "网站名称":{"show":0, cfg:["http://beian.links.cn/beian.asp?beiantype=domain&keywords=#d", "详细</a></td>", "</table>", "o match",function(ret){return ret.split(">")[12].split("<")[0];}, "gb2312"]},
		  //"网站名称":{"show":0, cfg:["http://beian.links.cn/domain_#nd.html", "zbdwmc_", ".html", "o match",function(ret){return ret.replace("href","rel");}, "gb2312"]},
		  //上面一句是替换代码的示例；
		  "备案号":{"show":1, cfg:["http://beian.links.cn/beian.asp?beiantype=domain&keywords=#d", "详细</a></td>", "</table>", "o match",function(ret){return ret.split(">")[8].split("<")[0];}, "gb2312"]},
		  "主办单位":{"show":1, cfg:["http://beian.links.cn/beian.asp?beiantype=domain&keywords=#d", "详细</a></td>", "</table>", "o match",function(ret){return ret.split(">")[2].split("<")[0];}, "gb2312"]},
		  "主办单位性质":{"show":1, cfg:["http://beian.links.cn/beian.asp?beiantype=domain&keywords=#d", "详细</a></td>", "</table>", "o match",function(ret){return ret.split(">")[5].split("<")[0];}, "gb2312"]},
		  "审核时间":{"show":1, cfg:["http://beian.links.cn/beian.asp?beiantype=domain&keywords=#d", "详细</a></td>", "</table>", "o match",function(ret){return ret.split(">")[2].split("<")[0];}, "gb2312"]},
		  "网站域名":{"show":0, cfg:["http://beian.links.cn/beian.asp?beiantype=domain&keywords=#d", "详细</a></td>", "</table>", "o match",function(ret){return ret.split(">")[15].split("<")[0];}, "gb2312"]}
			},
		"备案4":{
			"show":0,
		  "网站名称":{"show":0, cfg:["http://www.anquan.org/seccenter/search/#d", "ICP备案信息", "时间线", "o match",function(ret){return ret.split(">")[11].split("<")[0];}, "utf-8"]},
		  //"网站名称":{"show":0, cfg:["http://beian.links.cn/domain_#nd.html", "zbdwmc_", ".html", "o match",function(ret){return ret.replace("href","rel");}, "gb2312"]},
		  //上面一句是替换代码的示例；
		  "备案号":{"show":1, cfg:["http://www.anquan.org/seccenter/search/#d", "ICP备案信息", "时间线", "o match",function(ret){return ret.split(">")[23].split("<")[0];}, "utf-8"]},
		  "主办单位":{"show":1, cfg:["http://www.anquan.org/seccenter/search/#d", "主办方", "</li>", "o match",function(ret){return ret.split(">")[2].split("<")[0];}, "utf-8"]},
		  "主办单位性质":{"show":1, cfg:["http://www.anquan.org/seccenter/search/#d", "ICP备案信息", "时间线", "o match",function(ret){return ret.split(">")[17].split("<")[0];}, "utf-8"]},
		  "审核时间":{"show":1, cfg:["http://www.anquan.org/seccenter/search/#d", "ICP备案信息", "时间线", "o match",function(ret){return ret.split(">")[29].split("<")[0];}, "utf-8"]},
		  //"网站域名":{"show":0, cfg:["http://www.anquan.org/seccenter/search/#d", "ICP备案信息", "时间线", "o match",function(ret){return ret.split(">")[12].split("<")[0];}, "utf-8"]},
		  "验证码":{"show":1, cfg:["http://www.anquan.org/seccenter/search/#d", "请输入下方", "以继续操作", "o match",null, "utf-8"]},
			},
		"工具":{
			"show":0,
		  //"links友链":{"show":1, cfg:["http://www.links.cn/?weburl=#d&robotstype=%B0%D9%B6%C8%D6%A9%D6%EB&checktype=%BE%AB%D7%BC&bnofollow=1&checkbaiducount=1&checkpr=1&checkbacklink=1&checkbaiducachetime=1&links=", "的友情", "结果", "o match", null, null, "gb2312"]},
		  "ping":{"show":1, cfg:["http://ping.7c.com/ping/#d", "<title>", "|", "o match", null, null, "utf-8"]},
		  //"7c友链":{"show":1, cfg:["http://link.7c.com/link/#d", "<title>", "查询|", "o match", null, null, "utf-8"]},
		  "网站状态":{"show":1, cfg:["http://http.7c.com/http/#d", "<title>", "检测", "o match", null, null, "utf-8"]},
		  //"路由追踪":{"show":0, cfg:["http://tracert.gongju.com/#d", "<h1>", "跟踪</h1>", "o match", null, null, "utf-8"]},
		  //"域名解析":{"show":0, cfg:["http://dns.gongju.com/#d", "<h1>", "检测</h1>", "o match", null, null, "utf-8"]},
		  //"页面检测":{"show":1, cfg:["http://page.gongju.com/#d", "<h1>", "</h1>", "o match", null, null, "utf-8"]},
		  //"网站测速":{"show":1, cfg:["http://ce.gongju.com/#d", "<h1>网站", "</h1>", "o match", null, null, "utf-8"]},
		  //"查看首页源码":{"show":0, cfg:["http://html.gongju.com/#d", "<h1>网页", "查看</h1>", "o match", null, null, "utf-8"]},
		  "模拟百度":{"show":1, cfg:["http://i.links.cn/viewcode.asp?weburl=#d&hostip=&robotstype=%B0%D9%B6%C8%D6%A9%D6%EB", "请用本地搜索引擎模拟工具", "访问下", "o match", null, null, "gb2312"]},
		  "DNS生效检测":{"show":1, cfg:["http://www.dnspoo.com/a/#d", "-域名解析", "诊断", "o match", null, null, "utf-8"]}
		  //"穿越时空":{"show":1, cfg:["http://web.archive.org/web/*/http://#d/", "<title>Internet ", " Wayback", "o match", null, null, "utf-8"]}
			},
		"发现":{
			"show":1,
			"百度站长平台":{"show":0, cfg:["http://zhanzhang.baidu.com/?source=seoinchina", "title: \"", "\"", "o match", null, null, "utf-8"]},
			//郑重声明：本扩展代码版权属于www.heku.org，任何修改代码的行为都属于侵权。www.heku.org将保留追究的权利。
            "分享价值":{"show":1, cfg:["http://feeds.qzone.qq.com/cgi-bin/cgi_rss_out?uin=552799258", "item", "</title>", "o match",function(ret){return ret.split("[")[2].split("]")[0];}, "utf-8"]}
			}
	},
//参数区域结束
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
		//ping百度
		se_html.push("<tr><td nowrap>ping百度 <em><a id='ping_url' href='#'>提交当前网址</a></em> <em><a id='ping_allurl' title='将自动过滤nofollow链接' href='#'>提交本页所有网址</a></em> <em id='ping_speed' title='已提交/链接总数' style='color:#fff;'>0/0</em> <em id='ping_done' style='color:red;'>恭喜，已全部完成！</em></td></tr>");
		//ping百度结束


se_html.push("<tr><td nowrap>广告：<em>>>>>><a href='http://user.qzone.qq.com/552799258/2' target='_blank'>作者QQ空间</a><<<<<   </em> <em> >>>>><a href='http://www.heku.org/seo/182.html#68506-tqq-1-18667-2cf975e894071e2ab3dc24043f6555f6' target='_blank'>扩展赞助</a><<<<<</em></td></tr> ");		
		$("body").append(se_html.join(''));

		//ping百度
		$(function(){
			var ping_url =  $("#ping_url"),
			     ping_allurl = $("#ping_allurl"),
			     ping_speed = $("#ping_speed"),
			     ping_done = $("#ping_done"),
			     ping  = "http://ping.baidu.com/ping/RPC2"
			     time = localStorage['ping_time'] || 10;
			     ping_done.hide();
			     ping_speed.hide();
		function pin(url,value,fn){   //ping百度函数
		  var request = null;
			try{
				var request=new XMLHttpRequest();
			}
			catch(e){}
			if(request==null) try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}catch (e) {}
			if(request==null) try {
				request=new ActiveXObject("MSXML2.XMLHTTP.3.0");
				}catch (e) {}
			if(request==null) try {
			request=new ActiveXObject("Msxml2.XMLHTTP");
			}catch (e) {}

		            var values="<?xml version=\"1.0\"?>\n<methodCall>\n<methodName>weblogUpdates.ping</methodName>\n<params>\n<param>\n<value><string>"+value+"</string></value>\n</param><param><value><string>"+value+"</string></value>\n</param>\n</params>\n</methodCall>";
			
			request.onreadystatechange = function(){

				 if (request.readyState == 4) {
				 	var state = request.response.match(/<int>.*<\/int>/)[0].match(/\d/)[0];
			            	if (request.status == 200 && state == 0) {
				                	console.log("百度已处理");
				                	fn(true);
						
			           		 }
			            		else {
				                	console.log("NO");
				                	fn(false);
			            	}
		       		 }
			}
			request.open("POST", url);
			request.setRequestHeader("Content-Type", "text/xml");
			request.send(values);
		 }

		  
		 function go(list,a){
		 	var a = a || list.length -1 , i=0,b=1;
		 	ping_speed.show();
		     	ping_done.hide();
		     	var set = setInterval(function(){
		     		pin(ping,list[i],function(f){
		     			// if (b == a){ping_done.show();}
		     		});
		     		i++;
		     		ping_speed.html(i+"/"+ a);
		     		if (i == a){ping_done.show();}
		     		console.log(list[i],"已提交");
		     		if (i == a) {clearInterval(set);};
		     	},time);
		 }
		chrome.tabs.getSelected(null, function(tab) {
		  chrome.tabs.sendRequest(tab.id, {action: "getDOM"}, function(response) {
		    //提交当前网址
		     ping_url.click(function(){
		     	go(response.dom,1);
		     })
		     //提交所有网址
		     ping_allurl.click(function(){
		     	go(response.dom);
		     })

		  });
		});
		})
		//ping百度结束

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
