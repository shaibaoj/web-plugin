define('singlePage', ['jquery', 'underscore', 'common', 'layer', 'alimama', 'commissionInCampaign', 'qtkApi', 'singleOther', 'configInBackground', 'config', 'storage', 'editPrice', 'copyPicture', 'keyboard', 'singlePage2', 'vue', 'coupon', 'commissionFinder', 'tableorder'], function($, _, Common, layer, Alimama, CommissionInCampaign, QtkApi, SingleOther, ConfigInBackground, CONFIG, Storage, EditPrice, CopyPicture, Keyboard, Single2, Vue, Coupon, CommissionFinder) {
  var SinglePage;
  layer.config({
    path: chrome.extension.getURL('/js/layer/')
  });
  return SinglePage = (function() {
    var version;

    SinglePage.shortURLIndex = -1;

    SinglePage.comeFromWhere = 0;

    SinglePage.isLoginAlima = false;

    version = Common.getManifestVersion();

    function SinglePage() {
      var me;
      this.pidSelectorIndex = 0;
      this.vue = null;
      this.VueFunction = Vue;
      this.layer = layer;
      this.detail = {
        loadImageUrl: chrome.runtime.getURL("/images/loading.gif"),
        commissionRateMax: '',
        commissionMax: '',
        commissionRate: '',
        commission: '',
        totalFee: '',
        saleNum: 0,
        applyReason: '',
        userNumberId: '',
        campaigns: null,
        goodsId: this.reTmallorTaobaoGoodID(),
        goodsPrice: this.reTmallorTaobaoGoodPrice(),
        activityId: null,
        sellerId: null,
        dx: 0,
        youHuiQuanShop: null,
        youHuiQuanHidden: null,
        highestCoupon: 0,
        highPicCopy: null,
        curCommission: new Object(),
        curCommissionR: '查询中',
        onlineNumber: '查询中',
        eventRate: '<img class="loading-icon" src="' + chrome.runtime.getURL("../images/loading.gif") + '" />',
        highCommissionMagpie: 0
      };
      me = this;
      this.computed = {};
      this.coupon = new Coupon(this);
      this.commissionFinder = new CommissionFinder(this);
      this.methods = {
        turnLink: function(number, position, activityId, sellerId) {
          return me.coupon.turnLinkEntry(number, position, activityId, sellerId, event);
        },
        receiveCoupons: function(activityId, sellerId) {
          return me.coupon.receiveCoupons(activityId, sellerId, event);
        },
        applyCampaign: function(campaignId, shopKeeperId) {
          me.commissionFinder.applyCampaign(campaignId, shopKeeperId);
          return me.updateComputeCommission();
        },
        exitCampaign: function(pubId) {
          me.commissionFinder.exitCampaign(pubId);
          return me.updateComputeCommission();
        }
      };
      this.comeFromFn();
      this.init();
      this.marginTagHeight = {};
      this.single2 = new Single2;
      setTimeout((function(_this) {
        return function() {
          _this.queryOnlineNumber();
          _this.currentCommission(1);
          return _this.detail.goodsPrice = _this.reTmallorTaobaoGoodPrice();
        };
      })(this), 2000);
    }

    SinglePage.prototype.comeFromFn = function() {
      if (window.location.host === 'item.taobao.com') {
        return this.comeFromWhere = 1;
      } else if (window.location.host === 'detail.tmall.com') {
        return this.comeFromWhere = 2;
      } else if (window.location.host === 'world.tmall.com') {
        return this.comeFromWhere = 3;
      } else {
        return this.comeFromWhere = 4;
      }
    };

    SinglePage.prototype.init = function() {
      var config, d;
      config = new ConfigInBackground;
      d = $.when(config.get('username'), config.get('expired'), config.get('isLoginAlimama'), config.get('menuPositionTop'), config.get('menuPositionLeft'), config.get('isUnavailable'), config.get('defaultSkin'));
      return d.done((function(_this) {
        return function(username, endDate, visLoginAlimama, menuPositionTop, menuPositionLeft, isUnavailable, skin) {
          _this.menuPositionTop = menuPositionTop;
          _this.menuPositionLeft = menuPositionLeft;
          _this.isLoginAlima = visLoginAlimama;
          _this.addPage(username, endDate, skin);
          return setTimeout(function() {
            new EditPrice;
            return new CopyPicture;
          }, 2000);
        };
      })(this));
    };

    SinglePage.prototype.addPage = function(vusername, vendDate, skin) {
      var config, kb, qtk;
      kb = new Keyboard;
      kb.on('oneKeyContent', (function(_this) {
        return function() {
          return $('.editBg').trigger('click');
        };
      })(this));
      kb.on('searchShortcut', (function(_this) {
        return function() {
          return $('.findGoodsCommission').trigger('click');
        };
      })(this));
      kb.on('menuShortcut', (function(_this) {
        return function() {
          if (_this.menuIndex) {
            layer.close(_this.menuIndex);
            return true;
          }
          return _this.menuIndex = layer.open({
            type: 1,
            skin: 'layui-layer-demo panel-color-' + skin,
            closeBtn: false,
            shift: 2,
            title: '轻淘客(' + version + ')',
            offset: [_this.menuPositionTop, _this.menuPositionLeft],
            area: '260px',
            shade: false,
            maxmin: true,
            content: $('.qtk_singlePage_content'),
            end: function() {
              _this.menuIndex = null;
              return delete _this.menuIndex;
            },
            moveEnd: function() {
              return _this.onMoveEnd();
            }
          });
        };
      })(this));
      qtk = new QtkApi;
      config = new ConfigInBackground();
      return $.when(config.get('defaultSkin'), config.get('isDefaultShowMenu'), qtk.update()).done((function(_this) {
        return function(skin, isDefaultShowMenu, ver) {
          var menu2, singOtherObj, skinClass;
          skinClass = "panel-color-" + skin;
          singOtherObj = new SingleOther;
          menu2 = singOtherObj.getMenu(vusername, vendDate, ver);
          $('.qtk_singlePage_content').remove();
          $('body').append(menu2);
          if (isDefaultShowMenu === '1') {
            return _this.menuIndex = layer.open({
              type: 1,
              skin: 'layui-layer-demo ' + skinClass,
              closeBtn: false,
              shift: 2,
              title: '轻淘客(' + version + ')',
              offset: [_this.menuPositionTop, _this.menuPositionLeft],
              area: '260px',
              shade: false,
              maxmin: true,
              end: function() {
                _this.menuIndex = null;
                return delete _this.menuIndex;
              },
              content: $('.qtk_singlePage_content'),
              moveEnd: function() {
                return _this.onMoveEnd();
              },
              success: function(layero, index) {
                return _this.bingding();
              }
            });
          } else {
            $("body").find(".qtk_singlePage_content").css("display", "none");
            return _this.bingding();
          }
        };
      })(this));
    };

    SinglePage.prototype.onMoveEnd = function() {
      var config, layerTag, left, maxHeight, offset, storage, top, windowWidth;
      layerTag = $('#layui-layer' + this.menuIndex);
      offset = $(layerTag).offset();
      windowWidth = $(window).width();
      maxHeight = $(window).height();
      storage = new Storage;
      top = offset.top;
      if (top < 0) {
        top = 50;
      }
      if (top > maxHeight - 200) {
        top = maxHeight - 200;
      }
      top = top + 'px';
      left = parseInt(offset.left / windowWidth * 100);
      if (left > 80) {
        left = 80;
      }
      if (left < 0) {
        left = 0;
      }
      left = left + "%";
      this.menuPositionTop = top;
      this.menuPositionLeft = left;
      storage.set('menuPositionTop', top);
      storage.set('menuPositionLeft', left);
      config = new ConfigInBackground;
      config.set('menuPositionTop', top);
      return config.set('menuPositionLeft', left);
    };

    SinglePage.prototype.bingding = function() {
      var defaults, ds, me, that;
      that = this;
      me = this;
      me.queryHighPicCopy();
      this.commissionFinder.bindButtons();
      $(document).on('click', '.qtk_skin_peeler', function() {
        var config;
        if ($("div.layui-layer[boxtype='skin']").length === 0) {
          config = new ConfigInBackground;
          return $.when(config.get('defaultSkin')).done((function(_this) {
            return function(skin) {
              var skinClass;
              skinClass = "layer-color-" + skin;
              return layer.open({
                type: 1,
                skin: 'layui-layer-modal ' + skinClass,
                closeBtn: 1,
                shift: 2,
                title: '<i class="pageIcon2"></i>皮肤设置',
                area: '500px',
                shade: false,
                content: SingleOther.skinDIV,
                boxtype: "skin",
                success: function(layero, index) {
                  var name;
                  name = "span." + skin;
                  $(".qtk_skin_peeler_box").find(name).next().addClass("active");
                  $(".qtk_skin_peeler_box").find("li").on("click", function() {
                    $(".qtk_skin_peeler_box").find("i").each(function() {
                      return $(this).removeClass("active");
                    });
                    return $(this).find("i").addClass("active");
                  });
                  return $(".qtk_skin_peeler_box").find(".qtk_2in1_btn").on("click", function() {
                    config = new ConfigInBackground;
                    config.set('defaultSkin', $(".qtk_skin_peeler_box").find("i.active").prev().data("skin"));
                    return window.location.reload();
                  });
                }
              });
            };
          })(this));
        } else {
          return $("div.layui-layer[boxtype='skin']").remove();
        }
      });
      $(document).on('click', '.qtk_plugIn_searchBtn', function() {
        $("[name='qtk_search']").serialize();
        return $("[name='qtk_search']").submit();
      });
      $(document).on('click', '.qtk_login', function() {
        return layer.confirm("您是否已经成功登录轻淘客?", {
          icon: 3,
          title: "登录提示"
        }, function() {
          window.location.reload();
          return layer.close();
        });
      });
      $(document).on('click', ".qtkMenuShortURL", function() {
        if ($("div.layui-layer[boxtype='short']").length === 0) {
          return that.userSelfUR();
        } else {
          return $("div.layui-layer[boxtype='short']").remove();
        }
      });
      $(document).on('click', ".optionsBtn", function() {});
      $(document).on('click', ".qtkMenuQuickNav", function(e) {
        if (!$(e.target).hasClass('qtkMenuQuickNavs') && $(e.target).parents('.qtkMenuQuickNavs').length <= 0) {
          e.stopPropagation();
          $(".qtkMenuQuickNavs").stop().slideToggle(200);
        }
        return $(document).on('click', function() {
          return $(".qtkMenuQuickNavs").stop().slideUp(200);
        });
      });
      $('.findGoodsCommission').on('click', (function(_this) {
        return function() {
          var countSize, currentClass, htmlDef, singleOther;
          Common.log('findGoodsCommission');
          if ($('#qtk_single_bg_div').length) {
            currentClass = $('#qtk_single_bg_div').attr("class");
            if (currentClass === "closed") {
              $('#qtk_single_bg_div').removeClass("closed").addClass("min");
              me.contractTheWindow();
            } else {
              if (currentClass === "min") {
                me.stretchTheWindow();
              } else {
                me.contractTheWindow();
              }
            }
            return true;
          }
          singleOther = new SingleOther;
          htmlDef = singleOther.getDetailHtml();
          countSize = singleOther.setCountSize();
          return htmlDef.done(function(html) {
            if ($(".tb-wrap").length > 0) {
              $(html).prependTo($(".tb-wrap"));
            } else {
              $(html).prependTo($("#J_PropertyWrap"));
            }
            _this.vue = new Vue({
              el: '#qtk_single_bg_div',
              data: _this.detail,
              computed: _this.computed,
              methods: _this.methods
            });
            _this.commissionFinder.start();
            _this.bingDingAfter();
            return _this.onlineEvent();
          });
        };
      })(this));
      this.coupon.start();
      $(document).on('click', '.qtk_setting_btn', function() {
        var cL, cT, cW, qtk, sT, spacing, x, y;
        cW = $("[boxtype='default']").width();
        cT = $("[boxtype='default']").offset().top;
        cL = $("[boxtype='default']").offset().left;
        sT = window.outerHeight - document.documentElement.clientHeight;
        spacing = 20;
        if (cL < (440 + spacing)) {
          x = cL + cW + spacing;
        } else {
          x = cL - (440 + spacing);
        }
        y = cT + sT;
        qtk = new QtkApi;
        return qtk.openSetting(Math.round(x), Math.round(y));
      });
      $(document).on('click', '.qtkMenuChangeUrl', function() {
        var config, d;
        config = new ConfigInBackground;
        d = $.when(config.get('pidList'), config.get('isLoginAlimama'), config.get('isValid'), config.get('defaultSkin'));
        return d.done((function(_this) {
          return function(vPidList, visLoginAlima, isValid, skin) {
            var bgDIV, otherObj, skinClass;
            skinClass = "layer-color-" + skin;
            otherObj = new SingleOther;
            bgDIV = otherObj.reBgUrl2(vPidList);
            return that.shortURLIndex = layer.open({
              type: 1,
              skin: 'layui-layer-demo ' + skinClass,
              closeBtn: 1,
              shift: 2,
              title: '生成淘客推广链接',
              area: '400px',
              shade: false,
              content: bgDIV,
              success: function(layero, index) {
                that.Do_radio();
                that.doOneKeyShortURL();
                return that.closeSecondDiv();
              }
            });
          };
        })(this));
      });
      $(document).on('click', '.qtkMenu2in1', function() {
        return me.coupon.turnLinkEntry(1, 1, null, null, null);
      });
      $(document).on('click', '.qtkTurnLink', function() {
        return me.coupon.turnLinkEntry(0, 1, null, null, null);
      });
      $(".qtkMenuCollectionk").on('click', function() {
        var config, d;
        config = new ConfigInBackground;
        d = $.when(config.get('isLoginAlimama'), config.get('isValid'));
        return d.done((function(_this) {
          return function(visLoginAlima, isValid) {
            var almama, goodID, isTmall, pic, reDataList, title, tmpPrice;
            if (visLoginAlima === false) {
              $('#qtk_campaign_empty td').html('没有登录淘宝联盟或已退出淘宝联盟。<br/><a target="_blank" href="http://www.alimama.com/member/login.htm">点我去登录淘宝联盟</a>');
              return false;
            }
            goodID = that.reTmallorTaobaoGoodID();
            tmpPrice = that.reTmallorTaobaoGoodPrice();
            title = that.reTmallorTaobaoTitle();
            pic = that.reTmallorTaobaoPic();
            isTmall = that.comeFromWhere > 1 ? 1 : 0;
            almama = new Alimama;
            reDataList = almama.searchAuction(goodID);
            reDataList.fail(function(e) {
              return $('#qtk_campaign_empty td').html('没有登录淘宝联盟或已退出淘宝联盟。<br/><a target="_blank" href="http://www.alimama.com/member/login.htm">点我去登录淘宝联盟</a>');
            });
            return reDataList.done(function(response) {
              var tmpData;
              if (response == null) {
                response = {
                  calCommission: 0,
                  biz30day: 0,
                  totalFee: 0,
                  totalNum: 0,
                  commissionRatePercent: 0
                };
              }
              tmpData = {};
              tmpData = {
                comeFrom: that.comeFromWhere,
                picUrl: pic,
                price: tmpPrice,
                title: title,
                istmall: isTmall,
                ctime: -1,
                commision: 0,
                goodsId: goodID,
                commision: response.calCommission,
                biz30day: response.biz30day,
                totalFee: response.totalFee,
                totalNum: response.totalNum,
                commissionRatePercent: response.commissionRatePercent
              };
              return that.doCollection(tmpData);
            });
          };
        })(this));
      });
      $("#qtk_user_is_result").on('click', function() {
        var d, goodID, qtk;
        goodID = that.reTmallorTaobaoGoodID();
        qtk = new QtkApi;
        d = qtk.isCollectionUser(goodID);
        d.fail(function(e) {});
        return d.done(function(response) {
          return $("#qtk_user_is_result").text(response);
        });
      });
      $("#qtk_user_is_result").trigger('click');
      defaults = new ConfigInBackground;
      ds = $.when(defaults.get('isDefaultClickCommission'));
      ds.done((function(_this) {
        return function(isDefaultClickCommission) {
          if (isDefaultClickCommission === '1') {
            return $(".findGoodsCommission").trigger('click');
          }
        };
      })(this));
      return '';
    };

    SinglePage.prototype.closeSecondDiv = function() {
      var that;
      that = this;
      return $(".qtk_mm_close").on('click', function() {
        return layer.close(that.shortURLIndex);
      });
    };

    SinglePage.prototype.userSelfUR = function() {
      var bgDIV, config, d, that;
      that = this;
      bgDIV = SingleOther.bgUserSelf;
      config = new ConfigInBackground;
      d = $.when(config.get('isLoginAlimama'), config.get('isValid'), config.get('defaultSkin'));
      return d.done((function(_this) {
        return function(visLoginAlima, isValid, skin) {
          var skinClass;
          skinClass = 'layer-color-' + skin;
          return that.shortURLIndex = layer.open({
            type: 1,
            skin: 'layui-layer-modal ' + skinClass,
            closeBtn: 1,
            shift: 2,
            title: '<i class="pageIcon2"></i>短网址转换',
            area: '400px',
            shade: false,
            content: bgDIV,
            boxtype: "short",
            success: function(layero, index) {
              that.doUserSelfUR(skinClass);
              return that.closeSecondDiv();
            }
          });
        };
      })(this));
    };

    SinglePage.prototype.doUserSelfUR = function(skin) {
      var that;
      that = this;
      return $("#qtk_mm_okURL_Three").on('click', function() {
        var tmp_URL;
        tmp_URL = $("#qtk_user_input_URL").val();
        if (tmp_URL === '') {
          layer.alert("请输入URL", {
            icon: 2
          });
          return false;
        }
        return that.showShortURL(tmp_URL, '', skin);
      });
    };

    SinglePage.prototype.doCollection = function(tmpData) {
      var d, qtk;
      qtk = new QtkApi;
      d = qtk.doCollectionUser(tmpData);
      d.fail(function(e) {});
      return d.done(function(response) {
        return $("#qtk_user_is_result").text(response);
      });
    };

    SinglePage.prototype.doOneKeyShortURL = function() {
      var goodID, that;
      that = this;
      goodID = this.reTmallorTaobaoGoodID();
      return $("#qtk_mm_okURL_two").on('click', function() {
        var almama, fourArr, mmID, reDataList;
        mmID = $("#qtk_user_input_MM").val();
        if (mmID === '' || typeof mmID === 'undefined') {
          layer.alert("请输入PID", {
            icon: 2
          });
          return false;
        }
        fourArr = mmID.split("_");
        almama = new Alimama;
        reDataList = almama.convertLink(goodID, fourArr[2], fourArr[3]);
        reDataList.fail(function(e) {
          return layer.alert(e.errorText, {
            icon: 2
          });
        });
        return reDataList.done(function(response) {
          if (typeof response.clickUrl === 'undefined') {
            return layer.alert('该商品无推广链接', {
              icon: 2
            });
          } else {
            return that.showShortURL(response.clickUrl, response.shortLinkUrl);
          }
        });
      });
    };

    SinglePage.prototype.bingDingAfter = function() {
      var me;
      me = this;
      $("#qtk_single_bg_div_close").add("#qtk_min_btn_close").on('click', function() {
        return $("#qtk_single_bg_div").removeClass("max min").addClass("closed");
      });
      $("#qtk_single_bg_div_min").on('click', function() {
        return me.contractTheWindow();
      });
      $("#qtk_min_btn_restore, .qtk_min_data span.click-max").on('click', function() {
        return me.stretchTheWindow();
      });
      return '';
    };

    SinglePage.prototype.onlineEvent = function() {
      return $(".qtk_bg_month > span.sp").hover(function() {
        return $(this).find(".onTips").css("display", "block");
      }, function() {
        return $(this).find(".onTips").css("display", "none");
      });
    };

    SinglePage.prototype.animateNotice = function() {
      var promise, qtk;
      qtk = new QtkApi();
      promise = qtk.getNoticeList();
      promise.fail(function() {});
      return promise.done(function(data) {
        var i, item, j, len, len1, title;
        for (j = 0, len1 = data.length; j < len1; j++) {
          item = data[j];
          title = $("<li><a href='" + item['url'] + "' target='_blank'>" + item['title'] + "</a></li>");
          $(".qtk_bg_notice_list").append(title);
        }
        $(".qtk_bg_notice_list").append($(".qtk_bg_notice_list").find("li:first").clone(true));
        i = 0;
        len = $(".qtk_bg_notice_list").find("li").length;
        return setInterval((function() {
          i++;
          if (i !== (len - 1)) {
            return $(".qtk_bg_notice_list").animate({
              top: -i * 16 + "px"
            });
          } else {
            return $(".qtk_bg_notice_list").animate({
              top: -i * 16 + "px"
            }, function() {
              i = 0;
              return $(".qtk_bg_notice_list").css({
                top: 0 + "px"
              });
            });
          }
        }), 5000);
      });
    };

    SinglePage.prototype.stretchTheWindow = function() {
      $("#qtk_single_bg_div").removeClass("min").addClass("max");
      $(".scroll-content").css("display", "block");
      return $(".scroll-content-min").css("display", "none");
    };

    SinglePage.prototype.contractTheWindow = function() {
      $("#qtk_single_bg_div").removeClass("max").addClass("min");
      $(".scroll-content").css("display", "none");
      return $(".scroll-content-min").css("display", "block");
    };

    SinglePage.prototype.generate_queqiaoURL = function() {
      var that;
      that = this;
      $(".qtk_single_generate_queqiaoURL").on('click', function() {
        var config, d;
        config = new ConfigInBackground;
        d = $.when(config.get('pidList'), config.get('defaultSkin'));
        return d.done((function(_this) {
          return function(vPidList, skin) {
            var bgDIV, nowQueQiaoID, otherObj, skinClass;
            skinClass = "layer-color-" + skin;
            otherObj = new SingleOther;
            $(_this).parents('tr').addClass('qtk_singlePage_tr').siblings().removeClass('qtk_singlePage_tr');
            nowQueQiaoID = $(_this).attr("data-eventId");
            bgDIV = otherObj.reBgUrl(vPidList);
            return that.shortURLIndex = layer.open({
              type: 1,
              skin: 'layui-layer-modal ' + skinClass,
              closeBtn: 1,
              shift: 2,
              title: '生成鹊桥链接',
              area: '400px',
              shade: false,
              content: bgDIV,
              success: function(layero, index) {
                that.Do_radio();
                that.Do_generate_queqiaoURL(nowQueQiaoID, skinClass);
                return that.closeSecondDiv();
              }
            });
          };
        })(this));
      });
      return '';
    };

    SinglePage.prototype.generate_new_magpie_URL = function() {
      var that;
      that = this;
      $(".qtk-new-magpie").on('click', function() {
        var config, d;
        config = new ConfigInBackground;
        d = $.when(config.get('pidList'), config.get('defaultSkin'));
        return d.done((function(_this) {
          return function(vPidList, skin) {
            var bgDIV, otherObj;
            otherObj = new SingleOther;
            bgDIV = otherObj.reBgUrl(vPidList);
            return that.shortURLIndex = layer.open({
              type: 1,
              skin: 'layui-layer-modal layer-color-' + skin,
              closeBtn: 1,
              shift: 2,
              title: '生成鹊桥链接',
              area: '400px',
              shade: falsecl,
              content: bgDIV,
              success: function(layero, index) {
                that.Do_radio();
                that.Do_generate_new_magpie(null);
                return that.closeSecondDiv();
              }
            });
          };
        })(this));
      });
      return '';
    };

    SinglePage.prototype.Do_radio = function() {
      return $('.userQID').on('click', function() {
        var tmpValue;
        tmpValue = $(this).attr('data-pid');
        $('#qtk_user_input_MM').val(tmpValue);
        $(this).parents('.layui-layer').find('#qtk_mm_okURL_two').trigger('click');
        return $(this).parents('.layui-layer').find('#qtk_mm_okURL').trigger('click');
      });
    };

    SinglePage.prototype.Do_generate_queqiaoURL = function(nowQueQID, skin) {
      var goodID, that;
      goodID = this.reTmallorTaobaoGoodID();
      that = this;
      return $("#qtk_mm_okURL").on('click', function() {
        var almama, d, mmID, storage;
        mmID = $("#qtk_user_input_MM").val();
        if (mmID === '' || typeof mmID === 'undefined') {
          layer.alert("请输入鹊桥ID", {
            icon: 2
          });
          return false;
        }
        storage = new Storage;
        storage.set('MMPID', mmID);
        almama = new Alimama;
        d = almama.getPvid(nowQueQID);
        d.fail(function(e) {
          return layer.alert('生成失败!请重试!');
        });
        return d.done(function(pvid) {
          var def;
          def = almama.applyMagpie(nowQueQID, mmID);
          def.fail(function(e) {
            if (e.errorText === "nologin") {
              return layer.alert("请登录淘宝联盟");
            } else {
              return layer.alert(e.errorText);
            }
          });
          return def.done(function(response) {
            var reDataList;
            reDataList = almama.getQueQiaoListURLByEventId(nowQueQID, mmID);
            reDataList.fail(function(e) {
              return layer.alert(e.errorText);
            });
            return reDataList.done(function(response) {
              var findHttp, k, tmp_itemID, v;
              if (response != null) {
                findHttp = '';
                for (k in response) {
                  v = response[k];
                  tmp_itemID = v.itemId + '';
                  if (goodID === tmp_itemID) {
                    findHttp = 'https:' + v.href;
                    if (pvid.length > 0) {
                      findHttp += '&pvid=' + pvid;
                    }
                    break;
                  }
                }
                return that.showShortURL(findHttp, '', skin);
              } else {
                return layer.alert("查询鹊桥为空", {
                  icon: 2
                });
              }
            });
          });
        });
      });
    };

    SinglePage.prototype.Do_generate_new_magpie = function(nowQueQID, skin) {
      var goodID, that;
      goodID = this.reTmallorTaobaoGoodID();
      that = this;
      return $("#qtk_mm_okURL").on('click', function() {
        var almama, match, mmID, reDataList;
        mmID = $("#qtk_user_input_MM").val();
        if (mmID === '' || typeof mmID === 'undefined') {
          layer.alert("请输入鹊桥ID", {
            icon: 2
          });
          return false;
        }
        almama = new Alimama;
        match = /mm_(\d+)_(\d+)_(\d+)/i.exec(mmID);
        if (match === null) {
          layer.alert("错误的PID", {
            icon: 2
          });
          return;
        }
        reDataList = almama.generateMagpie(goodID, match[2], match[3]);
        reDataList.fail(function(e) {
          return layer.alert(e.errorText);
        });
        return reDataList.done(function(response) {
          return that.showShortURL(response.clickUrl, response.shortLinkUrl, skin);
        });
      });
    };

    SinglePage.prototype.showShortURL = function(vURL, vshortUrl, skin) {
      var bgDIV, reg, that;
      that = this;
      reg = /[\u4e00-\u9fa5]|(^\d*$)/g;
      if (reg.test(vURL) === true) {
        layer.alert("链接地址不对", {
          icon: 2
        });
        return false;
      }
      layer.close(that.shortURLIndex);
      if (vURL === '') {
        layer.alert('该商品已下架或者已从该鹊桥中剔除');
        return false;
      }
      bgDIV = SingleOther.showShortURLDIV;
      layer.open({
        type: 1,
        skin: 'layui-layer-modal ' + skin,
        closeBtn: 1,
        shift: 2,
        title: '<i class="pageIcon2"></i>生成结果',
        area: '500px',
        shade: false,
        content: bgDIV,
        boxtype: "short",
        success: function(layero, index) {
          $("#taobaoUrl").val(vURL);
          if (vshortUrl === '') {
            $('#taobaoSUrl').parent().hide();
          } else {
            $('#taobaoSUrl').val(vshortUrl);
          }
          that.showShortBaiduURL(vURL);
          that.showXinLURL(vURL);
          return that.btnCopyUrl();
        }
      });
      return '';
    };

    SinglePage.prototype.btnCopyUrl = function() {
      return $(".qtk_copy_url").on('click', function() {
        var tmpUrl;
        tmpUrl = $(this).parent().find("input");
        tmpUrl.select();
        document.execCommand("Copy", false, '');
        return layer.msg("复制成功");
      });
    };

    SinglePage.prototype.showShortBaiduURL = function(vURL) {
      var d, qtk;
      qtk = new QtkApi;
      d = qtk.shortURL(vURL);
      d.fail(function(e) {
        return $("#baiduUrl").val('请重试');
      });
      return d.done(function(response) {
        return $("#baiduUrl").val(response.tinyurl);
      });
    };

    SinglePage.prototype.showXinLURL = function(vURL) {
      var d, qtk;
      qtk = new QtkApi;
      d = qtk.shortXinLURL(vURL);
      d.fail(function(e) {
        return $("#xinLUrl").val('请重试');
      });
      return d.done(function(response) {
        return $("#xinLUrl").val(response.url_short);
      });
    };

    SinglePage.prototype.taskList = function(unbid, gid) {
      var alimama, dNew;
      alimama = new Alimama;
      dNew = alimama.getCampaigns(gid);
      dNew.done((function(_this) {
        return function(results) {
          var campaign, d, isAdded, j, jiHua, l, len1, len2, ref, rendered, tmp;
          if (!results) {
            return;
          }
          if (_this.detail.campaigns === null) {
            _this.detail.campaigns = [];
          }
          for (j = 0, len1 = results.length; j < len1; j++) {
            campaign = results[j];
            isAdded = false;
            ref = _this.detail.campaigns;
            for (l = 0, len2 = ref.length; l < len2; l++) {
              rendered = ref[l];
              if (campaign.campaignId === rendered.campaignId) {
                isAdded = true;
                break;
              }
            }
            if (!isAdded) {
              jiHua = {
                campaignName: campaign.CampaignName,
                campaignId: campaign.CampaignID,
                shenHe: campaign.Properties,
                isPass: false,
                commissionRate: campaign.commissionRate + "%",
                shopkeeperId: campaign.ShopKeeperID
              };
              tmp = {
                campId: campaign.CampaignName,
                keeperid: campaign.ShopKeeperID,
                userNumberId: unbid
              };
              _this.detail.campaigns.push(jiHua);
            }
          }
          d = alimama.getCampaignList(unbid);
          return d.done(function(response) {
            var haveTaskList, len3, len4, m, n, ref1;
            haveTaskList = new Array();
            if (response != null) {
              response = response.campaignList;
              if (_this.detail.campaigns === null) {
                _this.detail.campaigns = [];
              }
              for (m = 0, len3 = response.length; m < len3; m++) {
                campaign = response[m];
                isAdded = false;
                ref1 = _this.detail.campaigns;
                for (n = 0, len4 = ref1.length; n < len4; n++) {
                  rendered = ref1[n];
                  if (campaign.campaignId === rendered.campaignId) {
                    isAdded = true;
                    break;
                  }
                }
                if (!isAdded) {
                  jiHua = {
                    campaignName: campaign.campaignName,
                    campaignId: campaign.campaignId,
                    shenHe: campaign.properties === 3 ? '是' : '否',
                    isPass: false,
                    commissionRate: '<img class="loading-icon" src="' + chrome.runtime.getURL("../images/loading.gif") + '" />',
                    shopkeeperId: campaign.shopKeeperId
                  };
                  tmp = {
                    campId: campaign.campaignId,
                    keeperid: campaign.shopKeeperId,
                    userNumberId: unbid
                  };
                  haveTaskList.push(tmp);
                  _this.detail.campaigns.push(jiHua);
                }
              }
            }
            return _this.userAskPlay(unbid, gid);
          });
        };
      })(this));
      return dNew.fail((function(_this) {
        return function(e) {
          if (e.errorCode === 1) {
            return $('#qtk_campaign_empty td').html('没有登录淘宝联盟或已退出淘宝联盟。<br/><a target="_blank" href="http://www.alimama.com/member/login.htm">点我去登录淘宝联盟</a>');
          }
        };
      })(this));
    };

    SinglePage.prototype.queqiaoSearchList = function() {
      var alimama, dtd, good_id;
      good_id = this.reTmallorTaobaoGoodID();
      alimama = new Alimama;
      dtd = alimama.magpieDetail(good_id);
      dtd.fail(function(e) {
        return layer.alert(e.errorText, {
          icon: 2
        });
      });
      return dtd.done((function(_this) {
        return function(response) {
          var finalRate, selfBuy, shareRate, txt, url;
          txt = "<tr><td colspan='7'>暂无高佣活动</td></tr>";
          if (response === null) {

          } else {
            if (response.dayLeft >= 0) {
              url = encodeURIComponent("https://item.taobao.com/item.htm?id=" + good_id);
              shareRate = 100 - response.tk3rdRate;
              finalRate = (response.eventRate * shareRate) / 100;
              selfBuy = response.zkPrice - (response.zkPrice * finalRate * 0.87 / 100);
              txt = "<tr><td>" + response.eventRate + "%</td> <td>" + shareRate + "%</td> <td>" + (finalRate.toFixed(2)) + "%</td> <td>" + response.tkCommFee + "</td><td>" + (selfBuy.toFixed(2)) + "</td> <td>" + response.dayLeft + "天</td> <td><a href='http://pub.alimama.com/promo/item/channel/index.htm?q=" + url + "&channel=qqhd' target='_blank'>官方生成</a></td></tr>";
            }
          }
          $("#qtk_magpieGoodsList").html(txt);
          $('#qtksort-table').tablesorter();
          return _this.fn_applay_task();
        };
      })(this));
    };

    SinglePage.prototype.magpieSearchList = function() {
      var cqtkApi, dtd, good_id, pagePrice, txt;
      good_id = this.reTmallorTaobaoGoodID();
      pagePrice = this.reTmallorTaobaoGoodPrice();
      cqtkApi = new QtkApi;
      dtd = cqtkApi.queqiaoSearchByGoodsID(good_id);
      txt = '';
      dtd.fail(function(e) {
        return layer.alert(e.errorText, {
          icon: 2,
          time: 1500
        });
      });
      return dtd.done((function(_this) {
        return function(resonse) {
          var i, key, tmp_lastShare, tmp_shareRate, userCost, userLastComm;
          if (resonse === null) {
            txt = "<tr><td style='text-align: center' colspan='11'>暂无鹊桥计划</td></tr>";
          } else {
            for (key in resonse) {
              i = resonse[key];
              tmp_lastShare = "" + i['lastShare'];
              tmp_shareRate = "" + (Number(i['shareRate']));
              userLastComm = Number(tmp_lastShare * pagePrice / 100);
              userCost = pagePrice - (pagePrice * Number(tmp_lastShare) * 0.87 / 100);
              if (("" + i['lastDay']) === '未开始') {
                txt += "<tr style='color:red;'>";
              } else {
                i['lastDay'] += '天';
                txt += "<tr>";
              }
              txt += "<td><a href='http://temai.taobao.com/preview.htm?id=" + i["eventId"] + "' target='_blank'>" + i['eventId'] + "</a></td> <td>" + (Number(i['commissionRate'])) + "%</td> <td>" + i['startTime'] + "</td> <td>" + i['endTime'] + "</td> <td>" + (Number(i['shareRate'])) + "%</td> <td class=\"final-rate\">" + (Number(i['lastShare'].toFixed(2))) + "%</td> <td>" + (userLastComm.toFixed(2)) + "</td> <td>" + (userCost.toFixed(2)) + "</td> <td>" + i['lastDay'] + "</td> <td style=\"display:none;\"><a href='http://temai.taobao.com/preview.htm?id=" + i["eventId"] + "' target='_blank'>详情</a> </td> <td><a class='qtk-magpie-generate' href='http://pub.alimama.com/myunion.htm?#!/promo/act/activity_detail?eventId=" + i["eventId"] + "' target='_blank'>推广</a> </td> <td class='qtk_single_generate_queqiaoURL' data-eventId=" + i['eventId'] + ">生成</td> </tr>";
            }
          }
          $("#qtk_searchGoodsList").html(txt);
          $('#qtksort-table').tablesorter();
          _this.bindGenerate();
          return _this.generate_queqiaoURL();
        };
      })(this));
    };

    SinglePage.prototype.bindGenerate = function() {
      return $(document).on('click', '.qtk-magpie-generate', (function(_this) {
        return function() {
          var config, title;
          config = new ConfigInBackground;
          title = _this.getGoodsTitle();
          return config.set('goods-title', title);
        };
      })(this));
    };

    SinglePage.prototype.getGoodsTitle = function() {
      var isTmall, title;
      isTmall = this.reIsTmall();
      title = '';
      if (isTmall === 1) {
        title = $('.tb-detail-hd h1').text();
      } else {
        title = $('h3.tb-main-title').text();
      }
      title = title.replace(/(^\s*|\s*$)/ig, "");
      return title;
    };

    SinglePage.prototype.fn_applay_task = function() {
      var config, d2;
      Common.log('fn_applay_task');
      config = new ConfigInBackground();
      d2 = config.get('reason');
      d2.done(function(reason) {
        Common.log(reason);
        if (typeof reason === 'string') {
          return $("#userSubReason").val(reason);
        } else {
          return $("#userSubReason").val('');
        }
      });
      return $(document).on('click', '.qtkApplyTask', function() {
        var alimama, d, data_tmp, obj, qtkApi, split_arr, tmpObj, tmpTd, userReason;
        Common.log('qtkApplyTask');
        obj = $(this);
        tmpTd = obj.parent('td');
        tmpObj = obj.parents('tr');
        tmpObj.addClass('qtk_singlePage_tr').siblings().removeClass('qtk_singlePage_tr');
        data_tmp = $(this).attr('data-att');
        split_arr = data_tmp.split('-');
        userReason = $.trim($("#userSubReason").val());
        if (userReason.length === 0) {
          layer.alert('请填写申请理由', {
            icon: 2
          });
          return false;
        }
        if (split_arr[0] === "0") {
          layer.alert('通用计划无需申请', {
            icon: 2
          });
          return false;
        }
        qtkApi = new QtkApi();
        d2 = qtkApi.saveReason(userReason);
        alimama = new Alimama;
        d = alimama.applyCampaign(split_arr[0], split_arr[1], userReason);
        d.done(function(response) {
          if (response == null) {
            localStorage['userReason'] = userReason;
            tmpTd.html("<button onclick=\"javascript:window.location.href=location.href;\" >刷新</button>");
            return layer.alert("操作成功", {
              icon: 1
            });
          } else {
            return layer.alert("您已经在申请该计划或您已经申请过该掌柜计划", {
              icon: 2
            });
          }
        });
        return d.fail(function(e) {
          return layer.alert("计划不符合申请的条件", {
            icon: 2
          });
        });
      });
    };

    SinglePage.prototype.reIsTmall = function() {
      var good_id, isTmall;
      good_id = $("#LineZing").attr("itemid");
      isTmall = 1;
      if (typeof good_id === 'undefined') {
        isTmall = 0;
      }
      return isTmall;
    };

    SinglePage.prototype.reTmallorTaobaoGoodID = function() {
      var good_id, tmatch, tmatchArr, tmpUrl;
      tmpUrl = location.href;
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

    SinglePage.prototype.reTmallorTaobaoGoodPrice = function() {
      var pagePrice, price;
      pagePrice = $("#J_PromoPriceNum").text();
      if (pagePrice === '') {
        pagePrice = $("#J_PromoPrice").find(".tm-price").text();
      }
      if (pagePrice === '') {
        pagePrice = $("#J_StrPrice").find(".tb-rmb-num").text();
      }
      if (pagePrice === '') {
        pagePrice = $("#J_StrPriceModBox").find(".tm-price").text();
      }
      pagePrice = pagePrice.split('-');
      price = pagePrice[0];
      return parseFloat(price);
    };

    SinglePage.prototype.reTmallorTaobaoMonthlySales = function() {
      var number, numberArr, title;
      number = $("span.tm-count:first").text();
      if ($("span.tm-count:first").length < 1) {
        title = $("div.tb-sell-counter > a").attr("title");
        numberArr = title.match(/\d+/g);
        number = numberArr[1];
      }
      return number;
    };

    SinglePage.prototype.reTmallorTaobaoUserID = function() {
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

    SinglePage.prototype.reTmallorTaobaoTitle = function() {
      var tmp_title;
      tmp_title = $(".tb-detail-hd").find('h1').text();
      if (tmp_title === '') {
        tmp_title = $("#J_Title").find('h3').text();
      }
      return tmp_title;
    };

    SinglePage.prototype.reTmallorTaobaoPic = function() {
      var tmp_pic;
      tmp_pic = $("#J_ImgBooth").attr("src");
      return tmp_pic;
    };

    SinglePage.prototype.queryHighPicCopy = function() {
      var d, id, me, qtk;
      me = this;
      qtk = new QtkApi();
      id = /(&itemId|\?id|&id)=(\d+)/g.exec(window.location.href);
      d = $.when(qtk.getPicAndCopy(id[2]));
      d.done((function(_this) {
        return function(data) {
          me.detail.highPicCopy = data;
          $(".qtkHighPicCopy").css("display", "block");
          return $(".qtk_singlePage_content").find(".HPCTips").css("display", "block");
        };
      })(this));
      return d.fail(function() {
        return me.detail.highPicCopy = null;
      });
    };

    SinglePage.prototype.currentCommission = function(typeCase) {
      var alimama, d, me;
      me = this;
      alimama = new Alimama;
      if ($(".normalJhs").length !== 0) {
        d = alimama.searchAuction(me.detail.goodsId);
        d.done(function(auction) {
          return me.detail.curCommissionR = auction.tkRate + "% (通用)";
        });
        return d.fail(function() {
          return me.detail.curCommissionR = "查询失败";
        });
      } else {
        return $.when(alimama.goodsDetail(me.detail.goodsId)).done((function(_this) {
          return function(goods) {
            var delay, sellerId;
            sellerId = goods.layoutData.replaceDataMap.SELLER_ID;
            me.detail.sellerId = sellerId;
            delay = alimama.getCampaignList(sellerId);
            delay.done(function(campaign) {
              return $.when(alimama.searchAuction(me.detail.goodsId), alimama.magpieDetail(me.detail.goodsId)).done(function(auction, mag) {
                var cic, commission, commissionType, index, isLoginAlimama, item, j, len1, magTkRate, ref, results1;
                isLoginAlimama = true;
                me.disposeCommission(auction.tkRate, mag, campaign, isLoginAlimama, me.detail.goodsId, sellerId, null);
                if (mag === null) {
                  commission = auction.tkRate;
                  commissionType = 1;
                } else {
                  magTkRate = Math.round(mag.eventRate * 95) / 100;
                  if ((auction.tkRate - magTkRate) > 0) {
                    commission = auction.tkRate;
                    commissionType = 1;
                  } else {
                    commission = magTkRate;
                    commissionType = 2;
                  }
                }
                ref = campaign["campaignList"];
                results1 = [];
                for (index = j = 0, len1 = ref.length; j < len1; index = ++j) {
                  item = ref[index];
                  if (item.properties !== 3 && item.campaignId !== 0) {
                    cic = new CommissionInCampaign(item.campaignId, item.shopKeeperId, sellerId);
                    d = cic.get(me.detail.goodsId);
                    results1.push(d.done(function(commissionSingle) {
                      if (commissionSingle !== null) {
                        if ((commissionSingle.commissionRatePercent - commission) > 0) {
                          commission = commissionSingle.commissionRatePercent;
                          commissionType = 1;
                        }
                      }
                      if (index === (campaign["campaignList"].length - 1)) {
                        return me.upLoadGoodsDate(goods, isLoginAlimama, commission, commissionType, typeCase);
                      }
                    }));
                  } else {
                    results1.push(void 0);
                  }
                }
                return results1;
              }).fail(function() {
                return me.disposeCommission(null, null, null, null, null, null, 1);
              });
            });
            return delay.fail(function(campaign) {
              var isLoginAlimama;
              if (campaign.errorText === "nologin") {
                isLoginAlimama = false;
                me.disposeCommission(null, null, null, false, null, null, 2);
                return $.when(alimama.searchAuction(me.detail.goodsId), alimama.magpieDetail(me.detail.goodsId)).done(function(auction, mag) {
                  var commission, commission1, commission2, commissionType;
                  commission1 = auction.tkRate;
                  if (mag === null) {
                    commission = commission1;
                    commissionType = 1;
                  } else {
                    commission2 = Math.round(mag.eventRate * 95) / 100;
                    if ((commission1 - commission2) > 0) {
                      commission = commission1;
                      commissionType = 1;
                    } else {
                      commission = commission2;
                      commissionType = 2;
                    }
                  }
                  return me.upLoadGoodsDate(goods, isLoginAlimama, commission, commissionType, typeCase);
                }).fail(function() {});
              } else {
                return me.disposeCommission(null, null, null, null, null, null, 1);
              }
            });
          };
        })(this)).fail(function() {
          return me.disposeCommission(null, null, null, null, null, null, 1);
        });
      }
    };

    SinglePage.prototype.disposeCommission = function(currency, magpie, plan, login, gid, sellerId, errorType) {
      var cic, d1, item, j, len1, me, ref, results1;
      me = this;
      if (login === true && errorType === null) {
        if (magpie === null) {
          me.detail.curCommission["magpie"] = 0;
        } else {
          me.detail.curCommission["magpie"] = magpie.eventRate;
        }
        me.detail.curCommission["currency"] = currency;
        if (plan !== null && plan.exsitApplyList !== null && plan.exsitApplyList !== void 0) {
          ref = plan.exsitApplyList;
          results1 = [];
          for (j = 0, len1 = ref.length; j < len1; j++) {
            item = ref[j];
            if (item.status === 2) {
              cic = new CommissionInCampaign(item.campaignId, item.shopKeeperId, sellerId);
              d1 = cic.get(gid);
              d1.done((function(_this) {
                return function(commission) {
                  if (commission !== null) {
                    me.detail.curCommission["commission"] = commission.commissionRatePercent;
                    return me.detail.curCommissionR = commission.commissionRatePercent + "% (定向)";
                  }
                };
              })(this));
              d1.fail(function() {
                return me.detail.curCommissionR = "查询失败";
              });
              break;
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        } else {
          me.detail.curCommission["commission"] = 0;
          return me.computeCommission();
        }
      } else if (login === null && errorType === 1) {
        return me.detail.curCommissionR = "查询失败";
      } else if (login === false && errorType === 2) {
        return $(".qtk_bg_month > span").eq(2).find("b").empty().append("<a href='http://www.alimama.com/member/login.htm' target='_blank'>请登录淘宝联盟</a>");
      }
    };

    SinglePage.prototype.computeCommission = function() {
      var me;
      me = this;
      if (me.detail.curCommission["commission"] !== 0) {
        me.detail.curCommission["result"] = me.detail.curCommission["commission"] + "% (定向)";
      } else {
        if ((me.detail.curCommission["currency"] - me.detail.curCommission["magpie"]) > 0) {
          me.detail.curCommission["result"] = me.detail.curCommission["currency"] + "% (通用)";
        } else {
          me.detail.curCommission["result"] = me.detail.curCommission["magpie"] + "% (高佣)";
        }
      }
      return me.detail.curCommissionR = me.detail.curCommission["result"];
    };

    SinglePage.prototype.updateComputeCommission = function() {
      var alimama, me;
      me = this;
      if ($(".normalJhs").length !== 0) {
        return false;
      }
      alimama = new Alimama();
      return setTimeout(function() {
        var d2;
        d2 = alimama.getCampaignList(me.detail.sellerId);
        d2.done((function(_this) {
          return function(plan) {
            var cic, d1, item, j, len1, ref, results1;
            if (plan.exsitApplyList !== null && plan.exsitApplyList !== void 0) {
              ref = plan.exsitApplyList;
              results1 = [];
              for (j = 0, len1 = ref.length; j < len1; j++) {
                item = ref[j];
                if (item.status === 2) {
                  cic = new CommissionInCampaign(item.campaignId, item.shopKeeperId, me.detail.sellerId);
                  d1 = cic.get(me.detail.goodsId);
                  d1.done(function(commission) {
                    if (commission !== null) {
                      me.detail.curCommission["commission"] = commission.commissionRatePercent;
                      return me.detail.curCommissionR = commission.commissionRatePercent + "% (定向)";
                    }
                  });
                  d1.fail(function() {
                    return me.detail.curCommissionR = "查询失败";
                  });
                  break;
                } else {
                  results1.push(void 0);
                }
              }
              return results1;
            } else {
              me.detail.curCommission["commission"] = 0;
              return me.computeCommission();
            }
          };
        })(this));
        return d2.fail((function(_this) {
          return function(plan) {
            return me.detail.curCommissionR = "查询失败";
          };
        })(this));
      }, 2000);
    };

    SinglePage.prototype.queryOnlineNumber = function() {
      var gid, me;
      me = this;
      gid = this.reTmallorTaobaoGoodID();
      return $.ajax({
        method: "POST",
        dataType: "text",
        url: "https://lu.taobao.com/api/item?type=view_count&id=" + gid + "&_ksTS=1412581003175_109&callback=1&p=u&from=mypath&f=jp&jsonpCallback=jsonp",
        success: (function(_this) {
          return function(data) {
            data = JSON.parse(data.slice(2, -1));
            return me.detail.onlineNumber = data["listDesc"]["view_count"];
          };
        })(this),
        error: function() {
          return me.detail.onlineNumber = "查询失败";
        }
      });
    };

    SinglePage.prototype.upLoadGoodsDate = function(goods, isLoginAlimama, commission, commissionType, typeCase) {
      var copy, goodsInfo, monthlySales, price, qtk;
      price = /"price":"(\d+(\.\d+)?)"/g.exec(goods.apiStack[0].value);
      monthlySales = /"totalSoldQuantity":"(\d+(\.\d+)?)"/g.exec(goods.apiStack[0].value);
      if (price === null || monthlySales === null) {
        return false;
      }
      if (goods.seller.type === "B") {
        copy = $("tb-subtitle").text();
      } else {
        copy = $(".newp").text();
      }
      goodsInfo = {
        goodsID: goods.layoutData.replaceDataMap.ITEM_ID,
        pic: goods.itemInfoModel.picsPath[0],
        title: goods.itemInfoModel.title,
        shopID: goods.seller.userNumId,
        price: price[1],
        sellerType: goods.seller.type,
        classifyID: goods.trackParams.categoryId,
        describeScore: goods.seller.evaluateInfo[0].score,
        diffDescribe: goods.seller.evaluateInfo[0].highGap,
        monthlySales: monthlySales[1],
        copy: copy,
        commission: commission,
        commissionType: commissionType,
        isLoginAlimama: isLoginAlimama,
        type: typeCase
      };
      qtk = new QtkApi();
      return qtk.upLoadGoodsData(goodsInfo);
    };

    return SinglePage;

  })();
});
