/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-8
 * Time: 上午1:13
 * To change this template use File | Settings | File Templates.
 *
 * 门
 */

define(function(require, exports, module){
    var Barrier = require("Barrier");

    module.exports = Door;

    function Door(name){
        this.name = name;
        this.options = mota.data.door[name];
        this.type = "door";
    }

    Door.prototype = new Barrier();
    Door.prototype.remove = function(){
        mota.map.clearObject(this);
        mota._Debug.log("你打开了一座：" + "<em>" + this.options.CH_name + "</em>", true);
    }
});