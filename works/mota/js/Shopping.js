/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-8
 * Time: 下午1:40
 * To change this template use File | Settings | File Templates.
 *
 * 商店系统
 */

define(function(require, exports, module){

    module.exports = Shopping;

    function Shopping(){
        this.name = null;
        this.player = null;
        this.list = null;
        this.choose = null;
        this.type = "shopping";
    }

    Shopping.prototype = {
        start : function(o, p){
            mota._Debug.log("你进入了商店！",true);
            this.name = o.name;
            this.player = p;
            this.init();
        },
        end : function(){
            mota._Debug.log("你离开了商店！",true);
        },
        selectItem : function(direct){
            var list = this.list.find("li"),
                index = this.list.find(".selected").index();
            if(direct == "up" && index != 0){
                list.removeClass("selected").eq(index-1).addClass("selected");
            }
            if(direct == "down" && index != list.length-1){
                list.removeClass("selected").eq(index+1).addClass("selected");
            }
        },
        ok : function(){
            var player = this.player;
            if(this.name == "shop_m_l" || this.name == "shop_m_h" || this.name == "shop_key_sell" || this.name == "shop_key_buy"){
                if(this.name != "shop_key_buy"){
                    var need,
                        selected = this.list.find(".selected");
                    if(this.name == "shop_m_l")
                        need = 25;
                    if(this.name == "shop_m_h")
                        need = 100;
                    if(this.name == "shop_key_sell")
                        need = parseInt(selected.find("em").text());
                    if(player.money >= need){
                        this.choose = {
                            prototype : selected.attr("rel"),
                            value : parseInt(selected.find("span").text())
                        }
                        player.money -= need;
                        this.addPrototype();
                    }else{
                        mota._Debug.log("你的金币不足！",true);
                    }
                }else{
                    var selected = this.list.find(".selected"),
                        key = selected.attr("rel"),
                        value = parseInt(selected.find("span").text()),
                        money = parseInt(selected.find("em").text());
                    if(player[key] >=1){
                        player[key] -= value;
                        player.money += money;
                        player.refreshData();
                    }else{
                        mota._Debug.log("物品不足！",true);
                    }
                }
            }
            if(this.name == "shop_e_l" || this.name == "shop_e_h"){
                var selected = this.list.find(".selected"),
                    need = parseInt(selected.find("em").text());
                if(this.player.expe >= need){
                    if(selected.attr("rel") == "levelUp"){
                        var rank = parseInt(selected.find("span").text());
                        this.player.rank += rank;
                        this.player.health += rank*1000;
                        this.player.attack += rank*7;
                        this.player.defense += rank*7;
                        this.player.expe -= need;
                        this.player.refreshData();
                    }else{
                        this.choose = {
                            prototype : selected.attr("rel"),
                            value : parseInt(selected.find("span").text())
                        }
                        this.player.expe -= need;
                        this.addPrototype();
                    }
                }else{
                    mota._Debug.log("你的经验不足！",true);
                }
            }
        },
        init : function(){
            var shop_box = '<div class="shop_box">';
            if(this.name == "shop_m_l" || this.name == "shop_m_h"){
                var per = this.name == "shop_m_l" ? 25 : 100,
                    a = this.name == "shop_m_l" ? 800 : 4000,
                    b = this.name == "shop_m_l" ? 4 : 20;
                shop_box += '<div class="shop_h">如果你有' + per + '个金币，可以选择任意一项增加你的能力</div>'+
                    '<ul class="selectItem" id="selectItem">'+
                    '<li rel="health" class="selected">增加 <span>' + a +'</span> 点生命</li>'+
                    '<li rel="attack">增加 <span>' + b + '</span> 点攻击</li>'+
                    '<li rel="defense">增加 <span>' + b + '</span> 点防御</li>'+
                '</ul>';
            }
            if(this.name == "shop_e_l" || this.name == "shop_e_h"){
                var lv = this.name == "shop_e_l" ? 1 : 3,
                    per = this.name == "shop_e_l" ? 100 : 270,
                    a = this.name == "shop_e_l" ? 5 : 20,
                    b = this.name == "shop_e_l" ? 30 : 90;
                shop_box += '<ul class="selectItem" id="selectItem">'+
                    '<li rel="levelUp" class="selected">提升 <span>'+ lv +'</span> 级 （需要<em>'+ per +'</em>经验）</li>'+
                    '<li rel="attack">增加攻击 <span>'+ a +'</span> （需要<em>'+ b +'</em>经验）</li>'+
                    '<li rel="defense">增加防御 <span>'+ a +'</span> （需要<em>'+ b +'</em>经验）</li>'+
                '</ul>';
            }
            if(this.name == "shop_key_sell"){
                shop_box += '<ul class="selectItem" id="selectItem">'+
                    '<li rel="yellow_key" class="selected">购买 <span>1</span> 把黄钥匙 （$<em>10</em>）</li>'+
                    '<li rel="blue_key">购买 <span>1</span> 把蓝钥匙 （$<em>50</em>）</li>'+
                    '<li rel="red_key">购买 <span>1</span> 把红钥匙 （$<em>100</em>）</li>'+
                '</ul>';
            }
            if(this.name == "shop_key_buy"){
                shop_box += '<ul class="selectItem" id="selectItem">'+
                    '<li rel="yellow_key" class="selected">卖出 <span>1</span> 把黄钥匙 （$<em>7</em>）</li>'+
                    '<li rel="blue_key">卖出 <span>1</span> 把蓝钥匙 （$<em>35</em>）</li>'+
                    '<li rel="red_key">卖出 <span>1</span> 把红钥匙 （$<em>70</em>）</li>'+
                '</ul>';
            }
            shop_box += '</div>';
            $(shop_box).insertBefore($("#dialog_box .continue"));
            this.list = $("#selectItem");
        },
        addPrototype : function(){
            this.player[this.choose.prototype] += this.choose.value;
            this.player.refreshData();
        }
    };
});
