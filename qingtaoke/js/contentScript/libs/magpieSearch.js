define('magpieSearch', ['jquery', 'underscore', 'configInBackground', 'layer', 'collectAlimamaSearch', 'storage', 'keyboard'], function($, _, ConfigInBackground, layer, CollectAlimamaSearch, Storage, Keyboard) {
  var MagpieSearch;
  return MagpieSearch = (function() {
    function MagpieSearch() {
      this.kb = new Keyboard;
      this.referer = document.referrer;
      this.isAuto = 0;
      if (/https?:\/\/[^\s]*?(taobao\.com|tmall\.com|95095\.com)[^\s]*?(\?|&|&amp;)id=\d+/.test(this.referer)) {
        this.isAuto = 1;
        this.startAuto();
      }
    }

    MagpieSearch.prototype.startAuto = function() {
      var checkInterval;
      return checkInterval = setInterval((function(_this) {
        return function() {
          var price;
          _this.goodsWrapper = $('.block-search-box');
          if (_this.goodsWrapper.length > 0) {
            clearInterval(checkInterval);
            price = $(_this.goodsWrapper).find('.number.number-16').text();
            if (/\d/.test(price)) {
              return setTimeout(function() {
                _this.clickLink();
                return _this.toShortLink();
              }, 500);
            }
          }
        };
      })(this), 500);
    };

    MagpieSearch.prototype.clickLink = function() {
      if (/f=qtk/ig.test(document.location.search)) {
        return;
      }
      return this.click($(this.goodsWrapper).find("a:contains('立即推广')")[0]);
    };

    MagpieSearch.prototype.toShortLink = function() {
      var checkInterval;
      return checkInterval = setInterval((function(_this) {
        return function() {
          var shortLayer;
          shortLayer = $('.dialog-hd .tab-nav li:contains("短链接")');
          if (shortLayer.length > 0) {
            clearInterval(checkInterval);
            _this.click($(shortLayer)[0]);
            return _this.autoCopy();
          }
        };
      })(this), 500);
    };

    MagpieSearch.prototype.autoCopy = function() {};

    MagpieSearch.prototype.click = function(element) {
      var event;
      event = document.createEvent("MouseEvents");
      event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      return element.dispatchEvent(event);
    };

    return MagpieSearch;

  })();
});
