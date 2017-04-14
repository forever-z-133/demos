// jquery 事件补全类
!(function(){
    'use strict';
    
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    var is = {};
    is.image = function(url) {
        return /(\.|\/)(gif|jpe?g|png)$/i.test(url);
    }
    is.audio = function(url) {
        return /(\.|\/)(mp3|wav|m4a|ogg|aac)$/i.test(url);
    }
    is.video = function(url) {
        return /(\.|\/)(mp4|avi|mov|ogg|wmv|3gp|mkv|flv|rmvb|mpeg)$/i.test(url);
    }
    is.ios = function() {
        return /iPhone|mac|iPod|iPad/i.test(navigator.userAgent);
    }
    is.mobile = function() {
        return /Mobile/i.test(navigator.userAgent);
    }
    is.telephone = function(str) {
        return /1\d{10}/i.test(str);
    }

    var _div = document.createElement('div');
    var support = {};
    function getVendorPropertyName(prop) {
        if (prop in _div.style) return prop;

        var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        for (var i=0; i<prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in _div.style) { return vendorProp; }
        }
    }
    function checkTransform3dSupport() {
        _div.style[support.transform] = '';
        _div.style[support.transform] = 'rotateY(90deg)';
        return _div.style[support.transform] !== '';
    }
    support.transition      = getVendorPropertyName('transition');
    support.transitionDelay = getVendorPropertyName('transitionDelay');
    support.transform       = getVendorPropertyName('transform');
    support.transformOrigin = getVendorPropertyName('transformOrigin');
    support.transform3d     = checkTransform3dSupport();
    support.filter          = getVendorPropertyName('Filter');
    support.animation       = getVendorPropertyName('animation');
    support.animationDelay  = getVendorPropertyName('animationDelay');
    support.fullScreen      = getVendorPropertyName('requestFullscreen');

    var transEndEventNames = {
        'transition':       'transitionend',
        'MozTransition':    'transitionend',
        'OTransition':      'oTransitionEnd',
        'WebkitTransition': 'webkitTransitionEnd',
        'msTransition':     'MSTransitionEnd',  
    };
    support.transitionEnd = transEndEventNames[support.transition] || null;

    var animEndEventNames = {
        animation:          'animationend',
        MozAnimation:       'animationend',
        OAnimation:         'oAnimationEnd oanimationend',
        WebkitAnimation:    'webkitAnimationEnd',
        msAnimation:        'MSAnimationEnd',
    };
    support.animationEnd = animEndEventNames[support.animation] || null;

    for (var key in support) {
        if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
            $.support[key] = support[key];
        }
    }

    window.is = is;
    window.support = support;
    window.isMobile = is.mobile();
    window.touchstart = isMobile ? 'touchstart' : 'mousedown';
    window.touchmove = isMobile ? 'touchmove' : 'mousemove';
    window.touchend = isMobile ? 'touchend' : 'mouseup';
    window.transitionEnd = support.transitionEnd;
    window.animationEnd = support.animationEnd;
})(window, jQuery)

!(function(){
    function AnimEnd(type, className, callback, stay) {
        if (Type(callback) === 'boolean') {stay = callback; callback = null;}
        return this.each(function() {
            var $this = $(this);
            $this.hide(0).removeClass('hide').show(0, function(){
                $(this).addClass(className)
                .one((type ? $.support.transitionEnd : $.support.animationEnd), function(){
                    var Timer = setTimeout(function(){
                        clearTimeout(Timer);
                        if (!stay) $this.removeClass(className);
                        if (callback) callback.apply($this);
                    }, 300);
                });
            })
        });
    }
    $.fn.addAnim = function(className, callback, stay) {
        AnimEnd.call(this, 0, className, callback, stay)
    }
    $.fn.addTrans = function(className, callback, stay) {
        AnimEnd.call(this, 1, className, callback, stay)
    }

    // 按钮禁用与激活
    $.fn.disable = function() {
        return this.each(function(){
            $(this).addClass('disabled').attr('tabindex', -1);
        });
    }
    $.fn.enable = function() {
        return this.each(function(){
            $(this).removeClass('disabled').removeAttr('tabindex');
        });
    }

    // 判断该对象是否存在
    $.fn.exist = function () {
        return this.length > 0;
    }
})(window, jQuery)

