define('favoriteApplyCampaign', ['jquery', 'underscore', 'layer', 'common', 'config', 'configInBackground', 'applyCampaign', 'qtkApi'], function($, _, layer, Common, CONFIG, Config, ApplyCampaign, QtkApi) {
  var CollectApplyCampaign;
  return CollectApplyCampaign = (function() {
    function CollectApplyCampaign() {
      this.bindEvent();
      this.isApplying = false;
    }

    CollectApplyCampaign.prototype.bindEvent = function() {
      $(document).on('click', '.apply-selected', (function(_this) {
        return function() {
          var d;
          d = _this.checkStatus();
          return d.done(function() {
            return _this.onApplySelected();
          });
        };
      })(this));
      $(document).on('click', '.apply-all', (function(_this) {
        return function() {
          var d;
          d = _this.checkStatus();
          return d.done(function() {
            return _this.onApplyAll();
          });
        };
      })(this));
      $(document).on('click', '#apply-campaign-button', (function(_this) {
        return function() {
          return _this.onApplyStart();
        };
      })(this));
      return $(window).on('beforeunload', (function(_this) {
        return function() {
          return _this.onBeforeUnload();
        };
      })(this));
    };

    CollectApplyCampaign.prototype.checkStatus = function() {
      var config, d, dtd;
      dtd = $.Deferred();
      config = new Config;
      d = $.when(config.get('isLoginAlimama'), config.get('isValid'), config.get('isUnavailable'));
      d.done((function(_this) {
        return function(isLoginAlimama, isValid, isUnavailable) {
          if (isUnavailable) {
            layer.alert('您使用的轻淘客旗舰版版本太老啦。<a target="_blank" style="color: #f40;" href="">点我去下载新版</a>');
            dtd.reject('isUnavailable');
            return true;
          }
          if (!isLoginAlimama) {
            layer.alert('请登录淘宝联盟。<a target="_blank" style="color: #f40;" href="http://www.alimama.com">立即登录</a>');
            dtd.reject('isLoginAlimama');
            return true;
          }
          return dtd.resolve(true);
        };
      })(this));
      return dtd;
    };

    CollectApplyCampaign.prototype.onApplySelected = function() {
      var i, len, selectedTags, tag;
      if (this.isApplying) {
        if (this.applyCampaign) {
          this.applyCampaign.restore();
        }
        return true;
      }
      selectedTags = $('input.selected-goods:checked');
      this.gidList = [];
      for (i = 0, len = selectedTags.length; i < len; i++) {
        tag = selectedTags[i];
        this.gidList.push($(tag).attr('data-gid'));
      }
      if (this.gidList.length < 1) {
        layer.alert('请选择商品!');
        return true;
      }
      return this.openReasonLayer('selected');
    };

    CollectApplyCampaign.prototype.openReasonLayer = function(type) {
      var config, d;
      config = new Config;
      d = config.get('reason');
      return d.done((function(_this) {
        return function(reason) {
          var applyReasonTag, html;
          if (_this.applyReasonLayerIndex) {
            layer.close(_this.applyReasonLayerIndex);
          }
          if (!reason) {
            reason = '';
          }
          html = "<div style='display: none' id='qtk_flagship_apply_reason'><div class='title'>申请理由：</div><div class='reason-bar'><textarea name='apply-reason' id='apply-reason'>" + reason + "</textarea></div> <div class='apply-button'><button id='apply-campaign-button'>开始申请</button></div> </div>";
          applyReasonTag = $('#qtk_flagship_apply_reason');
          if (applyReasonTag.length < 1) {
            $('body').append(html);
          }
          return _this.applyReasonLayerIndex = layer.open({
            type: 1,
            title: '申请推广计划原因设置',
            content: $('#qtk_flagship_apply_reason'),
            closeBtn: true,
            shade: false,
            area: ['800px', '350px'],
            shift: 2,
            maxmin: true,
            success: function() {},
            end: function() {
              return _this.applyReasonLayerIndex = null;
            }
          });
        };
      })(this));
    };

    CollectApplyCampaign.prototype.onApplyStart = function() {
      var d, length, qtkApi, reason;
      reason = $('#apply-reason').val();
      reason = reason.replace(/(^\s*|\s*$)/ig, "");
      length = Common.getStringLength(reason);
      if (length > 200) {
        layer.tips('申请理由不能超过200个字符(100个汉字)', $('#apply-reason'), {
          time: 4000
        });
        return true;
      }
      if (length < 1) {
        layer.tips('必须填写申请理由', $('#apply-reason'), {
          time: 4000
        });
        return true;
      }
      layer.close(this.applyReasonLayerIndex);
      qtkApi = new QtkApi;
      qtkApi.saveReason(reason);
      this.applyCampaign = new ApplyCampaign(this.gidList, reason);
      this.isApplying = true;
      d = this.applyCampaign.runApply();
      d.progress((function(_this) {
        return function(data) {
          return _this.onProgress(data);
        };
      })(this));
      return d.done((function(_this) {
        return function(result) {
          return _this.onFinish(result);
        };
      })(this));
    };

    CollectApplyCampaign.prototype.onApplyAll = function() {
      var d, msgIndex, qtkApi;
      if (this.isApplying && this.applyCampaign) {
        this.applyCampaign.restore();
        return true;
      }
      msgIndex = layer.msg('加载商品数据中……', {
        time: 0
      });
      qtkApi = new QtkApi;
      d = qtkApi.getFavoriteGid();
      d.fail(function() {
        layer.close(msgIndex);
        return layer.alert('加载商品数据失败，请重试!');
      });
      return d.done((function(_this) {
        return function(goods) {
          layer.close(msgIndex);
          if (goods.length < 1) {
            layer.alert('没有需要申请推广计划的商品');
            return true;
          }
          if (goods.length >= 500) {
            layer.alert('需要申请推广计划的商品较多，申请时间会比较久', function() {
              return _this.onGetAllGid(goods);
            });
            return true;
          }
          return _this.onGetAllGid(goods);
        };
      })(this));
    };

    CollectApplyCampaign.prototype.onProgress = function(data) {};

    CollectApplyCampaign.prototype.onFinish = function(result) {
      this.isApplying = false;
      return this.applyCampaign = null;
    };

    CollectApplyCampaign.prototype.onBeforeUnload = function() {
      if (this.isApplying) {
        return '正在申请推广计划中';
      }
    };

    CollectApplyCampaign.prototype.onGetAllGid = function(gidList) {
      this.gidList = gidList;
      return this.openReasonLayer('all');
    };

    return CollectApplyCampaign;

  })();
});
