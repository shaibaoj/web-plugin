define('qtkConvertLinkPage', ['jquery', 'underscore', 'common', 'layer', 'config'], function($, _, Common, layer, Config) {
  var QtkConvertLinkPage;
  layer.config({
    path: chrome.extension.getURL('/js/layer/')
  });
  return QtkConvertLinkPage = (function() {
    function QtkConvertLinkPage() {
      this.flagDiv = "<div id='qtk_flag' style='display:none'><span id='shell-versionCode'>" + Config.versionCode + "</span><span id='shell-version'>" + Config.version + "</span></div>";
      this.showBGDiv = "<div id='qtk_chrome_bg_div'></div>";
    }

    return QtkConvertLinkPage;

  })();
});
