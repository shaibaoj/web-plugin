define('mobileChangUrl', ['jquery', 'underscore', 'common', 'layer', 'alimama', 'qtkApi', 'qtkConvertLinkPage', 'config', 'configInBackground'], function($, _, Common, layer, Alimama, QtkApi, QtkConvertLinkPage, Config, ConfigInBackground) {
  var MobileChangeUrl;
  layer.config({
    path: chrome.extension.getURL('/js/layer/')
  });
  return MobileChangeUrl = (function() {
    function MobileChangeUrl() {
      Common.log("constructor");
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
      this.fourArr = [];
      this.bigArr = [];
      this.menu();
      this.bangding();
    }

    MobileChangeUrl.prototype.showShortTaoBBURL = function(vURL) {
      var d, dtd, qtk;
      qtk = new QtkApi;
      dtd = $.Deferred();
      d = qtk.shortTaoBBURL(vURL);
      d.fail(function(e) {
        Common.log('taobao BB ----error');
        Common.log(e);
        return dtd.reject(e);
      });
      d.done(function(response) {
        Common.log('taobao BB---sucess');
        return dtd.resolve(response);
      });
      return dtd;
    };

    MobileChangeUrl.prototype.showShortBaiduURL = function(vURL) {
      var d, dtd, qtk;
      qtk = new QtkApi;
      dtd = $.Deferred();
      d = qtk.shortURL(vURL);
      d.fail(function(e) {
        Common.log("showShortBaiduURL--error");
        return dtd.reject(e);
      });
      d.done(function(response) {
        Common.log("showShortBaiduURL---sucess");
        return dtd.resolve(response);
      });
      return dtd;
    };

    MobileChangeUrl.prototype.showXinLURL = function(vURL) {
      var d, dtd, qtk;
      qtk = new QtkApi;
      dtd = $.Deferred();
      d = qtk.shortXinLURL(vURL);
      d.fail(function(e) {
        Common.log("showXinLURL--error");
        Common.log(e);
        return dtd.reject(e);
      });
      d.done(function(response) {
        Common.log("showXinLURL---sucess");
        return dtd.resolve(response);
      });
      return dtd;
    };

    MobileChangeUrl.prototype.toSendURLData = function() {
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
        Common.log(response);
        path = Config.qtkHost + response;
        $('.web_show_title').find('em').html("<span><a href=\"" + path + "\" target='_blank' ><em class='qtk_web_download'>下载</em></a></span>");
        $(".qtk_tip_title").html("转换已完成,如果没有自动下载,请点击下载");
        return $('.qtk_web_download').trigger('click');
      });
    };

    MobileChangeUrl.prototype.shortUrl = function(vindex) {
      var baiduTid, that, url, xinLTid;
      that = this;
      Common.log("shortUrl 去获得百度，新浪，淘宝的短链接" + vindex);
      if (that.bigArr[vindex] != null) {
        Common.log;
        $(".qtk_tip_title").html("正在为商品ID " + that.bigArr[vindex]['gid'] + " 转换短网址");
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
        $(".qtk_tip_title").html("正在生成Excel....");
        Common.log(that.bigArr);
        that.toSendURLData();
        return false;
      }
    };

    MobileChangeUrl.prototype.eachTwo = function(gid) {
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

    MobileChangeUrl.prototype.eachOne = function(gid) {
      var almama, dtd, reDataList;
      dtd = $.Deferred();
      almama = new Alimama;
      Common.log("eachOne55");
      Common.log(this.fourArr);
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

    MobileChangeUrl.prototype.arrFeach = function(arr, index, allLength) {
      var that, tmp_obj;
      Common.log('arrFeach' + index);
      that = this;
      if (arr[index] != null) {
        $(".qtk_tip_title").html("正在获取商品ID " + arr[index] + " 的信息...");
        tmp_obj = {};
        $.when(that.eachTwo(arr[index]), that.eachOne(arr[index])).done(function(obj2, obj) {
          var bgsetDiv, dengjiTxt, detailUrl, firstPrice, i, isTamll, keyPrice, len, minArrPrice, minTmpPrice, tmp_price, tmp_priceObj;
          Common.log(obj2);
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
          dengjiTxt = '无等级';
          if (obj2.seller.creditLevel !== '') {
            dengjiTxt = that.dengji[obj2.seller.creditLevel];
          }
          tmp_obj['shangjiaLevel'] = dengjiTxt;
          tmp_obj['isTmall'] = isTamll;
          tmp_obj['url'] = detailUrl;
          that.bigArr.push(tmp_obj);
          bgsetDiv = "<div class='web_lianjiezhuanhuan'><p class='p_number'> " + (index + 1) + "/" + allLength + ".<span>【" + arr[index] + "】</span></p> <p class='p_title'><span>标题：<a href=\'https://item.taobao.com/item.htm?id=" + arr[index] + "\' target='_blank'>" + tmp_obj['title'] + "</a></span></p> <p class='p_content'><span><em>短地址：</em><em>已生成</em></span> <span><em>百度地址：</em><em class=\"baiduShortUrl" + arr[index] + "\">等待..</em></span> <span><em>新浪地址：</em><em class=\"xinLangShortUrl" + arr[index] + "\">等待..</em></span></p> </div>";
          return $(bgsetDiv).prependTo($("#qtk_logs"));
        }).fail(function(v, v2) {
          Common.log('**re error**' + index);
          return $("#qtk_logs").append("<div><p>商品ID：" + arr[index] + "</p><p>该商品无推广计划或者淘宝联盟失效</p></div>");
        }).always(function(obj2, obj) {
          return setTimeout(function() {
            index++;
            return that.arrFeach(arr, index, allLength);
          }, 300);
        });
      } else {
        Common.log("arrFeach over");
        Common.log(that.bigArr);
        that.shortUrl(0);
      }
      return false;
    };

    MobileChangeUrl.prototype.menu = function() {
      var config, d;
      Common.log("menu");
      config = new ConfigInBackground;
      d = $.when(config.get('pidList'));
      d.done((function(_this) {
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
          $(".op-bar").before($(textMenu));
          return $("body").append('<div id="qtk_log" style="display:none"><div class="web_show_title"><h2  class="qtk_tip_title"></h2><em></em></div><div id="qtk_logs">列表...</div></div>');
        };
      })(this));
      return d.fail((function(_this) {
        return function() {
          return layer.alert("<a href='http://www.alimama.com/' target='_blank'>请先登录淘宝联盟</a>", {
            icon: 5
          });
        };
      })(this));
    };

    MobileChangeUrl.prototype.bangding = function() {
      var that;
      that = this;
      Common.log("bangding");
      $("body").on('click', '.selectRadioDiv', function() {
        var nowValue;
        nowValue = $(this).attr('data-pid');
        $('.selectRadioDiv').removeClass('selected');
        $(this).addClass('selected');
        return $("#userPID").val(nowValue);
      });
      $(".convert-selected").on('click', function() {
        var config, d, gidList, i, len, selectGoodList, selectRio, selectRioValue, tag;
        that.bigArr = [];
        selectGoodList = $(".selected-goods:checked");
        if (selectGoodList.length === 0) {
          layer.alert('请选中你要转换的商品');
          return false;
        }
        selectRio = $("#userPID").val();
        if (selectRio.length === 0) {
          layer.alert('请选择您的PID');
          return false;
        }
        selectRioValue = selectRio;
        that.fourArr = selectRioValue.split("_");
        gidList = [];
        for (i = 0, len = selectGoodList.length; i < len; i++) {
          tag = selectGoodList[i];
          gidList.push($(tag).attr('data-gid'));
        }
        Common.log(gidList);
        config = new ConfigInBackground;
        d = $.when(config.get('isLoginAlimama'));
        return d.done((function(_this) {
          return function(isLoginALi) {
            if (isLoginALi === false) {
              layer.alert("<a href='http://www.alimama.com/' target='_blank'>请先登录淘宝联盟</a>", {
                icon: 5
              });
              return false;
            }
            return layer.open({
              type: 1,
              skin: 'layui-layer-demo',
              closeBtn: 1,
              shift: 2,
              title: ['批量链接转换并生成'],
              area: ['800px', '600px'],
              maxmin: true,
              shade: false,
              content: $("#qtk_log"),
              success: function(layero, index) {
                $("#qtk_logs").html('');
                return that.arrFeach(gidList, 0, gidList.length);
              }
            });
          };
        })(this));
      });
      return $(".convert-all").on('click', function() {
        var d, selectRio, selectRioValue;
        selectRio = $("#userPID").val();
        if (selectRio.length === 0) {
          layer.alert('请选择您的PID');
          return false;
        }
        selectRioValue = selectRio;
        that.fourArr = selectRioValue.split("_");
        Common.log(this.fourArr);
        d = that.getQTKGoodsIDList();
        d.done(function(reponse) {
          var gidList;
          Common.log('ok');
          gidList = reponse;
          return layer.open({
            type: 1,
            skin: 'layui-layer-demo',
            closeBtn: 1,
            shift: 2,
            maxmin: true,
            title: ['正在转换'],
            area: ['900px', '680px'],
            shade: false,
            content: $("#qtk_log"),
            success: function(layero, index) {
              $("#qtk_logs").html('');
              Common.log(gidList);
              return that.arrFeach(gidList, 0, gidList.length);
            }
          });
        });
        d.fail(function(e) {
          return Common.log('error');
        });
        return Common.log("after ");
      });
    };

    MobileChangeUrl.prototype.getQTKGoodsIDList = function() {
      var d, dtd, qtk, webFlag;
      qtk = new QtkApi;
      dtd = $.Deferred();
      webFlag = $("#WebFlagPage").val();
      Common.log('webFlag');
      Common.log(webFlag);
      if (webFlag === 'collect') {
        d = qtk.getCollectIDList();
      } else {
        d = qtk.getCaiJiIDList();
      }
      d.fail(function(e) {
        Common.log("getQTKGoodsIDList--error");
        return dtd.reject(e);
      });
      d.done(function(response) {
        Common.log("getQTKGoodsIDList---sucess");
        return dtd.resolve(response);
      });
      return dtd;
    };

    return MobileChangeUrl;

  })();
});
