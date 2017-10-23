define('favoriteQTK', ['jquery', 'underscore', 'favoriteApplyCampaign'], function($, _, FavoriteApplyCampaign) {
  var CollectQTK;
  return CollectQTK = (function() {
    function CollectQTK() {
      this.showButton();
    }

    CollectQTK.prototype.showButton = function() {
      $('.convert-selected').show();
      $('.convert-all').show();
      return this.bindEvent();
    };

    CollectQTK.prototype.bindEvent = function() {
      return new FavoriteApplyCampaign();
    };

    return CollectQTK;

  })();
});
