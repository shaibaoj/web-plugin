var HPT_Plugin = {
	init:function(){
		this.is_haopintui = this.check_haopintui_domain();
		if(this.is_haopintui){
			if($('.extensions-args').length>0){
				this.item_id = $('.extensions-args').attr('itemid');
			}
		}else{
			this.item_id = this.get_item_id();
			this.seller_id = this.get_seller_id();
			this.seller_nick = this.get_seller_nick();
		}
		this.getLmUid();
		this.appendMain();
		this.keyDisplay();
		this.siteActions();
	},
	initEvent:function(){
		var _this = this;
		
		$('.HPT-plugin-logo').click(function(){
			$('.HPT-plugin').slideToggle(200);
		});
		
		$('.HPT-plugin-trend, .HPT-plugin-lm, .HPT-plugin-queqiao, .HPT-plugin-bar-coupon').hover(function(){
			var type = $(this).attr('data-type');
			$(this).addClass('HPT-plugin-open');
			if(type == 1){
				_this.showTrendData();
			}else if(type == 2){
				_this.showUnionData();
			}else if(type == 3){
				_this.showQueqiaoList();
			}else if(type == 4){
				_this.showCouponData();
			}
		},function(){
			$(this).removeClass('HPT-plugin-open');
		});
		
		$('.HPT-plugin-bar-generate-copywriting').click(function () {
			//console.log(_this.copywritingData);
			_this.showCopywritingBox();
		});
		
		$(document).click(function(e) {
			obj = $(e.srcElement || e.target);
			var $open = $('.HPT-plugin-open');
			if(!obj.is('.HPT-plugin-open *, .HPT-layui-layer *, .HPT-layui-layer-shade, .HPT-layui-layer-close, .HPT-layui-layer-btn *')) {
				$open.removeClass('HPT-plugin-open');
			}
		});

		$('#HPT-plugin-queqiao-list').scroll(function() {
			if ($(this).scrollTop() > 20) {
				$(".HPT-plugin-queqiaobox .HPT-plugin-b,.HPT-plugin-queqiaobox .HPT-footer").addClass("top-shadow");
			} else {
				$(".HPT-plugin-queqiaobox .HPT-plugin-b,.HPT-plugin-queqiaobox .HPT-footer").removeClass("top-shadow");
			}
		});
		$('#HPT-plugin-lm-list').scroll(function() {
			if ($(this).scrollTop() > 20) {
				$(".HPT-plugin-lmbox .HPT-plugin-b,.HPT-plugin-lmbox .HPT-footer").addClass("top-shadow");
			} else {
				$(".HPT-plugin-lmbox .HPT-plugin-b,.HPT-plugin-lmbox .HPT-footer").removeClass("top-shadow");
			}
		});
	},
	version:2.2,
	hpt_domain:"haopintui.net",
	is_haopintui:false,
	item_id:'',
	title:'',
	seller_id:'',
	seller_nick:'',
	token:'',
	lmuid:'',
	pic_url:'',
	price:'',
	sales:'',
	is_tmall:'',
	zkPrice:'',
	tkRate:'',
	eventRate:'',
	pvid:'',
	campaignData:'',
	chartData:'',
	reason:'',
	footer:'',
	nologin:false,
	notaoke:false,
	tqqnologin:false,
	getUnion:false,
	Num:0,
	user_id:'',
	copywritingData:{},
	check_haopintui_domain:function () {
		if(window.location.href.indexOf(this.hpt_domain) >= 0){
			return true;
		}
		return false;
	},
	get_item_id:function(){ //获取商品IID
		if(window.location.href.indexOf('haopintui.com') != -1){
			return false;
		}
		if(window.location.href.indexOf('haopintui.net') != -1){
			return false;
		}
		if(window.location.href.indexOf('detail.ju.taobao.com') != -1){ //聚划算
			var itemid = /[\?|&]item_id=(\d+)/.exec(window.location)[1];
		}else if(window.location.href.indexOf('world.tmall.com') != -1 || window.location.href.indexOf('world.taobao.com') != -1){
			var itemid = /\/(\d+)\.htm/.exec(window.location)[1];
		}else{
			var itemid = /[\?|&]id=(\d+)/.exec(window.location)[1];
		}
		return itemid;
	},
	get_seller_id:function(){ //获取店铺ID
		if(window.location.href.indexOf('detail.ju.taobao.com') != -1){ //聚划算
			return $('.J_RightRecommend').attr('data-sellerid');
		}else if(window.location.href.indexOf('chaoshi.detail.tmall.com') != -1){ //天猫超市
			var d = $("#J_SellerInfo").attr("data-url");
			var e = d.match(/user_num_id=(\d+)/g);
			var f = String(e).split("=");
			return f[1];
		}else if(window.location.href.indexOf('world.taobao.com') != -1){ //淘宝全球
			var d = $("#J_listBuyerOnView").attr("data-api");
			var e = d.match(/seller_num_id=(\d+)/g);
			var f = String(e).split("=");
			return f[1];
		}else if(window.location.href.indexOf('hotel.alitrip.com') != -1 || window.location.href.indexOf('hotel.alitrip.hk') != -1){ //去啊-酒店
			return $('#J_HotelTitle').attr('data-seller-id');
		}else{
			var meta = $('meta[name=microscope-data]').attr('content'); 
			if(meta){
				var userid = /userid=(\d+)/.exec(meta)[1];
				return userid;
			}
		}
	},
	get_seller_nick:function(){ //获取旺旺昵称
		var nick = $('.J_WangWang').attr('data-nick');
		if(window.location.href.indexOf('chaoshi.detail.tmall.com') != -1){
			nick = '天猫超市';
		}
		if(window.location.href.indexOf('hotel.alitrip.com') != -1){
			nick = $('.service-group').attr('data-nick');
		}
		if(nick == undefined && window.location.href.indexOf('item.taobao.com') != -1){
			var meta = $('meta[name=description]'); 
			var str = meta.attr('content');
			var arr = str.match(/请进入(.*)的/);
			nick = arr[1];
		}
		return decodeURIComponent(nick);
	},
//	campaignTpl:'{{# for(var i = 0, len = d.length; i < len; i++){ }}\
//					<tr id="campaignId_{{ d[i].campaignId }}">\
//						<td>{{ d[i].campaignName }}</td>\
//						<td>{{# if(d[i].campaignType == 2){ }}定向{{# }else{ }}通用{{# } }}</td>\
//						<td>{{# if(d[i].properties == 3){ }}是{{# }else{ }}否{{# } }}<span class="auditStatus"></span></td>\
//						<td>{{ d[i].avgCommissionToString }}</td>\
//						<td class="commissionRatePercent" data-campaignid="{{ d[i].campaignId }}" data-shopkeeperid="{{ d[i].shopKeeperId }}"><i></i></td>\
//						<td><a href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId={{ d[i].campaignId }}&shopkeeperId={{d[i].shopKeeperId}}&userNumberId={{ HPT_Plugin.seller_id }}" class="blue-link" target="_blank">详情</a></td>\
//						<td>{{# if(d[i].campaignType == 2){ }}<a href="javascript:void(0)" class="ApplyForPlan blue-link" data-campaignid="{{ d[i].campaignId }}" data-shopkeeperid="{{ d[i].shopKeeperId }}">申请</a>{{# } }}</td>\
//					</tr>\
//				{{# } }}',
	campaignTpl:'{{# for(var i = 0, len = d.length; i < len; i++){ }}\
					<tr id="campaignId_{{ d[i].campaignId }}">\
						<td>{{ d[i].campaignName }}</td>\
						<td>{{# if(d[i].campaignType == 2){ }}定向{{# }else if(d[i].campaignType == 3){ }}鹊桥{{# }else{ }}通用{{# } }}</td>\
						<td>{{# if(d[i].properties == 3){ }}是{{# }else{ }}否{{# } }}<span class="auditStatus"></span></td>\
						<td class="commissionRatePercent" data-campaignid="{{ d[i].campaignId }}" data-shopkeeperid="{{ d[i].shopKeeperId }}"><i></i></td>\
						<td><a href="{{# if(d[i].campaignType == 3){ }}{{ d[i].url }}"{{# }else{ }}http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId={{ d[i].campaignId }}&shopkeeperId={{d[i].shopKeeperId}}&userNumberId={{ HPT_Plugin.seller_id }}{{# } }}" class="blue-link" target="_blank">详情</a></td>\
						<td>{{# if(d[i].campaignType == 2){ }}<a href="javascript:void(0)" class="ApplyForPlan blue-link" data-campaignid="{{ d[i].campaignId }}" data-shopkeeperid="{{ d[i].shopKeeperId }}">申请</a>{{# }else{ }}免申请{{# } }}</td>\
					</tr>\
				{{# } }}',
	couponTpl:'{{# for(var i = 0, len = d.length; i < len; i++){ }}\
					<tr>\
						<td>满 {{ d[i].applyAmount }} 减 {{ d[i].amount }}</td>\
						<td>{{ d[i].time }}</td>\
						<td class="couponCount" data-sellerId="{{ d[i].sellerId }}" data-activityId="{{ d[i].activityId }}"><i></i></td>\
						<td><i></i></td>\
						<td><i></i></td>\
						<td><a href="javascript:void(0)" data-href="//shop.m.taobao.com/shop/coupon.htm?sellerId={{ d[i].sellerId }}&activityId={{ d[i].activityId }}" class="CouponUrl blue-link">领取</a></td>\
						<td><a href="javascript:void(0)" class="GenerateDwz blue-link">生成</a></td>\
					</tr>\
				{{# } }}',
	pluginTpl:'<div class="HPT-plugin HPT-plugin-bar" style="display:none">\
					<ul>\
						<li class="HPT-plugin-logo" title="点击隐藏插件"></li>\
						<li class="HPT-plugin-bar-coupon" data-type="4">\
							<div class="HPT-plugin-ainside"><span id="HPT-plugin-bar-coupon-data"><i class="icon coupon"></i>优惠券</span></div>\
							<div class="HPT-plugin-bar-couponbox">\
								<div class="HPT-plugin-b">\
									<a href="https://www.haopintui.net/" class="HPT-plugin-l" target="_blank"></a>\
									<div class="version"></div>\
									<div class="f-cb"></div>\
									<div class="top-shadow"></div>\
								</div>\
								<div id="HPT-plugin-bar-coupon-list">\
									<table class="m-table">\
										<thead><tr><th>优惠券</th><th width="100">有效期</th><th width="55">已领</th><th width="55">剩余</th><th width="50">限领</th><th width="50">领取</th><th width="50">复制</th></tr></thead>\
										<tbody id="coupon-list"><tr><td colspan="6">正在获取优惠券，请稍后<i></i></td></tr></tbody>\
									</table>\
								</div>\
							</div>\
						</li>\
						<li class="HPT-plugin-lm" data-type="2">\
							<div class="HPT-plugin-ainside"><i class="icon ty"></i><span id="HPT-plugin-lm-data">正在查询...</span></div>\
							<div class="HPT-plugin-lmbox">\
								<div class="HPT-plugin-b">\
									<a href="https://www.haopintui.net/" class="HPT-plugin-l" target="_blank"></a>\
									<form class="HPT-plugin-search" action="https://www.haopintui.net/index.php" method="get" target="_blank" accept-charset="UTF-8">\
										<input type="hidden" name="mod" id="mod" value="index">\
										<input type="text" placeholder="请输入关键字或宝贝网址(全网)" name="q">\
										<input type="submit" value="">\
									</form>\
									<div class="f-cb"></div>\
									<div class="top-shadow"></div>\
								</div>\
								<div id="HPT-plugin-lm-list">\
									<div class="tk-detail">\
										<div class="f-fl commission">\
											<ul>\
												<li class="label f-fl">通用佣金：</li>\
												<li class="commission_rate f-fl" id="HPT-plugin-tkRate"></li>\
											</ul>\
											<ul>\
												<li class="label f-fl">鹊桥佣金：</li>\
												<li class="commission_rate f-fl" id="HPT-plugin-eventRate"></li>\
											</ul>\
											<ul>\
												<li class="label f-fl">定向佣金：</li>\
												<li class="commission_rate f-fl" id="HPT-plugin-campaignRate"></li>\
											</ul>\
										</div>\
										<div>\
											<ul>\
												<li class="label f-fl">月推广量：</li>\
												<li class="tg-num f-fl" id="HPT-plugin-totalNum"></li>\
											</ul>\
											<ul>\
												<li class="label f-fl">月支出佣金：</li>\
												<li class="tg-num f-fl" id="HPT-plugin-totalFee"></li>\
											</ul>\
										</div>\
									</div>\
									<table class="m-table">\
										<thead><tr><th>计划名</th><th width="50">类型</th><th width="80">人工审核</th><th width="80">佣金</th><th width="50">详情</th><th width="80">操作</th></tr></thead>\
										<tbody id="campaign-list"><tr><td colspan="7">正在获取推广计划，请稍后<i></i></td></tr></tbody>\
									</table>\
								</div>\
							</div>\
						</li>\
						<li class="HPT-plugin-bar-generate-copywriting" data-type="5">\
						<div class="HPT-plugin-ainside"><i class="icon copywriting"></i><span>转链生成文案</span></div>\
						</li>\
						<li class="HPT-plugin-sub"></li>\
					</ul>\
				</div>',
	generateCopywritingTpl:'<div class="HPT-plugin"><div class="HPT-plugin-copywritingbox" id="HPT-plugin-copywritingbox" style="display:none">\
					<div class="HPT-plugin-b">\
						<a href="https://www.haopintui.net/" class="HPT-plugin-l" target="_blank"></a>\
						<div class="version"></div>\
						<div class="f-cb"></div>\
						<div class="subtitle">全网商品（包括淘宝联盟和群里找的）都可以一键转链生成带自己PID的短链接和二合一淘口令的发群推广文案！</div>\
					</div>\
					<div id="HPT-plugin-generate-copywriting-content">\
					</div>\
				</div></div>',			
	appendMain:function(){
		var _this = this;
		chrome.extension.sendRequest({type: "set"}, function(response) {
			_this.reason = response.reason;
			_this.token = response.token;
			
			if(_this.is_haopintui){
				if($('.plugin-bar-content').length>0){
					$('.plugin-bar-content').html(_this.pluginTpl);
					$('.plugin-bar-content').append(_this.generateCopywritingTpl);

					$('.HPT-plugin-bar-coupon').css('display','none');
					$('.HPT-plugin-bar-generate-copywriting').css('display','none');
					$('.HPT-plugin-copywritingbox').css('display','none');
				}

			}else{
				$('ul.tb-meta,.tm-fcs-panel,.description,.detail-ind,.base-area,.item-service').after(_this.pluginTpl);
				$('body').append(_this.generateCopywritingTpl);
			}
			
			$('.tb-property').css('z-index',3);
			if (response.hidden != 'true') {
				$('.HPT-plugin').slideDown();
			}
			if (_this.item_id) {
				_this.getTyData();
				_this.getQsData();
				_this.getHzbData();
				if(!this.is_haopintui) {
					_this.getCoupon();
				}
				_this.initEvent();
			}
		});
	},
	getTyData:function(){
		var _this = this;
		chrome.extension.sendRequest({
			type: "gajax", 
			url: 'http://pub.alimama.com/items/search.json?q='+encodeURIComponent('http://item.taobao.com/item.htm?id='+_this.item_id)+'&perPageSize=50'
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.data.pageList != null){
//					var pageList = response.data.data.pageList[0];
//					_this.tkRate = pageList.tkRate;
//					_this.eventRate = pageList.eventRate;
//					_this.campaignData = pageList.tkSpecialCampaignIdRateMap;

					_this.pvid = response.data.info.pvid;
					var pageList = response.data.data.pageList[0];
					_this.seller_id = (!_this.seller_id || _this.seller_id=='' || this.seller_id==undefined)?pageList.sellerId:_this.seller_id;
					_this.seller_nick = (!_this.seller_nick || _this.seller_nick=='' || this.seller_nick==undefined)?pageList.nick:_this.seller_nick;
					_this.title = pageList.title;
					_this.pic_url = pageList.pictUrl;
					_this.zkPrice = pageList.zkPrice;
					_this.price = pageList.zkPrice;
					_this.is_tmall = pageList.userType;
					_this.sales = pageList.biz30day;
					_this.tkRate = pageList.tkRate;
					_this.eventRate = pageList.eventRate;
					_this.campaignData = pageList.tkSpecialCampaignIdRateMap;

					//获取定向计划最高佣金
					var campaignMaxRate = 0;
					for (var k in _this.campaignData) {
						campaignMaxRate = parseFloat(_this.campaignData[k]>campaignMaxRate?_this.campaignData[k]:campaignMaxRate);
					}

					//获取所有计划最高佣金
					var maxRate = 0;
					var maxRateName = "通用";
					var maxRateType = 0;
					if(_this.tkRate>maxRate){
						maxRate = _this.tkRate;
						maxRateName = "通用";
						maxRateType = 0;
					}
					if(campaignMaxRate>maxRate){
						maxRate = campaignMaxRate;
						maxRateName = "定向";
						maxRateType = 1;
					}
					if(_this.eventRate>maxRate){
						maxRate = _this.eventRate;
						maxRateName = "鹊桥";
						maxRateType = 2;
					}
					
					_this.copywritingData.title = pageList.title;
					_this.copywritingData.item_id = pageList.auctionId;
					_this.copywritingData.item_url = pageList.auctionUrl;
					_this.copywritingData.pic_url = pageList.pictUrl;
					_this.copywritingData.price_original = pageList.zkPrice;
					_this.copywritingData.sales = pageList.biz30day;
					_this.copywritingData.seller_id = pageList.sellerId;
					_this.copywritingData.campaignRates = {"通用":_this.tkRate,"定向":campaignMaxRate,"鹊桥":_this.eventRate};
					_this.copywritingData.maxRateName = maxRateName;
					
					//通用
//					$('#HPT-plugin-lm-data').html('通用佣金<span class="HPT-plugin-price">' + pageList.tkRate + '%</span>');
					$('#HPT-plugin-lm-data').html(maxRateName+'佣金<span class="HPT-plugin-price">' + maxRate + '%</span>');
					$('#HPT-plugin-tkRate').html(pageList.tkRate + '%');
					if(pageList.eventRate){
						$('#HPT-plugin-eventRate').html(pageList.eventRate + '% <span class="true-rmb">(剩余'+pageList.dayLeft+'天)</span>');
					}else{
						$('#HPT-plugin-eventRate').html('<span class="true-rmb">无</span>');
					}
					if(campaignMaxRate>0){
						$('#HPT-plugin-campaignRate').html(campaignMaxRate + '% <span></span>');
					}else{
						$('#HPT-plugin-campaignRate').html('<span class="true-rmb">无</span>');
					}

					//设置默认佣金选项
					$('#comm-type-'+maxRateType).attr('selected','selected');

					$('#HPT-plugin-totalNum').html(pageList.totalNum);
					$('#HPT-plugin-totalFee').html(pageList.totalFee);
					$('#HPT-plugin-bar-lm-tg').click(function(){
						window.open('http://pub.alimama.com/promo/search/index.htm?q='+encodeURIComponent('http://item.taobao.com/item.htm?id=' + _this.item_id));
					});
					$('#HPT-plugin-bar-lm-eventtg').click(function(){
						window.open('http://pub.alimama.com/promo/item/channel/index.htm?q='+encodeURIComponent('http://item.taobao.com/item.htm?id=' + _this.item_id)+'&channel=qqhd');
					});
					
					
//					$('#HPT-plugin-tkRate').html(pageList.tkRate + '% <span class="true-rmb">（¥'+pageList.tkCommFee+'）</span>');
//					$('#HPT-plugin-totalNum').html(pageList.totalNum);
//					$('#HPT-plugin-totalFee').html(pageList.totalFee);
//					$('#HPT-plugin-lm-tg').click(function(){
//						window.open('http://pub.alimama.com/promo/search/index.htm?q='+encodeURIComponent('http://item.taobao.com/item.htm?id=' + _this.item_id));
//					});
//					$('#HPT-plugin-lm-eventtg').click(function(){
//						window.open('http://pub.alimama.com/promo/item/channel/index.htm?q='+encodeURIComponent('http://item.taobao.com/item.htm?id=' + _this.item_id)+'&channel=qqhd');
//					});
//					$('#HPT-plugin-tg').click(function(){
//						if(_this.tqqnologin == true){
//							_this.openTqqLogin();
//						}else{
//							_this.browserOpen('http://plug.huopinjie.com/index.php?mod=user&act=tuiguang&id='+_this.item_id+'&plugin=1',680,510);
////							_this.layerOpen('http://plug.huopinjie.com/index.php?mod=user&act=tuiguang&id='+_this.item_id+'&plugin=1',2,0,false,650,510);
//						}
//					});
//					$('#HPT-plugin-eventtg').click(function(){
//						if(_this.tqqnologin == true){
//							_this.openTqqLogin();
//						}else{
//							_this.browserOpen('http://plug.huopinjie.com/index.php?mod=user&act=tuiguang&id='+_this.item_id+'&type=1&plugin=1',680,510);
////							_this.layerOpen('http://plug.huopinjie.com/index.php?mod=user&act=tuiguang&id='+_this.item_id+'&type=1&plugin=1',2,0,false,650,510);
//						}
//					});
//					//鹊桥
//					if(pageList.eventRate){
//						var eventCommFee = Math.round(pageList.zkPrice*pageList.eventRate)/100;
//						$('#HPT-plugin-queqiao-data').html('鹊桥最高<span class="HPT-plugin-price">' + pageList.eventRate + '%</span>');
//						$('#HPT-plugin-eventRate').html(pageList.eventRate + '% <span class="true-rmb">（¥'+eventCommFee+'）</span>');
//						$('#HPT-plugin-eventzigou').html(Math.round((pageList.zkPrice-eventCommFee)*100)/100);
//						$('#HPT-plugin-eventendtime').html(pageList.dayLeft);
//					}else{
//						$('#HPT-plugin-queqiao-data').html('无鹊桥佣金');
//					}
				}else{
					_this.notaoke = true;
					$('#HPT-plugin-lm-data').html('无通用佣金');
					$('#HPT-plugin-queqiao-data').html('无鹊桥佣金');
				}
			}else{
				$('#HPT-plugin-lm-data,#HPT-plugin-queqiao-data').html('查询失败');
			}
		});
	},
	getCampaignList:function(){
		var _this = this;
		chrome.extension.sendRequest({
			type: "gajax", 
			url: 'http://pub.alimama.com/shopdetail/campaigns.json?oriMemberId=' + _this.seller_id + '&_input_charset=utf-8'
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.hasOwnProperty('data') == false){
					_this.nologin = true;
					$('.HPT-plugin-bar #campaign-list').html('<tr><td colspan="6" style="padding:0"><span class="login-btn blue-link">点这里「登录淘宝联盟」后再查询和申请佣金</span></td></tr>');
//					$('#campaignList').html('<tr><td colspan="7" style="padding:0"><span class="login-btn">点击登录淘宝联盟后再查询</span></td></tr>');
					$('.HPT-plugin-bar .login-btn').click(function(){
						_this.openLmLogin(1);
					});
				}else if(response.data.data.hasOwnProperty('campaignList') && response.data.data.campaignList.length > 0){
					var campaignList = response.data.data.campaignList;
					//如果有鹊桥佣金，则插入到前面
					if(_this.eventRate){
						var eventCampaign  = {campaignName:'鹊桥活动',campaignId:'3',campaignType:3,properties:1,avgCommissionToString:'-',
							url:'http://pub.alimama.com/promo/item/channel/index.htm?q='+encodeURIComponent('http://item.taobao.com/item.htm?id=' + _this.item_id)+'&channel=qqhd'};
						campaignList.unshift(eventCampaign);
					}
					
					laytpl(_this.campaignTpl).render(campaignList, function(html){
						$('.HPT-plugin-bar #campaign-list').empty().append(html);
						$('.HPT-plugin-bar #campaignId_0').find('.commissionRatePercent').text(_this.tkRate+'%').removeClass('commissionRatePercent');
						$('.HPT-plugin-bar #campaignId_3').find('.commissionRatePercent').text(_this.eventRate+'%').removeClass('commissionRatePercent');
						_this.getHiddenPlan(response.data.data.campaignList[0].shopKeeperId);
						setTimeout(function(){
							_this.exsitApplyList(response.data.data.exsitApplyList);
							$('.HPT-plugin-bar .ApplyForPlan').click(function() {
								$(this).html('<i></i>');
								_this.postApplyForPlan($(this).attr('data-campaignid'),$(this).attr('data-shopkeeperid'));

							});
							$('.HPT-plugin-bar .ExitCampaign').click(function() {
								$(this).html('<i></i>');
								_this.getPubCampaignid($(this).attr('data-campaignid'));
							});
						},300);
					});
					
//					laytpl(_this.campaignTpl).render(response.data.data.campaignList, function(html){
//						$('#campaignList').empty().append(html);
//						$('#campaignId_0').find('.commissionRatePercent').text(_this.tkRate+'%').removeClass('commissionRatePercent');
//						_this.getHiddenPlan(response.data.data.campaignList[0].shopKeeperId);
//						setTimeout(function(){
//							_this.exsitApplyList(response.data.data.exsitApplyList);
//							$('.ApplyForPlan').click(function() {
//								$(this).html('<i></i>');
//								_this.postApplyForPlan($(this).attr('data-campaignid'),$(this).attr('data-shopkeeperid'));
//							});
//							$('.ExitCampaign').click(function() {
//								$(this).html('<i></i>');
//								_this.getPubCampaignid($(this).attr('data-campaignid'));
//							});
//						},300);
//					});
				}
			}
		});
	},
	getHiddenPlan:function(shopKeeperId){
		var _this = this;
		var obj = _this.campaignData;
		if(obj != null){
			for(i in obj){
				var tkRate=parseFloat(obj[i]);
				if(i.indexOf('-') != -1){
					var campaignId=i.replace('-','');
					chrome.extension.sendRequest({
						type: "gajax", 
						url: 'http://pub.alimama.com/campaign/campaignDetail.json?campaignId='+campaignId+'&shopkeeperId='+shopKeeperId
					},function(response){
						if(response.msg == 'ok'){
							var campaignId = response.data.data.cpsCampaignDO.campaignId;
							for(i in obj){
								if(i.indexOf('-') != -1){
									var id=i.replace('-','');
									if (id == campaignId){
										var tkRate=parseFloat(obj[i]);
									}
								}
							}
							var h = '<tr id="campaignId_'+campaignId+'"><td>'+response.data.data.cpsCampaignDO.campaignName+'</td><td>隐藏</td><td>是<span class="auditStatus"></span></td><td>'+response.data.data.cpsCampaignDO.avgCommissionToString+'</td><td>'+tkRate+'%</td><td><a href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId='+campaignId+'&shopkeeperId='+shopKeeperId+'&userNumberId='+_this.seller_id+'" class="blue-link" target="_blank">详情</a></td><td><a href="javascript:void(0)" class="ApplyForPlan blue-link" data-campaignid="'+campaignId+'" data-shopkeeperid="'+shopKeeperId+'">申请</a></td></tr>';
							$('#campaignList').append(h);
						}
					});
				}else{
					$('#campaignId_'+i).find('.commissionRatePercent').html(tkRate+'%');
				}
			}
		}else{
			$(document).find('.commissionRatePercent').each(function(){
				_this.getCampaignGoods($(this).attr('data-campaignid'),$(this).attr('data-shopkeeperid'),1,$(this));
			});
		}
	},
	exsitApplyList:function(arr){
		var _this = this;
		if(arr){
			for (var i=0;i<arr.length;i++){
				var t=$('#campaignId_'+arr[i].campaignId);
				if(arr[i].status==1){
					t.find('.auditStatus').html('<span class="red">(待审)</span>');
					t.find('.ApplyForPlan').html('');
				}else if(arr[i].status==2){
					t.find('.auditStatus').html('<span class="green">(已过)</span>');
					t.find('.ApplyForPlan').parent().html('<a href="javascript:void(0)" class="ExitCampaign red" data-campaignid="'+arr[i].campaignId+'">退出</a>');
				}
			}
		}
	},
	getCampaignGoods:function(campaignId,shopkeeperId,toPage,t){
		var _this = this;
		chrome.extension.sendRequest({
			type: "gajax", 
			url: 'http://pub.alimama.com/campaign/merchandiseDetail.json?campaignId='+campaignId+'&shopkeeperId='+shopkeeperId+'&userNumberId='+_this.seller_id+'&tab=2&omid='+_this.seller_id+'&toPage='+toPage+'&perPagesize=10&_input_charset=utf-8'
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.hasOwnProperty('data') == false){
					return false;
				}else if(response.data.data.hasOwnProperty('pagelist') && response.data.data.pagelist.length > 0){
					var pagelist = response.data.data.pagelist;
					for (var i=0;i<pagelist.length;i++){
						if(pagelist[i].auctionId==_this.item_id){
							var commissionRate = pagelist[i].commissionRatePercent+'%';
							t.html(commissionRate);
						}
					}
					if(toPage>50){
						t.html('请手动');
						return false;
					}else if(!commissionRate){
						_this.getCampaignGoods(campaignId,shopkeeperId,toPage+1,t);
					}
				}else{
					t.html('请手动');
				}
			}
		});
	},
	postApplyForPlan:function(campId,keeperid){ //申请定向计划
		var _this = this;
		chrome.extension.sendRequest({
			type: "pajax", 
			url: 'http://pub.alimama.com/pubauc/applyForCommonCampaign.json',
			postdata:{campId:campId,keeperid:keeperid,applyreason:_this.reason,_tb_token_:_this.token}
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.hasOwnProperty('info') == false){
					_this.nologin = true;
					_this.openLmLogin();
				}else{
					if(response.data.ok == true){
						_this.getCampaignList();
					}else{
						if(response.data.info.message != null){
							layer.alert(response.data.info.message, {icon: 5});
							$('#campaignId_'+campId).find('.ApplyForPlan').text('申请');
						}
					}
				}
			}else{
				layer.alert('网络错误或联盟登录失效', {icon: 5});
			}
		});
	},
	getPubCampaignid:function(campId){
		var _this = this;
		chrome.extension.sendRequest({
			type: "gajax",
			url: 'http://pub.alimama.com/campaign/joinedCampaigns.json?toPage=1&nickname='+encodeURIComponent(_this.seller_nick)+'&perPageSize=40&_tb_token_='+_this.token+'&_input_charset=utf-8'
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.hasOwnProperty('data') == false){
					_this.nologin = true;
					_this.openLmLogin();
				}else{
					if(response.data.data.hasOwnProperty('pagelist') && response.data.data.pagelist.length > 0){
						var pagelist = response.data.data.pagelist;
						for (var i=0;i<pagelist.length;i++){
							if(pagelist[i].campaignId==campId){
								_this.postExitCampaign(pagelist[i].id);
							}
						}
					}
				}
			}
		});
	},
	postExitCampaign:function(id){
		var _this = this;
//		get_cookie('http://pub.alimama.com/campaign/exitCampaign.json', function(cookie){
//			alert(JSON.stringify(cookie));
////			port.postMessage({content: "cookieback", question : cookie.suffix}); 
//		});
		
		chrome.extension.sendRequest({
			type: "pajax",
			url: 'http://pub.alimama.com/campaign/exitCampaign.json',
			postdata:{pubCampaignid:id
				,_tb_token_:_this.token
				}
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.ok == true){
//					alert(JSON.stringify(response));
//					console.log(JSON.stringify(response));
//					console.log(_this.token+"1111");
					_this.getCampaignList();
				}else{
					if(response.data.info.message != null){
						layer.alert(response.data.info.message, {icon: 5});
					}else{
						layer.alert('退出失败，原因未知！', {icon: 5});
					}
				}
			}else{
				layer.alert('网络错误或联盟登录失效', {icon: 5});
			}
		});
	},
	getCoupon:function(){
		var _this = this;
		_this.copywritingData.coupons = {};
		chrome.extension.sendRequest({
			type: "gajax", 
			url: 'https://cart.taobao.com/json/GetPriceVolume.do?sellerId=' + _this.seller_id
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.indexOf("priceVolumes") > 0){
					var d = JSON.parse(response.data);
					var list = d.priceVolumes;

					if(list != null && list.length > 0){
						var h = '', e = [];
						for (var i = 0; i < list.length; i++) {
							
							var activityId = list[i].id;
							var couponUrl = 'http://shop.m.taobao.com/shop/coupon.htm?sellerId='+_this.seller_id+'&activityId='+activityId;
							h+= '<tr><td class="cartCouponTitle"><i></i></td><td class="couponDate"><i></i></td><td class="couponCount" data-sellerId="'+_this.seller_id+'" data-activityId="'+activityId+'"><i></i></td><td><i></i></td><td><i></i></td><td><a href="javascript:void(0)" data-href="//shop.m.taobao.com/shop/coupon.htm?sellerId='+_this.seller_id+'&activityId='+activityId+'" class="CouponUrl blue-link">领取</a></td><td><a href="javascript:void(0)" data-clipboard-text="'+couponUrl+'" class="CopyCouponUrl blue-link">复制</a></td></tr>';
							var f = new Object();
							f['activityId'] = activityId;
							e.push(f);
							//文案界面中，优惠券选项
							_this.copywritingData.coupons[activityId] = {activity_id:activityId,coupon_url:couponUrl};
							
						}
												
						$('.HPT-plugin-bar #coupon-list').html(h);
						$('.HPT-plugin-bar #coupon-list tr').find('.couponCount').each(function(){
							_this.getCouponCount($(this).attr('data-sellerId'),$(this).attr('data-activityId'),$(this));
						});
						
//						$('#couponList').html(h);
//						$('#couponList tr').find('.couponCount').each(function(){
//							_this.getCouponCount($(this).attr('data-sellerId'),$(this).attr('data-activityId'),$(this));
//						});
					}else{
//						$('#couponList').html('');
						$('.HPT-plugin-bar #coupon-list').html('');
					}
					_this.getHiddenCoupon(e);
				}else{
//					_this.getCouponList();
					$('.HPT-plugin-bar #coupon-list').html('');
					_this.getHiddenCoupon();
				}
			}
		});
	},
	getCouponList:function(){
		var _this = this;
		chrome.extension.sendRequest({
			type: "gajax", 
			url: 'http://ff.win.taobao.com/promotion.htm?id=' + _this.seller_id + '&cc=taoke&aid=0#0'
		},function(response){
			if(response.msg == 'ok'){
				var b, c, e, f, h, k, l;
				var n = new RegExp("系统错误");
				b = response.data;
				if (n.test(b) && 20 >= _this.Num) return _this.Num++,
				void _this.getCouponList();
				if (_this.Num > 20) return;
				l = b.replace(/(\s{2,}|\n)/gim, "");
				h = /\x3c!-- 金额券 start --\x3e(.*?)\x3c!-- 金额券 end --\x3e/g;
                for (e = []; null !== (b = h.exec(l));) {
                    k = /(<span class="mod-a-a-b">(\d*\.*\d*)<\/span>|<span class="num mod-a-c-b">(.*?)有效<\/span>|<span class="num">(\d*\.*\d*)<\/span>|<span href="\/\/taoquan\.taobao\.com\/coupon\/unify_apply\.htm\?sellerId=(\d*)&activityId=(.*)" class="get-btn")/gim;
                    for (f = {}; null !== (c = k.exec(b[1]));)"undefined" != typeof c[2] && (f.amount = c[2]),
                    "undefined" != typeof c[3] && (f.time = c[3]),
                    "undefined" != typeof c[4] && (f.applyAmount = c[4]),
                    "undefined" != typeof c[5] && (f.sellerId = c[5]),
                    "undefined" != typeof c[6] && (f.activityId = c[6]);
                    e.push(f)
                }
				laytpl(_this.couponTpl).render(e, function(html){
					$('.HPT-plugin-bar #coupon-list').html(html);
					$('.HPT-plugin-bar #coupon-list tr').find('.couponCount').each(function(){
						_this.getCouponCount($(this).attr('data-sellerId'),$(this).attr('data-activityId'),$(this));
					});
				});
				_this.getHiddenCoupon(e);
			}
		});
	},
	getHiddenCoupon:function(e){
		var _this = this;
		$('.HPT-plugin #coupon-list').after('<tr id="getHiddenCoupon"><td colspan="7">正在获取隐藏券，请稍后<i></i></td></tr>');
		chrome.extension.sendRequest({
//			type: "pajax", 
//			url: 'http://plug.huopinjie.com/index.php?mod=inc&act=pluginAjax&do=Coupon',
//			postdata:{shopId:_this.seller_id,itemId:_this.item_id,coupon:JSON.stringify(e)}
			type: "gajax", 
//			url: 'http://zhushou3.taokezhushou.com/api/v1/coupons_base/'+_this.seller_id+'?item_id='+_this.item_id
			url: 'http://plug.huopinjie.com/index.php?mod=inc&do=zhushou&seller_id='+_this.seller_id+'&item_id='+_this.item_id,
		},function(response){
			console.log(JSON.stringify(response));
			if(response.msg == 'ok'){
				var d = response.data.data;
				if (d != null && d.length > 0){
					var h = '';
//					for (var i = 0; i < d.length; i++ ){
//						h+= '<tr><td class="couponTitle"><i></i></td><td class="couponDate"><i></i></td><td class="couponHiddenCount" data-sellerId="'+_this.seller_id+'" data-activityId="'+d[i].activityId+'"><i></i></td><td><i></i></td><td><i></i></td><td><a href="javascript:void(0)" data-href="//shop.m.taobao.com/shop/coupon.htm?sellerId='+_this.seller_id+'&activityId='+d[i].activityId+'" class="CouponUrl blue-link">领取</a></td><td><a href="javascript:void(0)" class="GenerateDwz blue-link">生成</a></td></tr>';
//					}
//					$('#getHiddenCoupon').empty().after(h);
//					$(document).find('.couponHiddenCount').each(function(){
//						_this.getCouponCount($(this).attr('data-sellerId'),$(this).attr('data-activityId'),$(this));
//					});
					
					for (var i = 0; i < d.length; i++ ){
						var activityId = d[i].activity_id;
						var couponUrl = 'http://shop.m.taobao.com/shop/coupon.htm?sellerId='+_this.seller_id+'&activityId='+activityId;
						h+= '<tr><td class="couponTitle"><i></i></td><td class="couponDate"><i></i></td><td class="couponHiddenCount" data-sellerId="'+_this.seller_id+'" data-activityId="'+activityId+'"><i></i></td><td><i></i></td><td><i></i></td><td><a href="javascript:void(0)" data-href="//shop.m.taobao.com/shop/coupon.htm?sellerId='+_this.seller_id+'&activityId='+activityId+'" class="CouponUrl blue-link">领取</a></td><td><a href="javascript:void(0)" data-clipboard-text="'+couponUrl+'" class="CopyCouponUrl blue-link">复制</a></td></tr>';
						//文案界面中，优惠券选项
						_this.copywritingData.coupons[activityId] = {activity_id:activityId,coupon_url:couponUrl};

					}

					$('.HPT-plugin-bar #getHiddenCoupon').empty().after(h);
					$(document).find('.HPT-plugin .couponHiddenCount').each(function(){
						_this.getCouponCount($(this).attr('data-sellerId'),$(this).attr('data-activityId'),$(this));
					});
					
				}else{
					$('.HPT-plugin-bar #getHiddenCoupon').empty();
					if (e == '' || e == undefined){
						$('.HPT-plugin-bar #coupon-list').html('<tr><td colspan="7">该商品暂无优惠券</td></tr>');
					}
				}				
			}
			
			$('.HPT-plugin #coupon-list').before('<tr id="getHiddenCoupon_hpt"><td colspan="7">正在获取隐藏券，请稍后<i></i></td></tr>');
			chrome.extension.sendRequest({
				type: "pajax", 
				url: 'http://plug.huopinjie.com/index.php?mod=inc&act=pluginAjax&do=Coupon',
				postdata:{shopId:_this.seller_id,iid:_this.item_id,coupon:JSON.stringify(e)}
			},function(response_haopintui){
				console.log(JSON.stringify(response_haopintui));
				if(response_haopintui.msg == 'ok'){
					var d = response_haopintui.data.data;
					if (d != null && d.length > 0){
						var h = '';
						for (var i = 0; i < d.length; i++ ){
							var activityId = d[i].activity_id;
							var couponUrl = 'http://shop.m.taobao.com/shop/coupon.htm?sellerId='+_this.seller_id+'&activityId='+activityId;
							h+= '<tr><td class="couponTitle"><i></i></td><td class="couponDate"><i></i></td><td class="couponHiddenCount" data-sellerId="'+_this.seller_id+'" data-activityId="'+activityId+'"><i></i></td><td><i></i></td><td><i></i></td><td><a href="javascript:void(0)" data-href="//shop.m.taobao.com/shop/coupon.htm?sellerId='+_this.seller_id+'&activityId='+activityId+'" class="CouponUrl blue-link">领取</a></td><td><a href="javascript:void(0)" data-clipboard-text="'+couponUrl+'" class="CopyCouponUrl blue-link">复制</a></td></tr>';
							//文案界面中，优惠券选项
							_this.copywritingData.coupons[activityId] = {activity_id:activityId,coupon_url:couponUrl};
						}

						$('.HPT-plugin-bar #getHiddenCoupon_hpt').empty().after(h);
						$(document).find('.HPT-plugin .couponHiddenCount').each(function(){
							_this.getCouponCount($(this).attr('data-sellerId'),$(this).attr('data-activityId'),$(this));
						});
						
					}else{
						$('.HPT-plugin-bar #getHiddenCoupon_hpt').empty();
						if (e == '' || e == undefined){
							$('.HPT-plugin-bar #coupon-list').html('<tr><td colspan="7">该商品暂无优惠券</td></tr>');
						}
					}
				}
			});

//			$('.GenerateDwz').click(function(){
//				_this.browserOpen('http://plug.huopinjie.com/index.php?mod=user&act=coupon&url='+encodeURIComponent($(this).parent().parent().find('.CouponUrl').attr('data-href'))+'&plugin=1',680,550);
////				_this.layerOpen('http://plug.huopinjie.com/index.php?mod=user&act=coupon&url='+encodeURIComponent($(this).parent().parent().find('.CouponUrl').attr('data-href'))+'&plugin=1',2,0,false,650,510);
//			});
			
			$('.HPT-plugin-bar .CouponUrl').click(function(){
				_this.layerOpen($(this).attr('data-href'),2,0,false,480,500);
			});
			
			$(function(){
				var clipboard = new Clipboard('.CopyCouponUrl');
				clipboard.on('success', function(e) {
				 //$(this).text('复制成功');
				 layer.msg('复制优惠券链接成功');
				});

				clipboard.on('error', function(e) {
					layer.msg('复制优惠券链接失败');
				});
			});
			
		});
	},
