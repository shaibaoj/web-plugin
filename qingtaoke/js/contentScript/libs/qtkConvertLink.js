define('qtkConvertLink', ['jquery', 'underscore', 'common', 'layer', 'alimama', 'qtkApi', 'qtkConvertLinkPage', 'config', 'configInBackground'], function($, _, Common, layer, Alimama, QtkApi, QtkConvertLinkPage, Config, ConfigInBackground) {
  var QtkConvertLink;
  layer.config({
    path: chrome.extension.getURL('/js/layer/')
  });
  return QtkConvertLink = (function() {
    QtkConvertLink.fourArr = [];

    QtkConvertLink.goodsIDArr = [];

    function QtkConvertLink() {
      this.dengji = [];
      this.dengji[0] = '无等级';
      this.dengji[1] = '一星';
      this.dengji[2] = '二星';
      this.dengji[3] = '三星';
      this.dengji[4] = '四星';
      this.dengji[5] = '五星';
      this.dengji[6] = '一钻';
      this.dengji[7] = '二钻';
      this.dengji[8] = '三钻';
      this.dengji[9] = '四钻';
      this.dengji[10] = '一蓝冠';
      this.dengji[11] = '二蓝冠';
      this.dengji[12] = '三蓝冠';
      this.dengji[13] = '四蓝冠';
      this.dengji[14] = '五蓝冠';
      this.dengji[15] = '一金冠';
      this.dengji[16] = '二金冠';
      this.dengji[17] = '三金冠';
      this.dengji[18] = '四金冠';
      this.dengji[19] = '五金冠';
      this.init();
      this.bigArr = [];
    }

    QtkConvertLink.prototype.init = function() {
      this.addTable();
      return this.bangding();
    };

    QtkConvertLink.prototype.toSendURLData = function() {
      var d, qtk, that;
      Common.log('toSendData');
      that = this;
      Common.log(that.bigArr);
      qtk = new QtkApi;
      d = qtk.PreToSendURLData(that.bigArr);
      d.fail(function(e) {
        return Common.log(e);
      });
      return d.done(function(response) {
        var path;
        path = Config.qtkHost + response;
        $('.web_show_title').find('em').html("<span><a href=\"" + path + "\" target='_blank' ><em class='qtk_web_download'>下载</em></a></span>");
        $(".qtk_tip_title").html("转换已完成,如果没有自动下载,请点击下载");
        $('.qtk_web_download').trigger('click');
        return Common.log(response);
      });
    };

    QtkConvertLink.prototype.showShortTaoBBURL = function(vURL) {
      var d, dtd, qtk;
      Common.log('通过链接去淘宝宝链接' + vURL);
      qtk = new QtkApi;
      dtd = $.Deferred();
      d = qtk.shortTaoBBURL(vURL);
      d.fail(function(e) {
        Common.log('bb');
        Common.log(e);
        return dtd.reject(e);
      });
      d.done(function(response) {
        Common.log('bb-done');
        Common.log(response);
        return dtd.resolve(response);
      });
      return dtd;
    };

    QtkConvertLink.prototype.showShortBaiduURL = function(vURL) {
      var d, dtd, qtk;
      Common.log('通过链接去百度链接' + vURL);
      qtk = new QtkApi;
      dtd = $.Deferred();
      d = qtk.shortURL(vURL);
      d.fail(function(e) {
        Common.log("showShortBaiduURL--");
        return dtd.reject(e);
      });
      d.done(function(response) {
        Common.log("showShortBaiduURL");
        Common.log(response);
        return dtd.resolve(response);
      });
      return dtd;
    };

    QtkConvertLink.prototype.showXinLURL = function(vURL) {
      var d, dtd, qtk;
      Common.log('新浪链接' + vURL);
      qtk = new QtkApi;
      dtd = $.Deferred();
      d = qtk.shortXinLURL(vURL);
      d.fail(function(e) {
        Common.log("showXinLURL--");
        Common.log(e);
        return dtd.reject(e);
      });
      d.done(function(response) {
        Common.log("showXinLURL");
        Common.log(response);
        return dtd.resolve(response);
      });
      return dtd;
    };

    QtkConvertLink.prototype.shortUrl = function(vindex) {
      var baiduTid, that, url, xinLTid;
      that = this;
      Common.log("shortUrl 去获得百度，新浪，淘宝的短链接" + vindex);
      if (that.bigArr[vindex] != null) {
        Common.log;
        $('.qtk_tip_title').html("正在为商品ID " + that.bigArr[vindex]['gid'] + " 转换短网址");
        baiduTid = ".baiduShortUrl" + that.bigArr[vindex]['gid'];
        xinLTid = ".xinLangShortUrl" + that.bigArr[vindex]['gid'];
        url = that.bigArr[vindex]['clickUrl'];
        return $.when(that.showShortBaiduURL(url), that.showXinLURL(url)).then(function(reobj, reobj2) {
          that.bigArr[vindex]['baiduShortUrl'] = '';
          that.bigArr[vindex]['xinLangShortUrl'] = '';
          that.bigArr[vindex]['taoBBShortUrl'] = '';
          if (reobj.status === 0) {
            that.bigArr[vindex]['baiduShortUrl'] = reobj.tinyurl;
          }
          if (typeof reobj2['type'] !== 'undefined') {
            that.bigArr[vindex]['xinLangShortUrl'] = reobj2.url_short;
          }
          $(baiduTid).text('已生成');
          $(xinLTid).text('已生成');
          return setTimeout(function() {
            vindex++;
            return that.shortUrl(vindex);
          }, 300);
        }, function(ra, rb) {
          Common.log('short URL error');
          that.bigArr[vindex]['baiduShortUrl'] = '';
          that.bigArr[vindex]['xinLangShortUrl'] = '';
          that.bigArr[vindex]['taoBBShortUrl'] = '';
          $(baiduTid).text('网络出错,可以重新生成一次');
          $(xinLTid).text('网络出错,可以重新生成一次');
          Common.log(ra);
          Common.log(rb);
          return setTimeout(function() {
            vindex++;
            return that.shortUrl(vindex);
          }, 300);
        });
      } else {
        Common.log('shortUrl over');
        $('.qtk_tip_title').html("正在生成Excel...");
        Common.log(that.bigArr);
        that.toSendURLData();
        return false;
      }
    };

    QtkConvertLink.prototype.eachTwo = function(gid) {
      var almama, dtd, reDataList;
      dtd = $.Deferred();
      almama = new Alimama;
      reDataList = almama.goodsDetail(gid);
      reDataList.fail(function(e) {
        return dtd.reject(e);
      });
      reDataList.done(function(response) {
        return dtd.resolve(response);
      });
      return dtd;
    };

    QtkConvertLink.prototype.eachOne = function(gid) {
      var almama, dtd, reDataList;
      dtd = $.Deferred();
      almama = new Alimama;
      reDataList = almama.convertLink(gid, this.fourArr[2], this.fourArr[3]);
      reDataList.fail(function(e) {
        return dtd.reject(e);
      });
      reDataList.done(function(response) {
        if (typeof response.clickUrl === 'undefined') {
          return dtd.reject('该商品无推广计划');
        } else {
          return dtd.resolve(response);
        }
      });
      return dtd;
    };

    QtkConvertLink.prototype.arrFeach = function(arr, index, allLength) {
      var that, tmp_obj;
      Common.log('arrFeach333');
      that = this;
      if (arr[index] != null) {
        $('.qtk_tip_title').html("正在获取商品ID " + arr[index] + " 的信息...");
        tmp_obj = {};
        $.when(that.eachTwo(arr[index]), that.eachOne(arr[index])).done(function(obj2, obj) {
          var bgsetDiv, detailUrl, firstPrice, i, isTamll, keyPrice, len, minArrPrice, minTmpPrice, tmp_price, tmp_priceObj;
          Common.log(obj2);
          Common.log('****');
          Common.log(obj);
          isTamll = '否';
          if (obj2.seller.type === 'B') {
            isTamll = '是';
            detailUrl = "https://detail.tmall.com/item.htm?id=" + arr[index];
          } else {
            detailUrl = "https://item.taobao.com/item.htm?id=" + arr[index];
          }
          Common.log('*************cxb*********');
          if (obj2.apiStack[0].value !== "") {
            tmp_price = JSON.parse(obj2.apiStack[0].value);
            tmp_priceObj = tmp_price.data.itemInfoModel.priceUnits;
            Common.log(tmp_priceObj);
            firstPrice = 100000000;
            for (i = 0, len = tmp_priceObj.length; i < len; i++) {
              keyPrice = tmp_priceObj[i];
              minTmpPrice = keyPrice.price;
              Common.log(minTmpPrice);
              minArrPrice = String(minTmpPrice).split('-');
              Common.log(minArrPrice);
              if (firstPrice > Number(minArrPrice[0])) {
                firstPrice = minArrPrice[0];
              }
            }
          } else {
            firstPrice = '请单独查询下该数据';
          }
          tmp_obj['id'] = index + 1;
          tmp_obj['clickUrl'] = obj.clickUrl;
          tmp_obj['shortLinkUrl'] = obj.shortLinkUrl;
          tmp_obj['title'] = obj2.itemInfoModel.title;
          tmp_obj['gid'] = arr[index];
          tmp_obj['price'] = firstPrice;
          tmp_obj['shangjiaLevel'] = that.dengji[obj2.seller.creditLevel];
          tmp_obj['isTmall'] = isTamll;
          tmp_obj['url'] = detailUrl;
          that.bigArr.push(tmp_obj);
          Common.log(obj2);
          bgsetDiv = "<div class='web_lianjiezhuanhuan'><p class='p_number'>  " + (index + 1) + "/" + allLength + ".<span>【" + arr[index] + "】</span></p> <p class='p_title'><span>标题：<a href=\'https://item.taobao.com/item.htm?id=" + arr[index] + "\' target='_blank'>" + tmp_obj['title'] + "</a></span></p> <p class='p_content'><span><em>短地址：</em><em>已生成</em></span> <span><em>百度地址：</em><em class=\"baiduShortUrl" + arr[index] + "\">等待..</em></span> <span><em>新浪地址：</em><em class=\"xinLangShortUrl" + arr[index] + "\">等待..</em></span></p> </div>";
          return $(bgsetDiv).prependTo($("#qtk_logs"));
        }).fail(function(v, v2) {
          return $("#qtk_logs").append("<div><p>商品ID：" + arr[index] + "</p><p>该商品无推广计划或者淘宝联盟失效</p></div>");
        }).always(function(obj2, obj) {
          index++;
          return that.arrFeach(arr, index, allLength);
        });
      } else {
        Common.log("each over");
        that.shortUrl(0);
      }
      return false;
    };

    QtkConvertLink.prototype.bangdingAfter = function() {
      var goodsIDAr, k, that, tmpArr, tmp_arr, urlList, v;
      Common.log('bangdingAfter');
      that = this;
      urlList = $("#gidsURL").val();
      goodsIDAr = urlList.match(/id=(\d{10,})/g);
      tmpArr = [];
      Common.log('tmpArr.length');
      Common.log(tmpArr.length);
      if (goodsIDAr == null) {
        layer.alert("URL无效", {
          icon: 2
        });
        return false;
      }
      Common.log('4343');
      for (k in goodsIDAr) {
        v = goodsIDAr[k];
        tmp_arr = v.split('=');
        tmpArr.push(tmp_arr[1]);
      }
      if (tmpArr.length === 0) {
        layer.alert("URL地址不对", {
          icon: 2
        });
        return false;
      }
      Common.log(tmpArr);
      return that.arrFeach(tmpArr, 0, tmpArr.length);
    };

    QtkConvertLink.prototype.bangdingPre = function() {
      var isNext, pid, selectRio, urlList;
      isNext = true;
      urlList = $.trim($("#gidsURL").val());
      if (urlList === '') {
        Common.log('one');
        layer.alert("请输入地址", {
          icon: 2
        });
        isNext = false;
        return isNext;
      }
      selectRio = $("#userPID").val();
      if (selectRio.length === 0) {
        layer.alert("请选择您的PID", {
          icon: 2
        });
        return false;
      }
      pid = selectRio;
      if (pid === '') {
        Common.log('two');
        layer.alert("PID不能为空", {
          icon: 2
        });
        isNext = false;
        return isNext;
      }
      this.fourArr = pid.split("_");
      if (this.fourArr.length !== 4) {
        layer.alert("PID错误", {
          icon: 2
        });
        isNext = false;
        return isNext;
      }
      return isNext;
    };

    QtkConvertLink.prototype.bangding = function() {
      var that;
      that = this;
      $("body").on('click', '.selectRadioDiv', function() {
        var nowValue;
        nowValue = $(this).attr('data-pid');
        $("#userPID").val(nowValue);
        $('.selectRadioDiv').removeClass('selected');
        return $(this).addClass('selected');
      });
      return $("#qtk_ConvertLink_submit2").on('click', function() {
        var bgDIV, obj, res;
        that.bigArr = [];
        $("#qtk_logs").html('');
        res = that.bangdingPre();
        if (res === false) {
          return false;
        }
        obj = new QtkConvertLinkPage;
        bgDIV = obj.showBGDiv;
        return layer.open({
          type: 1,
          skin: 'layui-layer-demo',
          closeBtn: 1,
          shift: 2,
          title: ['批量链接转换并生成'],
          area: ['800px', '600px'],
          shade: false,
          content: $("#qtk_log"),
          success: function(layero, index) {
            $("#qtk_logs").html('');
            return that.bangdingAfter();
          }
        });
      });
    };

    QtkConvertLink.prototype.addTable = function() {
      var config, d, flagDiv, obj, tt;
      obj = new QtkConvertLinkPage;
      flagDiv = obj.flagDiv;
      $("body").append(flagDiv);
      tt = new Date();
      Common.log('加载时间addTable');
      Common.log(tt.getTime());
      config = new ConfigInBackground;
      d = $.when(config.get('pidList'));
      return d.done((function(_this) {
        return function(pidListv) {
          var i, key, len, textMenu, tt_tmp;
          Common.log(pidListv);
          textMenu = "<div class='webLinkList'>";
          textMenu += "<div>选择您的<a href='http://bbs.qingtaoke.com/thread-18-1-1.html' target='_blank'>PID</a>(<a href='/myAlimama'>添加PID</a> )：<input type='hidden' name='userPID' id='userPID' /><em id='emTitle'></em></div>";
          if ($.isEmptyObject(pidListv)) {
            textMenu += "<div><p style='color: #F5C91C;font-family: sans-serif;font-size: 12px;margin-top: 15px;'>没有查询到您已经绑定的PID，请先登录淘宝联盟并绑定PID</p></div>";
          }
          for (i = 0, len = pidListv.length; i < len; i++) {
            key = pidListv[i];
            tt_tmp = 'mm_' + key['aid'] + '_' + key['siteId'] + '_' + key['adzoneId'];
            textMenu += "<div class='selectRadioDiv' data-pid=" + tt_tmp + " data-name=" + key['alias'] + "><span class='alias'>" + key['alias'] + "</span><em class='pid'>" + tt_tmp + "</em></div>";
          }
          textMenu += "</div>";
          $(".pidLists").append($(textMenu));
          return $("body").append('<div id="qtk_log" style="display:none"><div class="web_show_title"><h2  class="qtk_tip_title"></h2><em></em></div><div id="qtk_logs">列表...</div></div>');
        };
      })(this));
    };

    return QtkConvertLink;

  })();
});
