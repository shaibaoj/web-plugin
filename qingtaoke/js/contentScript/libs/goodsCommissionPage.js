define('goodsCommissionPage', ['jquery', 'underscore', 'layer', 'configInBackground', 'getMultipleGoodsCommission'], function($, _, layer, Config, GetMultipleGoodsCommission) {
  var GoodsCommissionPage;
  return GoodsCommissionPage = (function() {
    function GoodsCommissionPage() {
      this.bindEvent();
      this.isSearching = false;
      this.goodsList = [];
    }

    GoodsCommissionPage.prototype.bindEvent = function() {
      $('#qtk_flagship_search_commission').click((function(_this) {
        return function() {
          return _this.onClick();
        };
      })(this));
      return $(window).on('beforeunload', (function(_this) {
        return function() {
          return _this.onBeforeUnload();
        };
      })(this));
    };

    GoodsCommissionPage.prototype.onBeforeUnload = function() {
      if (this.isSearching) {
        return '正在批量查询佣金中';
      }
    };

    GoodsCommissionPage.prototype.onClick = function() {
      var config, d;
      config = new Config;
      d = $.when(config.get('isLoginAlimama'), config.get('isValid'));
      return d.done((function(_this) {
        return function(isLoginAlimama, isValid) {
          if (!isLoginAlimama) {
            return layer.alert('请登录淘宝联盟。<a target="_blank" style="color: #f40;" href="http://www.alimama.com">立即登录</a>');
          } else {
            return _this.openLayer();
          }
        };
      })(this));
    };

    GoodsCommissionPage.prototype.openLayer = function() {
      var html, logTag;
      html = '<div style="display: none" id="qtk_flagship_search_log"><div class="qtk_flagship_log_wrap"></div></div>';
      logTag = $('#qtk_flagship_search_log');
      if (logTag.length < 1) {
        $('body').append(html);
      }
      if (this.logLayerIndex) {
        layer.restore(this.logLayerIndex);
        if (!this.isSearching) {
          $('.qtk_flagship_log_wrap').html('');
          return this.onOpenedLayer();
        }
      } else {
        return this.logLayerIndex = layer.open({
          type: 1,
          skin: 'layui-layer-modal',
          title: '批量佣金查询',
          content: $('#qtk_flagship_search_log'),
          closeBtn: true,
          shade: false,
          area: ['800px', '400px'],
          shift: 2,
          maxmin: true,
          success: (function(_this) {
            return function() {
              if (!_this.isSearching) {
                $('.qtk_flagship_log_wrap').html('');
                return _this.onOpenedLayer();
              }
            };
          })(this),
          end: (function(_this) {
            return function() {
              return _this.logLayerIndex = null;
            };
          })(this)
        });
      }
    };

    GoodsCommissionPage.prototype.showLog = function(log) {
      return $('.qtk_flagship_log_wrap').prepend(log);
    };

    GoodsCommissionPage.prototype.onOpenedLayer = function() {
      var d, startHtml;
      this.isSearching = true;
      this.goodsList = this.getGoodsList();
      startHtml = "<p class=\"start\">已开始查询……共" + this.goodsList.length + "款商品，请稍等</p>";
      this.showLog(startHtml);
      this.getMultipleGoodsCommission = new GetMultipleGoodsCommission(this.goodsList);
      d = this.getMultipleGoodsCommission.start();
      d.done((function(_this) {
        return function(result) {
          return _this.onFinish(result);
        };
      })(this));
      return d.progress((function(_this) {
        return function(progress) {
          return _this.onProgress(progress);
        };
      })(this));
    };

    GoodsCommissionPage.prototype.onProgress = function(progress) {
      var auctionId, goods, index;
      index = progress.index;
      goods = progress.goods;
      auctionId = progress.auctionId;
      this.showProgressLog(index, goods, auctionId);
      return this.showProgressUI(index, goods, auctionId);
    };

    GoodsCommissionPage.prototype.onFinish = function(result) {
      this.isSearching = false;
      return layer.alert('已完成批量佣金查询');
    };

    GoodsCommissionPage.prototype.showProgressLog = function(index, goods, auctionId) {
      var commission, commissionClass, linkTag, pHtml, title;
      linkTag = $('#J_Itemlist_TLink_' + auctionId);
      title = $(linkTag).text();
      commission = 0;
      commissionClass = '';
      if (goods) {
        commission = goods.commissionRatePercent;
        if (commission >= 20) {
          commissionClass = 'high';
        }
      }
      pHtml = "<p class='goods-item-log'><span class='iterator'>" + (index + 1) + "/" + this.goodsList.length + "</span> <a href='http://item.taobao.com/item.htm?id=" + auctionId + "' target='_blank'>" + title + "</a>的佣金比例为： <span class='commission " + commissionClass + "'>" + commission + "%</span> </p>";
      return this.showLog(pHtml);
    };

    GoodsCommissionPage.prototype.showProgressUI = function(index, goods, auctionId) {
      var commission, commissionClass, itemTag, labelHtml, linkTag;
      linkTag = $('#J_Itemlist_TLink_' + auctionId);
      itemTag = $(linkTag).parents('.item');
      commission = 0;
      commissionClass = '';
      if (goods) {
        commission = goods.commissionRatePercent;
        if (commission >= 20) {
          commissionClass = 'high';
        }
      }
      labelHtml = "<div class='qtk_flagship_commission_label'><div class='bg " + commissionClass + "'><div>" + commission + "%</div></div></div>";
      $(itemTag).find('.qtk_flagship_commission_label').remove();
      return $(itemTag).prepend(labelHtml);
    };

    GoodsCommissionPage.prototype.getGoodsList = function() {
      var goodsList, goodsTag, goodsTags, i, len;
      goodsTags = $('[data-nid]');
      goodsList = [];
      for (i = 0, len = goodsTags.length; i < len; i++) {
        goodsTag = goodsTags[i];
        goodsList.push($(goodsTag).attr('data-nid'));
      }
      return _.uniq(goodsList);
    };

    return GoodsCommissionPage;

  })();
});
