var $bgm = $('#bgm')[0]; $bgm.play();

WeChat('金鸡来签到，狂抽福袋SSR！', '新年新气象，手气不一样，金鸡来签到，福袋抽回家！', '//sum.kdcer.com/drawSymbol/img/icon.jpg', '//sum.kdcer.com/Event?EventId=12');

var remainCount = 0;
var $loadText = $('#load-text');
var imgArr = ['img/loading.gif', 'img/bad-info.png', 'img/bag1.png', 'img/bag2.png', 'img/bar.png', 'img/btn-close.png', 'img/btn-rule.png', 'img/btn-want.png', 'img/checkin-bg.png', 'img/hasGot.png', 'img/icon.jpg', 'img/light.png', 'img/logo.png', 'img/main-bg.jpg', 'img/prize-bad.png', 'img/prize-bottom.png', 'img/prize-good.png', 'img/rule.png', 'img/star.png', 'img/symbol-bg.png'];
preloadImage(imgArr, function (i) {
    $loadText.text(parseInt(i));
}, function () {
    $('#main-load').fadeOut('fast');
    $('#main-bg').fadeIn();
    $('.star').addAnim('anim-light');
    $('.bag4').addAnim('anim-bag');

    $.post('//sum.kdcer.com/Event/LuckyBagEnter', {
        eventId: 12,
    }, function (r) {
        //console.log(r);
        $('#lucky-count').text(r.Count > 0 ? r.Count : 0);
        if (!r.State) { // 不能抽
            if (r.ErrorMesage) {    // 非法
                alert(r.ErrorMesage);
                return;
            } else if (r.Bonus) {   // 已中奖
                $('#qrcode').attr('src', r.Bonus);
                if (r.Take) { // 已兑换
                    $('#hasGot').removeClass('hide');
                }
                Good();
            } else if (r.Count < 1) {
                Bad();
                //alert('您没有抽奖机会，明天来签到吧')
                //$('#welcome').fadeIn();
            }
        } else {    // 能抽
            if (r.SignState) {
                $('#checkin').addClass('open');
            } else {
                $('#welcome').fadeIn();
                $('#add').addAnim('anim-add');
            }
            if (r.Count > 0) canDraw(); // 可抽数量大于1则能抽
        }
        remainCount = r.Count || 0;
    });
});

// 签到后点我要抽奖
$('.btn-want, .btn-cancel').on('tap', function () {
    $('#checkin').removeClass('open');
    $('#welcome').fadeIn();
    $('#add').addAnim('anim-add');
    canDraw();
});

// 能够抽奖则运行
function canDraw() {
    $('#dot').addAnim('anim-finger');
    $('#welcome').one('tap', Draw);
}

// 画符
function Draw() {
    $('#welcome').fadeOut('fast');
    $('#draw').addClass('open');
    $('#notice').text('快来画个符吧').removeClass('hide');
    DrawCanvas($('#drawSymbol')[0], function (base64) {
        $('#notice').addClass('hide');
        $('<img src="' + base64 + '" id="result" class="bg hide">').appendTo('.flag');
        $('#result').addAnim('anim-flag', function () {
            setTimeout(function () {
                GetPrize();
            }, 200);
        });
    });
}

// 抽奖
function GetPrize() {
    Post('//sum.kdcer.com/Event/LuckyBagLotteryBehavior', {
        eventId: 12,
    }, function (r) {
        //console.log(r);
        remainCount--;
        $('#draw').fadeOut('fast');
        if (r.State) {
            if (r.Bonuses.length > 0) {
                $('#qrcode').attr('src', r.Bonuses[0].QRCode);
                Good();
            } else { alert('错误!') };
        } else {
            Bad();
            //if (r.ErrorMesage) alert(r.ErrorMesage);
        }
    });
}

// 中奖
function Good() {
    $('#good').addClass('open');
    $('.prize-bag, .light').addAnim('anim-scale', function () {
        $('.prize-name, .prize-info').addAnim('anim-fade');
    });
}

// 未中奖
function Bad() {
    $('#bad').addClass('open');
    $('.prize-sad, .prize-sad-text').addAnim('anim-fade');
    if (remainCount < 1) return;
    $('.body').one('tap', function () {
        window.location.reload();
    });
}

