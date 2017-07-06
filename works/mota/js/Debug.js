/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-4
 * Time: 下午9:46
 * To change this template use File | Settings | File Templates.
 *
 * 游戏事件信息输出
 */

define(function(require, exports, module){
    var box = $("#debug");

    module.exports = {
        log : function(msg , type){  //游戏信息面板输出当前游戏总时间（以实际时间计算秒数）
            var st = mota._T.getSecond();
            var h = Math.floor(st/3600),
                m = st > 3600 ? Math.floor((st%3600)/60) : Math.floor(st/60),
                s = st > 60 ? st%60 : st;
            var d = Math.floor(h/24);
            h = h > 24 ? h%24 : h;
            h = h < 10 ? "0"+h : h;
            m = m < 10 ? "0"+m : m;
            s = s < 10 ? "0"+s : s;
            var timerTip = type == true ? "<span>" + msg + "</span>" : "<strong>第" + d + "天" + h + "时" + m + "分" + s + "秒：</strong><br>" + msg;
            $("<p>" + timerTip + "</p>").prependTo(box);
        },
        Timer : function(){
            var _T = null;
            var second = 0;
            var gogo = function(){
                second ++ ;
            }
            this.run = function(){
                _T = setInterval(gogo , 1000);
            }
            this.stop = function(){
                clearInterval(_T);
            }
            this.getSecond = function(){
                return second;
            }
        }
    }

    module.exports.Timer.clock = null;
});