//	getCouponCount:function(sellerId,activityId,t){
//		var _this = this;
//		chrome.extension.sendRequest({
//			type: "gajax", 
//			url: 'https://shop.m.taobao.com/shop/coupon.htm?sellerId='+sellerId+'&activityId='+activityId
//		},function(response){
//			if(response.msg == 'ok'){
//				var a, b, c, d, i, o, s, e;
//				a = response.data;
//				b = a.replace(/(\s{2,}|\n)/gim, "");
//				c = /(<dt>(.*)元优惠券<\/dt><dd>剩<span class="rest">(\d*)<\/span>张（已领用<span class="count">(\d*)<\/span>张）<\/dd><dd>单笔满(.*)元可用，每人限领(.*) 张<\/dd><dd>有效期:(.*?)至(.*?)<\/dd>)/gim;
//				d = c.exec(b);
//				if(d != null){
//					t.text(d[4]);//已领
//					t.next().text(d[3]);//剩余
//					t.next().next().text(d[6]);//限领
//					t.parent('tr').find('.cartCouponTitle').text('满 '+d[5]+' 减 '+d[2]);
//					t.parent('tr').find('.couponTitle').text('满 '+d[5]+' 减 '+d[2]+'（隐藏）');
//					i = new Date(d[7]);
//					s = (i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1) + "." + (i.getDate() < 10 ? "0" + i.getDate() : i.getDate());
//					o = new Date(d[8]);
//					e = (o.getMonth() + 1 < 10 ? "0" + (o.getMonth() + 1) : o.getMonth() + 1) + "." + (o.getDate() < 10 ? "0" + o.getDate() : o.getDate());
//					t.parent('tr').find('.couponDate').text(s+' ~ '+e);
//					
//					//文案数据中添加信息
//					_this.copywritingData.coupons[activityId].coupon_start_fee = parseFloat(d[5]);
//					_this.copywritingData.coupons[activityId].coupon_fee = parseFloat(d[2]);
//					_this.copywritingData.coupons[activityId].coupon_left = parseInt(d[4]);
//					_this.copywritingData.coupons[activityId].coupon_surplus = parseInt(d[3]);
//					_this.copywritingData.coupons[activityId].coupon_expire = d[8];
//				}else{
//					t.parent('tr').remove();
//					//在文案数据中删除此优惠券数据
//					delete _this.copywritingData.coupons[activityId];
//				}
//			}
//		});
//	},
	
	getCouponCount:function(sellerId,activityId,t){
		var _this = this;
		chrome.extension.sendRequest({
			type: "gajax",
			url: 'http://uland.taobao.com/cp/coupon?activityId='+activityId+'&itemId='+this.item_id
		},function(response){
			if(response.msg == 'ok' && response.data.result){
				var result = response.data.result;
				if(result.retStatus == 0){
					t.text("-");//已领
					t.next().text("-");//剩余
					t.next().next().text("1");//限领
					t.parent('tr').find('.cartCouponTitle').text('满'+result.startFee+'减'+result.amount);
					t.parent('tr').find('.couponTitle').text('满'+result.startFee+'减'+result.amount+'（隐藏）');
					i = new Date(result.effectiveStartTime);
					s = (i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1) + "." + (i.getDate() < 10 ? "0" + i.getDate() : i.getDate());
					o = new Date( result.effectiveEndTime);
					e = (o.getMonth() + 1 < 10 ? "0" + (o.getMonth() + 1) : o.getMonth() + 1) + "." + (o.getDate() < 10 ? "0" + o.getDate() : o.getDate());
					t.parent('tr').find('.couponDate').text(s+' ~ '+e);

					//文案数据中添加信息
					_this.copywritingData.coupons[activityId].coupon_start_fee = result.startFee;
					_this.copywritingData.coupons[activityId].coupon_fee = result.amount;
					_this.copywritingData.coupons[activityId].coupon_left = 1000;
					_this.copywritingData.coupons[activityId].coupon_surplus = 1000;
					_this.copywritingData.coupons[activityId].coupon_expire = result.effectiveEndTime;
				}else{
					t.parent('tr').remove();
					//在文案数据中删除此优惠券数据
					delete _this.copywritingData.coupons[activityId];
				}
			}
		});
	},
	getHzbData:function(){
		var _this = this;
		chrome.extension.sendRequest({
			type: "pajax", 
			url: 'http://plug.huopinjie.com/index.php?mod=inc&act=pluginAjax&do=webData',
			postdata:{iid:_this.item_id}
		},function(response){
			if(response.msg == 'ok'){
//				if(response.data.login == 0){
//					_this.tqqnologin = true;
//				}
				if(response.data.version > _this.version){
					$('.HPT-plugin-b').after(response.data.update);
				}
				$('#HPT-plugin-tkad').html(response.data.tk_ad);
				$('#HPT-plugin-qqad').html(response.data.qq_ad);
				_this.footer = response.data.footer;
			}
		});
		chrome.extension.sendRequest({
			type: "pajax", 
			url: 'https://www.haopintui.net/common/userinfo.php',
			postdata:{iid:_this.item_id}
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.result&&response.data.result.map.user&&response.data.result.map.user.hasOwnProperty('user_id')){
					_this.user_id = response.data.result.map.user.user_id;
					_this.tqqnologin = false;
				}else{
					_this.tqqnologin = true;
				}
			}
		});
	},
	getQsData:function(){
		var _this = this;
		chrome.extension.sendRequest({
			type: "pajax", 
//			url: 'http://plug.huopinjie.com/index.php?mod=inc&act=pluginAjax&do=priceTrend',
			url: 'http://www.haozhebao.com/index.php?mod=inc&act=pluginAjax&do=priceTrend',
			postdata:{iid:_this.item_id,url:window.location.href}
		},function(response){
//			console.log(JSON.stringify(response));
			if(response.msg == 'ok'){
				if(response.data.status == 1){
					
					_this.chartData = response.data.priceHistory;
					$('#PricePoint').html(response.data.PricePoint);
					$('#priceTrend').html(response.data.priceTrend);
				}else{
					$('#HPT-plugin-container').html('<div class="HPT-loading">获取价格走势图失败，该商品未收录或已下架</div>');
					$('#HPT-plugin-container').after(_this.footer);
				}
			}
		});
	},
	getInputCouponInfoAndSubmit:function(){
		var _this = this;
		//读取出优惠券ID
		var url = $('#generate-copywriting-form #input_coupon_url').val();
		if(url == "" || url.length<5){
			layer.confirm('您还没有输入优惠券链接，是否前往好品推生成单商品链接的文案？',{
				icon: 3,
				btn: ['是','否'],
			},function(){
				$('#generate-copywriting-form').submit();
			});
		}else{

			var activityId = "";
			var m = /[\?|&]activity_id=(\w+)/.exec(url);
			if(m && m.length>1){
				activityId = m[1]
			}
			else{
				m = /[\?|&]activityId=(\w+)/.exec(url);
				if(m && m.length>1){
					activityId = m[1]
				}
			}


			if(activityId.length>10) {

				var currentCoupon = {};
				//如果优惠券信息存在，则直接提交
				if(_this.copywritingData.coupons[activityId]){
					currentCoupon = _this.copywritingData.coupons[activityId];
					currentCoupon.activity_id = activityId;

					var html = '';
					for(var k in currentCoupon){
						var param = currentCoupon[k];
//						html += '<input type="hidden" name="'+k+'" value="'+encodeURIComponent(param)+'">';
						html += '<input type="hidden" name="'+k+'" value="'+(param)+'">';
					}
					$('#hidden-coupon-campaign').append(html);
					$('#generate-copywriting-form').submit();
				}else {
					var couponUrl = 'https://shop.m.taobao.com/shop/coupon.htm?sellerId=' + this.seller_id + '&activityId=' + activityId;
					chrome.extension.sendRequest({
						type: "gajax",
						url: couponUrl
					}, function (response) {
						if (response.msg == 'ok') {
							var a, b, c, d;
							a = response.data;
							b = a.replace(/(\s{2,}|\n)/gim, "");
							c = /(<dt>(.*)元优惠券<\/dt><dd>剩<span class="rest">(\d*)<\/span>张（已领用<span class="count">(\d*)<\/span>张）<\/dd><dd>单笔满(.*)元可用，每人限领(.*) 张<\/dd><dd>有效期:(.*?)至(.*?)<\/dd>)/gim;
							d = c.exec(b);
							if (d != null) {

								//文案数据中添加信息
								currentCoupon.activity_id = activityId;
								currentCoupon.coupon_url = couponUrl;
								currentCoupon.coupon_start_fee = parseFloat(d[5]);
								currentCoupon.coupon_fee = parseFloat(d[2]);
								currentCoupon.coupon_left = parseInt(d[4]);
								currentCoupon.coupon_surplus = parseInt(d[3]);
								currentCoupon.coupon_expire = d[7];

								var html = '';
								for (var k in currentCoupon) {
									var param = currentCoupon[k];
//									html += '<input type="hidden" name="' + k + '" value="' + encodeURIComponent(param) + '">';
									html += '<input type="hidden" name="' + k + '" value="' + (param) + '">';
								}

								$('#hidden-coupon-campaign').append(html);
								$('#generate-copywriting-form').submit();
							}
						}
					});

				}
			}else{
				layer.alert('优惠券链接不正确，无法获取优惠券信息');
			}
		}
	},
	showCopywritingBox:function(){
		var _this = this;
		var html = "";

		//生成FORM
		html = '<div style="font-size:14px;color:#555;">'+_this.copywritingData.title+'</div><br>' +
			'<form action="http://www.'+_this.hpt_domain+'/tools.php?v='+_this.version+'" method="get" id="generate-copywriting-form"></form>';
		$('#HPT-plugin-generate-copywriting-content').empty().html(html);

		var formObj = $('#generate-copywriting-form');

		//一些商品的数据
		html = "";
		html += '<input type="hidden" name="title" value="'+_this.copywritingData.title+'">';
		html += '<input type="hidden" name="item_id" value="'+_this.copywritingData.item_id+'">';
		html += '<input type="hidden" name="item_url" value="'+_this.copywritingData.item_url+'">';
		html += '<input type="hidden" name="price_original" value="'+_this.copywritingData.price_original+'">';
		html += '<input type="hidden" name="pic_url" value="'+_this.copywritingData.pic_url+'">';
		html += '<input type="hidden" name="sales" value="'+_this.copywritingData.sales+'">';
        html += '<input type="hidden" name="seller_id" value="'+_this.copywritingData.seller_id+'">';
		formObj.append(html);

		//合适的券
		var fitCouponSelectId = null;
		//第一张优惠券
        var firstCouponSelectId = null;
		var labelInputUrl = "优惠券链接";
		//优惠券数据
		if(_this.getJsonLength(_this.copywritingData.coupons)==0){
			labelInputUrl += "（未找到隐藏优惠券，需手动填入）";
		}else {
			//存在优惠券
			html = '<div class="form-group"><label for="select-coupon">选择优惠券(请确保优惠券对该商品可用)</label><select id="select-coupon">';
			var maxCouponFee = 0;
			var minSpread = 100000;

			for (var k in _this.copywritingData.coupons) {
				var coupon = _this.copywritingData.coupons[k];
				var text = '满' + coupon.coupon_start_fee + '减' + coupon.coupon_fee + '，已领' + coupon.coupon_left + '张，剩余' + coupon.coupon_surplus + '张';
				html += '<option id="coupon_option_'+k+'" value="' + k + '">' + text + '</option>';

				//存下来第一张优惠券，作为默认备选
				if(!firstCouponSelectId)
                    firstCouponSelectId = 'coupon_option_'+k;

				//对比出最合适的优惠券
				if ((_this.copywritingData.price_original>=coupon.coupon_start_fee && coupon.coupon_fee>maxCouponFee) ||
					(_this.copywritingData.price_original>=coupon.coupon_start_fee && coupon.coupon_fee==maxCouponFee && _this.copywritingData.price_original-coupon.coupon_start_fee<=minSpread )){
                    fitCouponSelectId = 'coupon_option_'+k;
					maxCouponFee = coupon.coupon_fee;
					//商品价和可用券最小的差价
					minSpread = _this.copywritingData.price_original-coupon.coupon_start_fee;
				}
			}
			html += '<option value="custom_input">手动填入优惠券链接</option>';
			html += '</select></div>';
			formObj.append(html);

			$('#select-coupon').change(function () {
				var select_val = $('#select-coupon').val();
				if(select_val=="custom_input"){
					formObj.find('#input_coupon_url').val('');
				}else{
					var url = 'http://shop.m.taobao.com/shop/coupon.htm?activity_id='+select_val+'&seller_id='+_this.seller_id;
					formObj.find('#input_coupon_url').val(url);
				}
			})
		}

		//添加输入input
		html = '<div class="form-group"><label for="input_coupon_url">'+labelInputUrl+'</label><input class="text" id="input_coupon_url" type="text" placeholder="请输入优惠券链接 或 二合一链接"></div>';
		formObj.append(html);

		//将合适的优惠券设为默认
		var defaultCouponSelectId = fitCouponSelectId || firstCouponSelectId;
		if(defaultCouponSelectId){
			var selectOption = formObj.find('#'+defaultCouponSelectId);
			selectOption.attr('selected','selected');
			formObj.find('#input_coupon_url').val('http://shop.m.taobao.com/shop/coupon.htm?activity_id='+selectOption.val()+'&seller_id='+_this.seller_id);
		}


		//佣金计划数据
		html = '<div class="form-group"><label for="campaign">选择佣金计划</label><select id="campaign" name="campaign">';
		for(var k in _this.copywritingData.campaignRates){
			var tkRate = _this.copywritingData.campaignRates[k];
			var selected = k==_this.copywritingData.maxRateName?'selected':"";
			if(tkRate){
				html += '<option '+selected+' value="'+k+'">'+k+'佣金 '+tkRate+'%</option>';
			}

		}
		html += '</select></div>';
		formObj.append(html);

//		//如果是get方式提交，则所有input都编码encodeURIComponent
//		formObj.find('input').each(function () {
//			//有name属性的全部编码一遍
//			if($(this).attr('name')){
//				var value = encodeURIComponent($(this).val());
//				$(this).val(value);
//			}
//		});
//		//所有option也要编码
//		formObj.find('option').each(function () {
//			var value = encodeURIComponent($(this).val());
//			$(this).val(value);
//		});

		//隐藏信息层,用来插入用户所选优惠券和佣金计划的一些其他详细信息
		html = '<div id="hidden-coupon-campaign"></div>';
		formObj.append(html);

		//按钮
		html='<br><input type="button" class="btn" id="generate-copywriting-submit" value="前往好品推生成推广文案">';
		formObj.append(html);


		//点击提交按钮，插入一些用户选择的优惠券信息和佣金计划信息作为input
		$('#generate-copywriting-submit').click(function () {
			//当前选择的佣金计划
			var campaign = decodeURIComponent(formObj.find('#campaign').val());///编码，需要解码一下
			html = '<input type="hidden" name="tk_rate" value="'+encodeURIComponent(_this.copywritingData.campaignRates[campaign])+'">';
			$('#hidden-coupon-campaign').empty().html(html);

			_this.getInputCouponInfoAndSubmit();
		});

		//弹出对话框
		layer.open({
			type: 1,
			shadeClose:true,
			title: false,
			content: $('#HPT-plugin-copywritingbox'),
			area: ['760px', '500px']
		});
	},
	showTrendData:function(){
		var _this = this;
		if($('#HPT-plugin-container').html() == ''){
			$('#HPT-plugin-container').highcharts({
				chart: {
					plotBorderColor: '#E6E6E6',
					plotBorderWidth: 1
				},
				exporting: {
					enabled: true
				},
				plotOptions: {
					series: {
						shadow: false,
						lineWidth: 2
					}
				},
				title: {
					text: ''
				},
				colors: ['#fd8712'],
				xAxis: {
					type: 'datetime',
					title: {
						text: null
					},
					labels: {
						formatter: function() {
							var vDate=new Date(this.value);
							return (vDate.getMonth()+1)+"/"+vDate.getDate(); 
						},
						align: 'center'
					},
					lineWidth: 0,
					tickColor: '#E6E6E6',
					tickWidth: 1,
					tickLength: 5,
					gridLineWidth: 1,
					gridLineColor: '#E6E6E6'
				},
				yAxis: {
					title: {
						text: null
					},
					gridLineColor: '#E6E6E6'
       			},
				tooltip: {
					borderWidth: 0,
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					borderRadius: 8,
					shadow: false,
					style: {
						color:'#fff'
					},
					formatter: function() {
						return '日期：' + Highcharts.dateFormat('%Y/%m/%d', this.x) + '<br/>' + this.series.name + '：¥' + this.y;
					}
				},
				legend: {
					enabled: false
				},
				series: [{
					name: '价格',
					data: _this.chartData
				}],
			});
			$('#HPT-plugin-container').after(_this.footer);
		}
	},
	showCouponData:function(){
		var _this = this;
		if(_this.notaoke == false){
			if(_this.getUnion == false){
				_this.getUnion = true;
				_this.getCampaignList();
			}
		}else{
			$('#HPT-plugin-bar-coupon-list').html('<div class="HPT-loading">该宝贝可能已经下架或者没有加入淘宝客</div>');
		}

		if($('.HPT-plugin-bar-couponbox .HPT-footer').length == 0){
			$('#HPT-plugin-bar-coupon-list').after(_this.footer);
		}
	},
	showUnionData:function(){
		var _this = this;
		if(_this.notaoke == false){
			if(_this.getUnion == false){
				_this.getUnion = true;
				_this.getCampaignList();
			}
		}else{
			$('#HPT-plugin-lm-list').html('<div class="HPT-loading">该宝贝可能已经下架或者没有加入淘宝客</div>');
		}

		if($('.HPT-plugin-lmbox .HPT-footer').length == 0){
			$('#HPT-plugin-lm-list').after(_this.footer);
		}
	},
	showQueqiaoList:function(){
		var _this = this;
		if(_this.notaoke == true || !_this.eventRate){
			$('#HPT-plugin-queqiao-list').html('<div class="HPT-loading">该宝贝未参加鹊桥活动或已下架</div>');
			if($('.HPT-plugin-queqiaobox .HPT-footer').length == 0){
				$('#HPT-plugin-queqiao-list').after(_this.footer);
			}
			return false;
		}
		if($('#HPT-plugin-qqget').html() == ''){
			$('#HPT-plugin-qqget').html('<div class="HPT-loading"><div class="HPT-loading-img"></div><div class="HPT-loading-tip">正在获取数据，请稍候...</div></div>');
			$('#HPT-plugin-queqiao-list').after(_this.footer);
			chrome.extension.sendRequest({
				type: "pajax", 
				url: 'http://plug.huopinjie.com/index.php?mod=inc&act=pluginAjax&do=qqList',
				postdata:'iid=' + _this.item_id
			},function(response){
				if(response.msg == 'ok'){
//					console.log(response.data.data);
					$('#HPT-plugin-qqget').html(response.data.data);
					$('.HPT-plugin-tg').click(function(){
						if(_this.tqqnologin == true){
							_this.openTqqLogin();
						}else{
							var $this = $(this);
							if($this.attr('data-s') ==0){
								layer.confirm('该商品未到开始时间，现在推广只是普通佣金，是否生成？', {icon: 3},function(index){
									layer.close(index);
									_this.browserOpen('http://plug.huopinjie.com/index.php?mod=user&act=tuiguang&id='+$this.attr('data-id')+'&plugin=1',680,510);
//									_this.layerOpen('http://plug.huopinjie.com/index.php?mod=user&act=tuiguang&id='+$this.attr('data-id')+'&plugin=1',2,0,false,650,510);
								});
							}else{
								_this.browserOpen('http://plug.huopinjie.com/index.php?mod=user&act=tuiguang&id='+$this.attr('data-id')+'&plugin=1',680,510);
//								_this.layerOpen('http://plug.huopinjie.com/index.php?mod=user&act=tuiguang&id='+$this.attr('data-id')+'&plugin=1',2,0,false,650,510);
							}
						}
					});
				}else{
					$('#HPT-plugin-queqiao-list').html('<div class="HPT-loading"><div class="HPT-loading-img"></div><div class="HPT-loading-tip">网络繁忙，请稍候再试...</div></div>');
				}
				if($('.HPT-plugin-queqiaobox .HPT-footer').length == 0){
					$('#HPT-plugin-queqiao-list').after(_this.footer);
				}
			});
		}
	},
	getLmUid:function(){ //获取PID
		var _this = this;
		chrome.extension.sendRequest({
			type: "gajax", 
			url: 'http://pub.alimama.com/common/getUnionPubContextInfo.json'
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.data.hasOwnProperty('memberid')){
					_this.lmuid = response.data.data.memberid;
				}else{
					_this.nologin = true;
				}
			}
		});
	},
	getGoodsInfo:function(type,itemid,pid,webid){
		var _this = this;
		chrome.extension.sendRequest({
			type: "gajax", 
			url: 'http://pub.alimama.com/items/search.json?q='+encodeURIComponent('http://item.taobao.com/item.htm?id='+itemid)+'&perPageSize=50'
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.data.pageList != null){
					pvid = response.data.info.pvid;
					tkRate = response.data.data.pageList[0].tkRate;
					eventRate = response.data.data.pageList[0].eventRate;
					if(type==0 && eventRate == null){
						layer.confirm('该商品未开始或已过期，无法获得鹊桥佣金，<br />只能获得普通佣金，是否生成？', {icon: 3},function(index){
							layer.close(index);
							_this.getClickUrl(1,itemid,pid,webid,pvid);
						});
						return false;
					}
					if(type==0){
						$('.HPT-Plugin-eventRate').html(eventRate+'%');
					}else{
						$('.HPT-Plugin-eventRate').html(tkRate+'%');
					}
					_this.getClickUrl(type,itemid,pid,webid,pvid);
				}else{
					layer.alert('商品不存在或退出淘宝客！', {icon: 5});
				}
			}
		});
	},
	getClickUrl:function(type,itemid,pid,webid,pvid){
		var _this = this;
		var lm = $('#lm_url');
		var taoToken = $('#taoToken_url');
		var dwz = $('#lm_dwz');
		var web = $('#web_push');
		pid = pid.split("_");
		uid = parseInt(pid[0]);
		siteid = parseInt(pid[1]);
		adzoneid = parseInt(pid[2]);
		if (uid != _this.lmuid) {
			layer.alert('您选择的PID和您现在登录的联盟账号<br />PID不一致，请重新选择！', {icon: 0,btn: ['确定']});
			return false;
		}
		web.hide();
		lm.empty().addClass("disabled").append('正在生成推广链接，请稍候...');
		dwz.addClass("disabled").val('正在生成推广链接，请稍候...');
		if(type==1){
			url = 'http://pub.alimama.com/common/code/getAuctionCode.json?auctionid='+itemid+'&adzoneid='+adzoneid+'&siteid='+siteid+'&pvid='+pvid;
		}else{
			url = 'http://pub.alimama.com/common/code/getAuctionCode.json?auctionid='+itemid+'&adzoneid='+adzoneid+'&siteid='+siteid+'&scenes=3&channel=tk_qqhd&pvid='+pvid;
		}
		chrome.extension.sendRequest({
			type: "gajax", 
			url: url
		},function(response){
			if(response.msg == 'ok'){
				if(response.data.hasOwnProperty('data') == false){
					_this.nologin = true;
					_this.openLmLogin();
				}else if(response.data.data == null){
					if(response.data.info.invalidKey == 'adzoneid'){
						layer.alert('PID错误，请检查！', {icon: 5});
					}else{
						layer.alert(response.data.info.message, {icon: 5});
					}
				}else if(response.data.data.hasOwnProperty('clickUrl')){
					var clickUrl = response.data.data.clickUrl;
					var shortLinkUrl = response.data.data.shortLinkUrl;
					var taoTokenUrl = response.data.data.taoToken;
					lm.removeClass("disabled");
					lm.empty().append(clickUrl);
					taoToken.removeClass("disabled");
					taoToken.val(taoTokenUrl);
					dwz.removeClass("disabled");
					dwz.val(shortLinkUrl);
					if(type==0 && webid>0){
						web.attr({'data-id':webid,'data-url':clickUrl,'disabled':false}).val('推送商品至网站').show();
					}
					_this.getDwzUrl($('#bd_url'),clickUrl);
					_this.getWbUrl($('#wb_url'),clickUrl);
				}
			}
		});
	},
	getDwzUrl:function(t,url){ //百度短网址转换
		t.addClass("disabled").val('正在生成，请稍候...');
		chrome.extension.sendRequest({
			type: "pajax", 
			url: 'http://dwz.cn/create.php',
			postdata:{url:url}
		},function(response){
			if(response.msg == 'ok'){
				t.removeClass("disabled");
				t.val(response.data.tinyurl);
			}
		});
	},
	getWbUrl:function(t,url){ //微博短网址转换
		t.addClass("disabled").val('正在生成，请稍候...');
		chrome.extension.sendRequest({
			type: "gajax", 
			url: 'https://api.weibo.com/short_url/shorten.json?source=919944140&url_long='+encodeURIComponent(url)
		},function(response){
			if(response.msg == 'ok'){
				t.removeClass("disabled");
				t.val(response.data.urls[0].url_short);
			}
		});
	},
	getJsonLength:function (jsonData) {
		var jsonLength = 0;
		for(var item in jsonData){

			jsonLength++;

		}
		return jsonLength;
	},
	json2string:function(jsonData){
		var str = "{";
		for(var key in jsonData){
			str+='"'+key+'":"'+jsonData[key]+'",'
		}
		//去掉末尾逗号
		str=str.substring(0,str.length-1);
		str+="}";
		return str;
	},
	layerOpen:function(url,type,move,title,width,height,parameter){
		layer.open({
			type: type,
			shift:move,
			shadeClose: true,
			title: title,
			content: url,
			area: [width+'px', height+'px']
		});
	},
	browserOpen:function(url,width,height){
		var w = width;
		var h = height;
		var top = (window.screen.availHeight-30-h)/2;
		var left = (window.screen.availWidth-10-w)/2;
		window.open(url, '', 'height='+h+', width='+w+', top='+top+', left='+left+', toolbar=no, menubar=no, scrollbars=no, location=no, resizable=no, status=no');
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
	openTqqLogin:function(){
		var _this = this;
		layer.confirm('您还没登录好品推，是否立即登录？', {icon: 3},function(){
			var index = layer.confirm();
			layer.close(index);
			_this.browserOpen('https://www.haopintui.net/user.php?plug=1',680,550);
			layer.confirm('您是否已经成功登录好品推？', {
				icon: 3,
				btn: ['是','否'],
			},function(){
				window.location.reload();
			});
//			_this.layerOpen('http://plug.huopinjie.com/index.php?mod=user&act=login&url='+encodeURIComponent(window.location.href)+'&plugin=1',2,0,'登录好品推',590,550);
		});
		return false;
	},
	siteActions:function(){
		var _this = this;
		//插件加载标示
		$('.extensions-response').attr('loaded','1');
		$('.extensions-response').attr('version',_this.version);

		var extData = $('.extensions-args');
		var title = (extData.attr('title'));
		var pid = extData.attr('pid');
		var rateType = extData.attr('rate-type');
		var combo_url = extData.attr('combo-url');

		//根据二合一链接生成淘口令
		if(combo_url && combo_url.length>12){
            _this.getH5Share($('.extensions-response'),combo_url,title);
			_this.getWbUrl($('.extensions-response'),combo_url);
		}


		//单品生成文案按钮事件
		if($('.transform-simple-copywriting-btn').length>0){

			$('.transform-simple-copywriting-btn').click(function () {
				if($('.extensions-response').attr('has-transform')=='1'){
					layer.alert('已经生成单品推广文案了，请勿频繁操作。',{
						btn: ['好的我知道了']
					});
				}else{
					//layer.alert('rateType:'+rateType);
					_this.getClickUrl(rateType,_this.item_id,pid,_this.pvid,function(data){_this.transformSimpleCopywriting(_this,data)});
				}

			});
		}
//		
//		var _this = this;
//		if(window.location.href.indexOf('haopintui.net') == -1){
//			return false;
//		}
//		$('#HPT-Plugin-Data').attr('data-plugin',1);
//		$('.plugin_user_pid').click(function(){
//			_this.browserOpen('http://plug.huopinjie.com/index.php?mod=user&act=pid&plugin=1',850,600);
//			layer.confirm('您是否已经设置好您的PID？', {icon: 3},function(){
//				window.location.reload();
//			});
//		});
//
//		$('.plugin_share_desc').click(function(){
//			_this.browserOpen('http://plug.huopinjie.com/index.php?mod=user&act=share&plugin=1',680,550);
//			layer.confirm('您是否已经设置好分享内容？', {icon: 3},function(){
//				window.location.reload();
//			});
//		});
		
		$('.pid_btn').click(function(){
			var type = $(this).attr('data-type');
			var pid = $(this).attr('data-pid');
			var itemid = $(this).attr('data-itemId');
			var webid = $(this).attr('data-webId');

			if(_this.lmuid==''){
				_this.openLmLogin();
				return false;
			}

			if($('.pid_btn').hasClass("btn-primary")) {
				$('.pid_btn').removeClass("btn-primary");
			}
			$(this).addClass("btn-primary");
			_this.getGoodsInfo(type,itemid,pid,webid);
		});
		
		$('#pc_long_url').click(function(){
			_this.getDwzUrl($('#pc_bd_url'),$(this).prev().val());
			_this.getWbUrl($('#pc_wb_url'),$(this).prev().val());
		});
		$('#pc_long_url').click();
		
		$('#phone_long_url').click(function(){
			_this.getDwzUrl($('#phone_bd_url'),$(this).prev().val());
			_this.getWbUrl($('#phone_wb_url'),$(this).prev().val());
		});
		$('#phone_long_url').click();
	},
	transformSimpleCopywriting:function (_this,data) {
		var shopType = _this.is_tmall?'天猫':'淘宝';
		var url = data.shortLinkUrl;
		var tkl = data.taoToken;
		var html = '<img src="'+ _this.pic_url+'"><br>' +
			_this.title + '<br>' +
			shopType+'售价'+  _this.price +'元，已售出'+_this.sales+'件<br>' +
			'复制这条信息，打开「手机淘宝」即可下单'+tkl+'<br>' +
			'下单链接：<a href="'+url+'" target="_blank">'+url+'</a>';
		$('.copywriting .content').html(html);
		$('.extensions-response').attr('has-transform','1');

		if($('.transform-simple-copywriting-btn').length>0){
			$('.transform-simple-copywriting-btn').text('生成文案完成');
			layer.tips('生成完成', '.transform-simple-copywriting-btn', {
				tips: [1, '#f95c68'] //还可配置颜色
			});
		}

	},
	keyDisplay:function(){
		var _this = this;
		$(document).keydown(function(event) {
			if (event.target.localName != "input") {
				chrome.extension.sendRequest({type: "set"}, function(response) {
					classOpen = 'HPT-plugin-open';
					var $plugin = $('.HPT-plugin');
					var $trend = $('.HPT-plugin-trend');
					var $lm = $('.HPT-plugin-lm');
					var $queqiao = $('.HPT-plugin-queqiao');
					if (event.keyCode == response.keyPlugin) {
						if ($plugin.length > 0) {
							$plugin.slideToggle(200);
						}else{
							$plugin.fadeToggle(200);
						}
					}
//					if (event.keyCode == response.keyTrend) {
//						if ($trend.hasClass(classOpen)) {
//							$trend.removeClass(classOpen);
//						}else{
//							_this.showTrendData();
//							$trend.addClass(classOpen);
//							$lm.removeClass(classOpen);
//							$queqiao.removeClass(classOpen);
//						}
//					}
//					if (event.keyCode == response.keyTaoke) {
//						if ($lm.hasClass(classOpen)) {
//							$lm.removeClass(classOpen);
//						}else{
//							_this.showUnionData();
//							$lm.addClass(classOpen);
//							$trend.removeClass(classOpen);
//							$queqiao.removeClass(classOpen);
//						}
//					}
//					if (event.keyCode == response.keyQueqiao) {
//						if ($queqiao.hasClass(classOpen)) {
//							$queqiao.removeClass(classOpen);
//						}else{
//							_this.showQueqiaoList();
//							$queqiao.addClass(classOpen);
//							$trend.removeClass(classOpen);
//							$lm.removeClass(classOpen);
//						}
//					}
//					if (event.keyCode == response.keyLogin) {
//						if(_this.nologin == true){
//							_this.openLmLogin(1);
//						}else{
//							layer.confirm('您已经登录淘宝联盟，是否继续登录？', {
//								icon: 3,
//								btn: ['是','否'],
//							},function(){
//								_this.openLmLogin(1);
//							});
//						}
//					}
					if (event.keyCode == '13') {
						$("a.HPT-layui-layer-btn0").click();
					}
				});
			}
		});
	}
};
HPT_Plugin.init();


chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.type == 'gajax'){
//		HPT_Plugin.getLmUid();
//		$.get(request.url,request.getdata,function(data) {
//			sendResponse({
//				msg: 'ok',
//				data: data
//			});
//		});
    }
//         console.log(request.greeting);
});