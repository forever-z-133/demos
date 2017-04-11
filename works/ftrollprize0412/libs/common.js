// jquery 事件补全类
!(function(){

    function AnimEnd(type, className, callback, stay) {
        if (Type(callback) === 'boolean') {stay = callback; callback = null;}
        return this.each(function() {
            var $this = $(this);
            $this.removeClass('hide').addClass(className)
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


// 隐藏微信转发
!(function () {
    // function WeChat() {
        $.ajaxSetup({ async: false });
        $.get("http://sum.kdcer.com/wx/WeixinConfig", {
            Url: window.location.href
        }, function (r) {
            wx.config(r);
            wx.ready(function () {
                wx.hideOptionMenu();
                var $bgm = $('#bgm')[0];
                $bgm && $bgm.play();
            });
        }, "", true);
        $.ajaxSetup({ async: true });
    // }
    // window.WeChat = WeChat;
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
    $('body').on('click.default', '[href="#"]', function(e){
        e.preventDefault();
    });
    var $bgm = $('#bgm')[0]; $bgm.play();
    // 分享
    $('body').on('click', '.btn-share', function (fn, close) {
        $('#share').fadeIn(fn).off().on('click', function () {
            $(this).fadeOut('fast', close);
        });
    });
    // 音乐开关
    $('body').on('click', '.btn-music', function () {
        var $this = $(this).closest('.btn-music');
        $this.toggleClass('off');
        if ($this.is('.off')) $bgm.pause();
        else $bgm.play();
    });
    // 阻止微信下拉
    $(window).on('touchmove', function (e) {
        e.preventDefault();
    });
});