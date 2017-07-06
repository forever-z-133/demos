// JavaScript Document
// Map

//游戏计时器
var _T = null;

//玩家：
var _Player = new Player("勇士");

//障碍物：
var _Wall = new Barrier("wall"),
	_Fire = new Barrier("fire"),
	_Sky = new Barrier("sky"),
	_Door_gold = new Barrier("door_gold"),
	_Shop_left = new Barrier("shop_left"),
	_Shop_right = new Barrier("shop_right");
	
//楼梯：
var _Up_stairs =  new Stairs("go_up"),
	_Down_stairs =  new Stairs("go_down");

//门：
var _Yellow_door =  new Item("door-yellow_door"),
	_Blue_door =  new Item("door-blue_door"),
	_Red_door =  new Item("door-red_door"),
	_Fence = new Item("door-fence"); //栅栏

//物品：
var _Yellow_key = new Item("item-yellow_key"),
	_Blue_key = new Item("item-blue_key"),
	_Red_key = new Item("item-red_key"),
	_keyList = new Item("item-keyList"),   //钥匙链
	_Blue_potions = new Item("item-blue_potions"),
	_Red_potions = new Item("item-red_potions"),
	_Blue_stone = new Item("item-blue_stone"),
	_Red_stone = new Item("item-red_stone"),
	_Sword_1 = new Item("item-sword_1"),
	_Sword_2 = new Item("item-sword_2"),
	_Sgh = new Item("item-sgh"),   //圣光徽
	_Fzlp = new Item("item-fzlp"),   //风之罗盘
	_Tiedun = new Item("item-tiedun"),
	_Xiaofeiyu = new Item("item-xiaofeiyu"),   //小飞羽
	_Dafeiyu = new Item("item-dafeiyu"),   //大飞羽
	_Jinbidai = new Item("item-jinbidai"),   //金币袋
	_Smszj = new Item("item-smszj"),   //圣母十字架
	_Ssp = new Item("item-ssp")   //圣水瓶
	_Xgsl = new Item("item-xgsl")   //星光神锒
	_Hjd = new Item("item-hjd")   //黄金盾

//Npc：
var _Angle = new Npc("angle","angle",Dialog.data["angle"]),  //仙子
	_Shop_M_L = new Npc("shop_m_l","shop_m_l",Dialog.data["shop_m_l"]), //低级商店（金币购物）
	_Shop_M_H = new Npc("shop_m_h","shop_m_h",Dialog.data["shop_m_h"]), //高级商店（金币购物）
	_Shop_E_L = new Npc("shop_e_l","shop_e_l",Dialog.data["shop_e_l"]), //低级商店（经验购物）
	_Shop_E_H = new Npc("shop_e_h","shop_e_h",Dialog.data["shop_e_h"]), //高级商店（经验购物）
	_Shop_key_sell = new Npc("shop_key_sell","shop_key_sell",Dialog.data["shop_key_sell"]),  //买钥匙的
	_Shop_key_buy = new Npc("shop_key_buy","shop_key_buy",Dialog.data["shop_key_buy"]),  //卖钥匙的
	_Jack = new Npc("jack","jack",Dialog.data["jack"]),  //小偷杰克
	_Smlr_03 = new Npc("smlr_03","smlr_03",Dialog.data["smlr_03"]),  //第三层的神秘老人
	_Sr_03 = new Npc("sr_03","sr_03",Dialog.data["sr_03"]),  //第三层的商人
	_Smlr_16 = new Npc("smlr_16","smlr_16",Dialog.data["smlr_16"]),  //第十六层的神秘老人
	_Sr_16 = new Npc("sr_16","sr_16",Dialog.data["sr_16"]),  //第十六层的商人
	_Princess = new Npc("princess","princess",Dialog.data["princess"]);  //公主

//怪物：
var enemy_01 = new Monster("enemy_01"),
	enemy_02 = new Monster("enemy_02"),
	enemy_03 = new Monster("enemy_03"),
	enemy_04 = new Monster("enemy_04"),
	enemy_05 = new Monster("enemy_05"),
	enemy_06 = new Monster("enemy_06"),
	enemy_07 = new Monster("enemy_07"),
	enemy_08 = new Monster("enemy_08"),
	enemy_09 = new Monster("enemy_09"),
	enemy_10 = new Monster("enemy_10"),
	enemy_11 = new Monster("enemy_11"),
	enemy_12 = new Monster("enemy_12"),
	enemy_13 = new Monster("enemy_13"),
	enemy_14 = new Monster("enemy_14"),
	enemy_15 = new Monster("enemy_15"),
	enemy_16 = new Monster("enemy_16"),
	enemy_17 = new Monster("enemy_17"),
	enemy_18 = new Monster("enemy_18"),
	enemy_19 = new Monster("enemy_19"),
	enemy_20 = new Monster("enemy_20"),
	enemy_21 = new Monster("enemy_21"),
	enemy_22 = new Monster("enemy_22"),
	enemy_23 = new Monster("enemy_23"),
	enemy_24 = new Monster("enemy_24"),
	enemy_25 = new Monster("enemy_25"),
	enemy_26 = new Monster("enemy_26"),
	enemy_27 = new Monster("enemy_27"),
	enemy_28 = new Monster("enemy_28"),
	enemy_29 = new Monster("enemy_29"),
	enemy_30 = new Monster("enemy_30"),
	enemy_31 = new Monster("enemy_31"),
	enemy_32 = new Monster("enemy_32"),
	enemy_33 = new Monster("enemy_33");

