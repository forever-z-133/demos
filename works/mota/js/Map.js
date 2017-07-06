/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-3
 * Time: 下午10:10
 * To change this template use File | Settings | File Templates.
 *
 * 地图模块
 */

define(function(require, exports, module){
    var mapBox = $("#map");
    setInterval(function() {
    	$("#map").toggleClass("frame2");
    }, 500);

    module.exports = Map;

    function Map(){
        this.floorData = [];
    };

    Map.prototype = {
        init : function(f){
            var player = mota.player;
            var mapHtml = "";
            var currentFloorData = mota.data.map["floor_" + f];
            player.f = f;
            this.floorData[f] = [];
            for(var i = 0, len = currentFloorData.length; i < len; i++){
                this.floorData[f][i] = [];
                for(var j = 0, _len = currentFloorData[i].length; j < _len; j++){
                    var objCode = currentFloorData[i][j];
                    var objName = mota.data._map[objCode];
                    var o = mota[objName];
                    if(!!o){
                        var id = o.name == player.name ? "player" : o.id ? o.id : "";
                        var cn = o.name == player.name ? "block player_" + o.direct : "block " + o.name;
                        var x = j * 32;
                        var y = i * 32;
                        mapHtml += '<div id="' + id + '" class="' + cn + '" style="left:' + x + 'px;top:' + y + 'px"></div>';
                        this.floorData[f][i][j] = o;
                    }else{
                        this.floorData[f][i][j] = null;
                    }
                }
            }
            mapBox.html(mapHtml);
            player.refreshData();
            $(document).unbind().bind("keydown", mota.event._Player_Move);
        },

        clearObject : function(o){
            var player = mota.player;
            var f = player.f;
            var x = player.x;
            var y = player.y;
            mota.data.map["floor_" + f][y][x] = null;
            this.floorData[f][y][x] = null;
            $("." + o.name).each(function(){
                if($(this).css("left") == x * 32 + "px" && $(this).css("top") == y * 32 + "px")$(this).remove();
            })
        },

        upDatePlayerPosition : function(f, x, y){
            var player = mota.player;
            var floor_f = mota.data.map["floor_" + f];
            for(var i = 0, len = floor_f.length; i < len; i++){
                for(var j = 0, _len = floor_f[i].length; j < _len; j++){
                    if(floor_f[i][j] == player.id){
                        floor_f[i][j] = null;
                        this.floorData[f][i][j] = null;
                        break
                    }
                }
            }
            floor_f[x][y] = player.id;
            this.floorData[f][x][y] = player;
        },

        chooseFloor : function(arr){
            var list = "",
                index = 1;
            for(var f in mota.data.map){
                if(f != "updata_player_position"){
                    var _floor = parseInt(f.split("_")[1]),
                        isBeenTo = false;
                    for(var i=0; i<arr.length; i++)
                        if(_floor == arr[i])
                            isBeenTo = true;
                    var cn = index == mota.player.f ? "selected" : "";
                    list += '<li class="'+ cn +'" isBeenTo="'+ isBeenTo +'"><span>'+ _floor +'</span></li>';
                    index ++;
                }
            }
            var html = '<div class="dialog_box" style="margin-top:80px">'+
                '<div class="use_fzlp">'+
                '<h3>使用风之罗盘</h3>'+
                "<p>按 <span class='shopKey'>'&uarr;'</span> 和 <span class='shopKey'>'&darr;'</span> 选择你要去的楼层，按 <span class='shopKey'>'回车'</span> 确定。</p>"+
                '<ul id="floor_list" class="floor_list">'+ list +'</ul>'+
                '<div>'+
                '<div class="continue">按空格键取消...</div>'+
                '</div>';
            $(html).appendTo($("#pop_wrap"));
            mota._Debug.log("你打开了风之罗盘",true);
            $(document).unbind().bind("keydown", mota.event._Use_fzlp);
        },

        save : function(){
            //需要存储 1.地图数据 2.玩家数据 3.与NPC对话的索引
            mota.player.allowMove = true; //需要修复当玩家正处于对话、购物、战斗时候保存游戏时，重置玩家可移动
            var DATA = {
                map : mota.data.map,
                player : mota.player.getProperty(),
                dialogIndex : mota.data.dialog_index
            };
            mota.localSave.setItem('mota_localStorage', JSON.stringify(DATA));
        },

        load : function(){
            this.clear();
            var record = mota.localSave['mota_localStorage'];
            if(record){
                var DATA = JSON.parse(record);
                var player = DATA.player;
                mota.data.map = DATA.map;
                for(var pro in player){
                    mota.player[pro] = player[pro];
                }
                mota.data.dialog_index = DATA.dialogIndex;
                mapBox.empty();
                this.init(DATA.player.f);
            }else{
                alert("尚无游戏记录！");
            }
        },

        clear : function(){
            $(".dialog_box,.fighting_box,.shop_box").remove();
        }
    }
});