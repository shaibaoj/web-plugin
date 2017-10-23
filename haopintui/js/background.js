var firstInstall = window.localStorage.firstInstall;
if(typeof firstInstall == 'undefined'){
	chrome.tabs.create({url:"http://www.haopintui.com/?from=plugin",selected:true});
	window.localStorage.firstInstall = "true";
}

if (typeof window.localStorage.keyPlugin == 'undefined') {
	window.localStorage.keyPlugin = 68;
}
if (typeof window.localStorage.keyTrend == 'undefined') {
	window.localStorage.keyTrend = 81;
}
if (typeof window.localStorage.keyTaoke == 'undefined') {
	window.localStorage.keyTaoke = 87;
}
if (typeof window.localStorage.keyQueqiao == 'undefined') {
	window.localStorage.keyQueqiao = 69;
}
if (typeof window.localStorage.keyLogin == 'undefined') {
	window.localStorage.keyLogin = 65;
}
if (typeof window.localStorage.applyReason == 'undefined') {
	window.localStorage.applyReason = '【好品推】金冠联盟会员申请计划，请通过，更多合作详情请访问好品推！';
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    if(request.type == 'gajax'){
		$.get(request.url,request.getdata,function(data) {
			sendResponse({
				msg: 'ok',
				data: data
			});
		});
    }else if(request.type == 'pajax'){
		$.post(request.url,request.postdata,function(data) {
			sendResponse({
				msg: 'ok',
				data: data
			});
		},'json');
    }else if(request.type == 'set'){
		chrome.cookies.get({url: "http://alimama.com/", name: "_tb_token_"}, function(cookie) {
			if (cookie != null) {
				window.localStorage.token = cookie.value;
			}
		});
		var resOK = {
			hidden: window.localStorage.hiddenPlugin,
			reason: window.localStorage.applyReason,
			keyPlugin: window.localStorage.keyPlugin,
			keyTrend: window.localStorage.keyTrend,
			keyTaoke: window.localStorage.keyTaoke,
			keyQueqiao: window.localStorage.keyQueqiao,
			keyLogin: window.localStorage.keyLogin,
			token: window.localStorage.token
		};
		sendResponse(resOK);
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo,tab) {
//	console.log(tabId);
});

function get_cookie(url, callback) {
    chrome.cookies.getAll({}, function(cookies) {
        var cookiestr = '';
        var suffix = get_suffix(url);
        var sub_domain = get_domain(url);
        var subcookie = '';
		
        for (var i in cookies) {
            if(cookies[i].domain == suffix) {
                cookiestr += (cookies[i].name + '=' + cookies[i].value + ';');
            }else if(cookies[i].domain == sub_domain){
                subcookie += (cookies[i].name + '=' + cookies[i].value + ';');
            }
        }
        callback({'suffix': cookiestr, 'subdomain': subcookie});
    });
}

function getAjax(url, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            msg_cache = xhr.responseText; 
            cb(xhr.responseText);
        }
    };
    xhr.send();
}

function postAjax(url, data, cb){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            msg_cache = xhr.responseText;
            cb(xhr.responseText);
        }
    };
    xhr.send(data);
}

var bg = chrome.extension.connect({
    name: "haopintui"
});

function getHttp(url, fn) {
    bg.postMessage({
        act: "get",
        reurl: url
    });
    bg.onMessage.addListener(function(msg) {
        if (msg.content == "getback") {
            fn(msg.question);
        }
    });
}

function postHttp(url, data, fn) {
    bg.postMessage({
        act: "post",
        reurl: url,
        redata: data
    });
    bg.onMessage.addListener(function(msg) {
        if (msg.content == "postback") {
            fn(msg.question);
        }
    });
}
chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		if(msg.act == 'get'){
			getAjax(msg.reurl, function(msg) { 
				port.postMessage({content: "getback", question : msg}); 
			});
		}
		else if (msg.act == 'post') {
			postAjax (msg.reurl, msg.redata, function(msg) {
				port.postMessage({content: "postback", question : msg});
			});
		}
		else if (msg.act == 'new') {
			chrome.browserAction.setBadgeBackgroundColor({color:[255,0,0,255]});
			chrome.browserAction.setBadgeText({text:'new'});
		}
		else if (msg.act == 'cookie') {
			get_cookie(msg.reurl, function(cookie){
				port.postMessage({content: "cookieback", question : cookie.suffix}); 
			});
		}
		else if (msg.act == 'warring') {
		}
		else{
			console.log("error");
		}
	});
});

