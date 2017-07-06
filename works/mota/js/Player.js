/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-2
 * Time: 下午10:41
 * To change this template use File | Settings | File Templates.
 *
 * 玩家模块
 */

define(function(require, exports, module){
    var Dialog = require('Dialog');

    module.exports = Player;

    function Player(name){
        this.id = 101;
        this.name = name;  //玩家名字
        this.direct = "up";  //玩家方向
        this.x = 10; //玩家x坐标 初始值可以任意
        this.y = 10; //玩家y坐标 初始值可以任意
        this.allowMove = true;
        this.f = 0; //玩家所处楼层
        this.f_arr = [1];  //存储玩家所去过的楼层 初始存入第一层
        this.rank = 1; //玩家等级
        this.health = 1000; //玩家生命
        this.money = 0; //玩家金钱
        this.attack = 10; //玩家攻击力
        this.defense = 10; //玩家防御力
        this.expe = 0; //玩家经验值
        this.yellow_key = 3; //玩家拥有的黄钥匙
        this.blue_key = 1; //玩家拥有的蓝钥匙
        this.red_key = 1; //玩家拥有的红钥匙
        //this.moveSpeed = 100; //玩家移动速度 暂时关闭移动动画

        //以下是隐藏的属性
        this.specialPrototype = {
            crit : 0.05,
            lucky : 0.1
        }

        //玩家拥有的物品
        this.items = {

        };
    }

    Player.prototype = {
        setPosition : function(x , y){
            this.x = x;
            this.y = y;
        },
        move : function(direct){
            this.direct = direct;
            if(this.allowMove){
                var player = $("#player"),
                    cssDirect = null,
                    cssStep = null;
                player.attr("class","block player_" + direct);
                var _left = parseInt(player.css("left")),
                    _top = parseInt(player.css("top"));
                if(direct == "left"){
                    _left -= 32;
                    cssDirect = "left";
                    cssStep = _left;
                }
                if(direct == "right"){
                    _left += 32;
                    cssDirect = "left";
                    cssStep = _left;
                }
                if(direct == "up"){
                    _top -= 32;
                    cssDirect = "top";
                    cssStep = _top;
                }
                if(direct == "down"){
                    _top += 32;
                    cssDirect = "top";
                    cssStep = _top;
                }
                var x = _left/32,
                    y = _top/32,
                    s = this.moveStatus(x,y);
                if(s.canMove){
                    player.css(cssDirect , cssStep + "px");
                    this.setPosition(x,y);
                }else{
                    this.action(s.obj);
                }
            }
        },
        moveStatus : function(x , y){
            var x = x,
                y = y;
            if(x >= 0 && x <= 10 && y >= 0 && y <= 10){
                var objCode = mota.data.map["floor_" + this.f][y][x];  //获取到地图对象代号
                var o = mota[mota.data._map[objCode]];  //通过代号映射获取到真实对象
                //console.log(o);
                if(o == null || o.name == mota.player.name) //无障碍和玩家位置
                    return { canMove : true }
                if(o.type == "barrier") //墙、火、星空等其他障碍物
                    return { canMove : false , obj : "limit" }
                return { canMove : false , obj : o }
            }
            return { canMove : false , obj : "limit" }  //超出地图界限
        },
        action : function(o){
            if(o == "limit"){
                return
            }else{
                var name = o.name;
                var type = o.type;
                switch(type){
                    case "stair":
                        mota.event.EventStairs(name,mota.player);
                        break;
                    case "item":
                        this.changePosition(this.direct);
                        this.addPrototype(o);
                        o.remove();
                        break;
                    case "door":
                        if((this[o.options["need"]] > 0 || !o.options["need"]) && (o.name != "gold_door")){  //拥有钥匙 或者 不需要条件，但是黄金门除外
                            if(name != "fence")this.addPrototype(o);
                            this.changePosition(this.direct);
                            o.remove();
                        }else{
                            return
                        }
                        break;
                    case "npc":
                        mota.dialog = new Dialog();
                        mota.event.EventDialog(o,mota.player);
                        break;
                    case "enemy":
                        mota.event.EventFighting(o,mota.player);
                        break;
                    default: return;
                }
            }
        },
        changePosition : function(direct){
            var player = $("#player");
            var d = direct;
            var _left = parseInt(player.css("left"));
            var _top = parseInt(player.css("top"));
            if(direct == "left" || direct == "right"){
                d = "left";
                _left = direct == "left" ? _left - 32 : _left + 32;
                player.css(d , _left + "px");
            }
            if(direct == "up" || direct == "down"){
                d = "top";
                _top = direct == "up" ? _top - 32 : _top + 32;
                player.css(d , _top + "px");
            }
            var x = _left / 32;
            var y = _top / 32;
            this.setPosition(x,y);
        },
        addPrototype : function(o){
            var prototype = o.type == "enemy" ? o.option.win : mota.data[o.type][o.name]["values"];
            if(prototype == "item"){
                this.items[o["name"]] = true;
            }else if(o.name == "ssp"){  //特殊物品： 圣水瓶
                this.health *= 2;
            }else{
                for(var pro in prototype){
                    this[pro] += prototype[pro];
                }
            }
            this.refreshData();
        },
        clone : function(){
            var newObj = {};
            for(var p in this){
                newObj[p] = this[p];
            }
            return newObj;
        },
        refreshData : function(){
            $("#floor_index").text(this.f);
            $("#player_rank").text(this.rank);
            $("#player_health").text(this.health);
            $("#player_money").text(this.money);
            $("#player_attack").text(this.attack);
            $("#player_defense").text(this.defense);
            $("#player_expe").text(this.expe);
            $("#yellow_key").text(this.yellow_key);
            $("#blue_key").text(this.blue_key);
            $("#red_key").text(this.red_key);
        },
        Choose_floor : function(direct){
            var list = $("#floor_list"),
                li = list.find("li"),
                index = list.find(".selected").index();
            if(direct == "up" && index != 0){
                li.removeClass("selected").eq(index-1).addClass("selected");
            }
            if(direct == "down" && index != li.length-1){
                li.removeClass("selected").eq(index+1).addClass("selected");
            }
        },
        Choose_end : function(){
            mota._Debug.log("你取消了使用风之罗盘！",true);
        },
        Go_floor : function(){
            var selected = $("#floor_list").find(".selected"),
                choose_f = parseInt(selected.text())
            isBeenTo = selected.attr("isBeenTo");
            if(isBeenTo == "true"){
                this.f = choose_f;
                mota.map.init(choose_f);
                this.refreshData();
                mota._Debug.log("你使用风之罗盘来到了第 "+ choose_f +" 层！",true);
            }else{ //选择的楼层未到达则跳跃至当前楼层
                mota._Debug.log("由于你尚未到达过 "+ choose_f +" 层，风之罗盘将你送回了第 "+ this.f +" 层",true);
                mota.map.init(this.f);
            }
            mota.dialog.close();
        },
        getProperty : function(){
            var property = {};
            for(var pro in this){
                if(typeof this[pro] !== "function")
                    property[pro] = this[pro];
            }
            return property;
        }
    }
});