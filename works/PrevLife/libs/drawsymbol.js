function DrawSymbol(elem, options) {
    // canvas 元素
    var canvas = document.querySelector(elem);
    var ctx = canvas.getContext('2d');
    var width = canvas.width = $(canvas).parent().width();
    var height = canvas.height = $(canvas).parent().height();

    var _default = {
        size: 10,       // 笔粗细
        color: 'black', // 笔颜色
        complete: null, // 抬笔
    }
    var opt = $.extend(_default, options || {});

    // 存储位置数据
    var params = {}

    function init(options) {
        params = {};
        ctx.clearRect(0, 0, width, height);
        var opt = $.extend(_default, options || {});

        // 样式基础设置
        ctx.fillStyle = opt.color;
        ctx.lineWidth = opt.size;
        // ctx.strokeStyle = 'black';
    }

    function clear() {
        ctx.clearRect(0, 0, width, height);
    }

    // 开始绘画
    $(canvas).on('touchstart mousedown', function(e){
        e.preventDefault(); e.stopPropagation();
        if (e.type === 'touchstart') e = e.originalEvent.touches[0] || e;
        var params = {
            offsetTop: $(this).offset().top,
            offsetLeft: $(this).offset().left,
        }
        var x = e.clientX - params.offsetLeft;
        var y = e.clientY - params.offsetTop;
        ctx.moveTo(x, y);

        // 绘画
        $(canvas).on('touchmove.canvas mousemove.canvas', function(evt){
            if (evt.type === 'touchmove') evt = evt.originalEvent.touches[0] || evt;
            var xx = evt.clientX - params.offsetLeft;
            var yy = evt.clientY - params.offsetTop;
            ctx.lineTo(xx, yy);
            ctx.stroke();

        // 绘画结束
        }).one('touchend.canvas mouseup.canvas', function(evt){
            $(this).off('.canvas');
            opt.complete && opt.complete();
        });
    }).on('selectstart', function(e){
        e.preventDefault();
    });

    return {
        init: init,
        clear: clear,
    }

//     // 绘画结束后，裁切画布
//     // 也可放入 dom 中用以长按保存
//     function callback() {
//         $(canvas).off();
//         // var compressBase64 = canvas.toDataURL("image/png", .1);
//         var compressBase64 = canvas.toDataURL("image/png", 1);
//         var img = new Image();
//         img.onload = function() {
//             // ctx.clearRect(0, 0, width, height);
//             // ctx.drawImage(img, 0, 0, width, height, 50, 50, width-100, height-100);
//             $('#master').hide(0);
//             $('<div class="bg"></div>').append(img).appendTo('.flag');
//         }
//         img.src = compressBase64;
//         $('.welcome .flag').addClass('anim-after')
//     }
}