// 画符的 canvas 程序
function DrawCanvas(canvas, callback) {
    // canvas 元素
    var ctx = canvas.ctx = canvas.getContext('2d');
    var width = canvas.width = $(canvas).parent().width();
    var height = canvas.height = $(canvas).parent().height();

    // 样式基础设置
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.lineWidth = 9;
    ctx.strokeStyle = '#fff';

    // 存储位置数据
    var params = {}

    // 开始绘画
    $(canvas).on('touchstart mousedown', function (e) {
        e.preventDefault(); e.stopPropagation();
        if (e.type === 'touchstart') e = e.originalEvent.touches[0] || e;
        var params = {
            offsetTop: $(this).offset().top,
            offsetLeft: $(this).offset().left,
        }
        var x = e.clientX - params.offsetLeft;
        var y = e.clientY - params.offsetTop;
        params.area = 0;
        ctx.moveTo(x, y);

        $(window).on('touchmove.canvas mousemove.canvas', function (evt) {
            if (evt.type === 'touchmove') evt = evt.originalEvent.touches[0] || evt;
            var xx = evt.clientX - params.offsetLeft, yy = evt.clientY - params.offsetTop;
            params.area++;
            ctx.lineTo(xx, yy);
            ctx.stroke();
        }).one('touchend.canvas mouseup.canvas', function (evt) {
            if (params.area < 10) { return }
            $(this).off('.canvas');
            $(canvas).off();
            var base64 = canvas.toDataURL("image/png", 0.1);
            ctx.clearRect(0, 0, width, height);
            callback && callback.call($(canvas), base64);
        });
    }).on('selectstart', function (e) {
        e.preventDefault();
    });
}

// 旗帜摇摆效果
function FlagCanvas(canvas, options) {
    // 默认值
    var opt = $.extend({
        width: $(canvas).parent().width(),
        height: $(canvas).parent().height(),
        front: '',
        wavelength: 20,
        amplitude: 10,
        period: 50,
        shading: 200,
        squeeze: -0.1,
        direction: 'x',
    }, options || {});

    // 获取标量
    var ctx = canvas.ctx = canvas.ctx ? canvas.ctx : canvas.getContext('2d');
    var w = canvas.width = opt.width, h = canvas.height = opt.height;

    // 绘制这个 canvas
    if (/#|rgb|rgba|hsl|hsla/.test(opt.front)) {
        ctx.fillStyle = opt.front;
        ctx.fillRect(0, 0, w, h);
    } else if (/jpg|jpeg|png|gif/i.test(opt.front)) {
        _image(opt.front);
    } else if (typeof opt.front === 'object') {
        ctx.drawImage(opt.front, 0, 0, w, h);
    }

    // 基础数据并启动
    var od = ctx.getImageData(0, 0, w, h).data; // 原始图片信息数据
    var timer; _draw();
    console.log(od);

    var id, d, now, y, lastO, shade, sq, x, px, pct, o, y2, opx
    function _draw() {
        id = ctx.getImageData(0, 0, w, h);
        d = id.data;    // 图片信息流
        now = (new Date) / opt.period;  // 当前波长
        for (y = 0; y < h; ++y) {   // 纵向每个像素
            lastO = 0;
            shade = 0;
            sq = (y - h / 2) * opt.squeeze; // 上下两边距中心的位置
            for (x = 0; x < w; ++x) {   // 横向每个像素
                px = (y * w + x) * 4;   // x 轴位置
                pct = x / w;            // x 轴百分比
                o = Math.sin(x / opt.wavelength - now) * opt.amplitude * pct;   // 震动偏移量
                y2 = y + (o + sq * pct) << 0;   // 震动后 y 轴位置，且防止溢出
                opx = (y2 * w + x) * 4;         // 震动后的 x 轴位置
                shade = (o - lastO) * opt.shading;  // 阴影
                d[px] = od[opx] + shade;            // R
                d[px + 1] = od[opx + 1] + shade;    // G
                d[px + 2] = od[opx + 2] + shade;    // B
                d[px + 3] = od[opx + 3];            // A
                lastO = o;  // 递增震动偏移量
            }
        }
        ctx.putImageData(id, 0, 0);
        timer = requestAnimationFrame(_draw);
    }

    function _image(imgUrl) {
        var img = new Image();
        img.onload = function () {
            var radio = img.height / img.width;
            h = canvas.height = canvas.width * radio;
            ctx.drawImage(img, 0, 0, w, h);
        }
        img.onerror = function () {
            alert(imgUrl + ' 图片加载失败了...');
        }
        img.src = imgUrl;
    }

    return {
        stop: function () {
            cancelAnimationFrame(timer);
        },
        start: function () {
            _draw();
        },
        set: function (options) {
            opt = $.extend(opt, options || {});
            return this;
        },
    }
}