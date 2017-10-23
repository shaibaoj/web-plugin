define('singleOther', ['jquery', 'underscore', 'common', 'layer', 'configInBackground', 'storage'], function($, _, Common, layer, Config, Storage) {
  var SingleOther;
  return SingleOther = (function() {
    var version;

    SingleOther.bgURL2 = '<div class="qtk_singlePage_MM"> <p>请输入你的pid:[mm_1234_1234_1234]</p> <div class="qtk_MM_a"><input type="text" size="40px" name="qtk_user_input_MM" id="qtk_user_input_MM"/></div> <div class="qtk_MM_b"><button class="qtk_mm_close" >关闭</button><button id="qtk_mm_okURL_two">生成</button></div> </div>';

    SingleOther.bgUserSelf = '<div class="qtk_singlePage_MM"><p>请输入你要转换的URL</p> <div class="qtk_MM_a"><input type="text" size="40px" name="qtk_user_input_URL" id="qtk_user_input_URL" placeholder="请输入需要转换的长链接"/></div> <div class="qtk_MM_b"><button class="qtk_mm_close" >关闭</button><button id="qtk_mm_okURL_Three">生成</button></div> </div>';

    SingleOther.bgUserCoupon = '<div class="qtk_singlePage_MM"><p>请输入要转换的优惠券URL</p> <div class="qtk_MM_a"><input type="text" size="40px" name="qtk_user_input_URL" id="qtk_user_coupon_URL" placeholder="请输入需要转换成电脑券/手机券的优惠券链接"/></div> <div class="qtk_MM_b"><button class="qtk_mm_close_Single2" >关闭</button><button id="qtk_mm_coupon">生成</button></div> </div>';

    SingleOther.showShortURLDIV = '<div id="qtk_showShortDIV"> <div class="line">联盟长链接：<input onmouseover="this.select()" onfocus="this.select()" type="text" name="taobaoUrl" id="taobaoUrl"><button class="qtk_copy_url">复制</button></div> <div class="line">联盟短链接：<input onmouseover="this.select()" onfocus="this.select()" type="text" name="taobaoSUrl" id="taobaoSUrl"><button class="qtk_copy_url">复制</button></div> <div class="line">百度短网址：<input onmouseover="this.select()" onfocus="this.select()" type="text" name="baiduUrl" id="baiduUrl"><button class="qtk_copy_url">复制</button></div> <div class="line">新浪短网址：<input onmouseover="this.select()" onfocus="this.select()" type="text" name="xinLUrl" id="xinLUrl"><button class="qtk_copy_url">复制</button></div> </div>';

    SingleOther.showCouponDIV = '<div id="qtk_showCouponDIV"> <div class="line"><div class="title">电脑优惠券</div></div> <div class="line"><span class="txt">长链：</span><input onmouseover="this.select()" onfocus="this.select()" type="text" name="pcLongCoupon" id="pcLongCoupon"><button class="qtk_copy_url">复制</button></div> <div class="line"><span class="txt">百度链接：</span><input onmouseover="this.select()" onfocus="this.select()" type="text" name="pcBaiduCoupon" id="pcBaiduCoupon"><button class="qtk_copy_url">复制</button></div> <div class="line"><span class="txt">新浪链接：</span><input onmouseover="this.select()" onfocus="this.select()" type="text" name="pcXinLaCoupon" id="pcXinLaCoupon"><button class="qtk_copy_url">复制</button></div> <div class="line"><div class="title">手机优惠券</div></div> <div class="line"><span class="txt">长链：</span><input onmouseover="this.select()" onfocus="this.select()" type="text" name="mobileLongCoupon" id="mobileLongCoupon"><button class="qtk_copy_url">复制</button></div> <div class="line"><span class="txt">百度链接：</span><input onmouseover="this.select()" onfocus="this.select()" type="text" name="mobileBaiduCoupon" id="mobileBaiduCoupon"><button class="qtk_copy_url">复制</button></div> <div class="line"><span class="txt">新浪链接：</span><input onmouseover="this.select()" onfocus="this.select()" type="text" name="mobileXinLaCoupon" id="mobileXinLaCoupon"><button class="qtk_copy_url">复制</button></div> </div>';

    SingleOther.showTaoDaoWeiXin = '<div id="qtk_showWeiXinDIV"> <div class="line"><span>联盟推广链接：</span><input type="text" name="weixin_TaobaoPushUrl" id="weixin_TaobaoPushUrl"></div> <div class="line"><span>商品普通链接：</span><input  type="text" name="weixin_TaobaoUrl" id="weixin_TaobaoUrl"><button id="weixin_ajaxHWS">获得</button></div> <div class="line"><span>商品标题：</span><input type="text" name="weixin_title" id="weixin_title"></div> <div class="line"><span>商品价格：</span><input type="text" name="weixin_price" id="weixin_price"></div> <div class="line" style="display: none;"><span>首页图片：</span><input type="text" name="weixin_FirstPic" id="weixin_FirstPic"></div> <div class="line" style="display: none;"><span>所有图片：</span><input type="text" name="weixin_AllPic" id="weixin_AllPic"></div> <div class="line"><span>商品图片:</span> <div id="hwsPic"></div></div> <div class="line divCenter"><button id="weixin_ForwardTaoDao">转换</button></div> </div>';

    SingleOther.showQRWeiXin = '<div id="qtk_showQRDIV"> <div class="line"><span>淘到微信链接：</span><input type="text" name="weixin_taodaoUrl" id="weixin_taodaoUrl"><button class="qtk_copy_url">复制</button></div> <div class="line" style="display: none"><span>百度短链二跳：</span><input  type="text" name="weixin_taodaoBaiduUrl" id="weixin_taodaoBaiduUrl"><button class="qtk_copy_url">复制</button></div> <div class="line"><span>新浪短链二跳：</span><input type="text" name="weixin_taodaoXinLangUrl" id="weixin_taodaoXinLangUrl"><button class="qtk_copy_url">复制</button></div> <div class="line qr-line"><span id="shareQR">分享二维码：</span><div id="qrcode"></div><span class="txt">用微信“扫一扫”二维码打开网页，然后分享吧！</span></div> </div>';

    SingleOther.showSaveWeiXin = '<div id="qtk_showWeiXinDIV"> <div class="line"><span>联盟推广链接：</span><input type="text" name="weixin_TaobaoPushUrl2" id="weixin_TaobaoPushUrl2"></div> <div class="line"><span>商品普通链接：</span><input  type="text" name="weixin_TaobaoUrl2" id="weixin_TaobaoUrl2"><button id="weixin_ajaxHWS2">获得</button></div> <div class="line"><span>商品标题：</span><input type="text" name="weixin_title2" id="weixin_title2"></div> <div class="line"><span>商品价格：</span><input type="text" name="weixin_price2" id="weixin_price2"></div> <div class="line" style="display:none;"><span>首页图片：</span><input type="text" name="weixin_FirstPic2" id="weixin_FirstPic2"></div> <div class="line" style="display:none;"><span>所有图片：</span><input type="text" name="weixin_AllPic2" id="weixin_AllPic2"></div> <div class="line"><span>商品图片：</span><div id="hwsPic2"></div></div> <div class="line"><span>添加到网页：</span> <div id="selectStyle"><select name="userWxTitleList" id="userWxTitleList"></select></div><a style="margin-left: 20px" href="http://www.qingtaoke.com/myWXAdd" target="_blank">新建网页</a></div> <div class="line divCenter"><button id="weixin_SaveTaoDao">添加</button></div> </div>';

    SingleOther.resultTurnLink = '<div class="qtk_turnLink_result" contenteditable="true">获取中，请稍等...</div> <a id=\"qtk_turnLink_copy\" class="qtk_2in1_btn" href="javascript:;" style="margin:15px auto 25px;">复 制</a>';

    SingleOther.skinDIV = '<div class="qtk_skin_peeler_box"> <ul> <li><span class="sky" data-skin="sky"></span><i></i><p>星空</p></li> <li><span class="sun" data-skin="sun"></span><i></i><p>夕阳</p></li> <li><span class="ink" data-skin="ink"></span><i></i><p>水墨</p></li> <li><span class="default" data-skin="default"></span><i></i><p>默认</p></li> </ul> <a href="javaScript:;" class="qtk_2in1_btn">确认</a> </div>';

    version = Common.getManifestVersion();

    function SingleOther() {}

    SingleOther.prototype.getDetailHtml = function() {
      var config, d, dtd;
      dtd = $.Deferred();
      config = new Config;
      d = $.when(config.get('detailTemplate'), config.get('defaultSkin'));
      d.done((function(_this) {
        return function(template, skin) {
          var skinClass;
          skinClass = "details-color-" + skin;
          _this.bg = '<div id="qtk_single_bg_div"> <div class="main-wrap ' + skinClass + '"> <div class="scroll-content-min clearfix"> <!--<i class="qtkLogoIcon"></i>--> <span class="qtkTextLogo">轻</span> <div class="qtk_min_data"> <span class="click-max" title="点击查看详情"><i class="qtkBgIcon1"></i> <template v-if="campaigns!==null && campaigns.length>1"><b>最高：</b><em class="red">{{commissionRateMax}}%</em></template> <template v-else><b>通用：</b><em>{{{commissionRate}}}</em></template> </span> <span title="点击查看详情" class="click-max"><i class="qtkBgIcon2"></i><b>高佣：</b><em class="">{{{eventRate}}}</em></span> <span title="点击查看详情" class="click-max"><i class="qtkBgIcon3"></i><b>隐藏券 </b> <template v-if="youHuiQuanHidden===null"><img class="loading-icon" v-bind:src="loadImageUrl"/></template> <template v-if="youHuiQuanHidden!==null"> <em v-if="youHuiQuanHidden.length<1">暂无</em> <em v-if="youHuiQuanHidden.length>0">{{youHuiQuanHidden.length}}组</em> </template> </span> <span><a href="javascript:;" class="qtkMenuLink" target="_blank"><b>官方转链</b></a></span> </div> <div class="qtk_min_btns clearfix"> <span id="qtk_min_btn_restore"></span> <span id="qtk_min_btn_close"></span> </div> </div> <div class="scroll-content"> <div class="qtk_bg_div_sec"> <div class="qtk_bg_div_sec_a"><a href="http://www.qingtaoke.com" target="_blank">轻淘客(' + version + ')</a></div> <div class="qtk_bg_div_sec_b clearfix"> <span id="qtk_single_bg_div_min"></span> <span id="qtk_single_bg_div_close"></span> </div> </div> <div class="split-line"></div> <!-- <div class="qtk_bg_notice clearfix"> <p><i></i><b>公告：</b><a href="javascript:;">轻淘客插件最新版本（v17.1.19）已更新，诚邀体验!</a></p> <div class="qtk_bg_notice_box"> <ul class="qtk_bg_notice_list"></ul> </div> </div> --> <div class="qtk_bg_div_three"> <table> <tbody> <tr> <td> <template v-if="campaigns!==null && campaigns.length>1"> <em id="qtk_commissionRatePercent" class="qtk_commissionMax">{{{commissionRateMax}}}%</em> <em id="qtk_addCommission" class="qtk_commissionMax">&yen;{{commissionMax}}</em> </template> <template v-else> <em id="qtk_commissionRatePercent">{{{commissionRate}}}</em> <em id="qtk_addCommission">{{{commission}}}</em> </template> </td> <td><em>{{{eventRate}}}</em></td> <td> <span><i class="qtkBgIcon3"></i><b></b> <template v-if="youHuiQuanHidden===null"><img class="loading-icon" v-bind:src="loadImageUrl"/></template> <template v-if="youHuiQuanHidden!==null"> <em v-if="youHuiQuanHidden.length<1">暂无</em> <em v-if="youHuiQuanHidden.length>0">{{youHuiQuanHidden.length}}组</em> </template> </span> </td> <td><a href="javascript:;" class="qtkMenuLink" target="_blank">官方转链</a></td> </tr> <tr> <td> <i class="qtkBgIcon1"></i> <b v-if="campaigns!==null && campaigns.length>1">最高定向佣金</b> <b v-else>通用佣金</b> </td> <td><i class="qtkBgIcon2"></i><b>高佣</b></td> <td><i class="qtkBgIcon3"></i><b>隐藏券</b></td> <td><i class="qtkBgIcon4"></i><b>生成链接</b></td> </tr> </tbody> </table> <p class="qtk_bg_month clearfix"> <span class="tl mb">月推广量：{{{saleNum}}}件<span style="display:none">(淘客推广占比X%)</span></span> <span class="tr mb">月支出佣金：{{{totalFee}}}元</span> <span class="tl">当前生效佣金：<b>{{curCommissionR}}</b></span> <span class="tr sp">在线人数： <b>{{{onlineNumber}}}</b> <strong class="onTips"></strong> </span> </p> </div> <div class="reasonDiv" style="display:none;">申请理由：<input type="text" id="userSubReason" maxlength="60" /></div> <div class="qtk_bg_div_four qtk_bg_div_normal"> <div class="commissionTitle"> <span><i>定向计划</i></span> </div> <table> <thead> <tr> <th style="width:35%;">计划名称</th> <th style="width:20%;">人工审核</th> <th style="width:15%;" class="textRight">单品佣比</th> <th style="width:20%;">操作</th> <th style="width:20%;">详情</th> </tr> </thead> <tbody id="reC_List"> <tr id="qtk_campaign_empty" v-show="campaigns===null"> <td colspan="5" class="textCenter">等待查询...</td> </tr> <tr v-show="campaigns!==null && campaigns.length<1"> <td colspan="5" class="textCenter">无佣金计划</td> </tr> <tr v-for="campaign in campaigns"> <td> <a title="点击查看详情" href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId={{campaign.campaignId}}&amp;shopkeeperId={{campaign.shopKeeperId}}&amp;userNumberId={{campaign.userNumberId}}" target="_blank">{{campaign.campaignName}}</a><br/><span v-if="campaign.type == 1" class="hide-plan">(隐藏计划)</span> </td> <td id="shopPlan{{campaign.campaignId}}"> <div class="leftAlignR"><span v-if="campaign.properties == 3 || campaign.properties == 2">是</span><span v-else>否</span></div> <div class="rightAlignL"> <span v-if="campaign.applyStatus == 2" style="color:#FF9D3E">(已过)</span> <span v-if="campaign.applyStatus == 1" style="color:#FF9D3E">(待审)</span> </div> </td> <td class="textRight"> <template v-if="campaign.rateInCampaign >0 ">{{campaign.rateInCampaign}}%</template> <template v-else> <span v-if="campaign.rateInCampaign === null"><a href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId={{campaign.campaignId}}&amp;shopkeeperId={{campaign.shopKeeperId}}&amp;userNumberId={{campaign.userNumberId}}" target="_blank">请手动{{campaign.rateInCampaign}}</a></span> <span v-else>查询中</span> </template> </td> <td> <template v-if="campaign.campaignId == 0"><span v-if="campaign.campaignId == 0">&nbsp;</span></template> <template v-if="campaign.campaignId != 0"> <button class="qtkApplyTask" @click="applyCampaign(campaign.campaignId,campaign.shopKeeperId)" v-if="campaign.applyDetail == null">申请</button> <button class="qtkExitTask" @click="exitCampaign(campaign.applyDetail.id)" style="color:#ff6600" v-else>退出</button> </template> </td> <td><a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId={{campaign.campaignId}}&amp;shopkeeperId={{campaign.shopKeeperId}}&amp;userNumberId={{campaign.userNumberId}}">详情</a></td> </tr> </tbody> </table> </div> <div class="qtk_coupon_div qtk_bg_div_normal"> <div class="commissionTitle"> <span><i>隐藏优惠券</i></span> </div> <table> <thead> <tr> <th style="width:25%;">隐藏优惠券</th> <th style="width:20%;">有效期</th> <th style="width:13%;">剩余数量</th> <th style="width:10%;">转微信</th> <th style="width:8%;">二合一</th> <th style="width:8%;">复制</th> <th style="width:8%;">领券</th> <th style="width:8%;">限领</th> </tr> </thead> <tbody id="qtk_coupon_body"> <tr v-for="quan in youHuiQuanHidden"> <td> <a title="点击查看券信息" href="https://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&activityId={{quan.activityId}}&sellerId={{quan.sellerId}}" target="_blank"> 满{{quan.man}}减<span v-if="quan.jian == highestCoupon && goodsPrice >= quan.man" class="cupmax"> {{quan.jian}} </span><span v-else> {{quan.jian}} </span> </a> <span v-if="goodsPrice >= quan.man" class="check" title="单价可用券">&radic;</span> </td> <td> <span>{{quan.startDate}} ~ {{quan.endDate}}</span> </td> <td> <span>{{quan.sheng}}/{{quan.sheng + quan.yiLing}}</span> </td> <td> <span @click="turnLink(0, 0, quan.activityId, quan.sellerId)" class="qtk_2in1">转微信</span> </td> <td> <span @click="turnLink(1, 0, quan.activityId, quan.sellerId)" class="qtk_2in1">转链</span> </td> <td> <span> <input type="text" value="https://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&activityId={{quan.activityId}}&sellerId={{quan.sellerId}}"> <button class="qtk_couponCopy">复制</button> </span> </td> <td> <a @click="receiveCoupons(quan.activityId, quan.sellerId)" href="javascript:;" class="qtk_receive_coupons">领券</a> </td> <td>{{quan.xianling}}</td> </tr> <tr v-show="youHuiQuanHidden==null || youHuiQuanHidden.length<1 "> <td colspan="8" class="textCenter">未登录淘宝或暂无隐藏优惠券</td> </tr> </tbody> </table> </div> <div class="qtk_coupon_div qtk_bg_div_normal"> <div class="commissionTitle"> <span><i>店铺优惠券</i></span> </div> <table> <thead> <tr> <th style="width:25%;">店铺优惠券</th> <th style="width:20%;">有效期</th> <th style="width:13%;">剩余数量</th> <th style="width:10%;">转微信</th> <th style="width:8%;">二合一</th> <th style="width:8%;">复制</th> <th style="width:8%;">领券</th> <th style="width:8%;">限领</th> </tr> <tbody id="qtk_coupon_body"> <tr class="youHuiQuanShop" v-show="youHuiQuanShop === null"> <td colspan="8" class="textCenter">等待查询...</td> </tr> <tr class="youHuiQuanShop" v-show="youHuiQuanShop === 0"> <td colspan="8" class="textCenter">请刷新重试！</td> </tr> <tr class="youHuiQuanShop" v-show="youHuiQuanShop!==null && youHuiQuanShop!==0 && youHuiQuanShop.length<1"> <td colspan="8" class="textCenter">未登录淘宝或暂无店铺优惠券</td> </tr> <tr class="youHuiQuanShop" v-for="quanShop in youHuiQuanShop"> <td> <a href="https://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&activityId={{quanShop.activityId}}&sellerId={{quanShop.sellerId}}" target="_blank"> 满{{quanShop.man}}减 <span v-if="quanShop.jian == highestCoupon && goodsPrice >= quanShop.man" class="cupmax"> {{quanShop.jian}} </span><span v-else> {{quanShop.jian}} </span> </a> <span v-if="goodsPrice >= quanShop.man" class="check" title="单价可用券">&radic;</span> </td> <td> <span>{{quanShop.startDate}} ~ {{quanShop.endDate}}</span> </td> <td> <span>{{quanShop.sheng}}/{{quanShop.sheng + quanShop.yiLing}}</span> </td> <td> <span @click="turnLink(0, 0, quanShop.activityId, quanShop.sellerId)" class="qtk_2in1">转微信</span> </td> <td> <span @click="turnLink(1, 0, quanShop.activityId,quanShop.sellerId)" class="qtk_2in1">转链</span> </td> <td> <span> <input type="text" value="https://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&activityId={{quanShop.activityId}}&sellerId={{quanShop.sellerId}}"> <button class="qtk_couponCopy">复制</button> </span> </td> <td> <a @click="receiveCoupons(quanShop.activityId, quanShop.sellerId)" href="javascript:;" class="qtk_receive_coupons">领券</a> </td> <td>{{quanShop.xianling}}</td> </tr> </tbody> </table> </div> <div class="qtk_bg_div_new_magpie qtk_bg_div_normal"> <div class="commissionTitle"> <span><i>高佣推广</i></span> </div> <table id="qtksort-magpie-table"> <thead> <th>高佣比例</th> <th>分成</th> <th>实得</th> <th>佣金</th> <th>自购</th> <th>剩余</th> <th>官方生成</th> </thead> <tbody id="qtk_magpieGoodsList"> <template v-if="highCommissionMagpie == 0"> <tr> <td colspan="8" class="textCenter">等待查询...</td> </tr> </template> <template v-if="highCommissionMagpie != 0"> <tr v-if="highCommissionMagpie == null"> <td colspan="7" class="textCenter">无高佣活动</td> </tr> <tr v-if="highCommissionMagpie"> <td> {{highCommissionMagpie.eventRate}}% </td> <td> {{highCommissionMagpie.fenCheng}}% </td> <td> {{highCommissionMagpie.zhongfen}}% </td> <td> {{highCommissionMagpie.commission}} </td> <td> {{highCommissionMagpie.buySelf}} </td> <td> {{highCommissionMagpie.dayLeft}}天 </td> <td> <a href="http://pub.alimama.com/promo/item/channel/index.htm?q={{highCommissionMagpie.url}}&channel=qqhd" target="_blank">官方生成</a> </td> </tr> </template> </tbody> </table> </div> <div style="display:none" class="qtk_bg_div_five qtk_bg_div_normal qtk_bg_old_magpie"> <div class="commissionTitle"> <span><i>老鹊桥活动</i></span> </div> <table id="qtksort-table"> <thead> <tr> <th style="width:12%;">鹊桥ID</th> <th style="width:8%;">佣比</th> <th style="width:10%;">开始</th> <th style="width:10%;">结束</th> <th style="width:7%;">分成</th> <th style="width:10%;">实得</th> <th style="width:10%;">佣金</th> <th style="width:10%;">自购</th> <th style="width:7%;">剩余</th> <th style="width:7%;">推广</th> <th style="width:9%;">生成</th> </tr> </thead> <tbody id="qtk_searchGoodsList"> <tr> <td colspan="12" class="textCenter">等待查询...</td> </tr> </tbody> </table> </div> </div> </div> </div>';
          return dtd.resolve(_this.bg);
        };
      })(this));
      return dtd;
    };

    SingleOther.prototype.setCountSize = function() {
      var config, dd;
      config = new Config();
      dd = $.when(config.get('isDefaultCount'));
      return dd.done((function(_this) {
        return function(isDefaultCount) {
          if (isDefaultCount === '0') {
            $("#qtk_single_bg_div").addClass("min");
            $(".scroll-content").css("display", "none");
            return $(".scroll-content-min").css("display", "block");
          } else {
            $("#qtk_single_bg_div").removeClass("min");
            $(".scroll-content").css("display", "block");
            return $(".scroll-content-min").css("display", "none");
          }
        };
      })(this));
    };

    SingleOther.prototype.reBgUrl2 = function(v) {
      var bgURL2, i, item, key, len, textMenu, tt_tmp;
      textMenu = "<div style='color:#373636;margin-left:10px;font-size:12px;'>或选择您的pid：<span id='pageDownLoad'></span>";
      if ($.isEmptyObject(v)) {
        textMenu += "<div><p>您没有保存pid，您还可以<a target='_blank' href='http://www.qingtaoke.com/myAlimama'>添加PID</a></p></div>";
      }
      item = '';
      if (typeof v !== 'undefined') {
        for (i = 0, len = v.length; i < len; i++) {
          key = v[i];
          tt_tmp = 'mm_' + key['aid'] + '_' + key['siteId'] + '_' + key['adzoneId'];
          item += "<div class='userQID' data-pid='" + tt_tmp + "'><span>" + key['alias'] + "<em>" + tt_tmp + "</em></span></div>";
        }
      }
      textMenu += item;
      textMenu += "</div>";
      bgURL2 = "<div class='qtk_singlePage_MM'> <p class='qtk_singlePage_p'>请输入您的<a href='http://www.qingtaoke.com/help/detail?id=10' target='_blank'>pid</a>(<a style='font-size: 12px;' target='_blank' href='http://www.qingtaoke.com/myAlimama' >pid管理</a>):</p> <div class='qtk_MM_pidList'>" + textMenu + "</div> <div class='qtk_MM_a'><input type='text' style='text-align: center' size='40px' name='qtk_user_input_MM' id='qtk_user_input_MM'/></div> <div class='qtk_MM_b'><button class='qtk_mm_close' >关闭</button><button id='qtk_mm_okURL_two'>生成</button></div> </div>";
      return bgURL2;
    };

    SingleOther.prototype.openTurnLinkBG = function(pidList, template, couponLink, index, price) {
      var goodsLink, i, imageBox, item, len, oTurnLink, pInfo, ref, storage, textMenu, value;
      goodsLink = window.location.href;
      storage = new Storage;
      Promise.resolve(storage.get('PID')).then((function(_this) {
        return function(pid) {
          return $("#qtk_user_input_MM").val(pid);
        };
      })(this));
      imageBox = $("ul#J_UlThumb").html();
      if (pidList['errorCode']) {
        pidList = {
          pagelist: null
        };
      }
      item = "";
      value = "";
      textMenu = "";
      if (pidList.pagelist !== null) {
        value = "block";
        ref = pidList.pagelist;
        for (i = 0, len = ref.length; i < len; i++) {
          pInfo = ref[i];
          item += "<div class='qtk_2in1_pid_options userQID1' title='" + pInfo['name'] + "' data-pid='" + pInfo['adzonePid'] + "'>" + "<span class='pid-name'>" + pInfo['name'] + "</span> | " + "<span class='pid-number'>" + pInfo['adzonePid'] + "</span></div>";
        }
      } else {
        value = "none";
        item = "<div class=\"qtk_2in1_pid_none\">未登录淘宝联盟或未添加PID，请登录<a target='_blank' href='http://www.alimama.com/member/login.htm'>淘宝联盟</a>并<a target='_blank' href='http://pub.alimama.com/myunion.htm?#!/manage/site/site?tab=4&toPage=1'>添加PID</a></div>";
      }
      textMenu += item;
      oTurnLink = "<div class=\"qtk_turnLink_change\"><a href=\"javascript:;\">显示话术模板</a></div> <div class=\"qtk_turnLink\"> <div class=\"qtk_turnLink_setting clear\"> <span class=\"qtk_turnLink_setting_title\">设置话术模板：</span> <ul class=\"qtk_turnLink_setting_options\"> <li><a href=\"javascript:;\" data-value=\"{图片}\">{图片}</a></li> <li><a href=\"javascript:;\" data-value=\"{标题}\">{标题}</a></li> <li><a href=\"javascript:;\" data-value=\"{优惠券面额}\">{优惠券面额}</a></li> <li><a href=\"javascript:;\" data-value=\"{券后价}\">{券后价}</a></li> <li><a href=\"javascript:;\" data-value=\"{推广文案}\">{推广文案}</a></li> <li><a href=\"javascript:;\" data-value=\"{短连接}\">{短连接}</a></li> <li><a href=\"javascript:;\" data-value=\"{淘口令}\">{淘口令}</a></li> <li><a href=\"javascript:;\" data-value=\"{商品价格}\">{商品价格}</a></li> <li><a href=\"javascript:;\" data-value=\"{月销量}\">{月销量}</a></li> </ul> </div> <p class=\"qtk_turnLink_setting_tips\">请勿在文案中输入￥，会和淘口令冲突。<a href=\"javascript:;\" class=\"qtk_turnLink_empty_template\">清空模板</a><a href=\"javascript:;\" class=\"qtk_turnLink_default_template\">默认模板</a><a href=\"javascript:;\" class=\"qtk_turnLink_save_template\">保存模板</a></p> <textarea class=\"qtk_turnLink_setting_template qtk_turnLink_textarea\">" + template + "</textarea> </div> <div class=\"qtk_2in1_line clearfix\"> <label>商品链接：</label> <input type=\"text\" name='qtk_2in1_goods_link' value=\"" + goodsLink + "\"> </div> <div class=\"qtk_2in1_line clearfix\"> <label>优惠券链接：</label> <input type=\"text\" name='qtk_2in1_coupon_link' value=\"" + couponLink + "\"> </div> <div class=\"qtk_2in1_line qtk_2in1_pid clearfix\"> <label>选择PID：</label> <div class=\"qtk_2in1_pid_box\"> <input id=\"qtk_user_input_MM\" type=\"text\" value=\"\" placeholder=\"请选择PID，未设置PID请手动输入\"> <i class=\"qtk_2in1_select_btn\"></i> </div> <div class=\"qtk_2in1_pid_select\">" + textMenu + "</div> <a href=\"http://pub.alimama.com/myunion.htm?#!/manage/zone/zone?tab=3&toPage=1\" target=\"_blank\" class=\"manage_pid\">管理</a> </div> <div class=\"qtk_2in1_line qtk_2in1_radio clearfix\"> <label>佣金方式：</label> <div class=\"qtk_2in1_radio_box clearfix\"> <input id=\"qtk_2in1_radio_gy\" name=\"qtk_2in1_type\" type=\"radio\" value=\"\"> <label for=\"qtk_2in1_radio_gy\">高佣优先</label> </div> <div class=\"qtk_2in1_radio_box clearfix\"> <input id=\"qtk_2in1_radio_jh\" name=\"qtk_2in1_type\" type=\"radio\" value=\"1\" checked=\"checked\"> <label for=\"qtk_2in1_radio_jh\">计划优先</label> </div> <a href=\"javascript:alert(\'高佣优先：当有高佣时走高佣，没高佣时走通用。计划优先：如有生效的定向计划则走定向计划，否则走通用。\');\">使用说明</a> </div> <div class=\"qtk_2in1_line qtk_weChat_text clearfix\"> <label>推广文案：</label> <textarea class=\"qtk_weChat_text_box\" name=\"qtk_weChat_text_box\" placeholder=\"限制200字，25字内最佳显示\"></textarea> <a href=\"javascript:;\" class=\"qtk_other_copy\">其他文案</a><span class=\"new\">New</span> </div> <div class=\"qtk_2in1_line qtk_2in1_price clearfix\"> <label>价  格：</label> <div class=\"qtk_2in1_price_box clearfix\"> <input name=\"price\" type=\"text\" value=\"" + price.G + "\">元 <span>券后价：<em name=\"used_price\">" + price.Y + "</em>元</span> </div> </div> <div class=\"qtk_2in1_line qtk_2in1_picture clearfix\" style=\"height:auto!important;\"> <label>选择展示图：</label> <div class=\"qtk_2in1_picture_box clearfix\"> <ul class=\"clearfix\">" + imageBox + "</ul> </div> </div> <a class=\"qtk_2in1_btn\" href=\"javascript:;\" data-index=\"" + index + "\">生成</a>";
      return oTurnLink;
    };

    SingleOther.prototype.menuTurnLinkBG = function(pidList, template, index) {
      var i, item, len, mTurnLink, pInfo, ref, storage, textMenu, value;
      storage = new Storage;
      Promise.resolve(storage.get('PID')).then((function(_this) {
        return function(pid) {
          return $("#qtk_user_input_MM").val(pid);
        };
      })(this));
      if (pidList['errorCode']) {
        pidList = {
          pagelist: null
        };
      }
      item = "";
      value = "";
      textMenu = "";
      if (pidList.pagelist !== null) {
        value = "block";
        ref = pidList.pagelist;
        for (i = 0, len = ref.length; i < len; i++) {
          pInfo = ref[i];
          item += "<div class='qtk_2in1_pid_options userQID1' title='" + pInfo['name'] + "' data-pid='" + pInfo['adzonePid'] + "'>" + "<span class='pid-name'>" + pInfo['name'] + "</span> | " + "<span class='pid-number'>" + pInfo['adzonePid'] + "</span></div>";
        }
      } else {
        value = "none";
        item = "<div class=\"qtk_2in1_pid_none\">未登录淘宝联盟或未添加PID，请登录<a target='_blank' href='http://www.alimama.com/member/login.htm'>淘宝联盟</a>并<a target='_blank' href='http://pub.alimama.com/myunion.htm?#!/manage/site/site?tab=4&toPage=1'>添加PID</a></div>";
      }
      textMenu += item;
      mTurnLink = "<div class=\"qtk_turnLink qtk_turnLink_menu\"> <div class=\"qtk_turnLink_setting clear\"> <span class=\"qtk_turnLink_setting_title\">设置话术模板：</span> <ul class=\"qtk_turnLink_setting_options\"> <li><a href=\"javascript:;\" data-value=\"{图片}\">{图片}</a></li> <li><a href=\"javascript:;\" data-value=\"{标题}\">{标题}</a></li> <li><a href=\"javascript:;\" data-value=\"{优惠券面额}\">{优惠券面额}</a></li> <li><a href=\"javascript:;\" data-value=\"{券后价}\">{券后价}</a></li> <li><a href=\"javascript:;\" data-value=\"{推广文案}\">{推广文案}</a></li> <li><a href=\"javascript:;\" data-value=\"{短连接}\">{短连接}</a></li> <li><a href=\"javascript:;\" data-value=\"{淘口令}\">{淘口令}</a></li> <li><a href=\"javascript:;\" data-value=\"{商品价格}\">{商品价格}</a></li> <li><a href=\"javascript:;\" data-value=\"{月销量}\">{月销量}</a></li> </ul> </div> <p class=\"qtk_turnLink_setting_tips\">请勿在文案中输入￥，会和淘口令冲突。<a href=\"javascript:;\" class=\"qtk_turnLink_empty_template\">清空模板</a><a href=\"javascript:;\" class=\"qtk_turnLink_default_template\">默认模板</a><a href=\"javascript:;\" class=\"qtk_turnLink_save_template\">保存模板</a></p> <textarea class=\"qtk_turnLink_setting_template qtk_turnLink_textarea\">" + template + "</textarea> <p class=\"qtk_turnLink_setting_tips\">必须输入相匹配的优惠券和商品，否则打不开。不支持淘宝外部短链接。</p> <textarea class=\"qtk_turnLink_setting_other qtk_turnLink_textarea\" placeholder=\"你可以输入优惠券地址和商品普通地址\nhttps://detail.tmall.com/item.htm?id=xxxxxx\nhttps://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&sellerId=xxxxxx&activityId=xxxxxx\n\n或者别人的二合一链接（网址不带“?e=”的）\nhttp://uland.taobao.com/coupon/edetail?activityId=xxxxxxx\"></textarea> <div class=\"qtk_2in1_line qtk_2in1_pid clearfix\"> <label>选择PID：</label> <div class=\"qtk_2in1_pid_box\"> <input id=\"qtk_user_input_MM\" type=\"text\" value=\"\" placeholder=\"请选择PID，未设置PID请手动输入\"> <i class=\"qtk_2in1_select_btn\"></i> </div> <div class=\"qtk_2in1_pid_select\">" + item + "</div> <a href=\"http://pub.alimama.com/myunion.htm?#!/manage/zone/zone?tab=3&toPage=1\" target=\"_blank\" class=\"manage_pid\">管理</a> </div> <div class=\"qtk_2in1_line qtk_2in1_radio clearfix\"> <label>佣金方式：</label> <div class=\"qtk_2in1_radio_box clearfix\"> <input id=\"qtk_2in1_radio_gy\" name=\"qtk_2in1_type\" type=\"radio\" value=\"\"> <label for=\"qtk_2in1_radio_gy\">高佣优先</label> </div> <div class=\"qtk_2in1_radio_box clearfix\"> <input id=\"qtk_2in1_radio_jh\" name=\"qtk_2in1_type\" type=\"radio\" value=\"1\" checked=\"checked\"> <label for=\"qtk_2in1_radio_jh\">计划优先</label> </div> <a href=\"javascript:alert(\'高佣优先：当有高佣时走高佣，没高佣时走通用。计划优先：如有生效的定向计划则走定向计划，否则走通用。\');\">使用说明</a> </div> <a class=\"qtk_2in1_btn\" href=\"javascript:;\">生成</a> </div>";
      return mTurnLink;
    };

    SingleOther.prototype.resultTurnLinkBG = function(number) {
      var resultTurnLink, resultTurnLink1, resultTurnLink2;
      resultTurnLink1 = "<div class=\"qtk_2in1_line qtk_2in1_times\">每天可转 200 次，当前剩余 <span></span> 次。</div>";
      resultTurnLink2 = "<div class=\"qtk_2in1_line qtk_2in1_result clearfix\"> <label>链接地址：</label> <input  class=\"qtk_2in1_result_link qtk_2in1_result_1\" type=\"text\" value=\"获取中，请稍等\"> <a class=\"qtk_coupon2in1\" href=\"javascript:;\">复制</a> </div> <div class=\"qtk_2in1_line qtk_2in1_result clearfix\"> <label>淘口令：</label> <input class=\"qtk_2in1_result_taokouling qtk_2in1_result_2\" type=\"text\" value=\"获取中，请稍等\"> <a class=\"qtk_tkl2in1\" href=\"javascript:;\">复制</a> </div> <div class=\"qtk_turnLink_result\" contenteditable=\"true\" id=\"qtk_copyClip\">获取中，请稍等...</div> <a class=\"qtk_2in1_btn\" href=\"javascript:;\" id=\"qtk_turnLink_copy\">复 制</a>";
      if (number) {
        resultTurnLink = resultTurnLink1 + resultTurnLink2;
      } else {
        resultTurnLink = resultTurnLink2;
      }
      return resultTurnLink;
    };

    SingleOther.prototype.reBgUrl = function(v) {
      var bgURL, i, item, key, len, storage, textMenu, tt_tmp;
      Common.log('print pidList');
      Common.log(v);
      textMenu = "<div style='color:#373636;margin-left:10px;font-size:12px;'>或选择您的pid：<span id='pageDownLoad'></span>";
      if ($.isEmptyObject(v)) {
        textMenu += "<div><p>您没有保存pid，您还可以<a target='_blank' href='http://www.qingtaoke.com/myAlimama'>添加PID</a></p></div>";
      } else {
        item = '';
        for (i = 0, len = v.length; i < len; i++) {
          key = v[i];
          tt_tmp = 'mm_' + key['aid'] + '_' + key['siteId'] + '_' + key['adzoneId'];
          item += "<div class='userQID' data-pid='" + tt_tmp + "'><span>" + key['alias'] + "<em>" + tt_tmp + "</em></span></div>";
        }
        textMenu += item;
      }
      textMenu += "</div>";
      storage = new Storage;
      Promise.resolve(storage.get('MMPID')).then((function(_this) {
        return function(MMPID) {
          return $("#qtk_user_input_MM").val(MMPID);
        };
      })(this));
      bgURL = "<div class='qtk_singlePage_MM'> <p class='qtk_singlePage_p'>请输入您的<a href='http://www.qingtaoke.com/help/detail?id=10' target='_blank'>pid</a>(<a style='font-size: 12px;' target='_blank' href='http://www.qingtaoke.com/myAlimama' >pid管理</a>):</p> <div class='qtk_MM_pidList'>" + textMenu + "</div> <div class='qtk_MM_a'><input type='text' size='40px' name='qtk_user_input_MM' id='qtk_user_input_MM' placeholder='请输入pid信息'/></div> <div class='qtk_MM_b'><button class='qtk_mm_close' >关闭</button><button id='qtk_mm_okURL'>生成</button></div> </div>";
      return bgURL;
    };

    SingleOther.prototype.picCopyBoxBG = function(picList, copyList) {
      var HTML;
      HTML = "<div class=\"qtk_highPicCopy_box clearfix\"> <div class=\"qtk_highPicCopy_box_left\"> <div class=\"qtk_highPicCopy_box_pic\"><ul class=\"clearfix\">" + picList + "</ul></div> <div class=\"qtk_highPicCopy_box_title\">文案替换</div> <div class=\"qtk_highPicCopy_box_copy\"><ul class=\"clearfix\">" + copyList + "</ul></div> </div> <div class=\"qtk_highPicCopy_box_right\"><a href=\"javascript:;\">复制</a></div> </div>";
      return HTML;
    };

    SingleOther.prototype.getMenu = function(vuname, vtime, version) {
      var menu, settingUrl, update;
      if (vuname === null) {
        vuname = '<a href="http://www.qingtaoke.com/login" target="_blank" class="qtk_login">点击登录</a>';
      }
      if (vtime === null) {
        vtime = '';
      }
      if (version.status === 0) {
        update = "none";
      } else {
        update = "block";
      }
      settingUrl = chrome.runtime.getURL("/html/popup.html");
      menu = '<div class="qtk_singlePage_content"> <div class="qtk_edition_tips" style="display:' + update + ';"> <p>检测到新版本，<a href="http://www.qingtaoke.com/chajian" target="_blank">点击下载</a><i></i></p> </div> <div class="qtk_skin_peeler"></div> <div class="username-wrap"> <div class="username"><i></i><b>' + vuname + '</b></div> <span class="optionsBtn qtk_setting_btn"></span> </div> <div class="qtk_plugIn_search"> <form name="qtk_search" action="http://www.qingtaoke.com/?r=default/index&s_type=1&" method="get" accept-charset="utf-8" target="_blank"> <input type="text" name="title" placeholder="可搜索商品内容，链接或id" autocomplete="off"> <span class="qtk_plugIn_searchBtn"></span> </form> </div> <ul class="menu clearfix"> <li class="findGoodsCommission"><i class="pageIcon1"></i><b>查佣金</b></li> <li class="splitline_1"></li> <li class=""><a href="javascript:;" target="_blank" class="qtkMenuLink"><i class="pageIcon2"></i><b>官方转链</b></a></li> <li class="splitline_1"></li> <li class="qtkMenu2in1"><i class="pageIcon3"></i><b>转二合一</b></li> <li class="splitline_2"></li> <li style="display:none;"><i class="pageIcon4"></i><b>转微信页</b></li> <li class="qtkTurnLink"><i class="pageIcon4"></i><b>转微信页</b></li> <li class="splitline_1"></li> <li class="qtkMenuShortURL"><i class="pageIcon5"></i><b>转短网址</b></li> <li class="splitline_1"></li> <li class="qtkMenuYouHui" id="qtk_youhui_juan"><i class="pageIcon6"></i><b>优惠券互转</b></li> <li style="display:none;" class="splitline_2"></li> <li style="display:none;" class="splitline_1"></li> <li style="display:none;" class="qtkMenuChangeUrl">转淘客链接</li> <li style="display:none;"><span class="qtkMenuCollectionk">收藏该商品</span><em id="qtk_user_is_result">等待...</em></li> <li style="display:none;"><a target="_blank" href="http://www.qingtaoke.com/collect">我的收藏</a></li> <li style="display:none;"><a target="_blank" href="http://www.qingtaoke.com/lianjiezhuanhuan">批量链接转换</a></li> <li style="display:none;"><a target="_blank" href="#">批量申请推广计划</a></li> <li style="display:none;"><i class="pageIcon4"></i><a target="_blank" href="http://queqiao.qingtaoke.com/search">搜索鹊桥商品</a></li> <li style="display:none;" class="editBg"><i class="pageIcon5"></i>一键生成发群内容</li> <li style="display:none;"><i class="pageIcon6"></i><a target="_blank" href="http://bbs.qingtaoke.com/forum.php?gid=43">帮助中心</a></li> <li class="splitline_2"></li> <li class="qtkMenuQuickNav"> <span class="qtkMenuQuickNavBtn"><i class="pageIcon7"></i><b>快捷导航</b></span> <div class="qtkMenuQuickNavs"> <i class="arrowBg"></i> <i class="arrowBorder"></i> <a target="_blank" href="http://pub.alimama.com/">联盟中心</a> <a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/report/site/site">媒体效果</a> <a target="_blank" href="http://pub.alimama.com/myunion.htm?#!/report/detail/taoke">成交明细</a> <a target="_blank" href="http://pub.alimama.com/promo/search/index.htm?queryType=2&f=qtk">超级搜索</a> <a target="_blank" href="http://pub.alimama.com/promo/item/channel/index.htm?channel=qqhd&f=qtk">高佣频道</a> </div> </li> <li class="qtkDaShuJu"> <a href="http://www.qingtaoke.com/dashuju" target="_blank"><i class="pageIcon9"></i><b>大数据榜单</b></a> <div class="NewTips"></div> </li> <li class="splitline_1"></li> <li class="qtkHighPicCopy"><i class="pageIcon8"></i><div class="HPCTips"></div><b>优质图文</b></li> <li class="splitline_1"></li> </ul> <div class="botMenu clearfix"> <a href="javascript:;" onclick="javascript:window.open(\'http://wpa.qq.com/msgrd?v=3&uin=3001158225&site=qq&menu=yes\', \'_blank\', \'height=502, width=644,toolbar=no,scrollbars=no,menubar=no,status=no\');"><i class="botMenuIcon1"></i><b>在线客服</b></a> <a href="http://www.qingtaoke.com/help?menu=13" target="_blank"><i class="botMenuIcon2"></i><b>帮助中心</b></a> <a href="http://www.qingtaoke.com/fk/cj" target="_blank"><i class="botMenuIcon3"></i><b>反馈</b></a> </div> </div>';
      return menu;
    };

    SingleOther.prototype.getTurnLink = function(pidList, template) {
      var bgTurnLink, i, item, len, pInfo, ref, storage, textMenu, value;
      storage = new Storage;
      Promise.resolve(storage.get('PID')).then((function(_this) {
        return function(pid) {
          return $("#qtk_user_input_MM").val(pid);
        };
      })(this));
      if (pidList['errorCode']) {
        pidList = {
          pagelist: null
        };
      }
      item = "";
      value = "";
      textMenu = "";
      if (pidList.pagelist !== null) {
        value = "block";
        ref = pidList.pagelist;
        for (i = 0, len = ref.length; i < len; i++) {
          pInfo = ref[i];
          item += "<div class='qtk_2in1_pid_options userQID1' title='" + pInfo['name'] + "' data-pid='" + pInfo['adzonePid'] + "'>" + "<span class='pid-name'>" + pInfo['name'] + "</span> | " + "<span class='pid-number'>" + pInfo['adzonePid'] + "</span></div>";
        }
      } else {
        value = "none";
        item = "<div class=\"qtk_2in1_pid_none\">未登录淘宝联盟或未添加PID，请登录<a target='_blank' href='http://www.alimama.com/member/login.htm'>淘宝联盟</a>并<a target='_blank' href='http://pub.alimama.com/myunion.htm?#!/manage/site/site?tab=4&toPage=1'>添加PID</a></div>";
      }
      textMenu += item;
      bgTurnLink = "<div class=\"qtk_turnLink\"> <div class=\"qtk_turnLink_setting clear\"> <span class=\"qtk_turnLink_setting_title\">设置话术模板：</span> <ul class=\"qtk_turnLink_setting_options\"> <li><a href=\"javascript:;\" data-value=\"{图片}\">{图片}</a></li> <li><a href=\"javascript:;\" data-value=\"{标题}\">{标题}</a></li> <li><a href=\"javascript:;\" data-value=\"{优惠券面额}\">{优惠券面额}</a></li> <li><a href=\"javascript:;\" data-value=\"{券后价}\">{券后价}</a></li> <li><a href=\"javascript:;\" data-value=\"{推广文案}\">{推广文案}</a></li> <li><a href=\"javascript:;\" data-value=\"{短连接}\">{短连接}</a></li> <li><a href=\"javascript:;\" data-value=\"{淘口令}\">{淘口令}</a></li> <li><a href=\"javascript:;\" data-value=\"{商品价格}\">{商品价格}</a></li> <li><a href=\"javascript:;\" data-value=\"{月销量}\">{月销量}</a></li> </ul> </div> <p class=\"qtk_turnLink_setting_tips\">请勿在文案中输入￥，会和淘口令冲突。<a href=\"javascript:;\" class=\"qtk_turnLink_empty_templet\">清空模板</a><a href=\"javascript:;\" class=\"qtk_turnLink_default_templet\">默认模板</a><a href=\"javascript:;\" class=\"qtk_turnLink_save_templet\">保存模板</a></p> <textarea class=\"qtk_turnLink_setting_result qtk_turnLink_textarea\">" + template + "</textarea> <p class=\"qtk_turnLink_setting_tips\">必须输入相匹配的优惠券和商品，否则打不开。不支持淘宝外部短链接。</p> <textarea class=\"qtk_turnLink_setting_other qtk_turnLink_textarea\" placeholder=\"你可以输入优惠券地址和商品普通地址\nhttps://detail.tmall.com/item.htm?id=xxxxxx\nhttps://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&sellerId=xxxxxx&activityId=xxxxxx\n\n或者别人的二合一链接（网址不带“?e=”的）\nhttp://uland.taobao.com/coupon/edetail?activityId=xxxxxxx\"></textarea> <div class=\"qtk_2in1_line qtk_2in1_pid clearfix\"> <label>选择PID：</label> <div class=\"qtk_2in1_pid_box\"> <input id=\"qtk_user_input_MM\" type=\"text\" value=\"\" placeholder=\"请选择PID，未设置PID请手动输入\"> <i class=\"qtk_2in1_select_btn\"></i> </div> <div class=\"qtk_2in1_pid_select\">" + textMenu + "</div> <a href=\"http://pub.alimama.com/myunion.htm?#!/manage/zone/zone?tab=3&toPage=1\" target=\"_blank\" class=\"manage_pid\" style=\"display:" + value + "\">管理</a> </div> <div class=\"qtk_2in1_line qtk_2in1_radio clearfix\"> <label>佣金方式：</label> <div class=\"qtk_2in1_radio_box clearfix\"> <input id=\"qtk_2in1_radio_gy\" name=\"qtk_2in1_type\" type=\"radio\" value=\"\"> <label for=\"qtk_2in1_radio_gy\">高佣优先</label> </div> <div class=\"qtk_2in1_radio_box clearfix\"> <input id=\"qtk_2in1_radio_jh\" name=\"qtk_2in1_type\" type=\"radio\" value=\"1\" checked=\"checked\"> <label for=\"qtk_2in1_radio_jh\">计划优先</label> </div> <a href=\"javascript:alert(\'高佣优先：当有高佣时走高佣，没高佣时走通用。计划优先：如有生效的定向计划则走定向计划，否则走通用。\');\">使用说明</a> </div> <a id=\"qtk_turnLink_confirm\" class=\"qtk_2in1_btn\" href=\"javascript:;\" style=\"margin:15px auto;\">生成</a> </div>";
      return bgTurnLink;
    };

    SingleOther.prototype.getCouponCopy = function(txt) {
      var t_div;
      t_div = "<div class=\"qtk_coupon_div\">" + "			<table>" + "				<thead>" + "					<tr>" + "						<th>优惠卷</th>" + "						<th>有效期</th>" + "						<th>链接</th>" + "						<th>复制</th>" + "					</tr>" + "				</thead>" + "				<tbody id='qtk_coupon_body2'>" + (" " + txt) + "				</tbody>" + "			</table>" + "		</div>";
      return t_div;
    };

    return SingleOther;

  })();
});