// 动画类
!(function(){
    // 判断类型
    function Type(obj) {
        var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
        return typeStr.substr(0, typeStr.length - 1).toLowerCase();
    }
    window.Type = Type;

	window.requestAnimationFrame = 
		window.requestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.msRequestAnimationFrame;

	window.cancelAnimationFrame = 
		window.cancelAnimationFrame || 
		window.mozCancelAnimationFrame;

    // 区间内持续时间的变化
    function smooth(fn, duration, option, finish) {
        var type, per, now = Date.now(), Timer, count = 0;
             
        if (Type(option) === 'boolean') { // 循环模式
            type = 'infinite';
            duration = duration || 25;
        } else if (Type(option) === 'number') { // 限定次数
            type = 'remain';
            duration = duration || 25;
            var remain = option;
        } else {    // 运行一次，但 duration 期间按设备性能持续运行 fn
            type = 'animate';
            duration = duration || 1000;
            if (option) finish = option;
        }

        _run();
        function _run() {
            per = Math.min(1, (Date.now() - now) / duration);
            if (per < 1) {
                if (type === 'animate') fn(per, ++count);
                Timer = requestAnimationFrame(_run);
            } else {
                if (type === 'animate' && finish) finish();
                if (type === 'infinite' || count < remain) {
                    now = Date.now();
                    fn(++count);
                    console.log(count, remain);
                    if (count === remain && finish) finish()
                    Timer = requestAnimationFrame(_run);
                } else {
                    cancelAnimationFrame(Timer);
                }
            }
        }

        return {
            stop: function() {
                cancelAnimationFrame(Timer);
            }
        }
    }

    // 一个接一个运行（用 fn 中的 return 进行暂停）
    function functionOneByOne(times, duration, fn, callback) {
        smooth(fn, duration, times, callback);
    }

    window.smooth = smooth;
    window.functionOneByOne = functionOneByOne;
})()

// 公共类
!(function(){
    // 加载图片
    function preloadImage(imgArr, fn, callback) {
        var count = 0, 
            len = Type(imgArr) === 'number' ? imgArr : imgArr.length;
        for(var i=0; i<len; i++) {
            var img = new Image();
            img.src = imgArr[i];
            img.onload = function() {
                count++;
                if (fn) fn(count/len*100);
                if (count === len) {
                    if (callback) callback();
                }
            };
        }
    }
    window.preloadImage = preloadImage;

    // 截取想要的键值对
    function GetQueryString(name, str, end) {
        var str = str || window.location.search;
        var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$' + (end?("|"+end):"") + ')');
        var r = str.match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }
    window.GetQueryString = GetQueryString;


    // 缓存机制
    function useCache(fn) {
        var cache = {};
        return function(){
            var key = arguments.length + Array.prototype.join.call(arguments, ",");
            if (key in cache) return cache[key];
            else return cache[key] = fn.apply(this, arguments);
        }
    }
    window.useCache = useCache;

    // 区间内的随机数
    function Random(min, max) {
        return (min||0) + Math.random() * ((max||1) - (min||0));
    }
    window.Random = Random;

    // 自动补零
    function addZero(num, n) {
        var len = num.toString().length, n = n || 2;
        while (len < n) {
            num = '0' + num; len++;
        }
        return num + '';
    }
    window.addZero = addZero;

    // 判断 object 对象为空
    function isEmpty(e) {
        for (var t in e) return false;
        return true;
    }
    window.isEmpty = isEmpty;

    // 刷新
    function Reload(url) {
        var uid = Math.random().toString(36).substring(2, 7);
        window.location.replace('/Event?EventId=20&uid=' + uid);
    }
    window.Reload = Reload;
})()


