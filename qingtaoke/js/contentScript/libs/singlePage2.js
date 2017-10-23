define('singlePage2', ['jquery', 'underscore', 'common', 'layer', 'alimama', 'commissionInCampaign', 'qtkApi', 'singleOther', 'configInBackground', 'config', 'storage', 'editPrice', 'keyboard', 'tableorder'], function($, _, Common, layer, Alimama, CommissionInCampaign, QtkApi, SingleOther, ConfigInBackground, CONFIG, Storage, EditPrice, Keyboard) {
  var SinglePage2;
  layer.config({
    path: chrome.extension.getURL('/js/layer/')
  });
  return SinglePage2 = (function() {
    function SinglePage2() {
      this.layerTwoIndex = -1;
      this.init();
      this.eventAfter();
      this.highPicCopy = null;
    }

    SinglePage2.prototype.init = function() {
      this.bindEvent();
      return this.queryHighPicCopy();
    };

    SinglePage2.prototype.reTmallorTaobaoUserID = function() {
      var chaoshi, tmatch, tmatch2, tmatchArr, tmatchArr2, tmeta, userID_tmp;
      userID_tmp = $("#dsr-userid").val();
      if ((userID_tmp == null) || userID_tmp === '') {
        userID_tmp = $("#J_Pine").attr("data-sellerid");
      }
      if (typeof userID_tmp === 'undefined') {
        userID_tmp = $("#J_Pinus_Enterprise_Module").attr("data-sellerid");
      }
      if (typeof userID_tmp === 'undefined') {
        tmeta = $("meta[name='microscope-data']").attr('content');
        if (typeof tmeta !== 'undefined') {
          tmatch = tmeta.match(/userid=(\d+)/g);
          tmatchArr = String(tmatch).split('=');
          userID_tmp = tmatchArr[1];
        }
      }
      if (typeof userID_tmp === 'undefined') {
        Common.log('chaoshi');
        chaoshi = $('#J_SellerInfo').attr('data-url');
        tmatch2 = chaoshi.match(/user_num_id=(\d+)/g);
        tmatchArr2 = String(tmatch2).split('=');
        userID_tmp = tmatchArr2[1];
      }
      Common.log('UID：' + userID_tmp);
      return userID_tmp;
    };

    SinglePage2.prototype.queryHighPicCopy = function() {
      var d, id, me, qtk;
      me = this;
      qtk = new QtkApi();
      id = /(&itemId|\?id|&id)=(\d+)/g.exec(window.location.href);
      d = $.when(qtk.getPicAndCopy(id[2]));
      return d.done((function(_this) {
        return function(data) {
          me.highPicCopy = data;
          $(".qtkHighPicCopy").css("display", "block");
          return $(".qtk_singlePage_content").find(".HPCTips").css("display", "block");
        };
      })(this));
    };

    SinglePage2.prototype.couponShop = function() {
      var html, uid;
      uid = this.reTmallorTaobaoUserID();
      html = "<div style='width: 0;height: 0;overflow: hidden'><iframe src='https://h5.m.taobao.com/present/hongbao.html?sellerId=" + uid + "'></iframe></div>";
      return $('body').append(html);
    };

    SinglePage2.prototype.couponOther = function(gid) {
      var dtd;
      dtd = $.Deferred();
      dtd.resolve([]);
      return dtd;
    };

    SinglePage2.prototype.picCopyBox = function() {
      var HTML, config, copyList, data, i, index, item, key, len, p, picList, singleOther, that, value;
      that = this;
      config = new ConfigInBackground;
      data = that.highPicCopy;
      picList = "";
      copyList = "";
      for (key in data) {
        value = data[key];
        if (key === "wenan") {
          for (index = i = 0, len = value.length; i < len; index = ++i) {
            item = value[index];
            copyList += "<li><span>" + (index - 0 + 1) + "</span><textarea>" + item["txt"] + "</textarea><a href=\"javascript:;\">复制</a></li>";
          }
        } else {
          picList += "<li><a href=\"javascript:;\"><img src=" + value["s_url"] + " alt=\"商品预览图\" data-pic=" + value["my_url"] + "><span>点击预览</span></a></li>";
        }
      }
      singleOther = new SingleOther;
      HTML = singleOther.picCopyBoxBG(picList, copyList);
      p = $.when(config.get('defaultSkin'));
      return p.done((function(_this) {
        return function(skin) {
          var skinClass;
          skinClass = "layer-color-" + skin;
          return that.layerTwoIndex = layer.open({
            type: 1,
            skin: 'layui-layer-modal ' + skinClass,
            closeBtn: 1,
            shift: 2,
            title: '<i class="pageIcon3"></i>优质图文',
            area: '1000px',
            shade: false,
            content: HTML,
            boxtype: "PicCopy",
            success: function(layero, index) {
              var Layer;
              Layer = $(layero);
              Layer.find(".qtk_highPicCopy_box_pic").find("img").on("error", function(event) {
                return $(event.target).parents("li").remove();
              });
              Layer.find(".qtk_highPicCopy_box_copy a").on("click", function() {
                $(this).prev().select();
                document.execCommand("Copy", false, '');
                return layer.msg("复制成功");
              });
              Layer.find(".qtk_highPicCopy_box_pic img").on("click", function() {
                var previewSrc;
                previewSrc = $(this).data("pic");
                Layer.find(".qtk_highPicCopy_box_pic li").removeClass("active");
                $(this).parents("li").addClass("active");
                Layer.find(".qtk_highPicCopy_box_right img").remove();
                return Layer.find(".qtk_highPicCopy_box_right").prepend("<img src=" + previewSrc + ">");
              });
              Layer.find(".qtk_highPicCopy_box_right a").on("click", function() {
                var element, range, src;
                window.getSelection().removeAllRanges();
                src = Layer.find(".qtk_highPicCopy_box_right img").attr("src");
                $("body").append('<img src="' + src + '" class="qtk_wait_copyPic">');
                range = document.createRange();
                element = $("img.qtk_wait_copyPic")[0];
                range.selectNode(element);
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                layer.msg("复制成功");
                return $("img.qtk_wait_copyPic").remove();
              });
              return setTimeout(function() {
                if (Layer.find(".qtk_highPicCopy_box_pic img").length > 0) {
                  Layer.find(".qtk_highPicCopy_box_pic img:first").trigger("click");
                  return Layer.find(".qtk_highPicCopy_box_right a").css("display", "block");
                } else {
                  Layer.find(".qtk_highPicCopy_box_pic").empty().append("<p>暂无图片</p>");
                  return Layer.find(".qtk_highPicCopy_box_right").empty().append("<div class='noPic'></div>");
                }
              }, 1000);
            }
          });
        };
      })(this));
    };

    SinglePage2.prototype.bindEvent = function() {
      var me;
      me = this;
      $(document).on('change', '#weixin_TaobaoUrl', function() {
        var val;
        val = $(this).val();
        if (/[?&]id=\d{7,}/i.test(val)) {
          return $('#weixin_ajaxHWS').trigger('click');
        }
      });
      return $(document).on('change', '#weixin_TaobaoUrl2', function() {
        var val;
        val = $(this).val();
        if (/[?&]id=\d{7,}/i.test(val)) {
          return $('#weixin_ajaxHWS2').trigger('click');
        }
      });
    };

    SinglePage2.prototype.eventAfter = function() {
      var that;
      Common.log("eventAfter");
      that = this;
      $(document).on("click", ".qtkHighPicCopy", function() {
        if ($("div.layui-layer[boxtype='PicCopy']").length === 0) {
          return that.picCopyBox();
        } else {
          return $("div.layui-layer[boxtype='PicCopy']").remove();
        }
      });
      $(document).on('click', '#qtk_youhui_juan', function() {
        Common.log("qtk_pc_youhui click");
        if ($("div.layui-layer[boxtype='coupon']").length === 0) {
          return that.userSelfUR();
        } else {
          return $("div.layui-layer[boxtype='coupon']").remove();
        }
      });
      $(document).on('click', '#qtkForwardWeiXin', function() {
        Common.log("qtkForwardWeiXin click");
        return that.ForWardWeiXin();
      });
      $(document).on('click', '#qtkAddWeiXin', function() {
        Common.log("qtkAddWeiXin click");
        return that.companyPage();
      });
      $(document).on('click', '#weixin_ajaxHWS', function() {
        Common.log("weixin_ajaxHWS click");
        return that.ajaxWxHws('');
      });
      $(document).on('click', '#weixin_ajaxHWS2', function() {
        Common.log("weixin_ajaxHWS2 click");
        return that.ajaxWxHws(2);
      });
      $(document).on('click', '#weixin_ForwardTaoDao', function() {
        Common.log("weixin_ForwardTaoDao click");
        return that.ajaxWxQtkForword();
      });
      return $(document).on('click', '#weixin_SaveTaoDao', function() {
        Common.log("weixin_SaveTaoDao click");
        return that.ajaxWxQtkSave();
      });
    };

    SinglePage2.prototype.ajaxWxQtkSave = function() {
      var allPic, arrTmp, closeIndex, d, firstPic, gid, oldURL, pre, price, pushURL, qtkApi, selectTitle, that, title, tmpArr;
      that = this;
      Common.log("ajaxWxQtkForword");
      pushURL = $("#weixin_TaobaoPushUrl2").val();
      oldURL = $("#weixin_TaobaoUrl2").val();
      title = $("#weixin_title2").val();
      firstPic = $("#weixin_FirstPic2").val();
      allPic = $("#weixin_AllPic2").val();
      selectTitle = $("#userWxTitleList").val();
      price = $("#weixin_price2").val();
      if (pushURL === '') {
        layer.alert('“联盟推广链接”不能为空');
        return false;
      }
      if (oldURL === '') {
        layer.alert('“商品普通链接”不能为空');
        return false;
      }
      if (title === '') {
        layer.alert('“商品标题”不能为空');
        return false;
      }
      if (price && !/^\d+(\.[0-9{1,2}])?$/i.test(price)) {
        layer.alert('“商品价格”错误');
        return false;
      }
      if (firstPic === '') {
        layer.alert('“首页图片”不能为空');
        return false;
      }
      if (allPic === '') {
        layer.alert('“所有图片”不能为空');
        return false;
      }
      if (selectTitle === '0') {
        layer.alert('请选择');
        return false;
      }
      pre = /[&|?]id=(\d*)/gi;
      tmpArr = pre.exec(oldURL);
      if (tmpArr === null) {
        layer.alert('商品链接有误');
        return false;
      }
      Common.log(tmpArr[1]);
      gid = tmpArr[1];
      closeIndex = layer.load(0, {
        shade: false
      });
      qtkApi = new QtkApi;
      Common.log("可以提交");
      arrTmp = {};
      arrTmp['pushURL'] = pushURL;
      arrTmp['listId'] = selectTitle;
      arrTmp['gid'] = gid;
      arrTmp['title'] = title;
      arrTmp['firstPic'] = firstPic;
      arrTmp['allPic'] = allPic;
      arrTmp['price'] = price;
      arrTmp['sel'] = 'shortUrl';
      Common.log(arrTmp);
      d = qtkApi.postSaveWX(arrTmp);
      d.fail(function(e) {
        layer.close(closeIndex);
        layer.alert(e.errorText);
        return false;
      });
      return d.done((function(_this) {
        return function(response) {
          layer.close(closeIndex);
          layer.close(_this.layerTwoIndex);
          Common.log(response);
          return layer.alert('保存到微信网页成功');
        };
      })(this));
    };

    SinglePage2.prototype.companyPage = function() {
      var bgDIV, config, d, that;
      that = this;
      bgDIV = SingleOther.showSaveWeiXin;
      config = new ConfigInBackground;
      d = $.when(config.get('isLoginAlimama'), config.get('isValid'));
      return d.done(function(visLoginAlima, isValid) {
        if (visLoginAlima === false) {
          layer.alert("<a href='http://www.alimama.com/' target='_blank'>请先登录淘宝联盟</a>", {
            icon: 5
          });
          return false;
        }
        return that.layerTwoIndex = layer.open({
          type: 1,
          skin: 'layui-layer-demo',
          closeBtn: 1,
          shift: 2,
          title: ['保存微信链接'],
          area: ['460px', '370px'],
          shade: false,
          content: bgDIV,
          success: (function(_this) {
            return function(layero, index) {
              var d2, qtkApi;
              qtkApi = new QtkApi;
              d2 = qtkApi.wxTitle();
              d2.fail(function(e) {
                layer.alert('获取微信标题列表失败');
                return false;
              });
              return d2.done(function(res) {
                var i, len, option, ref, txtOption;
                Common.log(res);
                txtOption = "<option value='0'>请选择</option>";
                ref = res.data;
                for (i = 0, len = ref.length; i < len; i++) {
                  option = ref[i];
                  txtOption += "<option value=" + option.id + ">" + option.title + "</option>";
                }
                return $("#userWxTitleList").append(txtOption);
              });
            };
          })(this)
        });
      });
    };

    SinglePage2.prototype.ajaxWxQtkForword = function() {
      var allPic, arrTmp, closeIndex, d, firstPic, gid, oldURL, pre, price, pushURL, qtkApi, that, title, tmpArr;
      that = this;
      Common.log("ajaxWxQtkForword");
      pushURL = $("#weixin_TaobaoPushUrl").val();
      oldURL = $("#weixin_TaobaoUrl").val();
      title = $("#weixin_title").val();
      firstPic = $("#weixin_FirstPic").val();
      allPic = $("#weixin_AllPic").val();
      price = $("#weixin_price").val();
      if (pushURL === '') {
        layer.alert('“联盟推广链接”不能为空');
        return false;
      }
      if (oldURL === '') {
        layer.alert('“商品普通链接”不能为空');
        return false;
      }
      if (title === '') {
        layer.alert('“商品标题”不能为空');
        return false;
      }
      if (price && !/^\d+(\.[0-9{1,2}])?$/i.test(price)) {
        layer.alert('“商品价格”错误');
        return false;
      }
      if (firstPic === '') {
        layer.alert('“首页图片”不能为空');
        return false;
      }
      if (allPic === '') {
        layer.alert('“所有图片”不能为空');
        return false;
      }
      pre = /[&|?]id=(\d*)/gi;
      tmpArr = pre.exec(oldURL);
      if (tmpArr === null) {
        layer.alert('商品链接有误');
        return false;
      }
      Common.log(tmpArr[1]);
      gid = tmpArr[1];
      closeIndex = layer.load(0, {
        shade: false
      });
      qtkApi = new QtkApi;
      Common.log("可以提交");
      arrTmp = {};
      arrTmp['pushURL'] = pushURL;
      arrTmp['gid'] = gid;
      arrTmp['title'] = title;
      arrTmp['firstPic'] = firstPic;
      arrTmp['allPic'] = allPic;
      arrTmp['price'] = price;
      arrTmp['sel'] = 'shortUrl';
      Common.log(arrTmp);
      d = qtkApi.postForWardWX(arrTmp);
      d.fail(function(e) {
        layer.close(closeIndex);
        layer.alert(e.errorText);
        return false;
      });
      return d.done((function(_this) {
        return function(response) {
          var bgDIV, urlTmp;
          layer.close(closeIndex);
          layer.close(that.layerTwoIndex);
          Common.log(response);
          urlTmp = response.oldUrl;
          bgDIV = SingleOther.showQRWeiXin;
          return layer.open({
            type: 1,
            skin: 'layui-layer-demo',
            closeBtn: 1,
            shift: 2,
            title: ['转微信链接'],
            area: ['460px', '330px'],
            shade: false,
            content: bgDIV,
            success: function(layero, index) {
              Common.log("后面操作xxxx");
              $("#weixin_taodaoUrl").val(urlTmp);
              $("#qrcode").qrcode({
                width: 90,
                height: 90,
                text: urlTmp
              });
              that.showShortBaiduURL(urlTmp, "#weixin_taodaoBaiduUrl");
              that.showXinLURL(urlTmp, "#weixin_taodaoXinLangUrl");
              return that.btnCopyUrl();
            }
          });
        };
      })(this));
    };

    SinglePage2.prototype.ajaxWxHws = function(vk) {
      var alimama, gid, goodsInfoDtd, pre, that, tmpArr, tmpUrl;
      Common.log("ajaxWxHws");
      that = this;
      tmpUrl = $.trim($("#weixin_TaobaoUrl" + vk).val());
      if (tmpUrl === '') {
        layer.alert('“商品链接”不能为空');
        return false;
      }
      Common.log(tmpUrl);
      pre = /[&|?]id=(\d*)/gi;
      tmpArr = pre.exec(tmpUrl);
      if (tmpArr === null) {
        layer.alert('商品链接有误');
        return false;
      }
      Common.log(tmpArr[1]);
      gid = tmpArr[1];
      alimama = new Alimama;
      goodsInfoDtd = alimama.goodsDetail(gid);
      goodsInfoDtd.fail(function() {
        return Common.log('商品信息hws失败');
      });
      return goodsInfoDtd.done((function(_this) {
        return function(response) {
          var i, j, len, len1, oldURL, pic, pic2, picArr, tmpAllImg, tmpImg, tmpTitle;
          Common.log('hws done');
          Common.log(response);
          if (typeof response['seller'] === 'undefined' && response['itemInfoModel'] === 'undefined') {
            layer.alert('解析错误');
            return false;
          }
          tmpTitle = response['itemInfoModel']['title'];
          picArr = response['itemInfoModel']['picsPath'];
          $("#weixin_title" + vk).val(tmpTitle);
          oldURL = '';
          if (response['seller']['type'] === 'B') {
            oldURL = "https://detail.tmall.com/item.htm?id=" + gid;
          } else {
            oldURL = "https://item.taobao.com/item.htm?id=" + gid;
          }
          $("#weixin_TaobaoUrl" + vk).val(oldURL);
          tmpImg = '';
          for (i = 0, len = picArr.length; i < len; i++) {
            pic = picArr[i];
            tmpImg += "<img src='" + pic + "_50x50.jpg'>";
          }
          $("#hwsPic" + vk).html(tmpImg);
          tmpAllImg = '';
          for (j = 0, len1 = picArr.length; j < len1; j++) {
            pic2 = picArr[j];
            tmpAllImg += pic2 + ",";
          }
          $("#weixin_AllPic" + vk).val(tmpAllImg);
          return that.wxImgEvent(picArr, vk);
        };
      })(this));
    };

    SinglePage2.prototype.wxImgEvent = function(picArr, vk) {
      $("#hwsPic" + vk + " img").on('click', function() {
        var selectObj, tmpIndex;
        selectObj = $(this);
        tmpIndex = selectObj.index();
        selectObj.addClass('selectWXImg').siblings().removeClass('selectWXImg');
        return $("#weixin_FirstPic" + vk).val(picArr[tmpIndex]);
      });
      return $("#hwsPic" + vk + " img").eq(0).trigger('click');
    };

    SinglePage2.prototype.ForWardWeiXin = function() {
      var bgDIV, config, d, that;
      that = this;
      bgDIV = SingleOther.showTaoDaoWeiXin;
      config = new ConfigInBackground;
      d = $.when(config.get('isLoginAlimama'), config.get('isValid'));
      return d.done(function(visLoginAlima, isValid) {
        if (visLoginAlima === false) {
          layer.alert("<a href='http://www.alimama.com/' target='_blank'>请先登录淘宝联盟</a>", {
            icon: 5
          });
          return false;
        }
        return that.layerTwoIndex = layer.open({
          type: 1,
          skin: 'layui-layer-demo',
          closeBtn: 1,
          shift: 2,
          title: ['转微信链接'],
          area: ['460px', '300px'],
          shade: false,
          content: bgDIV,
          success: function(layero, index) {
            return Common.log(that.layerTwoIndex);
          }
        });
      });
    };

    SinglePage2.prototype.userSelfUR = function() {
      var bgDIV, config, d, that;
      that = this;
      bgDIV = SingleOther.bgUserCoupon;
      config = new ConfigInBackground;
      d = $.when(config.get('isLoginAlimama'), config.get('isValid'), config.get('defaultSkin'));
      return d.done(function(visLoginAlima, isValid, skin) {
        var skinClass;
        if (visLoginAlima === false) {
          layer.alert("<a href='http://www.alimama.com/' target='_blank'>请先登录淘宝联盟</a>", {
            icon: 5
          });
          return false;
        }
        skinClass = "layer-color-" + skin;
        return that.layerTwoIndex = layer.open({
          type: 1,
          skin: 'layui-layer-modal ' + skinClass,
          closeBtn: 1,
          shift: 2,
          title: '<i class="pageIcon3"></i>转优惠券',
          area: '400px',
          shade: false,
          content: bgDIV,
          boxtype: "coupon",
          success: function(layero, index) {
            Common.log(that.layerTwoIndex);
            that.doUserSelfUR(skinClass);
            return that.closeSecondDiv();
          }
        });
      });
    };

    SinglePage2.prototype.closeSecondDiv = function() {
      var that;
      that = this;
      return $(".qtk_mm_close_Single2").on('click', function() {
        return layer.close(that.layerTwoIndex);
      });
    };

    SinglePage2.prototype.doUserSelfUR = function(skin) {
      var that;
      that = this;
      return $("#qtk_mm_coupon").on('click', function() {
        var isPC, reArr, reg, tmpUrlMobile, tmpUrlPC, tmp_URL;
        tmp_URL = $("#qtk_user_coupon_URL").val();
        if (tmp_URL === '') {
          layer.alert("请输入URL", {
            icon: 2
          });
          return false;
        }
        reg = /[&|?]((activityId|activity_id|activity_Id)=(\w*)).*((seller_id|sellerId|seller_Id)=(\d*))/gi;
        reArr = reg.exec(tmp_URL);
        isPC = 1;
        if (reArr === null) {
          reg = /[&|?]((seller_id|sellerId|seller_Id)=(\d*)).*&((activityId|activity_id|activity_Id)=(\w*))/gi;
          reArr = reg.exec(tmp_URL);
        }
        if (reArr === null) {
          layer.alert("优惠券URL不对", {
            icon: 2
          });
          return false;
        }
        if (reArr.length !== 7) {
          layer.alert("优惠券的格式不对", {
            icon: 2
          });
          return false;
        }
        if (reArr[2].indexOf('act') !== -1) {
          isPC = 0;
        }
        if (isPC === 1) {
          tmpUrlPC = "https://taoquan.taobao.com/coupon/unify_apply.htm?" + reArr[1] + "&" + reArr[4];
          tmpUrlMobile = "https://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&" + reArr[4] + "&" + reArr[1];
        } else {
          tmpUrlPC = "https://taoquan.taobao.com/coupon/unify_apply.htm?" + reArr[4] + "&" + reArr[1];
          tmpUrlMobile = "https://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&" + reArr[1] + "&" + reArr[4];
        }
        return that.showShortURL(tmpUrlPC, tmpUrlMobile, skin);
      });
    };

    SinglePage2.prototype.showShortURL = function(vURL, mobileURL, skin) {
      var bgDIV, that;
      that = this;
      layer.close(that.layerTwoIndex);
      if (vURL === '') {
        layer.alert('该商品已下架或者已从该鹊桥中剔除');
        return false;
      }
      bgDIV = SingleOther.showCouponDIV;
      layer.open({
        type: 1,
        skin: 'layui-layer-modal ' + skin,
        closeBtn: 1,
        shift: 2,
        title: '<i class="pageIcon3"></i>互转结果',
        area: '400px',
        shade: false,
        content: bgDIV,
        boxtype: 'coupon',
        success: function(layero, index) {
          $("#pcLongCoupon").val(vURL);
          $("#mobileLongCoupon").val(mobileURL);
          that.showShortBaiduURL(vURL, "#pcBaiduCoupon");
          that.showXinLURL(vURL, "#pcXinLaCoupon");
          that.showShortBaiduURL(mobileURL, "#mobileBaiduCoupon");
          that.showXinLURL(mobileURL, "#mobileXinLaCoupon");
          return that.btnCopyUrl();
        }
      });
      return '';
    };

    SinglePage2.prototype.showShortBaiduURL = function(vURL, key) {
      var d, qtk;
      qtk = new QtkApi;
      d = qtk.shortURL(vURL);
      d.fail(function(e) {
        return $(key).val('请重试');
      });
      return d.done(function(response) {
        return $(key).val(response.tinyurl);
      });
    };

    SinglePage2.prototype.showXinLURL = function(vURL, key) {
      var d, qtk;
      qtk = new QtkApi;
      d = qtk.shortXinLURL(vURL);
      d.fail(function(e) {
        return $(key).val('请重试');
      });
      return d.done(function(response) {
        return $(key).val(response.url_short);
      });
    };

    SinglePage2.prototype.btnCopyUrl = function() {
      return $(".qtk_copy_url").on('click', function() {
        var tmpUrl;
        tmpUrl = $(this).parent().find("input");
        tmpUrl.select();
        document.execCommand("Copy", false, '');
        return layer.msg("复制成功");
      });
    };

    SinglePage2.prototype.reTmallorTaobaoGoodID = function() {
      var good_id, tmatch, tmatchArr, tmpUrl;
      Common.log('reTmallorTaobaoGoodID');
      tmpUrl = location.href;
      Common.log(tmpUrl);
      tmatch = tmpUrl.match(/[?&]id=(\d{6,})/ig);
      if (tmatch !== null) {
        tmatchArr = String(tmatch).split('=');
        if (typeof tmatchArr[1] !== 'undefined') {
          good_id = tmatchArr[1];
        }
      }
      if (typeof good_id === 'undefined') {
        good_id = $("#LineZing").attr("itemid");
      }
      if (typeof good_id === 'undefined') {
        good_id = $("#J_Pine").attr("data-itemid");
      }
      Common.log('gid2:' + good_id);
      return good_id;
    };

    return SinglePage2;

  })();
});
