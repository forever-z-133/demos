/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-8
 * Time: 上午1:02
 * To change this template use File | Settings | File Templates.
 *
 * 楼梯
 */

define(function(require, exports, module){
    var Barrier = require("Barrier");

    module.exports = Stair;

    function Stair(name){
        this.name = name;
        this.type = "stair";
    }

    Stair.prototype = new Barrier();
});
