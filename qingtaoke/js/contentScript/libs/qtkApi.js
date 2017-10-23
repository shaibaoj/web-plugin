define('qtkApi', ['jquery', 'underscore', 'common'], function($, _, Common) {
  var QtkApi;
  return QtkApi = (function() {
    function QtkApi() {}

    QtkApi.prototype.queqiaoSearchByGoodsID = function(gid) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'reSearchQueQiao',
        param: [gid]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.shortTaoBBURL = function(url) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htShortTaoBBURL',
        param: [url]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.shortURL = function(url) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htShortURL',
        param: [url]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.shortXinLURL = function(url) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htShortXinLURL',
        param: [url]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.doCollectionUser = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htDoCollectionUser',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.isCollectionUser = function(gid) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htIsCollectionUser',
        param: [gid]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.saveCollectGoods = function(goodsList) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'saveCollectGoods',
        param: [goodsList]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.PreToSendURLData = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htToSendURLData',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getCaiJiIDList = function() {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htGetCaiJiIDList',
        param: []
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.saveReason = function(reason) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'saveReason',
        param: [reason]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.PreAddAlimamaPID = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htAddAlimamaPID',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getCollectedGid = function() {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getCollectedGid',
        param: []
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getFavoriteGid = function() {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getFavoriteGid',
        param: []
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getCollectIDList = function() {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htGetCollectIDList',
        param: []
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.uploadImg = function(data) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htUploadImg',
        param: [data]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.update = function() {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'update',
        param: []
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getAppliedCampaign = function(nick) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getAppliedCampaign',
        param: [nick]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getCommission = function(goodsList) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getCommission',
        param: [goodsList]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.postForWardWX = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htPostForWardWX',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.postSaveWX = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htPostSaveWX',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.wxTitle = function() {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htTitleWX',
        param: []
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.testUserPlan = function(obj, shopUid) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htTestUserPlan',
        param: [obj, shopUid]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.couponList = function(uid, gid) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'htCouponList',
        param: [uid, gid]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.couponOther = function(sellerId, gid) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'couponOther',
        param: [sellerId, gid]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getHiddenCouponSecond = function(sellerId, gid) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getHiddenCouponSecond',
        param: [sellerId, gid]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.openSetting = function(x, y) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'openSetting',
        param: [x, y]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getTurn2In1Link = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getTurn2In1Link',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getWechatLink = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getWechatLink',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.saveWechatTemplate = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'saveWechatTemplate',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getWechatTemplate = function() {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getWechatTemplate',
        param: []
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getNoticeList = function() {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getNoticeList',
        param: []
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getTransferLinkSpecial = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getTransferLinkSpecial',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getCopyPic = function(src) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getCopyPic',
        param: [src]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.getPicAndCopy = function(gid) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'getPicAndCopy',
        param: [gid]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.upLoadGoodsData = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'upLoadGoodsData',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.errorCount = function(obj) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'errorCount',
        param: [obj]
      };
      return Common.sendMsg('background', message);
    };

    QtkApi.prototype.queryOnlineNumber = function(gid) {
      var message;
      message = {
        name: 'background',
        module: 'qtk',
        api: 'queryOnlineNumber',
        param: [gid]
      };
      return Common.sendMsg('background', message);
    };

    return QtkApi;

  })();
});
