define('daTaoKeCopy', ['jquery', 'underscore', 'common', 'layer', 'alimama', 'qtkApi', 'config', 'configInBackground'], function($, _, Common, layer, Alimama, QtkApi, Config, ConfigInBackground) {
  var DaTaoKeCopy;
  layer.config({
    path: chrome.extension.getURL('/js/layer/')
  });
  return DaTaoKeCopy = (function() {
    function DaTaoKeCopy() {
      if (window.location.pathname === '/quan/') {
        this.couponCopy();
      }
      if (window.location.pathname === '/quan/yulan.asp') {
        this.couponCopy();
      }
      if (window.location.pathname === '/gy/') {
        this.magpieCopy();
      }
      if (window.location.pathname === '/ucenter/favorites_quan.asp' && /type=qun/.test(window.location.search)) {
        this.qunCopy();
      }
    }

    DaTaoKeCopy.prototype.copy = function(dom) {
      var range, select;
      range = document.createRange();
      range.selectNode(dom);
      select = document.getSelection();
      select.removeAllRanges();
      select.addRange(range);
      return document.execCommand("Copy", false, '');
    };

    DaTaoKeCopy.prototype.couponCopy = function() {
      var orgCopyTag;
      orgCopyTag = $('.copy_mb');
      $(orgCopyTag).after('<div class="copy_mb qtk_copy">点击复制</div>');
      $(orgCopyTag).remove();
      return $(document).on('click', '.qtk_copy', (function(_this) {
        return function() {
          var ret;
          ret = _this.copy($('.quan_mb_my_content')[0]);
          if (ret) {
            return layer.msg('已复制');
          } else {
            return layer.alert('您的浏览器不支持一键复制，请升级您的浏览器！');
          }
        };
      })(this));
    };

    DaTaoKeCopy.prototype.magpieCopy = function() {
      var orgCopyTag;
      orgCopyTag = $('.copy_mb');
      $(orgCopyTag).after('<div class="copy_mb qtk_copy">点击复制</div>');
      $(orgCopyTag).remove();
      return $(document).on('click', '.qtk_copy', (function(_this) {
        return function() {
          var ret;
          ret = _this.copy($('.gy_mb_my_content')[0]);
          if (ret) {
            return layer.msg('已复制');
          } else {
            return layer.alert('您的浏览器不支持一键复制，请升级您的浏览器！');
          }
        };
      })(this));
    };

    DaTaoKeCopy.prototype.qunCopy = function() {
      var me, orgCopyTag;
      orgCopyTag = $('.copy_mb_u');
      $(orgCopyTag).after('<div class="copy_mb qtk_copy">点击复制</div>');
      $(orgCopyTag).remove();
      me = this;
      return $(document).on('click', '.qtk_copy', function() {
        var ret, target, targetContainer;
        targetContainer = $(this).parents('.ucenter_copy');
        target = $(targetContainer).find('.quan_mb_my_content');
        ret = me.copy($(target)[0]);
        if (ret) {
          return layer.msg('已复制');
        } else {
          return layer.alert('您的浏览器不支持一键复制，请升级您的浏览器！');
        }
      });
    };

    return DaTaoKeCopy;

  })();
});
