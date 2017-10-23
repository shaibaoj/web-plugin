define('queryPlanQTK', ['jquery', 'underscore', 'layer', 'alimama', 'configInBackground', 'commissionInCampaign'], function($, _, layer, Alimama, ConfigInBackground, CommissionInCampaign) {
  var QueryPlanQTK;
  return QueryPlanQTK = (function() {
    function QueryPlanQTK() {
      this.init();
      this.alimama = new Alimama;
      this.commission = null;
    }

    QueryPlanQTK.prototype.init = function() {
      var me;
      me = this;
      return $(document).on("click", "#cj_status_layer", function(event) {
        var gid, sellerId;
        me.showResult("查询中");
        me.commission = new Object();
        gid = $(event.target).data("gid");
        sellerId = $(event.target).data("sellerid");
        return me.queryCurrentPlan(gid, sellerId);
      });
    };

    QueryPlanQTK.prototype.queryCurrentPlan = function(gid, sellerId) {
      var d1, me;
      me = this;
      d1 = me.alimama.searchAuction(gid);
      d1.done((function(_this) {
        return function(auction) {
          var d2;
          me.commission["currency"] = auction.tkRate;
          d2 = me.alimama.getCampaignList(sellerId);
          d2.done(function(campaign) {
            var cic, d3, i, item, len, ref;
            if (campaign.exsitApplyList !== null && campaign.exsitApplyList !== void 0) {
              ref = campaign.exsitApplyList;
              for (i = 0, len = ref.length; i < len; i++) {
                item = ref[i];
                if (item.status === 2) {
                  cic = new CommissionInCampaign(item.campaignId, item.shopKeeperId, sellerId);
                  d3 = cic.get(gid);
                  d3.done(function(commission) {
                    if (commission !== null) {
                      me.commission["commission"] = commission.commissionRatePercent;
                      return me.computeCurrentCommission();
                    }
                  });
                  d3.fail(function() {
                    return me.showResult("查询失败");
                  });
                  break;
                }
              }
            }
            me.queryCurrentMagpie(gid);
            return me.computeCurrentCommission();
          });
          return d2.fail(function(data) {
            if (data.errorText === "nologin") {
              return me.noLogin();
            } else {
              return me.showResult("查询失败");
            }
          });
        };
      })(this));
      return d1.fail(function() {
        return me.showResult("查询失败");
      });
    };

    QueryPlanQTK.prototype.queryCurrentMagpie = function(gid) {
      var dtd, me;
      me = this;
      dtd = me.alimama.magpieDetail(gid);
      dtd.done(function(mag) {
        if (mag !== null) {
          me.commission["magpie"] = Math.round(mag.eventRate * 95) / 100;
        }
        return me.computeCurrentCommission();
      });
      return dtd.fail(function(data) {
        return me.showResult("查询失败");
      });
    };

    QueryPlanQTK.prototype.computeCurrentCommission = function() {
      var commissionName, key, me, number, ref, value;
      me = this;
      number = 0;
      commissionName = null;
      ref = me.commission;
      for (key in ref) {
        value = ref[key];
        if ((value - number) > 0) {
          commissionName = key;
        }
      }
      switch (commissionName) {
        case "magpie":
          return me.showResult(me.commission[commissionName] + "% 高佣推广");
        case "currency":
          return me.showResult(me.commission[commissionName] + "% 通用计划");
        case "commission":
          return me.showResult(me.commission[commissionName] + "% 定向计划");
      }
    };

    QueryPlanQTK.prototype.noLogin = function() {
      $("#cj_status_layer").empty().append('<a href="javascript:;" class="qtk_login_alimama">请登录淘宝联盟</a>');
      return $(document).on("click", ".qtk_login_alimama", function(event) {
        event.stopPropagation();
        if ($("div.layui-layer[boxtype=login]").length === 0) {
          return layer.open({
            type: 1,
            skin: 'layui-layer-modal',
            closeBtn: 1,
            shift: 2,
            title: '登录淘宝联盟',
            area: '400px',
            shade: false,
            boxtype: 'login',
            content: "<div><iframe src='http://www.alimama.com/member/minilogin.htm?custom_style=alimama' width='400' height='280' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no'></iframe></div>"
          });
        } else {
          return $("div.layui-layer[boxtype='login']").remove();
        }
      });
    };

    QueryPlanQTK.prototype.showResult = function(result) {
      return $("#cj_status_layer").empty().append(result);
    };

    return QueryPlanQTK;

  })();
});
