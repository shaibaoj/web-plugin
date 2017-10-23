require.config({
  baseUrl: '/js/',
  paths: {
    config: 'common/config',
    common: 'common/common',
    layer: 'layer/layer',
    messageQueue: 'common/libs/messageQueue',
    errorCode: 'common/errorCode',
    popup: 'popup/libs/popup',
    configInBackground: 'contentScript/libs/configInBackground',
    storage: 'contentScript/libs/storage'
  }
});

require(['jquery', 'underscore', 'layer', 'common', 'popup'], function($, _, layer, Common, Popup) {
  return new Popup();
});
