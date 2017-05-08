function newGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}
function hashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
(function ($) {
    var InitParam = function () {
        var main = {
            params: {
                Domain :window.location.host || '',
                Url :window.location.href || '',
                Title:document.title || '',
                Referrer :document.referrer || '',
                CaseGuid:""
            },
            MaskEvent: [],
            shortStorage:window.sessionStorage,
            longStorage:window.localStorage,
            VisitId:"",
            PageId:"",
        };

        main.InitRecord = function () {
            // 用户唯一标识
            if(main.longStorage.getItem("GuidKdc")){
                main.params.UserGuid = main.longStorage.getItem("GuidKdc");
            }
            else{
                var UserGuid = newGuid();
                main.longStorage.setItem("GuidKdc",UserGuid);
                main.params.UserGuid = UserGuid;
            }
            var json = JSON.stringify(main.params);

            // 访问记录编号，后台给
            if (!main.shortStorage.getItem("vId")){
                //记录初次访问信息
                $.getJSON("http://htmlcase.kdcer.com/api/applet/GetStatistics?objJson="+ json,function(data){
                    main.VisitId = parseInt(data);
                    main.shortStorage.setItem("vId", main.VisitId);
                });
            }else{
                main.VisitId = main.shortStorage.getItem("vId");
            }

            // 本页唯一标识
            main.PageId = Math.abs(hashCode(main.params.Url));

            // 绑定事件
            main.SaveEvent(main.MaskEvent);

            // 定时请求保存
            window.setInterval(main.PageTime, 5000);
        };

        // 记录与请求保存本站停留时间
        main.PageTime = function(){
            // 更新停留时间 session
            if (main.shortStorage.getItem("ssTime")){
                var oldtime = parseInt(main.shortStorage.getItem("ssTime"));
                main.shortStorage.setItem("ssTime",oldtime+5000);
            }
            else
                main.shortStorage.setItem("ssTime",5000)

            // 请求保存
            var obj ={
                VisitId:main.VisitId,
                PageId:main.PageId,
                VisitTime:main.shortStorage.getItem("ssTime"),
                Url:window.location.href,
                Title:document.title,
                EventJson:main.shortStorage.getItem("event") || ''
            };
            var json = JSON.stringify(obj);
            if(main.shortStorage.getItem("event"))
                $.getJSON("http://htmlcase.kdcer.com/api/applet/GetStatistDetail?objJson="+ json,function(data){
                    main.shortStorage.removeItem("event");
                });
        }

        // 记录与请求保存用户操作
        // event:[{className,eventType,detail}]
        main.SaveEvent = function(event){
            var e = event || [];
            var btn = [];
            if(e.length > 0){
                for(var i in e){
                    (function(i){
                        // 绑定事件
                        btn[i] = document.querySelector(e[i].IdName); 
                        btn[i] && btn[i].addEventListener(e[i].EventType,function(){
                            var recordJson = [];    // 操作记录

                            // 新建记录
                            if(!main.shortStorage.getItem("event")){
                                var obj = {
                                    IdName:e[i].IdName,
                                    EventType:e[i].EventType,
                                    Detail:e[i].Detail,
                                    Count:1
                                };
                                recordJson.push(obj);
                                main.shortStorage.setItem("event",JSON.stringify(recordJson));
                            }
                            // 添加记录
                            else{
                                var eventJson = JSON.parse(main.shortStorage.getItem("event"));

                                // 遍历判断，如果重复就合并
                                var flag = false;
                                for(var y in eventJson){
                                    if(eventJson[y].IdName == e[i].IdName && eventJson[y].EventType == e[i].EventType){
                                        eventJson[y].Count ++;
                                        flag = true;
                                    }
                                    recordJson.push(eventJson[y]);
                                }
                                if(!flag){
                                    var obj = {
                                        IdName:e[i].IdName,
                                        EventType:e[i].EventType,
                                        Detail:e[i].Detail,
                                        Count:1
                                    };
                                    recordJson.push(obj);
                                }
                                main.shortStorage.setItem("event",JSON.stringify(recordJson));
                            }
                        });
                    })(i)
                }
            }
        }
        return main;
    }
    var methods = {
        init: function (sParams) {
            var Params = $.extend(true, new InitParam(), sParams);
            this.data("main", Params);
            Params.InitRecord.call(this)
        },
        empty: function(){

        }
    };
    $.fn.Record = function (sParams) {
        if (!this.length) return this;
        var p, r = []; //输入参数与返回值
        if (methods[sParams]) {
            p = Array.prototype.slice.call(arguments, 1);//后续参数截取出，送入调用函数
            this.each(function () { r.push(methods[sParams].apply($(this), p)); });
        } else if (typeof sParams === 'object' || !sParams) {
            p = arguments; //直接将参数送入，因为调用的是默认方法
            this.each(function () { r.push(methods.init.apply($(this), p)); });
        } else {
            $.error('方法 ' + sParams + ' 无效！');
        }
        if (r.length && r.length == 1)
            return r[0];
        else
            return r;
    }
})(jQuery);