/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-3
 * Time: 下午9:50
 * To change this template use File | Settings | File Templates.
 *
 * 基类:障碍物
 */

define(function(require, exports, module){

    module.exports = Barrier;

    function Barrier(name){
        this.name = name;
        this.type = "barrier";
    }

    //无需深度克隆
    Barrier.prototype.clone = function(){
        var newObj = {};
        for(var p in this){
            newObj[p] = this[p];
        }
        return newObj;
    }
});