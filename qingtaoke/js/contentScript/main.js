require.config({
  baseUrl: '/js/',
  paths: {
    config: 'common/config',
    common: 'common/common',
    layer: 'layer/layer',
    messageQueue: 'common/libs/messageQueue',
    cnzz: 'common/libs/cnzz',
    errorCode: 'common/errorCode',
    alimama: 'contentScript/libs/alimama',
    commissionInCampaign: 'contentScript/libs/commissionInCampaign',
    configInBackground: 'contentScript/libs/configInBackground',
    getMultipleGoodsCommission: 'contentScript/libs/getMultipleGoodsCommission',
    collectTaobaoSearch: 'contentScript/libs/collectTaobaoSearch',
    getTaobaoWaitCollectGoods: 'contentScript/libs/getTaobaoWaitCollectGoods',
    goodsCommissionPage: 'contentScript/libs/goodsCommissionPage',
    storage: 'contentScript/libs/storage',
    coupon: 'contentScript/libs/coupon',
    couponDetails: 'contentScript/libs/couponDetails',
    commissionFinder: 'contentScript/libs/commissionFinder',
    singlePage: 'contentScript/libs/singlePage',
    singleOther: 'contentScript/libs/singleOther',
    temai: 'contentScript/libs/temai',
    autoDragNDrop: 'contentScript/libs/autoDragNDrop',
    hongBao: 'contentScript/libs/hongBao',
    qtkApi: 'contentScript/libs/qtkApi',
    tableorder: 'tableorder',
    version: 'contentScript/libs/version',
    keyboard: 'contentScript/libs/keyboard',
    editPrice: 'contentScript/libs/editPrice',
    copyPicture: 'contentScript/libs/copyPicture',
    singlePage2: 'contentScript/libs/singlePage2',
    simulate: 'jquery.simulate',
    simulateExt: 'jquery.simulate.ext',
    simulateDragAndDrop: 'jquery.simulate.dragNDrop',
    clipboard: 'clipboard',
    vue: 'vue'
  }
});

require(['jquery', 'underscore', 'layer', 'common', 'alimama', 'storage', 'singlePage', 'temai', 'version', 'config', 'qtkApi', 'autoDragNDrop', 'couponDetails', 'cnzz'], function($, _, layer, Common, Alimama, Storage, Single, Temai, Version, CONFIG, QtkApi, AutoDragNDrop, CouponDetails, Cnzz) {
  var WLH, location;
  layer.config({
    path: chrome.extension.getURL('/js/layer/'),
    zIndex: 9999999999
  });
  new Version;
  new Cnzz;
  WLH = window.location.host;
  if (WLH === 'item.taobao.com' || WLH === 'detail.tmall.com' || WLH === 'world.tmall.com' || WLH === 'chaoshi.detail.tmall.com' || WLH === 'detail.yao.95095.com' || WLH === 'detail.tmall.hk' || WLH === 'items.alitrip.com') {
    new Single;
    $(document).on('mouseenter', '[qtk-title]', function() {
      var attrTime, that, time, tipsIndex, tmpTitle;
      that = this;
      tmpTitle = $(that).attr('qtk-title');
      time = 5000;
      attrTime = $(this).attr('qtk-time');
      if (/^\d+$/i.test(attrTime)) {
        time = parseInt(attrTime);
      }
      tipsIndex = layer.tips(tmpTitle, that, {
        time: time,
        end: function() {
          return $(that).removeAttr('qtk-index');
        }
      });
      return $(this).attr('qtk-index', tipsIndex);
    });
    $(document).on('mouseleave', '[qtk-title]', function() {
      var tipsIndex;
      if ($(this).is('[qtk-leave]')) {
        tipsIndex = $(this).attr('qtk-index');
        if (/^\d+$/i.test(tipsIndex)) {
          return layer.close(tipsIndex);
        }
      }
    });
    $("body").on('paste', '#editDivContent', function(event) {
      var bob, i, items, itemsRoot, key, keyValue, len, reader, results;
      Common.log('bg paste');
      itemsRoot = event.clipboardData || event.originalEvent.clipboardData;
      items = itemsRoot.items;
      results = [];
      for (key = i = 0, len = items.length; i < len; key = ++i) {
        keyValue = items[key];
        if (key === 'add' || key === 'length' || key === 'remove' || key === 'clear' || key === 1) {
          continue;
        }
        if (keyValue.kind === 'file') {
          bob = keyValue.getAsFile();
          reader = new FileReader();
          reader.readAsDataURL(bob);
          results.push(reader.onloadend = function(e) {
            var cqtkApi, dtd, sew;
            sew = e.target.result;
            Common.log(sew);
            cqtkApi = new QtkApi();
            dtd = cqtkApi.uploadImg(sew);
            dtd.done(function(res) {
              var jsonTmp, pathUrl, picTxt;
              jsonTmp = res;
              pathUrl = CONFIG.uploadHost + jsonTmp.url;
              picTxt = "<img src='" + pathUrl + "' _src='" + pathUrl + "' \/>";
              return document.execCommand('insertHTML', false, picTxt);
            });
            return dtd.fail(function(res) {
              return layer.alert('多刷新几次,还是不行请联系管理员');
            });
          });
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
  }
  if (window.location.host === 'temai.taobao.com' && /\/event\d+\.htm/i.test(window.location.pathname)) {
    new Temai;
  }
  location = window.location;
  if (location.host === 'login.taobao.com' && location.pathname === '/member/login.jhtml') {
    new AutoDragNDrop;
  }
  if (location.host === 'market.m.taobao.com') {
    return new CouponDetails;
  }
});
