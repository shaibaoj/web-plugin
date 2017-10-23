define('popup', ['jquery', 'underscore', 'configInBackground', 'storage', 'common', 'layer'], function($, _, Config, Storage, Common, layer) {
  var Popup;
  layer.config({
    path: chrome.extension.getURL('/js/layer/')
  });
  return Popup = (function() {
    function Popup() {
      this.config = new Config;
      this.storage = new Storage;
      this.init();
      this.bindEvent();
    }

    Popup.prototype.init = function() {
      var d;
      d = $.when(this.config.get('searchShortcut'), this.config.get('menuShortcut'), this.config.get('isDefaultShowMenu'), this.config.get('isDefaultClickCommission'), this.config.get('oneKeyContent'), this.config.get('isShareHiddenPlan'), this.config.get('isDefaultShowOld'), this.config.get('isDefaultCount'), this.config.get('defaultSkin'), this.config.get('reason'));
      return d.done((function(_this) {
        return function(searchShortcut, menuShortcut, isDefaultShowMenu, isDefaultClickCommission, oneKeyContent, isShareHiddenPlan, isDefaultShowOld, isDefaultCount, skin, userReason) {
          var skinClass;
          if (typeof isDefaultShowMenu === 'undefined') {
            isDefaultShowMenu = '1';
          }
          if (typeof searchShortcut === 'undefined') {
            searchShortcut = 's';
            _this.config.set('searchShortcut', 's');
            _this.storage.set('searchShortcut', 's');
          }
          if (typeof menuShortcut === 'undefined') {
            menuShortcut = 'd';
            _this.config.set('menuShortcut', 'd');
            _this.storage.set('menuShortcut', 'd');
          }
          Common.log('isDefaultShowMenu');
          Common.log(isDefaultShowMenu);
          skinClass = "popup-color-" + skin;
          $('.content-wrap').addClass(skinClass);
          $('#search-shortcut').val(searchShortcut);
          $('#menu-shortcut').val(menuShortcut);
          $('#menu-onekeycontent').val(oneKeyContent);
          $('#right-menu').addClass(isDefaultShowMenu === "1" ? "on" : "off").attr("data-val", isDefaultShowMenu);
          $('#right-menu-findGoodsCommissio').addClass(isDefaultClickCommission === "1" ? "on" : "off").attr("data-val", isDefaultClickCommission);
          $('#right-menu-old').addClass(isDefaultShowOld === "1" ? "on" : "off").attr("data-val", isDefaultShowOld);
          $('input[name="right-menu-content"][value=' + isDefaultCount + ']').prop("checked", true);
          return $('#userSubReason').val(userReason);
        };
      })(this));
    };

    Popup.prototype.bindEvent = function() {
      var me;
      me = this;
      $('#search-shortcut, #menu-shortcut,#menu-onekeycontent').on('keypress', function(e) {
        return me.onKeyPress(e);
      });
      $('.menu-switch').on('click', function(e) {
        return me.onSwitch(e);
      });
      return $('.popupBtn').on('click', function() {
        return me.saveSettings();
      });
    };

    Popup.prototype.onKeyPress = function(e) {
      var char, tag;
      tag = $(e.currentTarget);
      char = String.fromCharCode(e.keyCode).toLowerCase();
      return tag.val(char);
    };

    Popup.prototype.onSwitch = function(e) {
      var tag;
      tag = $(e.currentTarget);
      tag.toggleClass('on off');
      return tag.attr("data-val", tag.attr("class").indexOf("on") >= 0 ? "1" : "0");
    };

    Popup.prototype.saveSettings = function() {
      this.config.set('searchShortcut', $('#search-shortcut').val());
      this.storage.set('searchShortcut', $('#search-shortcut').val());
      this.config.set('menuShortcut', $('#menu-shortcut').val());
      this.storage.set('menuShortcut', $('#menu-shortcut').val());
      this.config.set('oneKeyContent', $('#menu-onekeycontent').val());
      this.storage.set('oneKeyContent', $('#menu-onekeycontent').val());
      this.config.set('isDefaultShowMenu', $('#right-menu').attr("data-val"));
      this.storage.set('isDefaultShowMenu', $('#right-menu').attr("data-val"));
      this.config.set('isDefaultClickCommission', $('#right-menu-findGoodsCommissio').attr("data-val"));
      this.storage.set('isDefaultClickCommission', $('#right-menu-findGoodsCommissio').attr("data-val"));
      this.config.set('isDefaultShowOld', $('#right-menu-old').attr("data-val"));
      this.storage.set('isDefaultShowOld', $('#right-menu-old').attr("data-val"));
      this.config.set('isDefaultCount', $('input[name="right-menu-content"]:checked').val());
      this.storage.set('isDefaultCount', $('input[name="right-menu-content"]:checked').val());
      this.config.set('reason', $('#userSubReason').val());
      this.storage.set('reason', $('#userSubReason').val());
      return layer.msg('保存成功！');
    };

    return Popup;

  })();
});
