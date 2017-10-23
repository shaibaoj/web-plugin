define('keyboard', ['jquery', 'underscore', 'common', 'alimama', 'qtkApi', 'configInBackground'], function($, _, Common, Alimama, QtkApi, ConfigInBackground) {
  var Keyboard;
  return Keyboard = (function() {
    function Keyboard() {
      this.names = ['searchShortcut', 'menuShortcut', 'oneKeyContent'];
      this.keyMap = {};
      this.queue = {};
      this.init();
    }

    Keyboard.prototype.init = function() {
      var config, d, deferredArray, j, len, name, ref;
      config = new ConfigInBackground();
      deferredArray = [];
      ref = this.names;
      for (j = 0, len = ref.length; j < len; j++) {
        name = ref[j];
        deferredArray.push(config.get(name));
      }
      d = $.when.apply(this, deferredArray);
      return d.done((function(_this) {
        return function() {
          var i, k, len1, param;
          for (i = k = 0, len1 = arguments.length; k < len1; i = ++k) {
            param = arguments[i];
            name = _this.names[i];
            _this.keyMap[name] = param;
          }
          return _this.bindEvent();
        };
      })(this));
    };

    Keyboard.prototype.resetQueue = function() {
      return this.queue = {};
    };

    Keyboard.prototype.getNameByKey = function(key) {
      var char, name, ref;
      ref = this.keyMap;
      for (name in ref) {
        char = ref[name];
        if (char === key) {
          return name;
        }
      }
      return null;
    };

    Keyboard.prototype.getFunctionsByName = function(name) {
      var ret;
      ret = this.queue[name];
      if (!ret) {
        return [];
      }
      return ret;
    };

    Keyboard.prototype.on = function(name, func) {
      if (!_.isFunction(func)) {
        return true;
      }
      if (!_.isArray(this.queue[name])) {
        return this.queue[name] = [func];
      } else {
        return this.queue[name].push(func);
      }
    };

    Keyboard.prototype.off = function(name) {
      return delete this.queue[name];
    };

    Keyboard.prototype.bindEvent = function() {
      if (!this.keyPressFunc) {
        this.keyPressFunc = (function(_this) {
          return function(event) {
            return _this.onKeyPress(event);
          };
        })(this);
        return $(document).on('keypress', this.keyPressFunc);
      }
    };

    Keyboard.prototype.unBindEvent = function() {
      if (this.keyPressFunc) {
        $(document).off('keypress', this.keyPressFunc);
        return this.keyPressFunc = false;
      }
    };

    Keyboard.prototype.onKeyPress = function(event) {
      var char, functions, name, tagName;
      tagName = event.target.tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea' || $(event.target).is('[contenteditable]')) {
        return true;
      }
      char = String.fromCharCode(event.keyCode).toLowerCase();
      name = this.getNameByKey(char);
      if (!name) {
        return true;
      }
      functions = this.getFunctionsByName(name);
      return _.map(functions, function(func) {
        return func(event);
      });
    };

    Keyboard.prototype.setDefault = function() {
      this.on('oneKeyContent', function() {
        return $('body').find('.editBg').trigger('click');
      });
      this.on('searchShortcut', function() {
        return $('body').find('.findGoodsCommission').trigger('click');
      });
      return this.on('menuShortcut', function() {
        var isDisplay, selectDiv;
        selectDiv = $('.layui-layer');
        if (selectDiv.length === 0) {
          return false;
        }
        isDisplay = selectDiv.css('display');
        if (isDisplay === 'none') {
          return selectDiv.css('display', 'block');
        } else {
          return selectDiv.css('display', 'none');
        }
      });
    };

    Keyboard.prototype.unsetDefault = function() {
      delete this.queue['searchShortcut'];
      return delete this.queue['menuShortcut'];
    };

    return Keyboard;

  })();
});
