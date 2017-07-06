/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-4
 * Time: 下午10:48
 * To change this template use File | Settings | File Templates.
 *
 * 对话模块
 */

define(function(require, exports, module){

    module.exports = Dialog;

    function Dialog(){
        this.obj = null;
        this.player = mota.player || null;
        this.$_obj = null;
        this.box = $("#pop_wrap");
        this.sindex = 0;  //对话序列索引
    }

    Dialog.prototype = {
        start : function(o , p){
            this.obj = o;
            this.player = p;
            this.$_obj = $("#" + o.id);
            mota.player.allowMove = false ;
            var i = mota.data.dialog_index[this.obj.id]["dialog_index"];
            var direct = this.obj.option["dialog_direct"];
            this.show(this.obj.option["dialog_" + i] , this.sindex , direct);
            if(this.obj.name == "shop_m_l" || this.obj.name == "shop_m_h" || this.obj.name == "shop_e_l" || this.obj.name == "shop_e_h" || this.obj.name == "shop_key_sell" ||this.obj.name == "shop_key_buy"){ //触发购物
                mota.event.EventShopping(this.obj , this.player);
                $(document).unbind().bind("keydown", mota.event._Shop_ing);
            }else{  //普通对话
                $(document).unbind().bind("keydown", mota.event._Dialog_ing);
            }
        },
        close : function(){
            this.box.empty();
            mota.player.allowMove = true;
            $(document).unbind().bind("keydown", mota.event._Player_Move);
        },
        next : function(){
            this.box.empty();
            this.sindex ++ ;
            var i = mota.data.dialog_index[this.obj.id]["dialog_index"],
                textArray = this.obj.option["dialog_"+i];
            if(this.sindex == textArray["text"].length){
                var dialogData = mota.data["dialog_index"];
                this.close();
                if(this.obj.id == "angle" && mota.data.dialog_index[this.obj.id]["dialog_index"] == 1){  //如果对话对象是仙子并且是首次对话 对话完需要将仙子位置更新
                    var l = parseInt($("#angle").css("left"));
                    //var floor_f = _Map["floor_" + mota.player.f];
                    $("#angle").css("left",l-32+"px");
                    //console.log(mota.data.map[mota.player.y-1][mota.player.x]);
                    mota.data.map["floor_" + mota.player.f][mota.player.y-1][mota.player.x] = 100;
                    mota.data.map["floor_" + mota.player.f][mota.player.y-1][mota.player.x-1] = mota.angle.objCode;
                }
                if(this.obj.id == "smlr_03" && dialogData[this.obj.id]["dialog_index"] == 1){  //03层神秘老人
                    mota._Debug.log("你获得了物品：<em>【钢剑】</em>攻击力提升了 <em>70</em>",true);
                }
                if(this.obj.id == "sr_03" && dialogData[this.obj.id]["dialog_index"] == 1){  //03层商人
                    mota._Debug.log("你获得了物品：<em>【钢盾】</em>防御力提升了 <em>30</em>",true);
                }
                if(this.obj.id == "smlr_16" && dialogData[this.obj.id]["dialog_index"] == 2){  //16层神秘老人
                    mota._Debug.log("你获得了物品：<em>【圣光剑】</em>攻击力提升了 <em>120</em>",true);
                }
                if(this.obj.id == "sr_16" && dialogData[this.obj.id]["dialog_index"] == 2){  //16层神秘商人
                    mota._Debug.log("你获得了物品：<em>【星光盾】</em>防御力提升了 <em>120</em>",true);
                }
                if(textArray["condition"] == null){  //如果触发下一对话无条件的
                    mota.data.dialog_index[this.obj.id]["dialog_index"] += 1;  //变更对话段落索引
                }else{ //否则判断玩家是否满足条件
                    var _item = textArray["condition"];
                    var _player = this.player;
                    if(_player.items[_item]){
                        dialogData[this.obj.id]["dialog_index"] += 1;  //变更对话段落索引;
                    }else{
                        if(_player[_item] >= textArray["value"]){
                            _player[_item] -= textArray["value"];
                            dialogData[this.obj.id]["dialog_index"] += 1;
                        }
                    }
                }
                if(this.obj.option["dialog_"+i]["jiangli"]){  //如果对话结束有奖励
                    var jiangli = this.obj.option["dialog_"+i]["jiangli"];
                    if(jiangli["type"] == "changeMap"){
                        var f = jiangli["pro"].f;
                        var x = jiangli["pro"].x;
                        var y = jiangli["pro"].y;
                        mota.data.map["floor_" + f][y][x] = null;
                        mota.map.floorData[f][y][x] = null;
                        mota._Debug.log("第 <em>"+ f +"</em> 层的门已经开启了！",true);
                    }else if(jiangli["type"] == "powerUp"){
                        for(var pro in jiangli["pro"]){
                            mota.player[pro] *= jiangli["pro"][pro];
                            mota.player[pro] = Math.ceil(mota.player[pro]);
                        }
                        mota._Debug.log("你的能力得到了提升，生命、攻击、防御各增加了三分之一。",true);
                    }else{
                        for(var pro in jiangli["pro"]){
                            mota.player[pro] += jiangli["pro"][pro];
                            if(jiangli["type"] == "items")
                                mota._Debug.log("你获得了物品："+"<em>【"+mota.data.item[pro]["CH_name"]+"】</em>",true);
                        }
                    }
                    mota.player.refreshData();
                }
            }else{
                var direct = this.obj.option["dialog_direct"];
                this.show(textArray , this.sindex , direct);
            }
        },
        show : function(data , index , direct) {
            var text = data["text"];
            var py, px;
            py = mota.player.y * 32;
            px = mota.player.x * 32;
            var oy = parseInt(this.$_obj.css("top")),
                ox = parseInt(this.$_obj.css("left"));
            var speaker = text[index].figure == "player" ? mota.player.name : text[index].figure;
            if (direct == "down") {
                var y = text[index].figure == "player" ? py + 32 + 6 : oy + 32 + 6,
                    x = text[index].figure == "player" ? px + 11 : ox + 11;
                var dialog_box = '<div id="dialog_box" class="dialog_box" style="top:' + y + 'px">' +
                    '<p><strong>' + speaker + '</strong>&nbsp;:&nbsp;' + text[index].text + '</p>' +
                    '<div class="continue">按空格键继续...</div>' +
                    '<em class="dialog_arrow_down" style="left:' + x + 'px"></em>' +
                    '</div>';
            } else {
                var y = text[index].figure == "player" ? 352 - py + 6 : 352 - oy + 6,
                    x = text[index].figure == "player" ? px + 11 : ox + 11;
                var dialog_box = '<div id="dialog_box" class="dialog_box" style="bottom:' + y + 'px">' +
                    '<p><strong>' + speaker + '</strong>&nbsp;:&nbsp;' + text[index].text + '</p>' +
                    '<div class="continue">按空格键继续...</div>' +
                    '<em class="dialog_arrow_up" style="left:' + x + 'px"></em>' +
                    '</div>';
            }
            this.box.html(dialog_box);
        },
        showMessage : function(msg){
            var html = '<div class="dialog_box" style="margin-top:142px">' +
                           '<div class="showMessage">' +
                               '<strong>' + msg + '</strong>' +
                           '<div>' +
                           '<div class="continue">按空格键继续...</div>' +
                       '</div>';
            $(html).appendTo(this.box);
            $(document).unbind().bind("keydown",mota.event.showMessage_close);
        },
        viewEnemyInit : function(f){
            //获取到所有敌人
            var enemyArr = [],
                tmp = mota.map.floorData[f];
            for(var i = 0, len = tmp.length; i < len; i++)
                for(var j = 0, _len = tmp[i].length; j < _len; j++){
                    if(!!tmp[i][j] && !!tmp[i][j].type && tmp[i][j].type == "enemy")
                        enemyArr.push(tmp[i][j])
                }
            //将重复敌人删除
            var temp = [];
            if(enemyArr.length > 0)temp[0] = enemyArr[0];
            for(var i=0; i<enemyArr.length; i++){
                var flag = false;
                for(var k=0; k<temp.length; k++)
                    if(enemyArr[i] == temp[k])
                        flag = true;
                if(!flag)
                    temp.push(enemyArr[i])
            }
            //如果当前层有敌人 则可以查看
            if(temp.length > 0)this.viewEnemyPrototype(temp);
        },
        viewEnemyPrototype : function(arr){
            //查找出每种敌人的属性
            var tr = "";
            for(var i = 0, len = arr.length; i < len; i++){
                var result = mota.fighting.getFightingResult(arr[i], mota.player);
                var loss = result.loss;
                var name = arr[i].name;
                var enemyData = mota.data.monster[name];
                tr += '<tr>' +
                    '<td><div class="block ' + name + '"></div></td>' +
                    '<td>' + enemyData["values"].health + '</td>' +
                    '<td>' + enemyData["values"].attack + '</td>' +
                    '<td>' + enemyData["values"].defense + '</td>' +
                    '<td>' + enemyData["win"].money + '</td>' +
                    '<td>' + enemyData["win"].expe + '</td>' +
                    '<td>' + loss + '</td>' +
                '</tr>';
            }
            var html = '<div class="dialog_box">' +
                '<div class="viewEnemyPrototype">' +
                    '<div class="enemyTable">' +
                        '<table width="100%">' +
                            '<tr>' +
                            '<th>怪物名称</th>' + '<th>生命</th>' + '<th>攻击</th>' + '<th>防御</th>' + '<th>金钱</th>' + '<th>经验</th>' + '<th>损失</th>' +
                            '</tr>' +
                            tr +
                        '</table>' +
                    '</div>' +
                '<div>' +
                '<div class="continue">按空格键继续...</div>' +
            '</div>';
            $(html).appendTo(this.box);
            $(document).unbind().bind("keydown", mota.event.showMessage_close);
        }
    }


});