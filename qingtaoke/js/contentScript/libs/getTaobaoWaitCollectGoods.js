define('getTaobaoWaitCollectGoods', ['jquery', 'underscore'], function($, _) {
  var GetTaobaoWaitCollectGoods;
  return GetTaobaoWaitCollectGoods = (function() {
    function GetTaobaoWaitCollectGoods() {
      this.page = 1;
      this.dtd = $.Deferred();
      this.originUrl = window.location.href;
      this.goodsList = [];
    }

    GetTaobaoWaitCollectGoods.prototype.get = function(pageCount) {
      this.pageCount = pageCount;
      this.getGoods();
      return this.dtd;
    };

    GetTaobaoWaitCollectGoods.prototype.getGoods = function() {
      var d;
      d = this.getGoodsPageGoods();
      d.fail((function(_this) {
        return function() {
          _this.page++;
          return _this.getGoods();
        };
      })(this));
      return d.done((function(_this) {
        return function(result) {
          var goods, goodsList, i, len, pager;
          pager = result.mods.pager || null;
          goodsList = result.mods.itemlist.data.auctions || [];
          for (i = 0, len = goodsList.length; i < len; i++) {
            goods = goodsList[i];
            _this.goodsList.push(goods);
          }
          if (!pager) {
            _this.dtd.reject(_this.goodsList);
            return false;
          }
          if (_this.page < _this.pageCount && _this.page <= pager.data.totalPage) {
            _this.page++;
            return _this.getGoods();
          } else {
            return _this.dtd.resolve(_this.goodsList);
          }
        };
      })(this));
    };

    GetTaobaoWaitCollectGoods.prototype.getGoodsPageGoods = function() {
      var url;
      url = this.originUrl;
      url = url.replace(/callback=[a-z0-9_]*/ig, "");
      url = url.replace(/ajax=[a-z0-9_]*/ig, "");
      url = url.replace(/s=[a-z0-9_]*/ig, "");
      url += '&ajax=true';
      url += '&s=' + ((this.page - 1) * 44);
      return $.ajax(url, {
        dataType: 'jsonp'
      });
    };

    return GetTaobaoWaitCollectGoods;

  })();
});
