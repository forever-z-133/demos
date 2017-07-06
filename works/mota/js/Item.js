/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-3
 * Time: 下午9:20
 * To change this template use File | Settings | File Templates.
 *
 * 道具
 */

define(function(require, exports, module){

    module.exports = Item;

    function Item(name, options, id){
        this.name = name;
        this.options = options;
        this.itemId = id || this.name;
        this.type = "item";
    }

    Item.prototype.remove = function(){
        var itemHtml = "<em>【" + this.options.CH_name + "】</em>";
        mota.map.clearObject(this);
        mota._Debug.log("你获得了物品：" + itemHtml, true);
        if(this.name == "sgh")
            mota.dialog.showMessage("你拿到了" + itemHtml + " ，该宝物可以允许你查看怪物属性，并计算出你打败怪物所损耗的生命值。现在可以按 '<span class='shopKey'>L</span>' 键查看怪物属性。");
        if(this.name == "fzlp")
            mota.dialog.showMessage("你拿到了" + itemHtml + " ，该宝物可以使你在走过的楼层间自由穿梭。现在可以按 '<span class='shopKey'>J</span>' 键，选择你要去的楼层。");
        if(this.name == "ssp")
            mota.dialog.showMessage("你拿到了物品：" + itemHtml + " ，生命值翻倍！");
    }
});