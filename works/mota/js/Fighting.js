/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-8
 * Time: 上午11:17
 * To change this template use File | Settings | File Templates.
 *
 * 战斗系统
 */

define(function(require, exports, module){

    module.exports = Fighting;

    function Fighting(){
        this.obj = null;
        this.player = null;
        this.box = $("#pop_wrap");
        this.timer = null;
        this.fightSpeed = 500;
    }

    Fighting.prototype = {
        init : function(o, p){
            this.obj = o;
            this.player = p;
            if(this.getFightingResult(this.obj, this.player).isWin){
                $('<div class="fighting_box" id="fighting_box"></div>').appendTo(this.box);
                var box = $("#fighting_box"),
                    player = this.player,
                    enemy = this.obj;
                var html = '<div class="ft">'+
                    '<div class="fplayer">'+
                    '<div class="block player_down">'+'</div>'+
                    '<div class="row"><span>生命：</span><span id="ph">'+player.health+'</span></div>'+
                    '<div class="row"><span>攻击：</span>'+player.attack+'</div>'+
                    '<div class="row"><span>防御：</span>'+player.defense+'</div>'+
                    '</div>'+
                    '<div class="fenemy">'+
                    '<div class="block '+this.obj.name+'">'+'</div>'+
                    '<div class="row"><span id="eh">'+enemy.health+'</span><span>：生命</span></div>'+
                    '<div class="row">'+enemy.attack+'<span>：攻击</span></div>'+
                    '<div class="row">'+enemy.defense+'<span>：防御</span></div>'+
                    '</div>'+
                    '<div class="fvs">VS</div>'+
                    '</div>'+
                    '<div class="fc">'+
                    '<p id="fc_p">战斗中...</p>'+
                    '<div class="fend" id="fend" style="display:none">'+
                    '<div class="continue">按空格键继续...</div>'+
                    '</div>'+
                    '</div>';
                box.html(html).show(200 , this.start());
                this.player.allowMove = false;
                $(document).unbind();
            }else{
                mota.dialog.showMessage("您暂时不是怪物的对手，请抓紧修炼！")
            }
        },
        start : function(){
            mota._Debug.log("你碰到了" + "<span>【" + this.obj.option["CH_name"] + "】</span>" + ",战斗开始!");
            this.fight();
        },
        end : function(){
            clearInterval(this.timer);
            $("#fc_p").html("战斗结束！");
            $("#fend").show();
            mota._Debug.log("战斗胜利，你获得了" + "<strong> " + this.obj.option["win"].expe + " </strong>点经验和 <strong>" + this.obj.option["win"].money + "</strong> 个金币。", true);
            this.player.addPrototype(this.obj);
            $(document).bind("keydown", mota.event._Fight_end);
        },
        complete : function(){
            var player = this.player;
            this.box.empty();
            player.changePosition(player.direct);
            player.refreshData();
            player.allowMove = true;
            mota.map.clearObject(this.obj);
            $(document).unbind().bind("keydown", mota.event._Player_Move);
        },
        fight : function(){
            this.timer = setInterval(gogo , this.fightSpeed);
            var _that = this;
            var enemy = this.obj.clone();
            var player = this.player;
            var pa = player.attack;
            var pd = player.defense;
            var ea = enemy.attack;
            var ed = enemy.defense;
            function gogo(){  //战斗排序是以玩家为先手
                var eh = $("#eh");
                enemy.health -= pa - ed > 0 ? pa - ed : 0 ;
                eh.html(enemy.health);
                if(enemy.health <= 0){
                    eh.html(0);
                    _that.end();
                    return
                }
                player.health -= ea - pd > 0 ? ea - pd : 0 ;
                $("#ph").html(player.health);
            }
        },
        getFightingResult : function(o, p){
           return fightingTest(o, p);
        }
    };

    //私有方法 : 测试战斗结果
    function fightingTest(o, p){
        var enemy = o.clone();
        var player = p.clone();
        var lossHealth = 0;
        var pa = player.attack;
        var pd = player.defense;
        var ea = enemy.attack;
        var ed = enemy.defense;
        function gogo(){  //战斗排序是以玩家为先手
            enemy.health -= pa - ed > 0 ? pa - ed : 0 ;
            if(enemy.health <= 0){
                return { isWin : true , loss : lossHealth};
            }
            if(player.health <= 0){
                return { isWin : false , loss : "???"};
            }
            player.health -= ea - pd > 0 ? ea - pd : 0 ;
            lossHealth += ea - pd;
            return gogo(); //递归 继续下一回合
        }
        return gogo();
    }
});