var HPT_BG_Plugin = {
		init:function(){
			this.getLmUid();
			this.getHptUid();
//			this.appendMain();
//			this.keyDisplay();
//			this.siteActions();
		},
		token:'',
		lmuid:'',
		reason:'',
		nologin:false,
		notaoke:false,
		tqqnologin:false,
		getUnion:false,
		Num:0,
		nologin_hpt:false,
		user_id:'',
		user_key:'',
		user_token:'',
		app_id:'',
		pid:'',
		timer:null,
		tao_num:0,
		status:false, // 停止  启动
		getLmUid:function(fn){ //获取PID
			var _this = this;
//			$.get('http://pub.alimama.com/common/getUnionPubContextInfo.json',{},function(data) {
//				if(data.data.hasOwnProperty('memberid')){
//					_this.lmuid = data.data.memberid;
//				}else{
//					_this.nologin = true;
//				}
//			});
			var url ="http://pub.alimama.com/common/getUnionPubContextInfo.json?"+new Date().getTime();
//			getHttp(url, function(JHtml) {
//				alert(JHtml);
////					var data = eval("(" + JHtml + ")");
////					if(data&&data.result&&data.result.map){					
////						data = data.result.map;
////					}
////					if(data.item&&data.item.promotion_id){
////						window.location.href="https://store.taobao.com/search.htm?spm=0.0.0.0.mJ89aR&user_number_id="+data.item.user_num_id+"&search=y&promotionId="+data.item.promotion_id;
////					}
////					else{
////						setTimeout(get_promotion_item,100);
////					}
//			});
			
			getAjax(url, function(msg) {
				var data = JSON.parse(msg);
				if(data.data.hasOwnProperty('memberid')){
					_this.lmuid = data.data.memberid;
					_this.nologin = false;
				}else{
					_this.nologin = true;
				}
				if(fn){
					fn(_this);
				}
			});
		},
		getHptUid:function(fn){ //登录好品推
			var _this = this;
			var url ="http://www.haopintui.com/common/userinfo.php?"+new Date().getTime();
			getAjax(url, function(msg) {
				msg = $.trim(msg);
				var data = JSON.parse(msg);
				if(data.result&&data.result.map.user&&data.result.map.user.hasOwnProperty('user_id')){
					_this.user_id = data.result.map.user.user_id;
					_this.user_key = data.result.map.user.user_key;
					_this.nologin_hpt = false;
				}else{
					_this.nologin_hpt = true;
				}
				if(fn){
					fn(_this);
				}
			});
		},
		openLmLogin:function(type){
			var _this = this;
			var url = 'http://www.alimama.com/index.htm';
			if(type==1){
				_this.browserOpen(url,350,300);
				layer.confirm('您是否已经成功登录淘宝联盟？', {
					icon: 3,
					btn: ['是','否'],
				},function(){
					window.location.reload();
				});
			}else{
				layer.confirm('您还没登录淘宝联盟，是否立即登录？', {
					icon: 3,
					btn: ['是','否'],
				},function(){
					_this.browserOpen(url,350,300);
					layer.confirm('您是否已经成功登录淘宝联盟？', {
						icon: 3,
						btn: ['是','否'],
					},function(){
						window.location.reload();
					});
				});
			}
			return false;
		},
		get_cms_list:function(fn){
			var _this = this;
			var url ="http://www.haopintui.com/common/user_cms.php?"+new Date().getTime();
			getAjax(url, function(msg) {
				msg = $.trim(msg);
				var data = JSON.parse(msg);
				if(data.result&&data.result.map.hasOwnProperty('items')){
					var list = data.result.map.items;
					if(fn){
						fn(list);
					}
				}
			});
		},
		get_pid_list:function(fn){
			var _this = this;
			var url ="http://www.haopintui.com/common/user_pid.php?"+new Date().getTime();
			getAjax(url, function(msg) {
				msg = $.trim(msg);
				var data = JSON.parse(msg);
				if(data.result&&data.result.map.hasOwnProperty('items')){
					var list = data.result.map.items;
					if(fn){
						fn(list);
					}
				}
			});
		},
		get_user_item_list:function(opt,fn){
			var _this = this;
			var url ="http://user.plug.huopinjie.com/item.php?"+new Date().getTime();
//			
//			alert("【_this.user_id："+_this.user_id+"】");
//			alert("【_this.user_key："+_this.user_key+"】");
//			alert("【_this.user_token："+_this.user_token+"】");
//			alert("【_this.app_id："+_this.app_id+"】");
//			alert("【_this.pid："+_this.pid+"】");
//			postAjax(url,{
//				user_id:_this.user_id,
//				user_key:_this.user_key,
//				user_token:_this.user_token,
//				app_id:_this.app_id,
//				pid:_this.pid,
//			}, function(msg) {
//				msg = $.trim(msg);
//				alert("【："+msg+"】");
//				var data = JSON.parse(msg);
//				if(data.result&&data.result.map.hasOwnProperty('items')){
//					var list = data.result.map.items;
//					if(fn){
//						fn(list);
//					}
//				}
//			});
			$.post(url,{
				user_id:_this.user_id,
				user_key:_this.user_key,
				user_token:_this.user_token,
				app_id:_this.app_id,
				pid:_this.pid,
			},function(data) {
//				alert("【_this.data："+JSON.stringify(data)+"】");
				if(data.result&&data.result.map.hasOwnProperty('items')){
					var list = data.result.map.items;
					if(fn){
						fn(list);
					}
				}
			},'json');
		},
		get_item_detail:function(opt,fn){
			var _this = this;
			var url = 'http://pub.alimama.com/items/search.json?q='+encodeURIComponent('http://item.taobao.com/item.htm?id='+opt.item_id)+'&perPageSize=50';
			getAjax(url, function(msg) {
				msg = $.trim(msg);
				var data = JSON.parse(msg);
				if(data.data.pageList != null){
//					var opt = {};
					var pageList = data.data.pageList[0];
					opt.pvid = data.info.pvid;
					opt.sellerId = pageList.sellerId;
					opt.tkRate = pageList.tkRate;   //通用比例
					opt.eventRate = pageList.eventRate; //最高鹊桥比例 可能为null
					opt.campaignData = pageList.tkSpecialCampaignIdRateMap; //定向计划集合
										
					var arr_CampaignList = [];
					_this.get_item_CampaignList(opt,function(data_CampaignList){
						var max_auto_campaign_item = {}; //最大的自动定向
						var max_campaign_item = {}; //最大的定向 包含自动和手动
						var max_hidden_campaign_item = {}; //最大的隐藏
						var shopKeeperId = null;
						
						if(data_CampaignList.data!= null){
							var obj_list = data_CampaignList.data;
							for (var i = 0; i < obj_list.length; i++) {
								var campaign_item = {};
								var CampaignID = obj_list[i].CampaignID;
								var manualAudit = obj_list[i].manualAudit; //0自动
								var commissionRate = obj_list[i].commissionRate;
								var ShopKeeperID_item = obj_list[i].ShopKeeperID;
								var Properties = obj_list[i].Properties; //否 定向
								var Exist = obj_list[i].Exist;  // true 申请过 false 未申请
								var ExistStatus = obj_list[i].ExistStatus; //1审核 2 通过
								
								campaign_item.CampaignID = CampaignID;
								campaign_item.manualAudit = manualAudit;
								campaign_item.commissionRate = commissionRate;
								campaign_item.ShopKeeperID = ShopKeeperID_item;
								campaign_item.Properties = Properties;
								campaign_item.Exist = Exist;
								campaign_item.ExistStatus = ExistStatus;
								arr_CampaignList.push(campaign_item);
								shopKeeperId = ShopKeeperID_item;
								
								if(manualAudit==0){ //自动
									if(opt.tkRate<campaign_item.commissionRate&&
											(max_auto_campaign_item.hasOwnProperty("CampaignID")==false
											||max_auto_campaign_item.commissionRate<campaign_item.commissionRate)){
										max_auto_campaign_item = campaign_item;
									}
								}
								if(opt.tkRate<campaign_item.commissionRate&&
										(max_campaign_item.hasOwnProperty("CampaignID")==false  //全部
										||max_campaign_item.commissionRate<campaign_item.commissionRate)){
									max_campaign_item = campaign_item;
								}
							}
						}
						
						var obj = opt.campaignData;
						var max_campaignIde_hidden = null;
						var max_tkRate_hidden = 0;
						if(obj != null){
							for(i in obj){
								var tkRate_hidden = parseFloat(obj[i]);
								if(i.indexOf('-') != -1){
									var campaignId = i.replace('-','');
									if(opt.tkRate<tkRate_hidden&&
											(max_campaignIde_hidden==null||max_tkRate_hidden<tkRate_hidden)){
										max_campaignIde_hidden = campaignId;
										max_tkRate_hidden = tkRate_hidden;
									}
								}
							}
						}
						
//						alert(max_auto_campaign_item.commissionRate);

						if(opt.eventRate&&
								(max_auto_campaign_item.hasOwnProperty("CampaignID")==false||opt.eventRate>max_auto_campaign_item.commissionRate)){
							_this.getClickUrl(0,opt.item_id,_this.pid,opt.pvid);
							if(max_auto_campaign_item.hasOwnProperty("CampaignID")==true){  //最大自动
								_this.postApplyForPlan(max_auto_campaign_item.Exist,max_auto_campaign_item.CampaignID,max_auto_campaign_item.ShopKeeperID,opt.pvid,function(){
									
								});
							}else if(max_campaign_item.hasOwnProperty("CampaignID")==true){ // 最大手动
								_this.postApplyForPlan(max_campaign_item.Exist,max_campaign_item.CampaignID,max_campaign_item.ShopKeeperID,opt.pvid,function(){
									
								});
							}
						}else{
							if(max_campaignIde_hidden==null){
								if(max_auto_campaign_item.hasOwnProperty("CampaignID")==true){  //最大自动
									_this.postApplyForPlan(max_auto_campaign_item.Exist,max_auto_campaign_item.CampaignID,max_auto_campaign_item.ShopKeeperID,opt.pvid,function(){
										_this.getClickUrl(1,opt.item_id,_this.pid,opt.pvid);
									});
								}else if(max_campaign_item.hasOwnProperty("CampaignID")==true){ // 最大手动
									_this.postApplyForPlan(max_campaign_item.Exist,max_campaign_item.CampaignID,max_campaign_item.ShopKeeperID,opt.pvid,function(){
										_this.getClickUrl(1,opt.item_id,_this.pid,opt.pvid);
									});
								}else{
									_this.getClickUrl(1,opt.item_id,_this.pid,opt.pvid);
								}
							}else{
								if(max_auto_campaign_item.hasOwnProperty("CampaignID")==true){
									_this.postApplyForPlan(max_auto_campaign_item.Exist,max_auto_campaign_item.CampaignID,max_auto_campaign_item.ShopKeeperID,opt.pvid,function(){
										_this.getClickUrl(1,opt.item_id,_this.pid,opt.pvid);
									});
								}else{
									_this.getHiddenPlan(opt,max_campaignIde_hidden,ShopKeeperID_item,function(cpsCampaignDO){
										if(cpsCampaignDO!=null){
											var campaignId_hidde = cpsCampaignDO.campaignId;
											_this.exsitApplyList({seller_id:opt.sellerId},function(data_exsit_CampaignList){
												var exist_status = false; 
												if(data_exsit_CampaignList.hasOwnProperty('data') != false&&data_exsit_CampaignList.data.exsitApplyList!=null){
													for (var i=0;i<data_exsit_CampaignList.data.exsitApplyList.length;i++){
														if(data_exsit_CampaignList.data.exsitApplyList[i].campaignId==campaignId_hidde){
															if(data_exsit_CampaignList.data.exsitApplyList[i].status==1
																	||data_exsit_CampaignList.data.exsitApplyList[i].status==2){
																exist_status = true; 
															}
														}
													}
												}
												_this.postApplyForPlan(exist_status,cpsCampaignDO.CampaignID,ShopKeeperID_item,opt.pvid,function(){
													_this.getClickUrl(1,opt.item_id,_this.pid,opt.pvid);
												});
											});
										}
									});
								}
							}
						}
					});
				}
			});
		},
		exsitApplyList:function(opt,fn){
			var _this = this;
			var url = 'http://pub.alimama.com/shopdetail/campaigns.json?oriMemberId=' + opt.seller_id + '&_input_charset=utf-8';
			getAjax(url, function(msg) {
				msg = $.trim(msg);
				var data = JSON.parse(msg);
				if(fn){
					fn(data);
				}
			});
		},
		get_item_CampaignList:function(opt,fn){
			var _this = this;
			var url = 'http://pub.alimama.com/pubauc/getCommonCampaignByItemId.json?itemId='+opt.item_id+'&t='+new Date().getTime()+'&_tb_token_='+_this.token;
			getAjax(url, function(msg) {
				msg = $.trim(msg);
				var data = JSON.parse(msg);
				if(fn){
					fn(data);
				}
			});
		},
		getHiddenPlan:function(opt,campaignId,shopKeeperId,fn){
			var _this = this;
			var url = 'http://pub.alimama.com/campaign/campaignDetail.json?campaignId='+campaignId+'&shopkeeperId='+shopKeeperId;
			getAjax(url, function(msg) {
				msg = $.trim(msg);
				var data = JSON.parse(msg);
				cpsCampaignDO  = response.data.data.cpsCampaignDO;
				if(fn){
					fn(cpsCampaignDO);
				}
			});
		},
		postApplyForPlan:function(apply_status,campId,keeperid,pvid,fn){ //申请定向计划
			var _this = this;
			if(!apply_status){
				var url =  'http://pub.alimama.com/pubauc/applyForCommonCampaign.json';
				$.post(url,{campId:campId,keeperid:keeperid,applyreason:_this.reason,t:new Date().getTime(),_tb_token_:_this.token,pvid:pvid},function(data) {
//					alert("【getHzbData："+JSON.stringify(data)+"】");
					if(data.hasOwnProperty('info') == false){
						//登录失效 联盟 
//						_this.nologin = true;
//						_this.browserOpen('http://www.alimama.com/index.htm',600,480);
					}else{
						if(data.ok == true){ //申请成功
							
						}
					}
					if(fn){
						fn();
					}
				},'json');
			}else{
				if(fn){
					fn();
				}
			}
		},
		getClickUrl:function(type,itemid,pid,pvid){
			var _this = this;
			pid = pid.split("_");
			uid = parseInt(pid[0]);
			siteid = parseInt(pid[1]);
			adzoneid = parseInt(pid[2]);
			if (uid != _this.lmuid) {
				alert('配置的pid和登录的淘客联盟帐号pid不同');
				window.clearInterval(_this.timer);
				_this.timer = null;
				_this.status = false;
				return false;
			}
			if(type==1){
				url = 'http://pub.alimama.com/common/code/getAuctionCode.json?auctionid='+itemid+'&adzoneid='+adzoneid+'&siteid='+siteid+'&scenes=1&pvid='+pvid;
			}else{
				url = 'http://pub.alimama.com/common/code/getAuctionCode.json?auctionid='+itemid+'&adzoneid='+adzoneid+'&siteid='+siteid+'&scenes=3&channel=tk_qqhd&pvid='+pvid;
			}
			
			getAjax(url, function(msg) {
				msg = $.trim(msg);
				var data = JSON.parse(msg);
				if(data.hasOwnProperty('data') == false){
//					_this.nologin = true;
//					_this.openLmLogin();
				}else if(data.data == null){
					if(data.info.invalidKey == 'adzoneid'){ //'PID错误，请检查！
						
					}else{
						
					}
				}else if(data.data.hasOwnProperty('clickUrl')){
					var opt = {};
					 opt.num_iid = itemid;
					 opt.url = data.data.clickUrl;
					 opt.coupon_url = data.data.couponLink;
					 opt.short_url = data.data.shortLinkUrl;
					 opt.tao_token = data.data.taoToken;
					 opt.coupon_link_tao_token = data.data.couponLinkTaoToken;
					_this.submit_user_taoke_item(opt);
				}
			});
			
		},
		submit_user_taoke_item:function(opt,fn){
			var _this = this;
			var url ="http://user.plug.huopinjie.com/taoke_item.php?"+new Date().getTime();
//			postAjax(url,{
//				user_id:_this.user_id,
//				user_key:_this.user_key,
//				user_token:_this.user_token,
//				app_id:_this.app_id,
//				num_iid:opt.num_iid,
//				url:opt.url,
//				coupon_url:opt.coupon_url,
//				short_url:opt.short_url,
//				tao_token:opt.tao_token,
//				coupon_link_tao_token:opt.coupon_link_tao_token,
//			}, function(msg) {
//				msg = $.trim(msg);
//				_this.set_tongji(1);
//			});
//			alert("【_this.user_id："+_this.user_id+"】");
//			alert("【_this.user_key："+_this.user_key+"】");
//			alert("【_this.user_token："+_this.user_token+"】");
//			alert("【_this.app_id："+_this.app_id+"】");
//			alert("【_this.num_iid："+opt.num_iid+"】");
//			alert("【_this.url："+opt.url+"】");
//			alert("【_this.coupon_url："+opt.coupon_url+"】");
			$.post(url,{
				user_id:_this.user_id,
				user_key:_this.user_key,
				user_token:_this.user_token,
				app_id:_this.app_id,
				num_iid:opt.num_iid,
				url:opt.url,
				coupon_url:opt.coupon_url,
				short_url:opt.short_url,
				tao_token:opt.tao_token,
				coupon_link_tao_token:opt.coupon_link_tao_token,
			},function(data) {
//				alert("【_this.data："+JSON.stringify(data)+"】");
				_this.set_tongji(1);
			},'json');
		},
		batch_convert_config:function(fn){ //批量转化连接
			var _this = this;
			//检查淘客登录状态
			this.getLmUid(function(){
				_this.getHptUid(function(){
					if(!_this.nologin){
						chrome.cookies.get({url: "http://alimama.com/", name: "_tb_token_"}, function(cookie) {
							if (cookie != null) {
								window.localStorage.token = cookie.value;
								_this.token = cookie.value;
							}
						});
					}
					if(fn){
						var resOK = {
							nologin: _this.nologin,
							nologin_hpt: _this.nologin_hpt,
							user_id: _this.user_id,
						};
						fn(resOK);
					}
				});
			});
			_this = this;
			if(_this.nologin){
//				$("#alimama_login").show();
//				var url = 'http://www.alimama.com/index.htm';
//				_this.browserOpen(url,600,480);
			}else{
				
			}
		},
		set_pid_appid:function(pid,app_id){
			_this = this;
			_this.pid = pid;
			_this.app_id = app_id;
			if(_this.pid){
				window.localStorage.hpt_pid = pid;
			}
			if(_this.app_id){
				window.localStorage.hpt_app_id = app_id;
			}
			if (typeof window.localStorage.applyReason != 'undefined') {
				_this.reason = window.localStorage.applyReason;
			}
		},
		batch_convert_exec:function(fn){ //批量转化连接
			var _this = this;
			_this.status = true;
			_this.timer = setInterval(function() {
				_this.getLmUid(function(){
					_this.getHptUid(function(){
						if(_this.nologin||_this.nologin_hpt||_this.status==false){
							window.clearInterval(_this.timer);
							_this.timer = null;
							_this.status = false;
							if(_this.nologin){
								_this.browserOpen('http://www.alimama.com/index.htm',600,480);
							}
						}else{
							_this.status = true;
							_this.get_user_item_list({},function(item_list){
								if(item_list != null && item_list.length > 0){
									for (var i = 0; i < item_list.length; i++) {										
										var item_item = item_list[i];
//										alert("【getHzbData："+JSON.stringify(item_item)+"】");
//										alert(item_item);
										if (typeof window.localStorage.applyReason != 'undefined') {
											_this.reason = window.localStorage.applyReason;
										}
//										item_item.num_iid='17564643423';
										_this.get_item_detail({item_id:item_item.num_iid});
									}
								}
							});
						}
					});
				});
		    }, 3000);
		},
		set_tongji:function(num){
			_this = this;
			
			if (typeof window.localStorage.hpt_tao_num == 'undefined') {
				window.localStorage.hpt_tao_num = 0;
			}
			if(num){
				window.localStorage.hpt_tao_num = parseInt(window.localStorage.hpt_tao_num) + num;
			}
			if(num){
				_this.tao_num = _this.tao_num + num;
			}
		},
		tongji:function(){
			_this = this;
			if (typeof window.localStorage.hpt_tao_num == 'undefined') {
				window.localStorage.hpt_tao_num = 0;
			}
			return {
				hpt_tao_num:window.localStorage.hpt_tao_num
				,tao_num:_this.tao_num
			};
		},
		browserOpen:function(url,width,height){
			var w = width;
			var h = height;
			var top = (window.screen.availHeight-30-h)/2;
			var left = (window.screen.availWidth-10-w)/2;
			window.open(url, '', 'height='+h+', width='+w+', top='+top+', left='+left+', toolbar=no, menubar=no, scrollbars=no, location=no, resizable=no, status=no');
		},
}
HPT_BG_Plugin.init();


var wR=chrome.webRequest||chrome.experimental.webRequest; //兼容17之前版本的chrome，若需要使用chrome.experimental，需要在 about:flags 中“启用“实验用。。API”
if(wR){
    wR.onBeforeSendHeaders.addListener(
        function(details) {
            if (details.type === 'xmlhttprequest') {
                var exists = false;
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Referer') {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {//不存在 Referer 就添加
                    details.requestHeaders.push({ name: 'Referer', value: 'http://pub.alimama.com/promo/search/index.htm'});
                }
                return { requestHeaders: details.requestHeaders };
            }
        },
        {urls: ["https://*.alimama.com/*","http://*.alimama.com/*"]},//匹配访问的目标url
        ["blocking", "requestHeaders"]
    );
}
