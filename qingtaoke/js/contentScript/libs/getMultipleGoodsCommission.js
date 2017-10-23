define('getMultipleGoodsCommission', ['jquery', 'underscore', 'alimama', 'errorCode'], function($, _, Alimama, ErrorCode) {
  var GetMultipleGoodsCommission;
  return GetMultipleGoodsCommission = (function() {
    function GetMultipleGoodsCommission(goodsList) {
      this.goodsList = goodsList;
      this.index = 0;
      this.dtd = $.Deferred();
      this.alimama = new Alimama;
    }

    GetMultipleGoodsCommission.prototype.start = function() {
      this.getGoodsCommission();
      return this.dtd;
    };

    GetMultipleGoodsCommission.prototype.getGoodsCommission = function() {
      var auctionId, d;
      if (this.index >= this.goodsList.length) {
        this.dtd.resolve(true);
        return true;
      }
      auctionId = this.goodsList[this.index];
      d = this.alimama.searchAuction(auctionId);
      d.fail((function(_this) {
        return function(e) {
          if (e.errorCode === ErrorCode.ERROR_ALIMAMA_LOGOUT) {
            _this.dtd.reject(e);
            return false;
          }
          _this.index++;
          return setTimeout(function() {
            return _this.getGoodsCommission();
          }, 100);
        };
      })(this));
      return d.done((function(_this) {
        return function(result) {
          _this.dtd.notify({
            index: _this.index,
            goods: result,
            auctionId: auctionId
          });
          _this.index++;
          return setTimeout(function() {
            return _this.getGoodsCommission();
          }, 100);
        };
      })(this));
    };

    return GetMultipleGoodsCommission;

  })();
});
