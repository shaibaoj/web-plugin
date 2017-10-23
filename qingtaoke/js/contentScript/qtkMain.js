require.config({
  baseUrl: '/js/',
  paths: {
    config: 'common/config',
    common: 'common/common',
    layer: 'layer/layer',
    messageQueue: 'common/libs/messageQueue',
    errorCode: 'common/errorCode',
    alimama: 'contentScript/libs/alimama',
    qtkApi: 'contentScript/libs/qtkApi',
    tableorder: 'tableorder',
    qtkConvertLink: 'contentScript/libs/qtkConvertLink',
    qtkConvertLinkPage: 'contentScript/libs/qtkConvertLinkPage',
    collectQTK: 'contentScript/libs/collectQTK',
    favoriteQTK: 'contentScript/libs/favoriteQTK',
    applyGoods: 'contentScript/libs/applyGoods',
    applyCampaign: 'contentScript/libs/applyCampaign',
    collectApplyCampaign: 'contentScript/libs/collectApplyCampaign',
    favoriteApplyCampaign: 'contentScript/libs/favoriteApplyCampaign',
    loginListener: 'contentScript/libs/loginListener',
    bindAlimama: 'contentScript/libs/bindAlimama',
    mobileChangUrl: 'contentScript/libs/qtkMobileChangeUrlController',
    addAlimamaPid: 'contentScript/libs/addAlimamaPid',
    configInBackground: 'contentScript/libs/configInBackground',
    campaignQTK: 'contentScript/libs/campaignQTK',
    queryPlanQTK: 'contentScript/libs/queryPlanQTK',
    version: 'contentScript/libs/version'
  }
});

require(['jquery', 'underscore', 'layer', 'qtkConvertLink', 'qtkConvertLinkPage', 'loginListener', 'collectQTK', 'mobileChangUrl', 'bindAlimama', 'favoriteQTK', 'addAlimamaPid', 'campaignQTK', 'queryPlanQTK', 'version'], function($, _, layer, QtkConvertLink, QtkConvertLinkPage, LoginListener, CollectQTK, MobileChangUrl, BindAlimama, FavoriteQTK, AddAlimamaPid, CampaignQTK, QueryPlanQTK, Version) {
  layer.config({
    path: chrome.extension.getURL('/js/layer/'),
    zIndex: 1
  });
  new Version;
  if (window.location.pathname === '/lianjiezhuanhuan') {
    new QtkConvertLink;
    new QtkConvertLinkPage;
  }
  if (window.location.pathname.toLowerCase() === '/caiji') {
    new CollectQTK;
    new MobileChangUrl;
  }
  if (window.location.pathname.toLowerCase() === '/collect') {
    new FavoriteQTK;
    new MobileChangUrl;
  }
  if (window.location.pathname.toLowerCase() === '/login') {
    new LoginListener;
  }
  if (window.location.pathname.toLowerCase() === '/bindalimama') {
    new BindAlimama;
  }
  if (window.location.pathname.toLowerCase() === '/myalimama') {
    new AddAlimamaPid;
  }
  if (window.location.host === "www.qingtaoke.com") {
    return new QueryPlanQTK;
  }
});
