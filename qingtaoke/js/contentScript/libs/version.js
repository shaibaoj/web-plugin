define('version', ['jquery', 'underscore', 'configInBackground'], function($, _, Config) {
  var Version;
  return Version = (function() {
    function Version() {
      this.appendVersion();
    }

    Version.prototype.appendVersion = function() {
      var config, d;
      config = new Config;
      d = $.when(config.get('version'), config.get('versionCode'));
      return d.done((function(_this) {
        return function(version, versionCode) {
          var versionTag;
          versionTag = $('#qtk_flagship_version');
          if (versionTag.length > 1) {
            return true;
          }
          $('body').append("<div id='qtk_flagship_version' data-version='" + version + "' data-version-code='" + versionCode + "' style='display: none'></div>");
          _this.versionTag = $('#qtk_flagship_version');
          return _this.setTimer();
        };
      })(this));
    };

    Version.prototype.setTimer = function() {};

    return Version;

  })();
});
