define('goodsIsTmall', ['jquery', 'underscore', 'alimama'], function($, _, Alimama) {
  var GoodsIsTmall;
  return GoodsIsTmall = (function() {
    function GoodsIsTmall(goodsList) {
      this.goodsList = goodsList;
      if (!_.isArray(this.goodsList)) {
        this.goodsList = [this.goodsList];
      }
      this.result = {};
      this.index = 0;
      this.dtd = $.Deferred();
      this.alimama = new Alimama;
    }

    GoodsIsTmall.prototype.get = function() {
      this.getGoods();
      return this.dtd;
    };

    GoodsIsTmall.prototype.getGoods = function() {
      var d, gid;
      if (this.index >= this.goodsList.length) {
        this.dtd.resolve(this.result);
        return true;
      }
      gid = this.goodsList[this.index];
      d = this.alimama.goodsDetail(gid);
      d.fail((function(_this) {
        return function() {
          _this.index++;
          return _this.getGoods();
        };
      })(this));
      return d.done((function(_this) {
        return function(result) {
          var seller;
          seller = result.seller;
          _this.result[result.itemInfoModel.itemId] = seller.type === 'B';
          _this.index++;
          return _this.getGoods();
        };
      })(this));
    };

    return GoodsIsTmall;

  })();
});
