/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-4
 * Time: 下午10:13
 * To change this template use File | Settings | File Templates.
 *
 * 事件模块
 */

define(function(require, exports, module){

    module.exports = {

        //玩家移动
        _Player_Move : function(e){
            var _Player = mota.player;
            var kv = e.keyCode;
            if(kv == 37 ){ //向左
                _Player.move("left");
                return false;
            }else if(kv == 39){  //向右
                _Player.move("right");
                return false;
            }else if(kv == 38){  //向上
                _Player.move("up");
                return false;
            }else if(kv == 40){  //向下
                _Player.move("down");
                return false;
            }else if(kv == 76 ){ //查看怪物属性
                if(_Player.items.sgh)  //必须要有圣光徽
                    mota.dialog.viewEnemyInit(_Player.f);
                return false;
            }else if(kv == 74 ){ //跳跃楼层
                if(_Player.items.fzlp)  //必须要有风之罗盘
                    if(_Player.f == 22)
                        mota.dialog.showMessage("很不幸，本层被魔咒笼罩着，风之罗盘失效了。");
                    else
                        mota.map.chooseFloor(_Player.f_arr);
                return false;
            }
        },

        /****************************
         *	对话事件
         *	@param o : 对话的npc
         * 	@param p : 玩家
         ****************************/
        EventDialog : function(o, p){
            //mota.dialog = new Dialog(o,p);
            mota.dialog.start(o, p);
        },

        /****************************
         *	上下楼事件
         *	@param d : 楼梯方向
         * 	@param p : 玩家
         ****************************/
        EventStairs : function(d , p){
            var m = mota.map.floorData["floor_" + p.f],
                upp = mota.data.map["updata_player_position"][p.f];
            mota.map.upDatePlayerPosition(p.f , upp[d].y , upp[d].x); //更新上一次所在楼层中玩家的位置
            if(d == "go_up"){  //上楼
                p.f ++;
                var isBeenTo = false;
                for(var i=0; i<p.f_arr.length; i++)
                    if(p.f == p.f_arr[i])   //需要判断是否已经去过该楼层
                        isBeenTo = true;
                if(!isBeenTo)
                    p.f_arr.push(p.f);
            }else if(d == "go_down"){  //下楼
                p.f --;
            }
            mota._Debug.log("你来到了第" + p.f + "层！")
            mota.map.init(p.f);
        },

        /****************************
         *	战斗事件
         *	@param e : 怪物
         * 	@param p : 玩家
         ****************************/
        EventFighting : function(o , p){
            mota.fighting.init(o,p);
        },

        /****************************
         *	购物事件
         *	@param s : 商店名
         * 	@param p : 玩家
         ****************************/
        EventShopping : function(s , p){
            mota.shopping.start(s, p);
        },

        //对话中
        _Dialog_ing : function(e){
            var kv = e.keyCode;
            if(kv == 32 ){ //按空格继续
                mota.dialog.next();
            }
        },

        //提示信息
        showMessage_close : function(e){
            var kv = e.keyCode;
            if(kv == 32 ){ //按空格继续
                mota.dialog.close();
                return false;
            }
        },

        //战斗结束
        _Fight_end : function(e){
            var kv = e.keyCode;
            if(kv == 32 ){ //按空格继续
                mota.fighting.complete();
                return false;
            }
        },

        //购物
        _Shop_ing : function(e){
            var kv = e.keyCode;
            if(kv == 32 ){ //按空格继续 取消购物
                mota.dialog.close();
                mota.shopping.end();
                return false;
            }else if(kv == 38){  //向上移动选框
                mota.shopping.selectItem("up");
                return false;
            }else if(kv == 40){  //向下移动选框
                mota.shopping.selectItem("down");
                return false;
            }else if(kv == 13){  //按回车 确定购买所选物品
                mota.shopping.ok();
                return false;
            }
        },

        //使用风之罗盘跳跃楼层
        _Use_fzlp : function(e){
            var _Player = mota.player;
            var kv = e.keyCode;
            if(kv == 32 ){ //按空格继续 取消跳跃
                mota.dialog.close();
                _Player.Choose_end();
                return false;
            }else if(kv == 38){  //选择上一层
                _Player.Choose_floor("up");
                return false;
            }else if(kv == 40){  //选择下一层
                _Player.Choose_floor("down");
                return false;
            }else if(kv == 13){  //按回车 确定跳跃
                _Player.Go_floor();
                return false;
            }
        }
    }
});