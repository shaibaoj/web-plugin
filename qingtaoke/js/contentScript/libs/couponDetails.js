define('couponDetails', ['jquery', 'alimama'], function($, Alimama) {
  var CouponDetails;
  return CouponDetails = (function() {
    function CouponDetails() {
      this.addDetails();
    }

    CouponDetails.prototype.addDetails = function() {
      return this.getCouponInfo();
    };

    CouponDetails.prototype.getCouponInfo = function() {
      var activityId, alimama, dtd, me, sellerId;
      me = this;
      activityId = /(activityId|activity_id)=([a-z0-9]+)/i.exec(window.location.href);
      if (activityId === null) {
        return false;
      } else {
        activityId = activityId[2];
      }
      sellerId = /(sellerId|seller_id)=(\d+)/i.exec(window.location.href);
      if (sellerId === null) {
        return false;
      } else {
        sellerId = sellerId[2];
      }
      alimama = new Alimama();
      dtd = alimama.getCouponDetail(sellerId, activityId);
      dtd.done(function(data) {
        var HTML, status, timer;
        status = false;
        HTML = me.addCouponHTML(data.name, data.yiLing, data.totalCount, data.xianling);
        return timer = setInterval(function() {
          if (status === false && $('span[style]').length > 0) {
            $("body").find("img").parent().append(HTML);
            clearInterval(timer);
            return status = true;
          }
        }, 200);
      });
      return dtd.fail(function(e) {
        return console.log(e);
      });
    };

    CouponDetails.prototype.addCouponHTML = function(NA, YL, TC, XL) {
      var html;
      html = new Array();
      if (NA === void 0 || YL === void 0 || TC === void 0 || XL === void 0) {
        html.push("<div style='position:absolute;right:2%;bottom:10%;'>查询失败，请刷新重试</div>");
      } else {
        html.push("<div style='position:absolute;right:2%;bottom:10%;'>");
        html.push("  <div>");
        html.push("    <span style='color:#FFF'>券名称：</span><span style='color:#FFF'>" + NA + "</span>");
        html.push("  </div>");
        html.push("  <div style=''>");
        if (XL === "不限") {
          html.push("    <span style='color:#FFF'>(已领 " + YL + "/ " + TC + ")</span><span style='color:#FFF'>" + XL + "张数</span>");
        } else {
          html.push("    <span style='color:#FFF'>(已领 " + YL + "/ " + TC + ")</span><span style='color:#FFF'> 限领" + XL + "</span>");
        }
        html.push("  </div>");
        html.push("</div>");
      }
      return html.join("\n");
    };

    return CouponDetails;

  })();
});
