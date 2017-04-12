function PostMessage(id, options) {
    var dom = document.querySelector(id);
    var win = dom && dom.contentWindow || window.parent;
    var url = dom && dom.src || '*';
    var isFrame = window.top != window.self;

    function _reset() {
        win = dom && dom.contentWindow || window.parent;
        url = dom && dom.src || '*';
    }

    // 发送信息
    function _send(value) {
        win.postMessage(value, url);
    }

    // 接受信息
    var fn = null;
    function _get(_fn) {
        if (_fn) fn = _fn;
    }

    // 监听信息接受
    window.addEventListener('message', function(e){
        // console.log(e.source);  // 发送方
        // console.log(e.target);  // 接收方

        // 子级 iframe 只接受父级的消息，不接受同级 iframe 的消息
        if(isFrame && e.source != window.parent) return;

        // 父级只接受已绑定的 iframe 发送的消息
        if (!isFrame && e.source != win) return;

        fn && fn(e);
    }, false);

    return {
        send: _send,
        get: _get,
        reset: _reset,
    }
}