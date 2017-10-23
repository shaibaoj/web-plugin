require.config({
  baseUrl: '/js/',
  paths: {
    config: 'common/config',
    common: 'common/common',
    layer: 'layer/layer',
    messageQueue: 'common/libs/messageQueue',
    errorCode: 'common/errorCode',
    storage: 'contentScript/libs/storage'
  }
});

require(['jquery', 'underscore', 'layer', 'common', 'storage'], function($, _, layer, Common, Storage) {
  var dFirst, storage;
  layer.config({
    path: chrome.extension.getURL('/js/layer/'),
    zIndex: 9999999999
  });
  storage = new Storage;
  dFirst = storage.get('m_pid');
  dFirst.fail((function(_this) {
    return function(pid) {};
  })(this));
  dFirst.done((function(_this) {
    return function(pidV) {
      return $("#UPID").val(pidV);
    };
  })(this));
  return $("#opAddPIDBtn").on('click', function() {
    var nowPid;
    nowPid = $("#UPID").val();
    if (!/^mm_\d+_\d+_\d+$/i.test(nowPid)) {
      layer.alert('PID不对');
      return false;
    }
    storage = new Storage;
    storage.set('m_pid', nowPid);
    return layer.alert('操作成功');
  });
});
