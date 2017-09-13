/*
 * written by ForeverZ
 * at 2017.3.29  
 * contact me with E-Mail(617754841@qq.com) or 
 * contact me with GitHub(https://github.com/foreverZ133)
 *******************/



// ----------------- 兼容 ----------------------
!(function(){
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
    $ ? ($.support[key] = support[key]) : null;
  }

  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  // 获取当前秒数时间
  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }

  // 兼容 location.origin，获取完整 host
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
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
})();

// ----------------- 判断的拓展 ----------------------
!(function(){
  // 判断类型
  function Type(obj) {
    var typeStr = Object.prototype.toString.call(obj).split(" ")[1];
    return typeStr.substr(0, typeStr.length - 1).toLowerCase();
  }
  window.Type = Type;

  // 判断对象是否为空
  function isEmpty(obj) {
    for (var i in obj) return false;
    return true;
  }
  window.isEmpty = isEmpty;

  // 对比两个对象是否相等
  function ObjectEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
 
    if (aProps.length != bProps.length) return false;

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }
})();

// ----------------- 获取 ----------------------
!(function(){
  // 截取 search 中数值
  function GetQueryString(name, str, end) {
    var str = str || window.location.search;
    var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$' + (end ? ("|" + end) : "") + ')');
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

  // 生成唯一标识
  function guid(len) {
    return Math.random().toString(36).substring(2, (len||5)+2);
  }
  window.guid = guid;

  // 时间戳转换
  function convertDateStr(s) {
    return new Date(parseInt(s.replace("/Date(", "").replace(")/", ""), 10));
  }
  window.convertDateStr = convertDateStr;

  // 日期加减
  function DateAddDay(date, days) {
    var d = new Date(date);
    return new Date(d.setDate(d.getDate() + days));
  }
  window.DateAddDay = DateAddDay;
})();

// ----------------- jquery 拓展 ----------------------
!(function(){
  // 判断某 jquery 元素是否存在
  $.fn.exist = function(){
    return this.length > 0;
  }

  // 按钮禁用与激活
  $.fn.disable = function () {
    return this.each(function () {
      $(this).addClass('disabled').attr('tabindex', -1);
    });
  }
  $.fn.enable = function () {
    return this.each(function () {
      $(this).removeClass('disabled').removeAttr('tabindex');
    });
  }

  function AnimEnd(type, className, callback, stay) {
    if (Type(callback) === 'boolean') {stay = callback; callback = null;}
    return this.each(function() {
      var $this = $(this);
      $this.removeClass('hide').addClass(className);
      type ? $this.one($.support.transitionEnd, _end.bind(this)) : $this.one($.support.animationEnd, _end.bind(this));
    });
    function _end() {
      console.log(this)
      var Timer = setTimeout(function(){
        clearTimeout(Timer);
        if (!stay) this.removeClass(className);
        if (callback) callback.apply(this);
      }.bind($(this)), 300);
    }
  }
  $.fn.addAnim = function(className, callback, stay) {
    AnimEnd.call(this, 0, className, callback, stay)
  }
  $.fn.addTrans = function(className, callback, stay) {
    AnimEnd.call(this, 1, className, callback, stay)
  }
})();

// ----------------- jquery 拓展2 ----------------------
!(function(){
  // 按键拓展
  $('body').on('click.default', '[href="#"]', function(e){
    e.preventDefault(); return false;
  });
})();

