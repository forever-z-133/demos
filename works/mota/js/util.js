/**
 * Created by JetBrains PhpStorm.
 * Author: Devin.Chen
 * Date: 10/12/12
 * Time: 10:04 AM
 * To change this template use File | Settings | File Templates.
 *
 * 公用方法
 */

define(function(require, exports, module){

    module.exports = {

        /**
         * 创建命名空间
         * @param name 命名空间
         * @param container 指定被包含在某个命名空间下（可选）
         */
        namespace : function(name, container){
            var ns = name.split('.'), o = container || window, i, len;
            for (i = 0, len = ns.length; i < len; i++) {
                o = o[ns[i]] = o[ns[i]] || {};
            }
            return o;
        },

        localStore : function(){
            return window.localStorage || false;
        },

        /**
         * 获取指定参数值
         * @param param 要获取的参数
         */
        getQuerySting : function(param){
            var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)"),
                r = window.location.search.substr(1).match(reg);
            return r && unescape(r[2]) || null;
        },

        /**
         * 获取浏览器极其版本
         * 返回-1表示未知
         */
        getBrowser : function(){
            if(navigator.appName === "Microsoft Internet Explorer"){
                var version = navigator.appVersion;
                return "IE" + version.charAt(22);
            }else{
                var str = navigator.userAgent;
                if(str.indexOf("Firefox") > 0){
                    return str.substr(str.indexOf("Firefox"),str.length);
                }else if(str.indexOf("Chrome") > 0 && str.indexOf("Safari") > 0){
                    return str.substr(str.indexOf("Chrome"),str.length-str.indexOf("Safari"));
                }else if(str.indexOf("Safari") > 0){
                    return str.substr(str.indexOf("Safari"),str.length);
                }else{
                    return -1;
                }
            }
        },

        /*--------------以下方法均基于jquery,使用前需载入jquery库-------------*/
        /**
         * 图片预加载
         * @param url 图片地址
         * @param callback 加载完成回调
         */
        $preloadImage : function(url, callback){
            $("<img/>").attr("src", url).load(function(){
                callback && typeof(callback) === "function" && callback();
            });
        },

        /**
         * 开启或禁用鼠标右键菜单
         * @param flag
         */
        $setContextmenu : function(flag){
            if(typeof(flag) !== 'boolean')return;
            $(document).bind('contextmenu',function(){
                return flag;
            })
        },

        /**
         * 错误信息提示
         * @param msg 显示的内容
         */
        $showError : function(msg){
            console.log(msg);
        },

        $toggleDebug : function(){
            $("#toggle").toggleClass("toggle_off");
            $(".debug").slideToggle(200);
        }

    };
})