// 微信转发
!(function () {
    function WeChat(title, content, icon, url, playMusic, callback) {
        var title = title || "",
            icon = icon || "",
            content = content || "",
            url = url || "";
        $.ajaxSetup({ async: false });
        $.get("/wx/WeixinConfig", {
            Url: window.location.href
        }, function (r) {
            var descContent = !content ? "" : content;
            var shareTitle = title;
            var imgUrl = icon;
            var LevelId = GetQueryString("LevelId");
            LevelId = parseInt(LevelId) + 1;
            $.get("/wx/GetCustomerId",
                function (r) {
                    if (url.indexOf("?") > 0)
                        url += "&FromCustomerId=" + r + "&LevelId=" + LevelId + "&vt="
                    else {
                        url += "?FromCustomerId=" + r + "&LevelId=" + LevelId + "vt="
                    }
                });
            wx.config(r);
            wx.ready(function () {
                if (playMusic) {
                    var $bgm = $('#bgm')[0]; $bgm.play();
                }

                wx.onMenuShareTimeline({
                    title: shareTitle, // 分享标题
                    link: url + 1, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    success: function () { //用户分享
                        if (callback) callback();
                    },
                    cancel: function () { // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareAppMessage({
                    title: shareTitle, // 分享标题
                    link: url + 2, // 分享链接
                    imgUrl: imgUrl, // 分享图标
                    desc: descContent,//分享内容
                    success: function () { // 用户确认分享后执行的回调函数
                        if (callback) callback();
                    },
                    cancel: function () { // 用户取消分享后执行的回调函数
                    }
                });
            });
        }, "", true);
        $.ajaxSetup({ async: true });
    }
    window.WeChat = WeChat;
})()

// 限制横竖屏
!(function(){
    var $main = $('#main'), $info = $('#info');
    $(window).on('load orientationchange resize', function (e) {
        // LockScreen(fn1, fn2, false);    // 限制竖屏，提示请横版
        LockScreen(fn1, fn2, true);     // 限制横屏，提示请竖版
        return false;

        function fn1() {    // 显示首页
            $info.addClass('hide');
            $main.removeClass('hide');
        }
        function fn2() {    // 显示提示
            $info.removeClass('hide');
            $main.addClass('hide');
        }

        /*
         * LockScreen | 屏幕限制一个方向进行横竖屏限制
         * fn1 - 显示首页的方法，
         * fn2 - 显示提示页的方法
         * showShu - true 为限制横屏
         */
        function LockScreen(fn1, fn2, showShu) {
            if (window.orientation) {
                $main.removeAttr('style');
                if (window.orientation !== 0) {  // 横
                    showShu ? fn2() : fn1();
                } else {
                    showShu ? fn1() : fn2();
                }
            } else {
                var w = window.innerWidth, h = window.innerHeight;
                if (h < w && /Mobile/i.test(navigator.userAgent)) { // 横
                    showShu ? fn2() : fn1();
                } else {
                    $main.removeAttr('style');
                    showShu ? fn1() : fn2();
                }
            }
            if ($('#RoateStyle').length > 0) return;
            if (showShu) {
                var _style = '<style id="RoateStyle">';
                _style += '@media (max-width: 768px) and (orientation: landscape) {';
                _style += '.body {bottom: auto;height: 200%;}';
                _style += '}</style>'
                $('head').append(_style);
            } else {
                var _style = '<style id="RoateStyle">';
                _style += '@media (max-height: 100px) {';
                _style += '.body {bottom: auto;height: 600%;}';
                _style += '}</style>'
                $('head').append(_style);
            }
        }
    });
})()

// 取消默认点击
$(function(){
    $('body').on('tap.default', '[href="#"]', function(e){
        e.preventDefault();
    });
});



/*
 * tabs
 ******************************************/
function Tabs(elem, options) {
    this.$box = $(elem);
    this.opt = $.extend({
        item: [],
        list: '',
        scroll: false,
        line: true,
        begin: function(index){},
        before: function(index, prev){},
        change: function(index, prev){},
    }, options || {});

    this.init(this.opt);
    this.bind(this.opt);
}
// 初始化
Tabs.prototype.init = function(opt) {
    // 绘制元素
    this.scrollable = opt.scroll;
    this.draw(opt.item, opt.list);

    // 获取标量
    this.$tabs = this.$box.find('.tab');
    this.index = parseInt(GetQueryString('tab')) || 0;
    this.prevIndex = 0;
    if (typeof opt.list == 'string') {
        this.$list = $(opt.list).exist() ? $(opt.list) : null;
    }

    // 初始化
    opt.begin.call(this, this.index);
    this.change(this.index);
}
// 绑定事件
Tabs.prototype.bind = function(opt) {
    var that = this;
    that.$tabs.off().on('click', function(e){
        e.preventDefault();
        var index = $(this).closest('.tab').index();
        if (index != that.prevIndex) {
            that.change(index);
        }
    });
}
// 绘制
Tabs.prototype.draw = function(tabs, hasList) {
    var _html = this.tpl(tabs);
    if (hasList && !$('#style_nav').exist()) {
        _html += '<style id="style_nav">.list {display: none;}.list.active {display: block;}</style>';
    }
    this.$box.empty().append(_html);
}
// 切换
Tabs.prototype.change = function(index) {
    this.opt.before.call(this, index, this.prevIndex);

    this.$tabs.removeClass('active').eq(index).addClass('active');

    var scrollLeft = this.$tabs.eq(index).offset().left;
    this.$box.find('.tabs-box').scrollLeft(scrollLeft);

    this.$list && this.$list.removeClass('active').eq(index).addClass('active');

    var change = this.opt.change
    if (typeof change == 'function') {
        change.call(this, index, this.prevIndex);
    } else {
        for(var i in change) change[i].call(this, index, this.prevIndex);
    }

    this.index = index;
    this.prevIndex = index;
}
// html 结构
Tabs.prototype.tpl = function(tabs) {
    var _html = '';
    _html += '<ul class="tabs-box">';
    for (var i in tabs) {
        if (typeof tabs[i] === 'string') {
            _html += '<li class="tab"><a href="#" class="btn">'+tabs[i]+'</a></li>';
        } else {
            _html += '<li class="tab" id="'+tabs[i].Id+'"><a href="#" class="btn">' + tabs[i].Name + '</a></li>';
        }
    }
    return _html + '</ul></div>';
}

/*
 * list
 ******************************************/
function List(elem, options) {
    this.opt = $.extend({
        url: '',
        data: {},
        noData: '', // 第一次加载无数据
        once: false, // 只运行一次
        begin: function(data){},
        template: function(data){},
        before: function(opt){},
        finish: function(_html, index){},
        bindTab: null,
        tabChange: function(opt, index){},
    }, options || {});

    this.dropload = null
    this.init(this.opt);
    this.bind(elem, this.opt);
}
List.prototype.init = function(opt) {
    this.first = true;
    this.index = opt.bindTab && opt.bindTab.index || 0;
    opt.begin.call(this);

    if (opt.bindTab) {
        var that = this;
        var tabs = opt.bindTab;
        var fn = function(index, prev){
            that.index = index;
            opt.tabChange.call(that, index, prev);
        }
        tabs.opt.change = [tabs.opt.change, fn];
    }
}
List.prototype.bind = function(elem, opt) {
    var that = this;
    this.dropload = $(elem).dropload({
        loadDownFn: function (me) {
            opt.before.call(that, opt);
            me.lock();


            // 只运行一次
            if (opt.once) {
                if (that.first) {
                    that.first = false;
                    me.opts.domDown.domNoData = '';
                    that.disable(me);
                } else return false;
            }


            $.ajax({
                url: opt.url,
                data: opt.data,
                success: function (r) {
                    // console.log(r);
                    // opt.get && opt.get.call(that, r);
                    if (r && r.length < 1) {
                        if (that.first) me.opts.domDown.domNoData = opt.noData || me.opts.domDown.domNoData;
                        that.disable(me);
                    } else {
                        that.first = false;
                        var _html = opt.template.call(that, r);
                        setTimeout(function(){
                            opt.finish.call(that, _html, that.index);
                            !opt.once && that.enable(me);
                        }, 1000);
                    }
                },
            }).fail(function(){
                me.opts.domDown.domNoData = that.first ? (opt.noData || me.opts.domDown.domNoData) : '<div class="dropload-noData">请求失败，请稍后重新操作</div>';
                that.disable(me);
                // setTimeout(function(){
                //     that.enable(me);
                // }, 1000);
            });
        }
    });
}
List.prototype.enable = function(dropload){
    this.dropload.unlock();
    this.dropload.noData(false);
    this.dropload.resetload();
}
List.prototype.disable = function (dropload) {
    this.dropload.lock();
    this.dropload.noData(true);
    this.dropload.resetload();
}
