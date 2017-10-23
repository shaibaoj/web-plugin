define('editPrice', ['jquery', 'underscore', 'layer'], function($, _, layer) {
  var EditPrice;
  return EditPrice = (function() {
    function EditPrice() {
      this.priceTag = this.getPriceTag();
      $(this.priceTag).attr('contenteditable', 'true');
      this.isToolbarShowing = false;
      $(".tb-promo-item-bd").css("outline", "none");
      this.bindEvent();
    }

    EditPrice.prototype.getPriceTag = function() {
      var tag;
      tag = $('#J_PromoPriceNum:visible').parents('.tb-promo-item-bd');
      if (tag.length < 1) {
        tag = $('.tm-promo-price .tm-price:visible').parents('.tm-promo-price');
      }
      if (tag.length < 1) {
        tag = $('#J_StrPrice:visible');
      }
      return tag;
    };

    EditPrice.prototype.bindEvent = function() {
      var me;
      me = this;
      $(this.priceTag).hover(function() {
        return me.onMouseEnter();
      }, function() {
        return me.onMouseLeave();
      });
      return $(this.priceTag).focus(function() {
        return me.onFocus();
      });
    };

    EditPrice.prototype.onMouseEnter = function() {
      if (!this.isToolbarShowing) {
        return this.priceTipIndex = layer.tips('【点价格】可以修改价格啦！<br/>截图超方便哦！', this.priceTag, {
          tips: 1,
          end: (function(_this) {
            return function() {
              return delete _this.priceTipIndex;
            };
          })(this)
        });
      }
    };

    EditPrice.prototype.onMouseLeave = function() {
      if (this.priceTipIndex) {
        return layer.close(this.priceTipIndex);
      }
    };

    EditPrice.prototype.onFocus = function() {
      if (this.priceTipIndex) {
        return layer.close(this.priceTipIndex);
      }
    };

    return EditPrice;

  })();
});