// ----------------- 其他封装 ----------------------
// 常用方法
!(function(){
  // 图片预加载
  function preloadImage(imgArr, fn, callback) {
    var count = 0, len = typeof imgArr=='number' ? imgArr : imgArr.length;
    for(var i=0; i<len; i++) {
      var img = new Image();
      img.onload = function() {
        fn && fn(++count/len*100);
        if (count >= len) callback && callback();
      };
      img.src = imgArr[i];
    }
  }
  window.preloadImage = preloadImage;
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
                var $bgm2 = $('#bgm')[0]; $bgm2.play(); $bgm2.pause();
                var $bgm = $('#ring')[0]; $bgm.play();
                $('#wait').fadeIn(0);

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

// 微信转发
!(function(){
  if (typeof wx == 'undefined') {
    console.error('请调用 <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');
  }

  function WxReady(callback) {
    if (!/micromessenger|wechat/i.test(navigator.userAgent)) {
      callback && callback(); return;
    }
    var args = arguments;
    $.ajaxSetup({ async: false });
    $.getJSON('http://sum.kdcer.com/api/applet/WeixinConfig', {
      Url: window.location.href
    }, function(r){
      for (var i=0,l=args.length; i<l; i++) {
        typeof args[i] == 'string' && r.jsApiList.push(args[i]);
      }
      wx.config(r);
      if (typeof wx == 'undefined') return;
      // callback && callback();
      wx.ready(function () {
        callback && callback();
      });
    }).fail(function(err){
      alert('wxconfig 获取失败');
      console.log(err);
    });
    $.ajaxSetup({ async: true });
  }
  window.WxReady = WxReady;

  function WxShare(json) {
    var data = $.extend({
      title: '',
      link: '',
      imgUrl: '',
      desc: '',
      success: function(){},
      cancel: function(){},
    }, json || {});

    console.log('转发信息', data);
    wx.onMenuShareTimeline(data);
    wx.onMenuShareAppMessage(data);
  }
  window.WxShare = WxShare;

  function WxChat(json, before) {
    WxReady(function(){
      before && before();
      WxShare(json);
    });
  }
  window.WxChat = WxChat;
})()


// 前端路由  ---------
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

// 数据存储  ---------
!(function(){
  function Storage(item, isSession) {
    var db = isSession ? sessionStorage : localStorage;

    function JsonParse(response) {
      try {
        return JSON.parse(response);
      } catch(e) {
        return response;
      }
    }

    return {
      get: function(name) {
        if (typeof name === 'boolean' && name) return db;
        var _item = name || item;
        return JsonParse(db.getItem(_item));
      },
      remove: function(name){
        if (typeof name === 'boolean' && name) {
          db.clear(); return db;
        }
        var _item = name || item;
        db.removeItem(_item);
        return db;
      },
      set: function(name, val) {
        if (name != item) {
          if (typeof val !== 'undefined')  {
            db.setItem(name, JSON.strigify(val));
            return db;
          }
        }
        db.setItem(item, JSON.strigify(name));
        return db;
      },
      clear: function() {
        db.clear();
      },
    }
  }
})();

!(function(){
  var na = navigator.userAgent.toLowerCase()
  window.app = {
    isIOS: !!na.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isWX: !!na.match(/MicroMessenger/i),
    isMobile: window.innerWidth < 1000,
  }
})()


!(function () {
  var $tips = $('#tips');
  var tipTimer = null;

  var $toast = $('#toast');
  var toastTimer = null;

  var $alert = $('#alert');

  window.tool = {
    showTips: function (options) {
      var opt = $.extend({
        text: '',
        position: 'bottom',
        duration: 2000,
      }, options || {});

      if ($tips.length < 1) {
        $tips = $('<div class="tips ' + opt.position + '"></div>').appendTo('.body');
      }

      $tips.text(opt.text).addClass('in');

      tipTimer = setTimeout(this.hideTips, opt.duration);
    },
    hideTips: function() {
      if (!$tips) return;
      clearTimeout(tipTimer);
      $tips.text('').removeClass('in');
    },
    showToast: function (options) {
      var opt = $.extend({
        text: '',
        duration: 2000,
      }, options || {});

      if ($toast.length < 1) {
        $toast = $('<div class="toast load" id="toast"><div class="toast-wrap" data-text=""></div></div>').appendTo('.body');
      }

      $toast.addClass('in').children().attr('data-text', opt.text);

      toastTimer = setTimeout(this.hideTips, opt.duration);
    },
    hideToast: function() {
      if (!$toast) return;
      clearTimeout(toastTimer);
      $toast.removeClass('in').children().attr('data-text', '');
    },
    alert: function (options) {
      var opt = $.extend({
        text: '',
        title: '',
        align: 'left',
        btn: '我知道了',
      }, options || {});

      if ($alert.length < 1) {
        var _html = '<div class="modal alert in" id="alert">';
        _html += '<div class="bg modal-bg"></div>';
        _html += '<div class="modal-box panel">';
        _html += '<div class="panel-head">'+opt.title+'</div>';
        _html += '<div class="panel-body">'+opt.text+'</div>';
        _html += '<div class="panel-foot">';
        _html += '<a href="#" class="btn-close-alert cancel">'+opt.btn+'</a>';
        _html += '</div>';
        _html += '</div>';
        _html += '</div>';
        $alert = $(_html).appendTo('.body');
      }

      $alert.off('.zyh.cancel').on('click.zyh.cancel', '.cancel', function () {
        $alert.removeClass('in');
      });

      $alert.addClass('in');
      $alert.find('.panel-head').text(opt.title);
      $alert.find('.panel-body').text(opt.text);
    },
  }
})()

// 限制横竖屏
!(function () {
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