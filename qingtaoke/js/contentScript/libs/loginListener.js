define('loginListener', ['jquery', 'underscore', 'common'], function($, _, Common) {
  var LoginListener;
  return LoginListener = (function() {
    function LoginListener() {
      this.bindEvent();
    }

    LoginListener.prototype.bindEvent = function() {
      return $(document).on('click', '#notify-login', (function(_this) {
        return function() {
          return _this.onLogged();
        };
      })(this));
    };

    LoginListener.prototype.onLogged = function() {
      return Common.sendMsg('qtkLogged');
    };

    return LoginListener;

  })();
});
