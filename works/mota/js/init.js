/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-2
 * Time: 下午10:21
 * To change this template use File | Settings | File Templates.
 *
 * 初始化游戏资源
 */

define(function(require, exports, modules){
    var util = require('util');
    util.namespace('mota');

    var data = require('data');
    var Debug = require('Debug');
    var Event = require('Event');
    var Dialog = require('Dialog');
    var Fighting = require('Fighting');
    var Shopping = require('Shopping');
    mota.data = data;
    mota._Debug = Debug;
    mota._T = new Debug.Timer();
    mota.event = Event;
    mota.dialog = new Dialog();
    mota.fighting = new Fighting();
    mota.shopping = new Shopping();
    mota.save = save;
    mota.load = load;
    mota.localSave = util.localStore();


    var Player = require('Player');
    var Barrier = require('Barrier');
    var Stair = require('Stair');
    var Door = require('Door');
    var Npc = require('Npc');
    var Monster = require('Monster');
    var Item = require('Item');
    var Map = require('Map');


    modules.exports = {
        init : function(){
            this.createPlayer();
            this.createBarrier();
            this.createNpcs();
            this.createEnemy();
            this.createItems();
            this.start();
        },
        start : function(){
            $(function(){
                $("<img/>").attr("src","image/resources_image.png").load(function(){
                    $("<img/>").attr("src","image/resources_image_2.png").load(function(){
                    	init();
               		});
                });
            })

            function init(){
                var welCome = $(".welcome");
                var rights = $(".rights");
                var pageWrap = $(".page_wrap");
                var backBtn = $("#back");
                var panel = $("#info");


                welCome.removeClass("loading");
                $(".chapter").animate({"margin-top":0},1000,function(){
                    rights.fadeIn(500);
                    panel.show();
                    $("#new_game").click(function(){
                        $("#records").hide();
                        $(".new_game").show();
                        meta();
                    });
                    $("#load_game").click(function(){
                       $(".new_game").hide();
                       $("#records").show();
                       meta();
                    });
                    backBtn.click(function(){
                        var _this = $(this);
                        pageWrap.animate({"margin-left":0},500,function(){
                            rights.fadeIn(500);
                            _this.hide();
                        });
                    });
                });

                $("#startBtn").click(function(){
                    gameStart();
                });
                $("#toggle").click(function(){
                    util.$toggleDebug();
                });
                $(".tab_h span").click(function(){
                    var index = $(this).index();
                    $(this).addClass("current").siblings().removeClass("current");
                    $(".tab_c").hide().eq(index).show();
                });
                $("#saveBtn").click(function(){
                    mota.save();
                    return false;
                });
                $("#loadBtn,#load_game_1").click(function(){
                    var record = mota.localSave['mota_localStorage'];
                    if(record){
                        mota.map = new Map();
                        mota.load();
                        welCome.fadeOut(500,function(){
                            mota._T = new Debug.Timer();
                            mota._T.run();
                            mota._Debug.log("载入游戏成功！开始重新计时...", true);
                            if($(".debug").css("display") !== "block"){
                                util.$toggleDebug();
                            }
                        });
                    }else{
                        alert("尚无游戏记录！");
                    }
                    return false;
                });
                $("#game_speed").change(function(){
                    var val = $(this).val();
                    var speed = 500;
                    switch(val){
                        case "0":
                            speed = 500;
                            break
                        case "1":
                            speed = 1000;
                            break
                        case "2":
                            speed = 500;
                            break
                        case "3":
                            speed = 200;
                            break
                        case "4":
                            speed = 50;
                            break
                        default:
                            return;
                    }
                    $(this).blur();
                    mota.fighting.fightSpeed = speed;
                });

                function meta(){
                    pageWrap.animate({"margin-left":-416},500,function(){
                        backBtn.fadeIn(500);
                        rights.fadeOut(500);
                    });
                }
            }

            var _this = this;
            function gameStart(){
                $(".welcome").slideUp(500,function(){
                    var name = $.trim($("#player_name").val());
                    mota.player.name = name != "输入游戏角色名称" ? name : "勇士";

                    //console.time("装载地图");
                    _this.mapInit(1);
                    //console.timeEnd("装载地图");
                    mota._Debug.log("游戏开始了...");
                    mota._T.run(); //开始计时

                    $(this).remove();
                    util.$toggleDebug();
                })
            }
        },
        createPlayer : function(){
            var playerName = $.trim($("#player_name").val()) || "勇士";
            mota.player = new Player(playerName);
        },
        createBarrier : function(){
            mota._Wall = new Barrier("wall");
            mota._Fire = new Barrier("fire");
            mota._Sky = new Barrier("sky");
            mota._Shop_left = new Barrier("shop_left");
            mota._Shop_right = new Barrier("shop_right");

            mota._Up_stairs =  new Stair("go_up");
            mota._Down_stairs =  new Stair("go_down");

            mota.gold_door = new Door("gold_door");
            mota.yellow_door = new Door("yellow_door");
            mota.blue_door = new Door("blue_door");
            mota.red_door = new Door("red_door");
            mota.fence = new Door("fence");
        },
        createNpcs : function(){
            mota.npcs = [
                'angle','shop_m_l','shop_m_h','shop_e_l','shop_e_h','shop_key_sell',
                'shop_key_buy','jack','smlr_03','sr_03','smlr_16','sr_16','princess'
            ];
            //mota.npc = {};
            for(var i = 0, len = mota.npcs.length; i < len; i++){
                var _npc = mota.npcs[i];
                mota[_npc] = new Npc(_npc, data.dialog[_npc]);
            }
        },
        createEnemy : function(){
            mota.mosters = [
                'enemy_01','enemy_02','enemy_03','enemy_04','enemy_05','enemy_06',
                'enemy_07','enemy_08','enemy_09','enemy_10','enemy_11','enemy_12',
                'enemy_13','enemy_14','enemy_15','enemy_16','enemy_17','enemy_18',
                'enemy_19','enemy_20','enemy_21','enemy_22','enemy_23','enemy_24',
                'enemy_25','enemy_26','enemy_27','enemy_28','enemy_29','enemy_30',
                'enemy_31','enemy_32','enemy_33'
            ];
            //mota.moster = {};
            for(var i = 0, len = mota.mosters.length; i < len; i++){
                var _moster = mota.mosters[i];
                mota[_moster] = new Monster(_moster, data.monster[_moster]);
            }
        },
        createItems : function(){
            mota.items = [
                'yellow_key','blue_key',
                'red_key','keyList','blue_stone','red_stone','red_potions','blue_potions',
                'sword_1','sword_2','sgh','fzlp','smszj','xgsl',
                'tiedun','hjd','xiaofeiyu','dafeiyu','jinbidai','ssp'
            ];
            //mota.item = {};
            for(var i = 0, len = mota.items.length; i < len; i++){
                var _item = mota.items[i];
                mota[_item] = new Item(_item, data.item[_item]);
            }
        },

        mapInit : function(){
            mota.map = new Map();
            mota.map.init(1);
        }
    }

    function save(){
        if(mota.localSave){
            mota.map.save();
        }else{
            alert("对不起，您使用的浏览器不支持本地存储！");
        }
    }

    function load(){
        if(mota.localSave){
            mota.map.load();
        }else{
            alert("对不起，您使用的浏览器不支持本地存储！");
        }
    }
});