/* Common 1.0.0 | @author foreverZ | 2016.11.2 */
!(function(){
    'use strict';
    
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }

    // 获取此元素现在已有的样式
    if (!HTMLElement.currentStyle) {
        function _getStyle(prop) {
            var _s = window.getComputedStyle(this, null)
            return prop ? _s[prop] : _s;
        }
        HTMLElement.prototype.currentStyle = _getStyle;
        HTMLElement.prototype.getStyle = _getStyle;
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
    support.transition      = getVendorPropertyName('transition');
    support.transitionDelay = getVendorPropertyName('transitionDelay');
    support.transform       = getVendorPropertyName('transform');
    support.transformOrigin = getVendorPropertyName('transformOrigin');
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

    window.requestAnimationFrame = (function(){
        return  window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    window.cancelAnimationFrame = (function(id){
        return window.cancelRequestAnimationFrame ||
            // window.webkitCancelAnimationFrame         ||
            window.webkitCancelRequestAnimationFrame  ||
            window.mozCancelRequestAnimationFrame     ||
            window.oCancelRequestAnimationFrame       ||
            window.msCancelRequestAnimationFrame      ||
            clearTimeout(id);
    })();

    window.is = is;
    window.support = support;
    window.transitionEnd = support.transitionEnd;
    window.animationEnd = support.animationEnd;
})(window, jQuery)

// jquery 事件补全类
!(function(){
    function AnimEnd(type, className, callback, stay) {
        if (Type(callback) === 'boolean') {stay = callback; callback = null;}
        return this.each(function() {
            var $this = $(this);
            if (!$this.is('.hide')) return;
            $this.hide(0).removeClass('hide').show(0).addClass(className)
                .one((type ? $.support.transitionEnd : $.support.animationEnd), function(){
                    var Timer = setTimeout(function(){
                        clearTimeout(Timer);
                        if (!stay) $this.removeClass(className);
                        if (callback) callback.apply($this);
                    }, 300);
                });
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
        var count = 0, len = imgArr.length;
        for(var i=0; i<len; i++) {
            var img = new Image();
            img.onload = function() {
                count++;
                if (fn) fn(count/len*100);
                if (count === len) {
                    if (callback) callback();
                }
            };
            img.src = imgArr[i];
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
    function Link(url) {
        var uid = Math.random().toString(36).substring(2, 7);
        var connect = /\?/.test(url) ? '&temp=' : '?temp=';
        var href = url + connect + uid;
        return {
            reload: function(){
                window.location.replace(href);
            }
        }
    }
    window.Link = Link;
})()


// 微信转发
!(function () {
    function WeChat(title, content, icon, url, callback) {
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
            $.get("/wx/GetCustomerId", function (r) {
                if (url.indexOf("?") > 0)
                    url += "&FromCustomerId=" + r + "&LevelId=" + LevelId + "&vt="
                else {
                    url += "?FromCustomerId=" + r + "&LevelId=" + LevelId + "vt="
                }
            });
            wx.config(r);
            wx.ready(function () {
                var $bgm = $('#bgm')[0]; $bgm && $bgm.play();

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
    var $main = $('#main'), $info = $('#rotate-info');
    $(window).on('load.rotate orientationchange.rotate resize.rotate', function (e) {
        // LockScreen(fn1, fn2, false);    // 限制竖屏，提示请横版
        LockScreen(fn1, fn2, true);     // 限制横屏，提示请竖版
        return false;
    });

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
        if (typeof window.orientation !== 'undefined') {
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
})()

// 数据保存
!(function(){
    function Storage(item, isSession) {
        var db = isSession ? sessionStorage : localStorage;

        // 返回正确的 JSON 字符串解析
        function JsonParse(str) {
            try {
                return JSON.parse(str);
            } catch(e) {
                return str;
            }
        }

        return {
            get: function(name) {
                // 为 true 获取所有
                if (typeof name === 'boolean' && name) return db;
                // 与 item 不同则获取 name
                // 否则获取 item
                var _item = name || item;
                return JsonParse(db.getItem(_item));
            },
            remove: function(name){
                // 同 get 方法
                if (typeof name === 'boolean' && name) {
                    db.clear(); return db;
                }
                var _item = name || item;
                db.removeItem(_item);
                return db;
            },
            set: function(name, val) {
                // 当 name 与 item 不同，且 val 存在时，set(name, val)
                // 当 name 为 val 时, set(item, name);
                if (name != item) {
                    if (val)  {
                        db.setItem(name, JSON.stringify(val));
                        return db;
                    }
                }
                db.setItem(item, JSON.stringify(name));
                return db;
            },
            clear: function() {
                // 清空数据库
                db.clear();
                return db
            },
        }
    }
    window.Storage = Storage;
})();

// 前端路由
!(function(){
    function Router() {
        this.routes = {};
        $(window).on('load.search hashchange.search popstate.search', this.resolve.bind(this))
    }
    Router.prototype.route = function(path, callback) {
        this.routes[path] = callback || function(){};
    }
    Router.prototype.resolve = function (e) {
        this.curHash = location.hash.slice(1) || '/';
        typeof this.routes[this.curHash] === 'function' && this.routes[this.curHash]();
    }
    window.router = new Router();
})();

// 阻止微信下拉出黑底插件
!(function(){
    function PreventScroll() {
        var elem = arguments || []; // 传入绑定的元素
        var $elem = [];     // 存储所有需要监听的元素

        // 获取需要监听的元素
        for (var i=0,len=elem.length; i<len; i++) {
            var $e = document.querySelectorAll(elem[i]);
            if (!$e) {console.error('您输入的元素不对，请检查'); return;}
            for(var j=0; j<$e.length; j++) {
                if ($e[j].currentStyle('overflow').match(/auto|scroll/i)) {
                    $elem.push($e[j]);
                }
            }
        }

        window.addEventListener('touchstart', function(e){
            window.scroll_start = e.touches[0].clientY;
        });
        window.addEventListener('touchmove', prevent);

        function prevent(e) {
            var status = '11'; // 1容许 0禁止，十位表示向上滑动，个位表示向下滑动
            var startY = window.scroll_start;
            var currentY = e.touches[0].clientY;
            var direction = currentY - startY > 0 ? '10' : '01';  // 当前的滚动方向，10 表示向上滑动

            $elem.forEach(function(ele){
                var scrollTop = ele.scrollTop,
                    offsetHeight = ele.offsetHeight,
                    scrollHeight = ele.scrollHeight;

                if (scrollTop === 0) {
                    // 到顶，禁止向下滑动，或高度不够，禁止滑动
                    status = offsetHeight >= scrollHeight ? '00' : '01';
                } else if (scrollTop + offsetHeight >= scrollHeight) {
                    // 到底，则禁止向上滑动
                    status = '10';
                }
            });

            // 如果有滑动障碍，如到顶到底等
            if (status != '11') {
                if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                    e.preventDefault();
                    return;
                }
            }
        }
    }

    PreventScroll('.canScroll');
})();

// 取消默认点击
$(function(){
    $('body').on('click.default', '[href="#"]', function(e){
        e.preventDefault();
    });
    var $bgm = $('#bgm')[0]; $bgm && $bgm.play();
    // 音乐开关
    $('body').on('click', '.btn-music', function () {
        var $this = $(this).closest('.btn-music');
        $this.toggleClass('off');
        if ($this.is('.off')) $bgm.pause();
        else $bgm.play();
    });
});