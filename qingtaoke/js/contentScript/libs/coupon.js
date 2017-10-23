define('coupon', ['jquery', 'underscore', 'errorCode', 'common', 'alimama', 'configInBackground', 'qtkApi', 'clipboard', 'singleOther', 'storage', 'layer'], function($, _, ErrorCode, Common, Alimama, ConfigInBackground, QtkApi, Clipboard, SingleOther, Storage, layer) {
  var Coupon;
  return Coupon = (function() {
    function Coupon(context) {
      this.context = context;
      this.pidSelectorIndex = 0;
      this.selectorIndex = 0;
      this.couponInfo = null;
      this.coupons = [];
      this.config = new ConfigInBackground();
      this.qtk = new QtkApi();
      this.alimama = new Alimama();
      this.otherObj = new SingleOther();
      this.isTurnLinkState = false;
      this.currentDate = null;
    }

    Coupon.prototype.start = function() {
      this.processHideCoupon();
      this.processShopCoupon();
      return this.bindCopyButton();
    };

    Coupon.prototype.processShopCoupon = function() {
      var me, p;
      me = this;
      me.currentDate = (new Date()).toLocaleDateString();
      p = this.getShopCoupon();
      return p.then(function(coupons) {
        var coupon, i, len, results;
        if (coupons === 'FAIL_SYS_TOKEN') {
          this.context.detail.youHuiQuanShop = 0;
          return;
        }
        if (coupons !== null && coupons.length < 1) {
          me.onEmptyShopCoupon();
          return;
        }
        results = [];
        for (i = 0, len = coupons.length; i < len; i++) {
          coupon = coupons[i];
          results.push(me.processOneShopCoupon(coupon));
        }
        return results;
      })["catch"](function(err, msg) {
        return Common.log(err);
      });
    };

    Coupon.prototype.onEmptyShopCoupon = function() {
      return this.context.detail.youHuiQuanShop = [];
    };

    Coupon.prototype.processOneShopCoupon = function(coupon) {
      var detailPromise, me, sellerId;
      me = this;
      sellerId = this.context.reTmallorTaobaoUserID();
      detailPromise = this.getCouponDetail(sellerId, coupon.uuid);
      return detailPromise.then(function(detail) {
        return me.onProcessOneShopCouponFinish(detail);
      })["catch"](function(err, msg) {
        return console.log(err);
      });
    };

    Coupon.prototype.onProcessOneShopCouponFinish = function(detail) {
      var coupon, couponResult, eDate, hadRendered, i, len, me, renderedCoupon, sDate;
      me = this;
      renderedCoupon = this.context.detail.youHuiQuanShop;
      if (renderedCoupon === null) {
        renderedCoupon = [];
      }
      hadRendered = false;
      if (detail !== false) {
        for (i = 0, len = renderedCoupon.length; i < len; i++) {
          coupon = renderedCoupon[i];
          if (coupon.activityId === detail.activityId) {
            hadRendered = true;
            break;
          }
        }
      }
      if (!hadRendered) {
        if (detail !== false && detail.status !== "0" && detail.status !== "-1") {
          couponResult = me.couponSerious(detail);
          if (couponResult !== false) {
            sDate = /-(\d{2}-\d{2})/.exec(detail.startDate);
            eDate = /-(\d{2}-\d{2})/.exec(detail.endDate);
            detail.endDate = eDate[1];
            detail.startDate = sDate[1];
            renderedCoupon.push(detail);
            me.coupons.push(detail);
          }
        }
        this.context.detail.youHuiQuanShop = renderedCoupon;
        return me.findHighestCoupon();
      }
    };

    Coupon.prototype.getShopCoupon = function() {
      var gid, sellerId;
      sellerId = this.context.reTmallorTaobaoUserID();
      gid = this.context.reTmallorTaobaoGoodID();
      return new Promise(function(resolve, reject) {
        var alimama, dtd;
        alimama = new Alimama;
        dtd = alimama.getShopCoupon(sellerId, gid);
        dtd.fail(function() {
          return reject(false);
        });
        return dtd.done(function(coupons) {
          return resolve(coupons);
        });
      });
    };

    Coupon.prototype.onProcessOneHideCouponFinish = function(detail) {
      var coupon, couponResult, eDate, hadRendered, i, len, me, renderedCoupon, sDate;
      me = this;
      renderedCoupon = this.context.detail.youHuiQuanHidden;
      if (renderedCoupon === null) {
        renderedCoupon = [];
      }
      if (detail === null || detail === false) {
        this.context.detail.youHuiQuanHidden = renderedCoupon;
        return;
      }
      hadRendered = false;
      for (i = 0, len = renderedCoupon.length; i < len; i++) {
        coupon = renderedCoupon[i];
        if (coupon.activityId === detail.activityId) {
          hadRendered = true;
          break;
        }
      }
      if (!hadRendered) {
        if (detail.status !== "0" && detail.status !== "-1") {
          couponResult = me.couponSerious(detail);
          if (couponResult !== false) {
            sDate = /-(\d{2}-\d{2})/.exec(detail.startDate);
            eDate = /-(\d{2}-\d{2})/.exec(detail.endDate);
            detail.endDate = eDate[1];
            detail.startDate = sDate[1];
            renderedCoupon.push(detail);
            me.coupons.push(detail);
          }
        }
        this.context.detail.youHuiQuanHidden = renderedCoupon;
        return me.findHighestCoupon();
      }
    };

    Coupon.prototype.getHideCoupon = function() {
      var gid, sellerId;
      sellerId = this.context.reTmallorTaobaoUserID();
      gid = this.context.reTmallorTaobaoGoodID();
      return new Promise(function(resolve, reject) {
        var promise1, qtk;
        qtk = new QtkApi();
        promise1 = qtk.couponList(sellerId, gid);
        promise1.fail(function() {
          Common.log('Get couponList from QTK is fail!');
          return reject(false);
        });
        return promise1.done(function(response) {
          return resolve(response);
        });
      });
    };

    Coupon.prototype.processHideCoupon = function() {
      var me, p;
      me = this;
      p = this.getHideCoupon();
      return p.then(function(coupons) {
        var coupon, i, len;
        if (coupons === null || coupons.length < 1) {
          me.processHideCouponSecond();
          setTimeout(function() {
            return me.processOneHideCoupon(null);
          }, 6 * 1000);
          return;
        }
        for (i = 0, len = coupons.length; i < len; i++) {
          coupon = coupons[i];
          me.processOneHideCoupon(coupon);
        }
        return me.processHideCouponSecond();
      })["catch"](function(err, msg) {
        return Common.log(err);
      });
    };

    Coupon.prototype.processHideCouponSecond = function() {
      var gid, me, promise1, qtk, sellerId;
      me = this;
      sellerId = this.context.reTmallorTaobaoUserID();
      gid = this.context.reTmallorTaobaoGoodID();
      qtk = new QtkApi();
      promise1 = qtk.getHiddenCouponSecond(sellerId, gid);
      promise1.fail(function() {
        return Common.log('Get couponList from QTK is fail in processHideCouponSecond!');
      });
      return promise1.done(function(coupons) {
        var coupon, i, len, results;
        Common.log('processHideCouponSecond');
        results = [];
        for (i = 0, len = coupons.length; i < len; i++) {
          coupon = coupons[i];
          results.push(me.processOneHideCoupon(coupon));
        }
        return results;
      });
    };

    Coupon.prototype.processOneHideCoupon = function(coupon) {
      var c, detailPromise, i, len, me, processed, renderedCoupon;
      me = this;
      if (coupon === null || coupon.length < 1) {
        me.onProcessOneHideCouponFinish(null);
        return;
      }
      processed = false;
      renderedCoupon = this.context.detail.youHuiQuanHidden;
      if (renderedCoupon === null) {
        renderedCoupon = [];
      }
      for (i = 0, len = renderedCoupon.length; i < len; i++) {
        c = renderedCoupon[i];
        if (c.activityId === coupon.activityId) {
          processed = true;
          break;
        }
      }
      if (processed) {
        return;
      }
      detailPromise = this.getCouponDetail(coupon.sellerId, coupon.activityId);
      return detailPromise.then(function(detail) {
        return me.onProcessOneHideCouponFinish(detail);
      })["catch"](function(err, msg) {
        return console.log(err);
      });
    };

    Coupon.prototype.getCouponDetail = function(sellerId, activityId) {
      var alimama;
      alimama = new Alimama;
      return new Promise(function(resolve, reject) {
        var d;
        d = alimama.getCouponDetail(sellerId, activityId);
        d.fail(function() {
          return reject(false);
        });
        return d.done(function(detail) {
          return resolve(detail);
        });
      });
    };

    Coupon.prototype.findHighestCoupon = function() {
      var cur, goodsPrice, i, index, item, len, max, ref;
      goodsPrice = this.context.reTmallorTaobaoGoodPrice();
      max = 0;
      cur = 0;
      ref = this.coupons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        item = ref[index];
        if (goodsPrice >= item.man) {
          if (index === 0) {
            max = item.jian;
            cur = item.jian;
          } else {
            if (item.jian > max) {
              max = item.jian;
            } else {
              cur = item.jian;
            }
          }
        }
      }
      return this.context.detail.highestCoupon = max;
    };

    Coupon.prototype.findTheMaxCouponPrice = function() {
      var goodsPrice, i, item, len, maxCouponPrice, me, ref;
      me = this;
      goodsPrice = this.context.reTmallorTaobaoGoodPrice();
      maxCouponPrice = 0;
      ref = this.coupons;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (goodsPrice >= item.man) {
          if (maxCouponPrice === 0) {
            maxCouponPrice = item.jian;
          } else {
            if (item.jian > maxCouponPrice) {
              maxCouponPrice = item.jian;
            }
          }
        }
      }
      return maxCouponPrice;
    };

    Coupon.prototype.bindCopyButton = function() {
      var me;
      me = this;
      return $(document).on('click', '.qtk_couponCopy', function() {
        var tmpUrl;
        tmpUrl = $(this).parents('tr').find("input");
        tmpUrl.select();
        document.execCommand("Copy", false, '');
        return me.context.layer.msg("复制成功");
      });
    };

    Coupon.prototype.dateCompare = function(x, y) {
      var d1, d2, time1, time2;
      d1 = x.replace(/\-/gi, "/");
      d2 = y.replace(/\-/gi, "/");
      time1 = new Date(d1).getTime();
      time2 = new Date(d2).getTime();
      if (time1 > time2) {
        return false;
      }
      return true;
    };

    Coupon.prototype.couponSerious = function(coupon) {
      var date, me;
      me = this;
      date = me.dateCompare(me.currentDate, coupon.endDate);
      if ((coupon.yiLing >= coupon.totalCount) || date === false) {
        return false;
      }
      return true;
    };

    Coupon.prototype.receiveCoupons = function(activityId, sellerId) {
      $("div.layui-layer[boxtype='coupon']").remove();
      return this.context.layer.open({
        type: 1,
        skin: 'layui-layer-modal',
        closeBtn: 1,
        shift: 2,
        title: '领券',
        area: '480px',
        shade: false,
        boxtype: 'coupon',
        content: "<div style='height: 480px; overflow: hidden;'> <iframe src='https://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&amp;activity_id=" + activityId + "&amp;seller_id=" + sellerId + "' width='480' height='480' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no'></iframe> </div>"
      });
    };

    Coupon.prototype.turnLinkEntry = function(number, position, activityId, sellerId, event) {
      var Box, BoxMold, BoxPrev, me;
      me = this;
      BoxMold = number ? "z-link" : "w-link";
      Box = $("div.layui-layer[boxtype=" + BoxMold + "]");
      BoxPrev = $("div.layui-layer[boxtype='preview']");
      if (me.isTurnLinkState === false && Box.length === 0) {
        me.isTurnLinkState = true;
        return me.turnLink(number, position, activityId, sellerId, event);
      } else if (me.isTurnLinkState === true && Box.length === 1) {
        Box.remove();
        BoxPrev.remove();
        return me.isTurnLinkState = false;
      } else {
        Box.remove();
        BoxPrev.remove();
        me.isTurnLinkState = true;
        return me.turnLink(number, position, activityId, sellerId, event);
      }
    };

    Coupon.prototype.turnLink = function(number, position, activityId, sellerId) {
      var boxMold, couponLink, deferred, me;
      me = this;
      this.pidSelectorIndex++;
      this.selectorIndex = this.pidSelectorIndex;
      this.pidSelectorLayerIndex = 0;
      if (position === 0) {
        couponLink = $(event.target).parents('tr').find('input').val() ? $(event.target).parents('tr').find('input').val() : '';
      }
      boxMold = number ? "z-link" : "w-link";
      if (activityId === null && sellerId === null) {
        deferred = $.when(me.config.get('defaultSkin'), me.config.get('taokoulingTemplate'));
      } else {
        deferred = $.when(me.config.get('defaultSkin'), me.config.get('taokoulingTemplate'), me.alimama.getCouponDetail(sellerId, activityId));
      }
      return deferred.done((function(_this) {
        return function(skin, amoyTemplate, couponDetail) {
          var priceInfo, promise, skinClass, template, tips, title;
          if (couponDetail !== false && couponDetail !== void 0) {
            priceInfo = {
              J: couponDetail.jian,
              G: me.context.reTmallorTaobaoGoodPrice(),
              Y: Math.round((me.context.reTmallorTaobaoGoodPrice() - couponDetail.jian) * 100) / 100
            };
          }
          skinClass = "layer-color-" + skin;
          if (amoyTemplate === "" || amoyTemplate === null) {
            template = "{图片}\n今日推荐：{标题}\n领{优惠券面额}元内部券，券后【{券后价}元】包邮秒杀！\n【推荐理由】{推广文案}\n\n商品链接{短连接}；或复制这条信息{淘口令}，打开☞手机淘宝☜即可查看并下单！";
          } else {
            template = amoyTemplate;
          }
          title = number ? "转二合一" : "转微信";
          tips = number ? "<span class=\"qtk_turnLink_tips\">（注意使用QQ渠道推广PID）</span>" : "<span class=\"qtk_turnLink_tips\">（注意使用微信渠道推广PID）</span>";
          promise = $.when(me.alimama.getPidFromAlimama());
          return promise.always(function(vPidList) {
            var HTML;
            HTML = position ? me.otherObj.menuTurnLinkBG(vPidList, template, me.selectorIndex) : me.otherObj.openTurnLinkBG(vPidList, template, couponLink, me.selectorIndex, priceInfo);
            return me.pidSelectorLayerIndex = me.context.layer.open({
              type: 1,
              skin: 'layui-layer-modal ' + skinClass,
              closeBtn: 1,
              shift: 2,
              title: title + tips,
              area: '640px',
              shade: false,
              content: HTML,
              boxtype: boxMold,
              success: function(layero) {
                var copyList, data, i, index, item, key, len, picList, value;
                if (position === 0) {
                  if (me.context.detail.highPicCopy !== null) {
                    $(layero).find(".new").css("display", "inline-block");
                    $(layero).find(".qtk_other_copy").css("display", "block");
                    data = me.context.detail.highPicCopy;
                    picList = "";
                    copyList = "";
                    for (key in data) {
                      value = data[key];
                      if (key === "wenan") {
                        for (index = i = 0, len = value.length; i < len; index = ++i) {
                          item = value[index];
                          copyList += "<li><span>" + (index - 0 + 1) + "</span><textarea>" + item["txt"] + "</textarea><a href=\"javascript:;\">替换</a></li>";
                        }
                      } else {
                        picList += "<li class=\"clearfix\"><a href=\"javascript:;\"><img src=" + value["s_url"] + " alt=\"商品预览图\" data-pic=" + value["my_url"] + "></a></li>";
                      }
                    }
                    $(layero).find(".qtk_2in1_picture_box ul").append(picList);
                    $(layero).find(".qtk_other_copy").on("click", (function(_this) {
                      return function(event) {
                        var cod;
                        if ($("div.layui-layer[boxtype='preview']").length === 0) {
                          cod = me.positionMovement(layero, -300);
                          layer.open({
                            type: 1,
                            skin: "layui-layer-modal " + skinClass,
                            closeBtn: 1,
                            shift: 2,
                            title: "预览",
                            area: "440px",
                            shade: false,
                            offset: [cod["y"] + "px", cod["x"] + "px"],
                            content: "<div class=\"qtk_turnLink_preview\" style=\"height:" + cod["h"] + "px;\"><ul>" + copyList + "</ul></div>",
                            boxtype: "preview",
                            success: function(layer2) {
                              return $(layer2).find(".layui-layer-setwin > a").on("click", function() {
                                return me.positionMovement(layero, 300);
                              });
                            }
                          });
                        } else {
                          $("div.layui-layer[boxtype='preview']").find("div.qtk_turnLink_preview").empty().append("<ul>" + copyList + "</ul>");
                        }
                        return $(".qtk_turnLink_preview").find("a").on("click", function() {
                          return $("[name='qtk_weChat_text_box']").val($(this).prev().text());
                        });
                      };
                    })(this));
                  }
                }
                return me.turnLinkEvent(layero, title, number, position, skinClass, boxMold, priceInfo);
              }
            });
          });
        };
      })(this));
    };

    Coupon.prototype.turnLinkEvent = function(layero, title, number, position, skin, boxMold, priceInfo) {
      var Layer, me;
      me = this;
      Layer = $(layero);
      Layer.find(".qtk_turnLink_change > a").on("click", function() {
        var curent;
        curent = $(Layer).find(".qtk_turnLink").css("display");
        if (curent === "none") {
          $(Layer).find(".qtk_turnLink").css("display", "block");
          return Layer.find(".qtk_turnLink_change > a").text("隐藏话术模板");
        } else {
          $(Layer).find(".qtk_turnLink").css("display", "none");
          return Layer.find(".qtk_turnLink_change > a").text("显示话术模板");
        }
      });
      Layer.find(".qtk_turnLink_textarea").on("keydown", function(event) {
        return event.stopPropagation();
      });
      Layer.find(".qtk_turnLink_default_template").on("click", function() {
        return Layer.find(".qtk_turnLink_setting_template").val("{图片}\n今日推荐：{标题}\n领{优惠券面额}元内部券，券后【{券后价}元】包邮秒杀！\n【推荐理由】{推广文案}\n\n商品链接{短连接}；或复制这条信息{淘口令}，打开☞手机淘宝☜即可查看并下单！");
      });
      Layer.find(".qtk_turnLink_empty_template").on("click", function() {
        return Layer.find(".qtk_turnLink_setting_template").val("");
      });
      Layer.find(".qtk_turnLink_save_template").on("click", function() {
        var promise;
        if (/^\s*$/.test(Layer.find(".qtk_turnLink_setting_template").val())) {
          layer.msg("模板不能为空，请重新设置！");
          return false;
        }
        promise = me.qtk.saveWechatTemplate(Layer.find(".qtk_turnLink_setting_template").val());
        promise.fail(function(data) {
          if (data.errorText.msg === "请登录" || data.errorText.msg === "请登陆。") {
            return layer.msg("请登录后再保存！");
          } else {
            return layer.msg("保存失败，请重新提交保存！");
          }
        });
        return promise.done(function() {
          layer.msg("保存成功！");
          return me.config.set('taokoulingTemplate', Layer.find(".qtk_turnLink_setting_template").val());
        });
      });
      Layer.find(".qtk_2in1_select_btn").on("click", function() {
        return Layer.find(".qtk_2in1_pid_select").slideToggle(100);
      });
      Layer.find(".qtk_2in1_pid_options").on("click", function() {
        var match, value;
        value = $(this).html();
        match = /mm_\d+_\d+_\d+/i.exec(value);
        Layer.find(".qtk_2in1_pid_select").slideToggle(100);
        return $('.qtk_2in1_pid_box').find('input').val(match[0]);
      });
      Layer.find(".qtk_turnLink_setting_options > li > a").on("click", function() {
        var content, positionXY, start, textArea;
        textArea = Layer.find(".qtk_turnLink_setting_template")[0];
        content = textArea.value;
        start = textArea.selectionStart;
        textArea.value = content.substring(0, textArea.selectionStart) + $(this).data("value") + content.substring(textArea.selectionEnd, content.length);
        positionXY = start + $(this).data("value").length;
        Layer.find(".qtk_turnLink_setting_template").focus();
        return textArea.setSelectionRange(positionXY, positionXY);
      });
      Layer.find(".qtk_weChat_text_box").val($.trim($("p.newp").text() || $("p.tb-subtitle").text()));
      Layer.find(".layui-layer-setwin a").on("click", function() {
        return $(".layui-layer[boxtype='preview']").remove();
      });
      Layer.find('[name="price"]').on('blur', function() {
        var newVal;
        if (Number($(this).val()) === Number($(this).val())) {
          newVal = Math.round(($(this).val() - priceInfo.J) * 100) / 100;
          return Layer.find('[name="used_price"]').empty().text(newVal);
        } else {
          return Layer.find('[name="used_price"]').empty().text("");
        }
      });
      Layer.find(".qtk_2in1_picture_box").find("img").on("error", (function(_this) {
        return function(event) {
          return $(event.target).parents("li").remove();
        };
      })(this));
      Layer.find(".qtk_2in1_picture_box").on("click", (function(_this) {
        return function(event) {
          var cod, currentSrc, currentSrcArr, currentSrcArrPNG, previewSrc, webPic;
          if (event.target.nodeName === "IMG") {
            Layer.find(".qtk_2in1_picture li").removeClass("tb-selected");
            $(event.target).parents("li").addClass("tb-selected");
            previewSrc = "";
            if ($(event.target).data("pic") === void 0) {
              currentSrc = $(event.target).attr("src");
              webPic = /webp$/.test(currentSrc);
              if (webPic === true) {
                previewSrc = currentSrc.replace(/\d{2,3}x\d{2,3}\.jpg_\.webp$/, "310x310.jpg");
              } else {
                currentSrcArr = /(.*\.jpg)(_.*\.jpg)/g.exec(currentSrc);
                if (currentSrcArr !== null) {
                  previewSrc = currentSrcArr[1];
                } else {
                  currentSrcArrPNG = /.*\.png/g.exec(currentSrc);
                  if (currentSrcArrPNG !== null) {
                    previewSrc = currentSrcArrPNG[0];
                  } else {
                    return false;
                  }
                }
              }
            } else {
              previewSrc = $(event.target).data("pic");
            }
            if ($("div.layui-layer[boxtype='preview']").length === 0) {
              cod = me.positionMovement(Layer, -300);
              return layer.open({
                type: 1,
                skin: "layui-layer-modal " + skin,
                closeBtn: 1,
                shift: 2,
                title: "预览",
                area: "440px",
                shade: false,
                offset: [cod["y"] + "px", cod["x"] + "px"],
                content: "<div class=\"qtk_turnLink_preview\" style=\"height:" + cod["h"] + "px;\"><img src=" + previewSrc + "></div>",
                boxtype: "preview",
                success: function(layero) {
                  return $(layero).find(".layui-layer-setwin > a").on("click", function() {
                    return me.positionMovement(Layer, 300);
                  });
                }
              });
            } else {
              return $("div.layui-layer[boxtype='preview']").find("div.qtk_turnLink_preview").empty().append("<img src=" + previewSrc + "></div>");
            }
          }
        };
      })(this));
      return Layer.find(".qtk_2in1_btn").on("click", function() {
        var HTML, activityId, couponPrice, dx, gid, image, pid, procesMenu, procesOpen, processResult, sellerId, template, userPrice, word;
        template = Layer.find(".qtk_turnLink_setting_template").val();
        if (/^\s*$/.test(template)) {
          layer.msg("模板信息不能为空");
          return false;
        }
        pid = Layer.find("#qtk_user_input_MM").val();
        if (!/^mm_\d+_\d+_\d+$/i.test(pid)) {
          layer.tips('错误的PID', Layer.find("#qtk_user_input_MM"));
          return false;
        } else {
          (new Storage).set('PID', pid);
        }
        $("div.layui-layer[boxtype='preview']").remove();
        dx = Layer.find("[name='qtk_2in1_type']:checked").val();
        gid = "";
        activityId = "";
        sellerId = "";
        word = "";
        image = "";
        userPrice = "";
        couponPrice = "";
        procesOpen = function() {
          var imageArr, imageArrPNG, webPic;
          gid = /(&itemId|\?id|&id)=(\d+)/g.exec(Layer.find("[name='qtk_2in1_goods_link']").val());
          if (gid === null) {
            layer.msg("商品信息有误，请重新输入");
            return false;
          } else {
            gid = gid[2];
          }
          activityId = /(activityId|activity_id)=([a-z0-9]+)/i.exec(Layer.find("[name='qtk_2in1_coupon_link']").val());
          if (activityId === null) {
            layer.msg("商品信息有误，请重新输入");
            return false;
          } else {
            activityId = activityId[2];
          }
          sellerId = /(sellerId|seller_id)=(\d+)/i.exec(Layer.find("[name='qtk_2in1_coupon_link']").val());
          if (sellerId !== null) {
            sellerId = sellerId[2];
          }
          word = Layer.find("[name='qtk_weChat_text_box']").val();
          image = Layer.find(".qtk_2in1_picture_box .tb-selected img").attr("src");
          userPrice = Layer.find("[name='price']").val();
          couponPrice = Layer.find("[name='used_price']").text();
          if (image.search(/qingtaoke/g) === -1) {
            webPic = /webp$/.test(image);
            if (webPic === true) {
              image = image.replace(/\d{2,3}x\d{2,3}\.jpg_\.webp$/, "310x310.jpg");
            } else {
              imageArr = /(.*\.jpg)(_.*\.jpg)/g.exec(image);
              if (imageArr === null) {
                imageArrPNG = /.*\.png/g.exec(image);
                image = imageArrPNG[0] + "_310x310.jpg";
              } else {
                image = imageArr[1] + "_310x310.jpg";
              }
            }
            image = image.search(/http/g) === -1 ? "https:" + image : image;
          }
          return true;
        };
        procesMenu = function() {
          var i, info, item, item2, j, len, len1, special, word2, words, words2;
          info = Layer.find(".qtk_turnLink_setting_other").val();
          special = /https:\/\/s\.click\.taobao\.com\/[0-9A-Za-z]+/.exec(info);
          if (special !== null && number === 1) {
            activityId = /(activityId|activity_id)=([a-z0-9]+)/i.exec(info);
            if (activityId !== null) {
              activityId = activityId[2];
            }
            words2 = info.match(/\n?(.+)?/g);
            if (words2 !== null) {
              for (i = 0, len = words2.length; i < len; i++) {
                item2 = words2[i];
                if (!/http|https/g.test(item2) && item2 !== "") {
                  word2 = item2;
                }
              }
            }
            me.turnLinkSpecial(title, number, special[0], pid, dx, skin, boxMold, template, word2, activityId, sellerId);
            return false;
          }
          gid = /(&itemId|\?id|&id)=(\d+)/g.exec(info);
          if (gid === null) {
            layer.msg("商品信息有误，请重新输入");
            return false;
          } else {
            gid = gid[2];
          }
          activityId = /(activityId|activity_id)=([a-z0-9]+)/i.exec(info);
          if (activityId === null) {
            layer.msg("商品信息有误，请重新输入");
            return false;
          } else {
            activityId = activityId[2];
          }
          sellerId = /(sellerId|seller_id)=(\d+)/i.exec(info);
          if (sellerId !== null) {
            sellerId = sellerId[2];
          }
          words = info.match(/\n?(.+)?/g);
          if (words !== null) {
            for (j = 0, len1 = words.length; j < len1; j++) {
              item = words[j];
              if (!/http|https/g.test(item) && item !== "") {
                word = item;
              }
            }
          }
          return true;
        };
        processResult = position ? procesMenu() : procesOpen();
        if (processResult === true) {
          HTML = me.otherObj.resultTurnLinkBG(number);
          return layer.open({
            type: 1,
            skin: "layui-layer-modal " + skin,
            closeBtn: 1,
            shift: 2,
            title: title + "结果",
            area: "540px",
            shade: false,
            content: HTML,
            boxtype: boxMold,
            success: function(layero) {
              layer.close(me.pidSelectorLayerIndex);
              if (number) {
                return me.turnLinkResult1(layero, gid, sellerId, activityId, pid, dx, word, template, image, userPrice, couponPrice);
              } else {
                return me.turnLinkResult2(layero, gid, sellerId, activityId, pid, dx, word, template, image, userPrice, couponPrice);
              }
            }
          });
        }
      });
    };

    Coupon.prototype.turnLinkResult1 = function(layero, gid, sellerId, activityId, pid, dx, word, template, image, userPrice, couponPrice) {
      var Layer, me;
      me = this;
      Layer = $(layero);
      return $.when(me.alimama.goodsDetail(gid)).done((function(_this) {
        return function(goods) {
          var SELLER_ID, promise;
          SELLER_ID = goods.layoutData.replaceDataMap.SELLER_ID;
          if (sellerId !== null) {
            if (sellerId !== SELLER_ID) {
              me.errorMessage(Layer, 1);
              me.qtk.errorCount({
                "api": "AgoodsDetail",
                "goodsid": gid,
                "activityId": activityId,
                "errorType": "user"
              });
              return false;
            }
          } else {
            sellerId = SELLER_ID;
          }
          promise = me.alimama.getCouponDetail(sellerId, activityId);
          return promise.then(function(coupon) {
            var couponLink, defer, goodsPrice, goodsSales, goodsTitle;
            if (coupon === false) {
              me.errorMessage(Layer, 1);
              me.qtk.errorCount({
                "api": "AgetCouponDetail",
                "goodsid": gid,
                "activityId": activityId
              });
              return false;
            } else {
              goodsTitle = goods.itemInfoModel.title;
              goodsSales = /"totalSoldQuantity":"(\d+(\.\d+)?)"/g.exec(goods.apiStack[0].value);
              goodsPrice = /"price":"(\d+(\.\d+)?)"/g.exec(goods.apiStack[0].value);
              couponLink = "http://uland.taobao.com/coupon/edetail?activityId=" + activityId + "&pid=" + pid + "&itemId=" + gid + "&src=qtka_qjbb&dx=" + dx + "";
              defer = me.alimama.getTaoKouLingFrom2in1(couponLink, goodsTitle);
              defer.done(function(TKL) {
                var agreement1, agreement2, picture, turnInfo;
                Layer.find(".qtk_2in1_result_taokouling").val(TKL.password);
                turnInfo = {
                  "id": gid,
                  "sellerId": sellerId,
                  "activityid": activityId,
                  "pid": pid,
                  "dx": dx
                };
                if (image === "") {
                  picture = goods.itemInfoModel.picsPath[0] + "_310x310.jpg";
                } else {
                  picture = image;
                }
                if (!(/qingtaoke.com/.test(picture))) {
                  picture = picture.replace(/.*?\/\/.*?\//, "//imgproxy.qingtaoke.com/");
                  agreement1 = /^http:/.test(picture);
                  agreement2 = /^https:/.test(picture);
                  if (agreement1 === false && agreement2 === false) {
                    picture = "http:" + picture;
                  } else if (agreement1 === false && agreement2 === true) {
                    picture = picture.replace(/^https/, "http");
                  }
                  picture = picture.replace(/[A-Z]/g, function($1) {
                    return "*" + $1.toLowerCase();
                  });
                }
                return $.when(me.qtk.getTurn2In1Link(turnInfo)).done(function(link) {
                  var templateData;
                  Layer.find('.qtk_2in1_result_link').val(link.url);
                  Layer.find('.qtk_2in1_times span').empty().text(link.times);
                  templateData = {
                    image: picture,
                    title: goodsTitle,
                    coupon: coupon.jian,
                    price: couponPrice || Math.round((goodsPrice[1] - coupon.jian) * 100) / 100,
                    copy: word,
                    link: link.url,
                    password: TKL.password,
                    goodsPrice: userPrice || goodsPrice[1],
                    monSales: goodsSales[1]
                  };
                  Layer.find(".qtk_2in1_result_link").val(link.url);
                  Layer.find('.qtk_turnLink_result').empty().append(me.handleTemplate(template, templateData));
                  me.copyEvent(Layer);
                  return me.context.currentCommission(2);
                }).fail(function(link) {
                  if (link.errorText === "请登录" || link.errorText === "请登陆。") {
                    me.errorMessage(Layer, 0);
                    return me.qtk.errorCount({
                      "api": "QgetTurn2In1Link",
                      "goodsid": gid,
                      "activityId": activityId,
                      "errorType": "user"
                    });
                  } else {
                    me.errorMessage(Layer, 1);
                    return me.qtk.errorCount({
                      "api": "QgetTurn2In1Link",
                      "goodsid": gid,
                      "activityId": activityId
                    });
                  }
                });
              });
              return defer.fail(function() {
                me.errorMessage(Layer, 2);
                return me.qtk.errorCount({
                  "api": "AgetTaoKouLingFrom2in1",
                  "goodsid": gid,
                  "activityId": activityId
                });
              });
            }
          });
        };
      })(this)).fail(function() {
        me.errorMessage(Layer, 2);
        return me.qtk.errorCount({
          "api": "AgoodsDetail",
          "goodsid": gid,
          "activityId": activityId
        });
      });
    };

    Coupon.prototype.turnLinkResult2 = function(layero, gid, sellerId, activityId, pid, dx, word, template, image, userPrice, couponPrice) {
      var Layer, me;
      me = this;
      Layer = $(layero);
      return $.when(me.alimama.goodsDetail(gid)).done((function(_this) {
        return function(goods) {
          var SELLER_ID, promise;
          SELLER_ID = goods.layoutData.replaceDataMap.SELLER_ID;
          if (sellerId !== null) {
            if (sellerId !== SELLER_ID) {
              me.errorMessage(Layer, 1);
              me.qtk.errorCount({
                "api": "AgoodsDetail",
                "goodsid": gid,
                "activityId": activityId,
                "errorType": "user"
              });
              return false;
            }
          } else {
            sellerId = SELLER_ID;
          }
          promise = me.alimama.getCouponDetail(sellerId, activityId);
          return promise.then(function(coupon) {
            var couponLink, defer, goodsPrice, goodsSales, goodsTitle;
            if (coupon === false) {
              me.errorMessage(Layer, 1);
              me.qtk.errorCount({
                "api": "AgetCouponDetail",
                "goodsid": gid,
                "activityId": activityId
              });
              return false;
            } else {
              goodsTitle = goods.itemInfoModel.title;
              goodsSales = /"totalSoldQuantity":"(\d+(\.\d+)?)"/g.exec(goods.apiStack[0].value);
              goodsPrice = /"price":"(\d+(\.\d+)?)"/g.exec(goods.apiStack[0].value);
              couponLink = "http://uland.taobao.com/coupon/edetail?activityId=" + activityId + "&pid=" + pid + "&itemId=" + gid + "&src=qtka_qjbb&dx=" + dx + "";
              defer = me.alimama.getTaoKouLingFrom2in1(couponLink, goodsTitle);
              defer.done(function(TKL) {
                var agreement1, agreement2, goodsInfo, picture;
                Layer.find(".qtk_2in1_result_taokouling").val(TKL.password);
                goodsInfo = {
                  "title": goodsTitle,
                  "gid": gid,
                  "pid": pid,
                  "wenan": word,
                  "activityId": activityId,
                  "sellerId": sellerId,
                  "tao_key": TKL.password,
                  "dx": dx,
                  "imageSrc": goods.itemInfoModel.picsPath[0],
                  "sell_num": goodsSales[1],
                  "price": goodsPrice[1],
                  "used_price": Math.round((goodsPrice[1] - coupon.jian) * 100) / 100
                };
                if (image === "") {
                  picture = goods.itemInfoModel.picsPath[0] + "_310x310.jpg";
                } else {
                  picture = image;
                }
                if (!(/qingtaoke.com/.test(picture))) {
                  picture = picture.replace(/.*?\/\/.*?\//, "//imgproxy.qingtaoke.com/");
                  agreement1 = /^http:/.test(picture);
                  agreement2 = /^https:/.test(picture);
                  if (agreement1 === false && agreement2 === false) {
                    picture = "http:" + picture;
                  } else if (agreement1 === false && agreement2 === true) {
                    picture = picture.replace(/^https/, "http");
                  }
                  picture = picture.replace(/[A-Z]/g, function($1) {
                    return "*" + $1.toLowerCase();
                  });
                }
                return $.when(me.qtk.getWechatLink(goodsInfo)).done(function(link) {
                  var templateData;
                  templateData = {
                    image: picture,
                    title: goodsTitle,
                    coupon: coupon.jian,
                    price: couponPrice || Math.round((goodsPrice[1] - coupon.jian) * 100) / 100,
                    copy: word,
                    link: link.url,
                    password: TKL.password,
                    goodsPrice: userPrice || goodsPrice[1],
                    monSales: goodsSales[1]
                  };
                  Layer.find(".qtk_2in1_result_link").val(link.url);
                  Layer.find('.qtk_turnLink_result').empty().append(me.handleTemplate(template, templateData));
                  me.copyEvent(Layer);
                  return me.context.currentCommission(3);
                }).fail(function() {
                  me.errorMessage(Layer, 2);
                  return me.qtk.errorCount({
                    "api": "QgetWechatLink",
                    "goodsid": gid,
                    "activityId": activityId
                  });
                });
              });
              return defer.fail(function() {
                me.errorMessage(Layer, 2);
                return me.qtk.errorCount({
                  "api": "AgetTaoKouLingFrom2in1",
                  "goodsid": gid,
                  "activityId": activityId
                });
              });
            }
          });
        };
      })(this)).fail(function() {
        me.errorMessage(Layer, 2);
        return me.qtk.errorCount({
          "api": "AgoodsDetail",
          "goodsid": gid,
          "activityId": activityId
        });
      });
    };

    Coupon.prototype.turnLinkSpecial = function(title, number, url, pid, dx, skin, box, template, word, activityId, sellerId) {
      var HTML, me;
      me = this;
      HTML = me.otherObj.resultTurnLinkBG(number);
      return layer.open({
        type: 1,
        skin: "layui-layer-modal " + skin,
        closeBtn: 1,
        shift: 2,
        title: title + "结果",
        area: "540px",
        shade: false,
        content: HTML,
        boxtype: box,
        success: function(layero) {
          var Layer, d, info;
          Layer = $(layero);
          layer.close(me.pidSelectorLayerIndex);
          if (word === void 0) {
            word = "";
          }
          info = {
            dx: dx,
            url: url,
            pid: pid,
            word: word,
            activityId: activityId
          };
          d = me.qtk.getTransferLinkSpecial(info);
          d.done(function(data) {
            var gid, link, times;
            gid = data.gid;
            activityId = data.activityId;
            link = data.url;
            times = data.times;
            return $.when(me.alimama.goodsDetail(gid)).done((function(_this) {
              return function(goods) {
                var promise;
                sellerId = goods.layoutData.replaceDataMap.SELLER_ID;
                promise = me.alimama.getCouponDetail(sellerId, activityId);
                return promise.then(function(coupon) {
                  var couponLink, defer, goodsPrice, goodsSales, goodsTitle;
                  if (coupon === false) {
                    me.errorMessage(Layer, 1);
                    me.qtk.errorCount({
                      "api": "AgetCouponDetail",
                      "goodsid": gid,
                      "activityId": activityId,
                      "errorType": "user"
                    });
                    return false;
                  } else {
                    goodsTitle = goods.itemInfoModel.title;
                    goodsSales = /"totalSoldQuantity":"(\d+(\.\d+)?)"/g.exec(goods.apiStack[0].value);
                    goodsPrice = /"price":"(\d+(\.\d+)?)"/g.exec(goods.apiStack[0].value);
                    couponLink = "http://uland.taobao.com/coupon/edetail?activityId=" + activityId + "&pid=" + pid + "&itemId=" + gid + "&src=qtka_qjbb&dx=" + dx + "";
                    defer = me.alimama.getTaoKouLingFrom2in1(couponLink, goodsTitle);
                    defer.done(function(TKL) {
                      var agreement1, agreement2, picture, templateData, turnInfo;
                      Layer.find(".qtk_2in1_result_taokouling").val(TKL.password);
                      turnInfo = {
                        "id": gid,
                        "sellerId": sellerId,
                        "activityid": activityId,
                        "pid": pid,
                        "dx": dx
                      };
                      picture = goods.itemInfoModel.picsPath[0] + "_310x310.jpg";
                      picture = picture.replace(/.*?\/\/.*?\//, "//imgproxy.qingtaoke.com/");
                      agreement1 = /^http:/.test(picture);
                      agreement2 = /^https:/.test(picture);
                      if (agreement1 === false && agreement2 === false) {
                        picture = "http:" + picture;
                      } else if (agreement1 === false && agreement2 === true) {
                        picture = picture.replace(/^https/, "http");
                      }
                      picture = picture.replace(/[A-Z]/g, function($1) {
                        return "*" + $1.toLowerCase();
                      });
                      Layer.find('.qtk_2in1_result_link').val(link);
                      Layer.find('.qtk_2in1_times span').empty().text(times);
                      templateData = {
                        image: picture,
                        title: goodsTitle,
                        coupon: coupon.jian,
                        price: Math.round((goodsPrice[1] - coupon.jian) * 100) / 100,
                        copy: data.wenan,
                        link: link,
                        password: TKL.password,
                        goodsPrice: goodsPrice[1],
                        monSales: goodsSales[1]
                      };
                      Layer.find(".qtk_2in1_result_link").val(link);
                      Layer.find('.qtk_turnLink_result').empty().append(me.handleTemplate(template, templateData));
                      me.copyEvent(Layer);
                      return me.context.currentCommission(2);
                    });
                    return defer.fail(function() {
                      me.errorMessage(Layer, 2);
                      return me.qtk.errorCount({
                        "api": "AgetTaoKouLingFrom2in1",
                        "goodsid": gid,
                        "activityId": activityId
                      });
                    });
                  }
                });
              };
            })(this)).fail(function() {
              me.errorMessage(Layer, 2);
              return me.qtk.errorCount({
                "api": "AgoodsDetail",
                "goodsid": gid,
                "activityId": activityId
              });
            });
          });
          return d.fail(function(link) {
            if (link.errorText === "请登录" || link.errorText === "请登陆。") {
              me.errorMessage(Layer, 0);
              return me.qtk.errorCount({
                "api": "QgetTransferLinkSpecial",
                "goodsid": gid,
                "activityId": activityId,
                "errorType": "user"
              });
            } else if (link.errorText.error === 1) {
              me.errorMessage(Layer, 1);
              return me.qtk.errorCount({
                "api": "QgetTransferLinkSpecial",
                "goodsid": gid,
                "activityId": activityId
              });
            } else {
              me.errorMessage(Layer, 2);
              return me.qtk.errorCount({
                "api": "QgetTransferLinkSpecial",
                "goodsid": gid,
                "activityId": activityId
              });
            }
          });
        }
      });
    };

    Coupon.prototype.copyEvent = function(object) {
      var Layer, me;
      me = this;
      Layer = object;
      Layer.find('.qtk_coupon2in1').on('click', function() {
        $('.qtk_2in1_result_1').select();
        document.execCommand("Copy", false, '');
        return me.context.layer.msg("复制成功");
      });
      Layer.find('.qtk_tkl2in1').on('click', function() {
        $('.qtk_2in1_result_2').select();
        document.execCommand("Copy", false, '');
        return me.context.layer.msg("复制成功");
      });
      return Layer.find("#qtk_turnLink_copy").on("click", function() {
        var indexClip;
        indexClip = new Clipboard("#qtk_turnLink_copy", {
          target: function() {
            return document.getElementById('qtk_copyClip');
          }
        });
        indexClip.on('success', function(event) {
          event.clearSelection();
          return layer.msg('已复制');
        });
        return indexClip.on('error', function(event) {
          event.clearSelection();
          return layer.msg('您的浏览器不支持一键复制，请升级浏览器或更换浏览器');
        });
      });
    };

    Coupon.prototype.errorMessage = function(object, errorType) {
      var Layer, message;
      Layer = object;
      if (errorType === 0) {
        message = "请登录后再操作！";
      } else if (errorType === 1) {
        message = "输入信息错误，请检查后重试！";
      } else if (errorType === 2) {
        message = "抱歉！转链失败了，请重试。";
      } else {
        message = "获取失败！";
      }
      Layer.find(".qtk_2in1_result_link").val(message);
      Layer.find(".qtk_2in1_result_taokouling").val(message);
      return Layer.find(".qtk_turnLink_result").empty().html(message);
    };

    Coupon.prototype.positionMovement = function(layer, dis) {
      var coord, curHe, curLe, curTo, curWi;
      coord = new Object();
      curWi = layer.width();
      curHe = layer.height();
      curTo = layer.offset().top;
      curLe = layer.offset().left;
      layer.animate({
        left: curLe + dis + "px"
      });
      coord["x"] = curLe + curWi + dis + 20;
      coord["y"] = curTo - $(document).scrollTop();
      coord["h"] = curHe - 70;
      return coord;
    };

    Coupon.prototype.handleTemplate = function(template, data) {
      var d, me, processTemplate;
      me = this;
      processTemplate = function(amoy) {
        var result;
        result = amoy;
        if (data.image === null) {
          result = result.replace(/\{图片\}/g, "");
        } else {
          result = result.replace(/\{图片\}/g, '<img src="' + data["image"] + '">');
          result = result.replace(/\n/g, "<br>");
        }
        result = result.replace(/\{标题\}/g, data["title"]);
        result = result.replace(/\{优惠券面额\}/g, data["coupon"]);
        result = result.replace(/\{券后价\}/g, data["price"]);
        result = result.replace(/\{推广文案\}/g, data["copy"]);
        if (data.copy === "") {
          result = result.replace(/【推荐理由】/g, "");
          result = result.replace(/<br><br>/g, "<br>");
        }
        result = result.replace(/\{短连接\}/g, data["link"]);
        result = result.replace(/\{淘口令\}/g, data["password"]);
        result = result.replace(/\{商品价格\}/g, data["goodsPrice"]);
        return result = result.replace(/\{月销量\}/g, data["monSales"]);
      };
      if (template === void 0 || template.errorCode) {
        d = me.config.get("taokoulingTemplate");
        return d.always((function(_this) {
          return function(taokoulingTemplate) {
            var amoyTemplate;
            if (taokoulingTemplate === "") {
              return amoyTemplate = "{图片}\n今日推荐：{标题}\n领{优惠券面额}元内部券，券后【{券后价}元】包邮秒杀！\n【推荐理由】{推广文案}\n\n商品链接{短连接}；或复制这条信息{淘口令}，打开☞手机淘宝☜即可查看并下单！";
            } else {
              amoyTemplate = taokoulingTemplate;
              return processTemplate(amoyTemplate);
            }
          };
        })(this));
      } else {
        if (typeof template === "string") {
          return processTemplate(template);
        } else {
          return processTemplate(template.code);
        }
      }
    };

    return Coupon;

  })();
});
