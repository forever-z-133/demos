/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-3
 * Time: 下午21:01
 * To change this template use File | Settings | File Templates.
 *
 * 怪物
 */

define(function(require, exports, module){

    module.exports = Monster;

    function Monster(name, option, id){
        this.name = name;
        this.option = option;
        this.id = id || this.name;
        this.type = "enemy";
        var ability = this.option['values'];
        for(var pro in ability){
            this[pro] = ability[pro];
        }
    }

    Monster.prototype.clone = function(){
        return new Monster(this.name, this.option, this.id);
    };
})