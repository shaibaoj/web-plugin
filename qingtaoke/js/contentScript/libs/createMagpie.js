define('createMagpie', ['jquery', 'underscore', 'storage', 'layer', 'alimama'], function($, _, Storage, layer, Alimama) {
  var CreateMagpie;
  return CreateMagpie = (function() {
    function CreateMagpie() {
      this.isBindEvent = false;
      this.storage = new Storage;
      this.bindHashChange();
    }

    CreateMagpie.prototype.bindHashChange = function() {
      var str;
      if (window.location.hash.startsWith('#!/promo/self/campaign')) {
        str = "轻淘客提示您：定向计划佣金按最新生效的定向计划的佣金计算。也就是说，如果计划已生效，不仅本页面商品列表的“立即推广”获取的推广链接按定向计划佣金计算，轻淘客插件“官方转链”生成的链接，同样按定向计划佣金计算。您无需一页一页找到您想要推广的商品然后再“立即推广”。";
        setTimeout(function() {
          return $("#magix_vf_campaignInfo").append("<p style='margin-bottom:10px;'>" + str + "</p>");
        }, 1500);
      }
      if (window.location.hash.startsWith('#!/promo/act/activity_detail' || window.location.hash.startsWith('#!/promo/act/activity_detail_mycreated'))) {
        this.onMagpiePage();
        this.bindEvent();
      }
      $(window).on('hashchange', (function(_this) {
        return function() {
          if (window.location.hash.startsWith('#!/promo/act/activity_detail' || window.location.hash.startsWith('#!/promo/act/activity_detail_mycreated'))) {
            _this.onMagpiePage();
            return _this.bindEvent();
          }
        };
      })(this));
      if (window.location.hash.startsWith('#!/manage/act/act_add')) {
        this.onAddPage();
        this.bindEvent();
      }
      return $(window).on('hashchange', (function(_this) {
        return function() {
          if (window.location.hash.startsWith('#!/manage/act/act_add')) {
            _this.onAddPage();
            return _this.bindEvent();
          }
        };
      })(this));
    };

    CreateMagpie.prototype.bindEvent = function() {
      var me;
      if (!this.isBindEvent) {
        this.isBindEvent = true;
        me = this;
        $(document).on('click', '.qtk_flagship_copy_magpie', function() {
          return me.onSetCopyEventId(this);
        });
        return $(document).on('click', '.qtk_flagship_fill_magpie', function() {
          return me.onFillForm(this);
        });
      }
    };

    CreateMagpie.prototype.onMagpiePage = function() {
      return this.addCopyButton();
    };

    CreateMagpie.prototype.addCopyButton = function() {
      return Promise.resolve(this.storage.get('magpie_copy_id')).then((function(_this) {
        return function(copyId) {
          var currentEventId, intervalHandler;
          currentEventId = _this.getCurrentEventId();
          return intervalHandler = setInterval(function() {
            var urlLink;
            urlLink = $('.act-page-url');
            if (urlLink.length > 0) {
              if (currentEventId === copyId) {
                $(urlLink).before("<span style='margin:0 9px;' class='btn btn-blue btn-size30 btn-disabled'>已为被复制鹊桥</span>");
              } else {
                $(urlLink).before("<span data-id='" + currentEventId + "' style='margin:0 9px;' class='btn btn-blue btn-size30 qtk_flagship_copy_magpie'>设为被复制鹊桥</span>");
              }
              return clearInterval(intervalHandler);
            }
          }, 500);
        };
      })(this))["catch"](function() {});
    };

    CreateMagpie.prototype.onAddPage = function() {
      var intervalHandler;
      return intervalHandler = setInterval((function(_this) {
        return function() {
          var titleTag;
          titleTag = $('h2.title');
          if (titleTag.length > 0) {
            $(titleTag).after("<span style='margin:0 9px;' class='btn btn-blue btn-size30 qtk_flagship_fill_magpie'>一键填表</span>");
            return clearInterval(intervalHandler);
          }
        };
      })(this), 500);
    };

    CreateMagpie.prototype.getCurrentEventId = function() {
      var match;
      match = /eventId=(\d+)/i.exec(location.href);
      if (match) {
        return match[1];
      } else {
        return null;
      }
    };

    CreateMagpie.prototype.onFillForm = function() {
      this.fillFormLoadIndex = layer.load();
      return Promise.resolve(this.storage.get('magpie_copy_id')).then((function(_this) {
        return function(copyId) {
          var alimama, promise;
          if (!copyId) {
            layer.close(_this.fillFormLoadIndex);
            layer.alert('您还没有设置被复制的鹊桥。请设置后重试');
            return null;
          }
          alimama = new Alimama;
          promise = [];
          promise.push(Promise.resolve(alimama.getMagpieDetail(copyId)));
          promise.push(Promise.resolve(alimama.getActivityTags(copyId)));
          return Promise.all(promise).then(function(results) {
            return _this.fillForm(results[0], results[1]);
          })["catch"](function() {
            layer.close(_this.fillFormLoadIndex);
            return layer.alert('获取复制鹊桥的数据失败（可能是因为被复制的鹊桥不是您创建的）！请刷新后重试！');
          });
        };
      })(this))["catch"]((function(_this) {
        return function() {
          layer.close(_this.fillFormLoadIndex);
          return layer.alert('获取复制鹊桥的数据失败！请刷新后重试！');
        };
      })(this));
    };

    CreateMagpie.prototype.fillForm = function(detail, eventTags) {
      var addLink, cnt, eventTag, i, index, j, len, len1, name, originValue, sourceTag, tag, tags, titleTags, triggerCount, val;
      titleTags = $('input[name=tagTitles]');
      if (titleTags.length > 0) {
        if (titleTags.length < eventTags.length) {
          triggerCount = eventTags.length - titleTags.length;
          cnt = 0;
          addLink = $('a.color-blue');
          while (cnt++ < triggerCount) {
            $(addLink).trigger('click');
          }
        }
        if (titleTags.length > eventTags.length) {
          triggerCount = titleTags.length - eventTags.length;
          cnt = 0;
          while (cnt < triggerCount) {
            $(titleTags[titleTags.length - 1 - cnt]).parents('li').find('.delete').trigger('click');
            cnt++;
          }
        }
        titleTags = $('input[name=tagTitles]');
        for (index = i = 0, len = eventTags.length; i < len; index = ++i) {
          eventTag = eventTags[index];
          $(titleTags[index]).val(eventTag.tagTitle);
        }
      }
      tags = $('input, textarea');
      for (j = 0, len1 = tags.length; j < len1; j++) {
        tag = tags[j];
        name = $(tag).attr('name');
        originValue = $(tag).val();
        val = detail[name];
        if (name === 'shopTypeRules' && _.isEmpty(val)) {
          $('input[name=shopTypeRules]').prop('checked', 'checked');
          continue;
        }
        if (!_.isEmpty(originValue)) {
          continue;
        }
        if (_.contains(['pageTopType_radio', 'tagTitles'], name)) {
          continue;
        }
        if (!val) {
          continue;
        }
        if ($(tag).is('input') && _.contains(['hidden', 'file', 'button', 'submit', 'image', 'password', 'reset'], $(tag).attr('type'))) {
          continue;
        }
        if ($(tag).is('input') && _.contains(['radio', 'checkbox'], $(tag).attr('type'))) {
          $(tag).prop('checked', 'checked');
          continue;
        }
        $(tag).val(val);
      }
      sourceTag = $('.source');
      if (sourceTag.length > 0) {
        this.setCat(detail);
      }
      return layer.close(this.fillFormLoadIndex);
    };

    CreateMagpie.prototype.setCat = function(detail) {
      var cnt, i, itemTag, itemTags, itemText, len, match, results1, sourceItem, sourceItems, sourceTag, sourceText, targetContainerTag, tempTexts, txt;
      sourceTag = $('.source');
      itemTags = $(sourceTag).find('a.item');
      sourceItems = detail.catRule.split('；');
      cnt = 0;
      targetContainerTag = $('.target .bd');
      this.catCount = 0;
      results1 = [];
      for (i = 0, len = sourceItems.length; i < len; i++) {
        sourceItem = sourceItems[i];
        match = /^([^\s]+?)\(/i.exec(sourceItem);
        if (!match) {
          continue;
        }
        sourceText = match[1];
        results1.push((function() {
          var j, k, len1, len2, results2;
          results2 = [];
          for (j = 0, len1 = itemTags.length; j < len1; j++) {
            itemTag = itemTags[j];
            itemText = '';
            tempTexts = $(itemTag).text().split(' ');
            for (k = 0, len2 = tempTexts.length; k < len2; k++) {
              txt = tempTexts[k];
              if (txt.length > 1) {
                itemText = txt;
                break;
              }
            }
            if (sourceText === itemText) {
              this.fireItem(itemText, cnt++ * 100, detail);
              break;
            } else {
              results2.push(void 0);
            }
          }
          return results2;
        }).call(this));
      }
      return results1;
    };

    CreateMagpie.prototype.fireItem = function(text, interval, detail) {
      this.catCount++;
      return setTimeout((function(_this) {
        return function() {
          var evt, tag;
          evt = document.createEvent('Event');
          evt.initEvent('click', true, true);
          tag = $("a.item:contains('" + text + "')");
          if (tag.length > 0) {
            tag[0].dispatchEvent(evt);
          }
          _this.catCount--;
          if (_this.catCount <= 0) {
            return _this.onSetCatFinish(detail);
          }
        };
      })(this), interval);
    };

    CreateMagpie.prototype.onSetCatFinish = function(detail) {
      var cnt, commission, i, len, match, name, results1, sourceItem, sourceItems, targetContainer;
      sourceItems = detail.catRule.split('；');
      targetContainer = $('.target .bd');
      cnt = 0;
      results1 = [];
      for (i = 0, len = sourceItems.length; i < len; i++) {
        sourceItem = sourceItems[i];
        match = /^([^\s]+?)\(≥([.0-9]+)/i.exec(sourceItem);
        if (!match) {
          continue;
        }
        name = match[1];
        commission = parseFloat(match[2]) + '';
        results1.push(this.setCatCommission(name, commission, cnt++ * 30));
      }
      return results1;
    };

    CreateMagpie.prototype.setCatCommission = function(name, commission, interval) {
      return setTimeout((function(_this) {
        return function() {
          var changeEvent, inputTag, tag, targetContainer;
          targetContainer = $('.target .bd');
          tag = $(targetContainer).find(".item:contains('- " + name + "')");
          inputTag = $(tag).find('input[type=text]');
          if (inputTag.length < 1) {
            return;
          }
          $(inputTag[0]).val(commission);
          changeEvent = document.createEvent('Event');
          changeEvent.initEvent('change', true, true);
          return inputTag[0].dispatchEvent(changeEvent);
        };
      })(this), interval);
    };

    CreateMagpie.prototype.onSetCopyEventId = function(tag) {
      var eventId;
      eventId = $(tag).attr('data-id');
      return Promise.resolve(this.storage.set('magpie_copy_id', eventId)).then((function(_this) {
        return function() {
          $(tag).removeClass('qtk_flagship_copy_magpie');
          $(tag).addClass('btn-disabled');
          return $(tag).text('已为被复制鹊桥');
        };
      })(this))["catch"]((function(_this) {
        return function() {
          return layer.alert('“设为被复制鹊桥”失败！请刷新后重试！');
        };
      })(this));
    };

    return CreateMagpie;

  })();
});
