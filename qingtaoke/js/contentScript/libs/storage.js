define('storage', ['jquery', 'underscore', 'common'], function($, _, Common) {
  var Storage;
  return Storage = (function() {
    function Storage() {}

    Storage.prototype.get = function(name) {
      var message;
      message = {
        name: 'background',
        module: 'storage',
        api: 'get',
        param: [name]
      };
      return Common.sendMsg('background', message);
    };

    Storage.prototype.set = function(name, val) {
      var message;
      message = {
        name: 'background',
        module: 'storage',
        api: 'set',
        param: [name, val]
      };
      return Common.sendMsg('background', message);
    };

    return Storage;

  })();
});
