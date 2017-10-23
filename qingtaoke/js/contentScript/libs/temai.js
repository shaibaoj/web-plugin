define('temai', ['jquery', 'underscore', 'common', 'layer', 'alimama', 'qtkApi', 'config', 'configInBackground'], function($, _, Common, layer, Alimama, QtkApi, Config, ConfigInBackground) {
  var Temai;
  layer.config({
    path: chrome.extension.getURL('/js/layer/')
  });
  return Temai = (function() {
    function Temai() {
      var d;
      this.times = 0;
      this.config = new ConfigInBackground;
      d = $.when(this.config.get('isCopyMagpieLink'), this.config.get('goods-title'));
      d.done((function(_this) {
        return function(isCopyMagpieLink, goodsTitle) {
          return _this.start(isCopyMagpieLink, goodsTitle);
        };
      })(this));
    }

    Temai.prototype.start = function(isCopyMagpieLink, goodsTitle) {
      if (isCopyMagpieLink !== '1' || goodsTitle.length < 1) {
        return false;
      }
      this.config.set('isCopyMagpieLink', 0);
      this.config.set('goods-title', '');
      return this.find(goodsTitle);
    };

    Temai.prototype.find = function(title) {
      var isShow, liTag, offset, spanTag;
      if (this.times > 50) {
        layer.alert("没有找到商品【" + title + "】<br/>有可能是因为商品标题被修改了。<br/>等联盟稳定后，我们将继续解决这个问题。<br/>请按【Ctrl+f】搜索试试");
        return;
      }
      this.times++;
      spanTag = $("span:contains('" + title + "')");
      if (spanTag.length > 0) {
        liTag = $(spanTag).parents('li');
        $(liTag).css('background-color', '#ff6600');
        offset = $(liTag).offset();
        isShow = false;
        return $('html, body, .content').animate({
          scrollTop: offset.top - 48
        }, 300, (function(_this) {
          return function() {
            if (!isShow) {
              isShow = true;
              return layer.tips('请【右键->复制链接地址】', liTag);
            }
          };
        })(this));
      } else {
        $('html, body, .content').scrollTop($(document).height());
        return setTimeout((function(_this) {
          return function() {
            return _this.find(title);
          };
        })(this), 300);
      }
    };

    return Temai;

  })();
});