/*******************************  
	地图：
	每层地图通过一个二维数组来创建地图
	[ ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
*******************************/
var _Map = {
	"updata_player_position" : [
		{},
		{ "go_up" : {x : 5 , y : 1} },
		{ "go_up" : {x : 1 , y : 0}, "go_down" : {x : 5 , y : 9} },
		{ "go_up" : {x : 0 , y : 9}, "go_down" : {x : 0 , y : 1} },
		{ "go_up" : {x : 10 , y : 9}, "go_down" : {x : 1 , y : 10} },
		{ "go_up" : {x : 0 , y : 9}, "go_down" : {x : 10 , y : 9} },
		{ "go_up" : {x : 9 , y : 9}, "go_down" : {x : 1 , y : 10} },
		{ "go_up" : {x : 5 , y : 10}, "go_down" : {x : 9 , y : 9} },
		{ "go_up" : {x : 1 , y : 0}, "go_down" : {x : 5 , y : 10} },
		{ "go_up" : {x : 7 , y : 4}, "go_down" : {x : 0 , y : 1} },
		{ "go_up" : {x : 6 , y : 7}, "go_down" : {x : 6 , y : 3} },
		{ "go_up" : {x : 0 , y : 9}, "go_down" : {x : 4 , y : 6} },
		{ "go_up" : {x : 9 , y : 10}, "go_down" : {x : 1 , y : 10} },
		{ "go_up" : {x : 1 , y : 10}, "go_down" : {x : 9 , y : 10} },
		{ "go_up" : {x : 4 , y : 10}, "go_down" : {x : 1 , y : 10} },
		{ "go_up" : {x : 5 , y : 0}, "go_down" : {x : 5 , y : 9} },   //15
		{ "go_up" : {x : 7 , y : 0}, "go_down" : {x : 3 , y : 0} },
		{ "go_up" : {x : 5 , y : 6}, "go_down" : {x : 5 , y : 0} },
		{ "go_up" : {x : 1 , y : 10}, "go_down" : {x : 5 , y : 8} },
		{ "go_up" : {x : 9 , y : 10}, "go_down" : {x : 1 , y : 10} },
		{ "go_up" : {x : 5 , y : 4}, "go_down" : {x : 9 , y : 10} },  //20
		{ "go_up" : {x : 6 , y : 7}, "go_down" : {x : 6 , y : 3} },
		{ "go_up" : {x : 5 , y : 4}, "go_down" : {x : 5 , y : 5} }
	],
	"floor_1" : [
		[_Wall , _Sky , _Sky , _Sky , _Sky , _Up_stairs , _Sky , _Sky , _Sky , _Sky , _Wall],
		[_Wall , _Sky , _Sky , _Sky , _Sky , null , _Sky , _Sky , _Sky , _Sky , _Wall],
		[_Wall , _Sky , _Sky , _Sky , _Sky , null , _Sky , _Sky , _Sky , _Sky , _Wall],
		[_Wall , _Sky , _Sky , _Sky , _Sky , null , _Sky , _Sky , _Sky , _Sky , _Wall],
		[_Wall , _Sky , _Sky , _Sky , _Sky , null , _Sky , _Sky , _Sky , _Sky , _Wall],
		[_Wall , _Sky , _Sky , _Sky , _Sky , null , _Sky , _Sky , _Sky , _Sky , _Wall],
		[_Wall , _Wall , _Sky , _Sky , _Sky , null , _Sky , _Sky , _Sky , _Wall , _Wall],
		[_Wall , _Wall , _Wall , _Wall , _Wall , _Yellow_door , _Wall , _Wall , _Wall , _Wall , _Wall],
		[_Fire , _Wall , _Fire , _Wall , null , _Angle , null , _Wall , _Fire , _Wall , _Fire],
		[_Fire , _Fire , _Fire , _Fire , _Fire , null , _Fire , _Fire , _Fire , _Fire , _Fire],
		[_Fire , _Fire , _Fire , _Fire , _Fire , _Player , _Fire , _Fire , _Fire , _Fire , _Fire]
	],
	"floor_2" : [
		[_Up_stairs , null , _Yellow_key , enemy_01 , enemy_02 , enemy_01 , null , null , null , null , null],
		[_Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , null],
		[_Red_potions , null , enemy_04 , _Yellow_door , null , _Wall , _Red_potions , _Yellow_key , _Red_potions , _Wall , null],
		[_Yellow_key , enemy_04 , _Red_stone , _Wall , null , _Wall , _Red_potions , _Yellow_key , _Red_potions , _Wall , null],
		[_Wall , _Yellow_door , _Wall , _Wall , null , _Wall , _Wall , _Wall , enemy_05 , _Wall , null],
		[_Yellow_key , enemy_06 , null , _Wall , null , _Yellow_door , enemy_07 , enemy_01 , enemy_03 , _Wall , null],
		[_Blue_stone , null , _Blue_key , _Wall , null , _Wall , _Wall , _Wall , _Wall , _Wall , null],
		[_Wall , _Yellow_door , _Wall , _Wall ,  ,  ,  ,  ,  ,  , null],
		[null , enemy_06 , null , _Wall , _Wall , _Red_door , _Wall , _Wall , _Wall , _Yellow_door , _Wall],
		[_Red_potions , _Blue_potions , _Yellow_key , _Wall , _Red_key , _Player  ,  , _Wall , _Yellow_key , enemy_09 , _Blue_key],
		[_Red_potions , _Sgh , _Yellow_key , _Wall , null , _Down_stairs ,  , _Wall , _Yellow_key , _Yellow_key , _Yellow_key]
	],
	"floor_3" : [
		[_Down_stairs , _Wall ,  , enemy_25 ,  , _Wall , _Blue_stone , _Red_stone , _Yellow_key , _Red_key , _Wall],
		[_Player , _Wall , _Red_stone , _Wall , _Blue_potions , _Wall , _Blue_stone , _Red_stone , _Yellow_key , _Blue_key , _Wall],
		[ , _Wall , _Yellow_key , _Wall , _Yellow_key , _Wall , _Blue_stone , _Red_stone , _Yellow_key , enemy_18 , _Wall],
		[ , _Wall ,  , _Wall ,  , _Wall , _Wall , _Wall , _Wall , _Yellow_door , _Wall],
		[ , _Wall ,  , _Wall ,  ,  ,  , _Yellow_door ,  ,  , _Wall],
		[ , _Wall , _Yellow_door , _Wall , _Wall , _Yellow_door , _Wall , _Wall , _Yellow_door , _Wall , _Wall],
		[ , _Door_gold ,  ,  ,  ,  , _Wall ,  , enemy_18 ,  , _Wall],
		[ , _Wall , _Yellow_door , _Wall , _Wall , _Blue_door , _Wall , _Fence , _Wall , _Fence , _Wall],
		[ , _Wall , _Yellow_key , _Wall , _Blue_potions , _Red_potions , _Wall ,  , _Wall ,  , _Wall],
		[ , _Wall , _Yellow_key , _Wall , _Blue_potions , _Red_potions , _Wall ,  , _Wall ,  , _Wall],
		[_Up_stairs , _Wall , _Blue_stone , _Wall , _Blue_potions , _Red_potions , _Wall , _Smlr_03 , _Wall , _Sr_03 , _Wall]
	],
	"floor_4" : [
		[_Sword_1 , enemy_02 , _Yellow_key , _Wall , _Shop_left , _Shop_M_L , _Shop_right , _Wall , _Wall , _Wall , _Wall],
		[enemy_02 , _Yellow_key ,  , _Wall ,  ,  ,  , _Wall ,  , enemy_03 , ],
		[_Yellow_key , enemy_04 ,  , _Wall , _Wall , _Yellow_door , _Wall , _Wall ,  , _Wall , ],
		[_Wall , _Yellow_door , _Wall , _Wall ,  , enemy_04 ,  , _Wall , _Yellow_key , _Wall , enemy_02],
		[ ,  ,  , _Wall , _Wall , _Wall ,  , _Wall , _Yellow_key , _Wall , enemy_03],
		[enemy_01 , _Wall ,  , enemy_03 , enemy_02 , enemy_03 ,  , _Wall , _Yellow_key , _Wall , enemy_02],
		[enemy_01 , _Wall , _Wall , _Wall , _Wall , _Wall ,  ,  ,  , _Wall , ],
		[ ,  ,  ,  ,  , _Wall , _Wall , _Yellow_door , _Wall , _Wall , ],
		[_Wall , _Wall , _Wall , _Wall , enemy_03 , _Wall , enemy_02 ,  , enemy_02 , _Wall , ],
		[_Wall ,  ,  ,  ,  , _Wall , _Red_stone , enemy_03 , _Yellow_key , _Wall , ],
		[_Down_stairs , _Player , _Wall , _Wall , _Wall , _Wall , _Blue_stone , _Blue_potions , _Yellow_key , _Wall , _Up_stairs]
	],
	"floor_5" : [
		[ , enemy_05 ,  , _Wall ,  , _Jack ,  , _Wall ,  , enemy_05 , ],
		[_Yellow_door , _Wall , _Yellow_door , _Wall ,  ,  ,  , _Wall , _Yellow_door , _Wall , ],
		[ , _Wall ,  , _Wall , _Wall , _Fence , _Wall , _Wall ,  , _Wall , ],
		[ , _Wall , enemy_04 , _Wall , enemy_08 , enemy_14 , enemy_08 , _Wall ,  , _Wall , ],
		[enemy_03 , _Wall , _Red_potions , _Wall , _Blue_stone , enemy_08 , _Blue_stone , _Wall , _Red_potions , _Wall , ],
		[enemy_03 , _Wall , _Red_potions , _Wall , _Wall , _Red_door , _Wall , _Wall , _Red_potions , _Wall , ],
		[enemy_02 , _Wall ,  , _Wall , enemy_09 , enemy_13 , enemy_09 , _Wall ,  , _Wall , ],
		[ , _Wall ,  , _Wall , _Red_stone , enemy_09 , _Red_stone , _Wall ,  , _Wall , ],
		[ , _Wall ,  , _Wall , _Wall , _Blue_door , _Wall , _Wall ,  , _Wall , ],
		[ , _Wall ,  , _Wall , _Yellow_key ,  , _Yellow_key , _Wall ,  , _Wall , _Player],
		[_Up_stairs , _Wall ,  , enemy_05 ,  ,  ,  , enemy_05 ,  , _Wall , _Down_stairs]
	],
	"floor_6" : [
		[_keyList , _Wall , _Red_potions , _Wall , _Blue_potions , enemy_07 ,  ,  , enemy_07 , _Yellow_key , _Blue_key],
		[ , _Wall , _Red_stone , _Wall , enemy_07 ,  ,  ,  ,  , enemy_07 , _Yellow_key],
		[enemy_08 , _Wall ,  , _Wall , enemy_06 ,  , _Wall , _Wall , _Yellow_door , _Wall , _Wall],
		[ , _Yellow_door , enemy_07 , _Wall , _Tiedun , enemy_06 , _Wall ,  , enemy_09 , enemy_06 , _Shop_key_sell],
		[enemy_08 , _Wall ,  , _Wall , _Wall , _Wall , _Wall ,  ,  ,  , enemy_06],
		[_Red_stone , _Wall ,  ,  ,  , enemy_03 , enemy_04 ,  ,  ,  , ],
		[_Blue_stone , _Wall , _Wall , enemy_05 , _Wall , _Wall , _Wall , _Wall ,  ,  , ],
		[ , _Shop_E_L , _Wall , enemy_05 , _Wall ,  ,  ,  , enemy_09 , enemy_13 , ],
		[_Wall , _Wall , _Wall , enemy_03 , _Wall , _Yellow_door , _Wall , _Blue_door , _Wall , _Yellow_door , _Wall],
		[ ,  , _Wall ,  , _Wall , enemy_03 , _Wall , _Blue_stone , _Yellow_door ,  , _Wall],
		[_Down_stairs , _Player , enemy_03 ,  ,  ,  , _Wall , _Yellow_key , _Wall , _Up_stairs , _Wall]
	],
	"floor_7" : [
		[_Xiaofeiyu , enemy_10 , _Wall , _Blue_stone , _Wall , _Yellow_key , enemy_16 , _Jinbidai , _Wall , _Blue_potions , _Blue_potions],
		[enemy_10 , _Yellow_key , _Wall , _Red_stone , _Wall ,  , _Yellow_key , enemy_16 , _Wall , enemy_11 , _Blue_potions],
		[_Yellow_key , enemy_14 , _Blue_door ,  , _Blue_door , enemy_14 ,  , _Yellow_key , _Wall ,  , enemy_11],
		[ ,  , _Wall , enemy_13 , _Wall ,  ,  ,  , _Wall , enemy_19 , ],
		[_Wall , _Wall , _Wall , _Red_door , _Wall , _Wall , _Wall , _Wall , _Wall , _Yellow_door , _Wall],
		[ ,  , enemy_15 ,  , _Yellow_key , _Yellow_key , _Yellow_key ,  , enemy_15 ,  , ],
		[ , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall],
		[ , _Wall , enemy_08 , _Yellow_door , enemy_08 ,  ,  ,  ,  ,  , _Wall],
		[ , _Wall , _Yellow_door , _Wall , _Yellow_door , _Wall , _Wall , _Wall , _Wall , _Blue_door , _Wall],
		[ , _Wall , enemy_08 , _Wall ,  ,  , _Wall , _Wall ,  , _Player , _Wall],
		[ ,  ,  , _Wall , _Up_stairs ,  , _Yellow_door , _Yellow_door ,  , _Down_stairs , _Wall]
	],
	"floor_8" : [
		[_Up_stairs ,  ,  ,  ,  ,  ,  ,  , _Wall , _Wall , _Wall],
		[_Wall , _Wall ,  , enemy_14 , _Wall , _Blue_door , _Wall , enemy_10 ,  , _Wall , _Wall],
		[_Wall ,  , enemy_14 , _Blue_stone , _Wall , enemy_17 , _Wall , _Red_stone , enemy_10 ,  , _Wall],
		[ ,  , _Wall , _Wall , _Wall , _Fence , _Wall , _Wall , _Wall ,  , ],
		[ ,  , _Blue_door , enemy_17 , _Fence , _Smszj , _Fence , enemy_17 , _Blue_door ,  , ],
		[ , _Wall , _Wall , _Wall , _Wall , _Fence , _Wall , _Wall , _Wall , _Wall , ],
		[ , _Wall , _Red_potions , _Red_stone , _Wall , enemy_17 , _Wall , _Blue_stone , _Red_potions , _Wall , ],
		[ , _Wall , _Yellow_key , _Red_potions , _Wall , _Blue_door , _Wall , _Red_potions , _Yellow_key , _Wall , ],
		[ , _Wall , _Wall , _Blue_key , _Blue_key , _Blue_potions , _Blue_key , _Blue_key , _Wall , _Wall , ],
		[ ,  , _Wall , _Wall , _Wall , _Red_door , _Wall , _Wall , _Wall ,  , ],
		[_Wall ,  ,  , _Yellow_door , _Down_stairs , _Player ,  , _Yellow_door ,  ,  , _Wall]
	],
	"floor_9" : [
		[_Down_stairs , _Wall ,  ,  ,  ,  , _Wall ,  , _Yellow_key , enemy_10 , ],
		[_Player , _Wall ,  , _Wall , _Wall , _Yellow_door , _Wall , _Yellow_door , _Wall , _Wall , ],
		[ , _Wall ,  , _Wall ,  ,  , _Blue_door ,  ,  , _Wall , _Red_stone],
		[ , _Wall ,  , _Wall , enemy_12 , _Wall , _Wall , _Wall , enemy_08 , _Wall , enemy_05],
		[enemy_08 , _Wall ,  , _Wall , _Red_potions , _Wall , _Up_stairs ,  ,  , _Wall , enemy_05],
		[enemy_14 , _Wall , _Blue_stone , _Wall , _Red_potions , _Wall , _Wall , _Wall , _Wall , _Wall , ],
		[enemy_08 , _Wall , enemy_05 , _Wall ,  ,  ,  , _Wall ,  , enemy_14 , ],
		[ , _Wall , enemy_05 , _Wall , _Wall , _Wall , enemy_13 , _Wall , _Yellow_door , _Wall , _Wall],
		[ , _Wall ,  , enemy_10 ,  , _Wall , enemy_10 , _Wall ,  ,  , ],
		[ , _Wall , _Wall , _Wall , _Yellow_door , _Wall ,  , _Wall , _Wall , _Wall , ],
		[ ,  , enemy_12 ,  ,  , _Wall ,  , enemy_16 , enemy_17 , enemy_16 , ]
	],
	"floor_10" : [
		[_Fzlp , _Yellow_key ,  , _Wall , _Wall , _Wall ,  ,  ,  , _Wall , ],
		[_Yellow_key ,  , enemy_20 , _Yellow_door ,  ,  ,  , _Wall ,  , _Yellow_door , enemy_10],
		[_Wall , _Yellow_door , _Wall , _Wall ,  , _Wall , _Wall , _Wall ,  , _Wall , _Yellow_key],
		[ ,  ,  , _Wall ,  , _Wall , _Player ,  ,  , _Wall , _Yellow_key],
		[ ,  ,  , _Red_door ,  , _Wall , _Down_stairs , _Wall ,  , _Wall , _Red_potions],
		[_Wall , _Blue_door , _Wall , _Wall ,  , _Wall , _Wall , _Wall ,  , _Wall , _Wall],
		[_Blue_stone , enemy_19 , _Red_stone , _Wall , enemy_12 , _Wall , _Up_stairs , _Wall ,  , _Wall , _Red_potions],
		[_Wall , _Yellow_door , _Wall , _Wall ,  ,  ,  , _Yellow_door ,  , _Wall , _Yellow_key],
		[enemy_10 , _Red_potions , enemy_10 , _Wall , _Wall , _Blue_door , _Wall , _Wall ,  , _Wall , _Yellow_key],
		[_Blue_key , enemy_10 , _Red_potions , _Wall , enemy_11 , enemy_12 , enemy_11 , _Wall ,  , _Yellow_door , enemy_10],
		[_Sword_2 , _Blue_key , enemy_10 , _Yellow_door , _Blue_potions , enemy_11 , _Blue_potions , _Wall ,  , _Wall , ]
	],
	"floor_11" : [
		[ , _Wall , _Wall , _Blue_stone , enemy_20 , _Wall , enemy_20 , _Red_stone , _Wall , _Wall , ],
		[ ,  , _Wall , _Wall , _Yellow_door , _Wall , _Yellow_door , _Wall , _Wall ,  , enemy_19],
		[ ,  ,  ,  ,  , _Wall ,  ,  ,  , enemy_19 , _Blue_potions],
		[ , _Wall ,  , _Wall , _Wall , _Wall , _Wall , _Wall ,  , _Wall , _Wall],
		[enemy_08 , _Wall ,  ,  , _Yellow_key , _Yellow_key , _Yellow_key ,  ,  , _Wall , ],
		[enemy_14 , _Wall ,  , _Wall , _Wall , _Wall , _Wall , _Yellow_door , _Wall , _Wall , _Yellow_key],
		[enemy_08 , _Wall ,  , _Fence , _Player , _Down_stairs , _Wall ,  , _Yellow_door , enemy_14 , _Yellow_key],
		[ , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Yellow_door , _Wall , _Wall , ],
		[ , _Wall , _Red_potions , _Blue_stone , _Red_stone , _Wall ,  , enemy_14 ,  , _Wall , _Yellow_key],
		[ , _Wall , _Red_potions , _Blue_stone , _Red_stone , _Red_door , enemy_12 , _Wall , enemy_12 , _Wall , _Yellow_key],
		[_Up_stairs , _Wall , _Red_potions , _Blue_stone , _Red_stone , _Wall , _Blue_key , _Wall , _Blue_key , _Wall , _Red_potions]
	],
	"floor_12" : [
		[_Red_potions , _Wall , _Yellow_key , _Wall , _Blue_key , _Wall , _Red_key , _Wall , _Blue_potions , _Hjd , _Blue_potions],
		[_Red_potions , _Wall , _Yellow_key , _Wall , _Blue_key , _Wall , _Red_key , _Wall , enemy_21 , enemy_22 , enemy_21],
		[_Red_potions , _Wall , _Yellow_key , _Wall , _Blue_key , _Wall , _Red_key , _Wall ,  , enemy_21 , ],
		[_Yellow_door , _Wall , _Yellow_door , _Wall , _Yellow_door , _Wall , _Yellow_door , _Wall , _Wall , _Blue_door , _Wall],
		[ ,  ,  ,  ,  , _Wall ,  ,  ,  ,  , ],
		[_Yellow_door , _Wall , _Wall , _Blue_door , _Wall , _Wall , _Wall , _Blue_door , _Wall , _Wall , _Yellow_door],
		[_Blue_stone , _Wall ,  , enemy_21 , _Blue_potions , enemy_23 , _Blue_potions , enemy_21 ,  , _Wall , _Red_stone],
		[_Blue_stone , _Wall , enemy_20 , _Wall , _Wall , _Wall , _Wall , _Wall , enemy_20 , _Wall , _Red_stone],
		[_Blue_stone , _Wall , enemy_20 , _Wall , _Shop_left , _Shop_M_H , _Shop_right , _Wall , enemy_20 , _Wall , _Red_stone],
		[_Wall , _Wall , _Red_door , _Wall , _Red_potions ,  , _Red_potions , _Wall , _Red_door , _Wall , _Wall],
		[_Down_stairs , _Player ,  ,  ,  ,  ,  ,  ,  ,  , _Up_stairs]
	],
	"floor_13" : [
		[_Shop_key_buy , _Blue_stone , _Wall ,  , enemy_18 , enemy_25 , enemy_18 ,  , _Wall , _Blue_potions , _Xgsl],
		[_Red_stone ,  , _Wall ,  , _Wall , _Yellow_door , _Wall ,  , _Wall ,  , _Blue_potions],
		[ ,  , _Wall ,  , _Wall , enemy_25 , _Wall ,  , _Wall ,  , ],
		[ , enemy_23 , _Wall ,  , _Wall , _Yellow_key , _Wall ,  , _Wall , enemy_28 , ],
		[enemy_23 , enemy_24 , _Wall ,  , _Wall , _Yellow_key , _Wall ,  , _Wall , enemy_26 , enemy_28],
		[_Wall , _Blue_door , _Wall ,  , _Wall , _Red_potions , _Wall ,  , _Wall , _Blue_door , _Wall],
		[ ,  ,  ,  , _Wall , _Red_potions , _Wall ,  ,  ,  , ],
		[_Wall , _Wall , _Wall ,  , _Wall , _Wall , _Wall ,  , _Wall , _Wall , _Wall],
		[_Blue_stone , enemy_23 , _Yellow_door , enemy_21 , enemy_21 , enemy_22 , enemy_21 , enemy_21 , _Yellow_door , enemy_23 , _Red_stone],
		[_Wall , _Wall , _Wall , _Wall , _Wall , _Blue_door , _Wall , _Wall , _Wall , _Wall , _Wall],
		[_Up_stairs ,  ,  ,  ,  ,  ,  ,  ,  , _Player , _Down_stairs]
	],
	"floor_14" : [
		[ , enemy_23 ,  ,  ,  ,  ,  , _Wall ,  , enemy_24 , ],
		[ , _Wall , _Wall , _Wall , _Wall , _Wall , _Yellow_door , _Wall ,  , _Wall , ],
		[ , _Wall ,  ,  , enemy_21 ,  ,  , _Wall ,  , _Wall , ],
		[_Blue_potions , _Wall , _Red_door , _Wall , _Wall , _Wall ,  , _Wall ,  , _Wall , ],
		[enemy_18 , _Wall ,  ,  , enemy_24 , _Wall , enemy_21 , _Wall , _Red_stone , _Wall , ],
		[enemy_25 , _Wall ,  , enemy_27 , _Fence , _Wall , enemy_22 , _Wall , _Red_stone , _Wall , ],
		[enemy_18 , _Wall , enemy_24 , _Fence , _Shop_E_H , _Wall , enemy_21 , _Wall , _Red_stone , _Wall , _Blue_stone],
		[ , _Wall , _Wall , _Wall , _Wall , _Wall ,  , _Wall ,  , _Wall , _Blue_stone],
		[ ,  , enemy_18 , _Wall ,  ,  ,  , enemy_24 ,  , _Wall , _Blue_stone],
		[_Wall , _Wall ,  , _Wall , _Blue_potions , _Wall , _Wall , _Wall , _Wall , _Wall , ],
		[_Down_stairs , _Player ,  , _Blue_door ,  , _Up_stairs , _Wall , _Dafeiyu , enemy_27 , _Yellow_door , ]
	],
	"floor_15" : [
		[_Wall ,  , enemy_28 , _keyList , _Up_stairs ,  ,  ,  ,  ,  , _Wall],
		[_Wall ,  , _Blue_potions , _Wall , _Wall , _Wall , _Wall , _Wall , _Blue_potions ,  , _Wall],
		[_Wall ,  , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall , _Wall ,  , _Wall],
		[_Wall ,  , _Wall , _Wall , _Wall , _Ssp , _Wall , _Wall , _Wall ,  , _Wall],
		[_Wall ,  , _Wall , _Wall , _Wall , _Fence , _Wall , _Wall , _Wall ,  , _Wall],
		[_Wall ,  , _Red_potions , _Wall , _Wall , enemy_24 , _Wall , _Wall , _Red_potions ,  , _Wall],
		[_Wall ,  , _Sky , _Sky , _Wall , enemy_27 , _Wall , _Sky , _Sky ,  , _Wall],
		[_Wall ,  , _Sky , _Sky , _Wall , enemy_24 , _Wall , _Sky , _Sky ,  , _Wall],
		[_Wall ,  , _Sky , _Sky , _Wall , _Blue_door , _Wall , _Sky , _Sky ,  , _Wall],
		[_Wall , enemy_21 , enemy_22 , enemy_21 , _Blue_door , _Player , _Blue_door , enemy_21 , enemy_22 , enemy_21 , _Wall],
		[_Wall , _Wall , _Wall , _Wall , _Wall , _Down_stairs , _Wall , _Wall , _Wall , _Wall , _Wall]
	],
	"floor_16" : [
		[ ,  ,  , _Player , _Down_stairs , _Sky , _Up_stairs ,  ,  ,  , ],
		[ , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , ],
		[ , _Sky , _Sky , _Wall , _Wall , _Wall , _Wall , _Wall , _Sky , _Sky , ],
		[ , _Sky , _Wall , _Wall , _Smlr_16 , _Wall , _Sr_16 , _Wall , _Wall , _Sky , ],
		[ , _Sky , _Wall , _Wall , _Blue_stone , _Wall , _Blue_stone , _Wall , _Wall , _Sky , ],
		[ , _Sky , _Wall , _Wall , _Red_stone , _Wall , _Red_stone , _Wall , _Wall , _Sky , ],
		[ , _Sky , _Sky , _Wall ,  , _Wall ,  , _Wall , _Sky , _Sky , ],
		[ , _Sky , _Sky , _Wall , _Yellow_door , _Wall , _Yellow_door , _Wall , _Sky , _Sky , ],
		[ , _Sky , _Sky , _Sky ,  ,  ,  , _Sky , _Sky , _Sky , ],
		[ , _Sky , _Sky , _Sky , _Sky , _Red_door , _Sky , _Sky , _Sky , _Sky , ],
		[ ,  ,  ,  ,  ,  ,  ,  ,  ,  , ]
	],
	"floor_17" : [
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Player , _Down_stairs , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky ,  , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky ,  , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Wall , _Red_door , _Wall , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Wall , _Wall ,  , _Wall , _Wall , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Wall , _Wall , enemy_30 , _Wall , _Wall , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Wall , _Wall ,  , _Wall , _Wall , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Wall , _Wall , _Up_stairs , _Wall , _Wall , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Wall , _Wall , _Wall , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky]
	],
	"floor_18" : [
		[_Sky ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
		[_Sky ,  , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , ],
		[_Sky ,  , _Sky ,  ,  ,  ,  ,  ,  ,  , ],
		[_Sky ,  , _Sky ,  , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky ,  , _Sky ,  , _Sky ,  ,  ,  ,  ,  , _Sky],
		[_Sky ,  , _Sky ,  ,  ,  , _Sky , _Sky , _Sky ,  , _Sky],
		[_Sky ,  , _Sky , _Sky , _Sky , _Sky , _Sky ,  ,  ,  , _Sky],
		[_Sky ,  , _Sky , _Sky , _Sky , _Down_stairs , _Sky ,  , _Sky , _Sky , _Sky],
		[_Sky ,  ,  ,  , enemy_29 , _Player , _Sky ,  ,  ,  , ],
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , ],
		[_Up_stairs ,  ,  ,  ,  ,  ,  ,  ,  ,  , ]
	],
	"floor_19" : [
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Wall , _Wall , _Wall , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Wall , _Wall , _Princess , _Wall , _Wall , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Wall , _Wall ,  , _Wall , _Wall , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Wall , _Wall ,  , _Wall , _Wall , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Wall ,  , _Wall , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky ,  , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky ,  , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Down_stairs , _Player ,  ,  ,  ,  ,  ,  ,  ,  , _Up_stairs]
	],
	"floor_20" : [
		[ ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
		[ , _Sky ,  , _Sky , _Sky , _Sky , _Sky , _Sky ,  , _Sky , ],
		[ , _Sky ,  , _Sky , _Sky , _Sky , _Sky , _Sky ,  , _Sky , ],
		[ , _Sky ,  , _Sky , _Sky , _Up_stairs , _Sky , _Sky ,  , _Sky , ],
		[ , _Sky ,  , _Sky , _Sky ,  , _Sky , _Sky ,  , _Sky , ],
		[ , _Sky ,  , _Sky , _Sky ,  , _Sky , _Sky ,  , _Sky , ],
		[ , _Sky ,  , _Sky , _Sky , enemy_31 , _Sky , _Sky ,  , _Sky , ],
		[ , _Sky ,  , _Sky ,  ,  ,  , _Sky ,  , _Sky , ],
		[ , _Sky , _Sky , _Sky , _Sky ,  , _Sky , _Sky , _Sky , _Sky , ],
		[ , _Sky , _Sky , _Sky , _Sky ,  , _Sky , _Sky , _Sky , _Sky , ],
		[ ,  ,  ,  ,  ,  ,  ,  ,  , _Player , _Down_stairs]
	],
	"floor_21" : [
		[ ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
		[ , _Sky ,  , _Sky ,  , _Sky ,  , _Sky ,  , _Sky , ],
		[_Sky ,  ,  ,  ,  ,  ,  ,  ,  ,  , _Sky],
		[ , _Sky ,  , _Sky ,  , _Down_stairs , _Player , _Sky ,  , _Sky , ],
		[ ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
		[ , _Sky , _Sky , _Sky ,  , _Sky ,  , _Sky , _Sky , _Sky , ],
		[ ,  ,  ,  ,  ,  ,  ,  ,  ,  , ],
		[ , _Sky ,  , _Sky ,  , _Up_stairs ,  , _Sky ,  , _Sky , ],
		[_Sky ,  ,  ,  ,  ,  ,  ,  ,  ,  , _Sky],
		[ , _Sky ,  , _Sky ,  , _Sky ,  , _Sky ,  , _Sky , ],
		[ ,  ,  ,  ,  ,  ,  ,  ,  ,  , ]
	],
	"floor_22" : [
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky ,  ,  , _Sky ,  , _Sky ,  ,  , _Sky , _Sky],
		[_Sky ,  ,  , _Sky , _Sky ,  , _Sky , _Sky ,  ,  , _Sky],
		[_Sky ,  ,  ,  , _Sky ,  , _Sky ,  ,  ,  , _Sky],
		[_Sky , _Sky ,  ,  ,  ,  ,  ,  ,  , _Sky , _Sky],
		[_Sky , _Sky ,  ,  ,  , _Player ,  ,  ,  , _Sky , _Sky],
		[_Sky , _Sky , _Sky ,  ,  , _Sky ,  ,  , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Fence , _Down_stairs , _Fence , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky],
		[_Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky , _Sky]
	]
}

/*******************************
	装载地图：
	@param f : 楼层
********************************/
function _Map_Init(f){
	var map = $("#map"),
		floor_f = _Map["floor_"+f],
		html = "";
	_Player.f = f;
	for(var i=0; i<floor_f.length; i++)
		for(var j=0; j<floor_f[i].length; j++){
			var o = floor_f[i][j];
			if(!!o){
				var id = o.name == _Player.name ? _Player.name :
														o.id ? o.id : "",
					cn = o.name == _Player.name ? "player_"+o.direct : "block "+o.name;
				var x = j*32,
					y = i*32;
				html += '<div id="'+id+'" class="'+cn+'" style="left:'+x+'px;top:'+y+'px"></div>';
			}
		}
	map.html(html);
	_Player.refreshData();
}

/*******************************
	更新玩家在某一楼层的位置：
	@param f : 楼层
	@param x : 位于f层的x坐标
	@param y : 位于f层的y坐标
********************************/
function _Updata_Player_Position(f , x , y){
	var floor_f = _Map["floor_"+f];
	for(var i=0; i<floor_f.length; i++)
		for(var j=0; j<floor_f[i].length; j++){
			if(floor_f[i][j] == _Player){
				floor_f[i][j] = null;
				break
			}
		}
	floor_f[x][y] = _Player;
}

function _Clone_map(obj){
	var o = {};
	for(var pro in obj){
		o[pro] = obj[pro];
	}
	return o;
}