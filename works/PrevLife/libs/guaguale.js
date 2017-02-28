function GuaGuaLe(target, options, callback) {
    // 默认值
    var _default = {
        width: null,
        height: null,
        front: '#aaa',  // 遮挡物，颜色或图片路径
        size: 10,       // 画笔粗细
        start: null,    // 手指放上时
        move: null,     // 移动中
        end: null,      // 手指抬起时(不一定滑够了范围)
        complete: null, // 清掉一定范围后运行
    }

    // 处理传参
    var complete = null;    // 画够了范围，完成刮刮乐
    if (typeof options === 'function') {
        complete = options; options = {};
    }
    var opt = $.extend(_default, options || {});
    complete = callback || complete || opt.complete;

    // 初始化
    var cv, ctx, w, h, isDown, area;
    cv = document.querySelector(target);
    ctx = cv.getContext("2d");
    function init(callback) {
        w = cv.width = opt.width || cv.offsetWidth;
        h = cv.height = opt.height || cv.offsetHeight;
        ctx.clearRect(0, 0, w, h);
        isDown = false;
        area = 0;
        complete = callback;

        // 绘制这个 canvas
        if (/#|rgb|rgba|hsl|hsla/.test(opt.front)) {
            ctx.fillStyle = opt.front;
        } else if (/jpg|jpeg|png|gif/i.test(opt.front)) {
            _drawImage(opt.front);
        }
    }

    function clear() {
        ctx.clearRect(0, 0, w, h);
    }

    // 加载图片，如果覆盖层是图片的话
    function _drawImage(imgURL) {
        var img = new Image();
        img.onload = function() {
            var radio = img.width / img.height;
            var newW = w, newH = w/radio;
            ctx.drawImage(img, 0, (h-newH)/2, newW, newH);
        }
        img.onerror = function() {
            alert(imgURL+' 图片加载失败了...');
        }
        img.src = imgURL;
    }

    var params = {};    // 存储位置数据

    $(cv).on("touchstart mousedown", function(e) {
        e.preventDefault();
        e.stopPropagation();
        isDown = true;
        if (e.type == 'touchstart') {e = e.targetTouches[0]}
        var posObj = cv.getBoundingClientRect();
        params.offsetLeft = posObj.left;
        params.offsetTop = posObj.top;
        params.startX = e.clientX - params.offsetLeft;
        params.startY = e.clientY - params.offsetTop;

        // 画圆改为画线
        ctx.lineWidth = opt.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.moveTo(params.startX, params.startY);
    });
    $(cv).on("touchmove mousemove", function(e) {
        e.preventDefault();
        if (!isDown) return;
        if (e.type == 'touchmove') {e = e.targetTouches[0]}
        ctx.globalCompositeOperation = "destination-out";
        var nowX = e.clientX - params.offsetLeft;
        var nowY = e.clientY - params.offsetTop;

        // 画圆改为画线
        ctx.lineTo(nowX, nowY);
        ctx.moveTo(nowX, nowY);
        ctx.fill();
        ctx.stroke();
    });
    $(cv).on("touchend mouseup", function() {
        isDown = false;
        ctx.globalCompositeOperation = "source-out";
        var data = ctx.getImageData(0, 0, w, h).data, area = 0;
        for(var i = 3, len = data.length; i < len; i += 4){
            if(data[i] === 0) area++;
        }
        if (area > w*h*0.5) {
            if (complete) complete(++area);
        }
    });

    return {
        init: init,
        clear: clear,
    }
}