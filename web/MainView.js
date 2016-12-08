/**
 * Created by qikai on 16/11/22.
 */

var data = {};
var CONST_DATA = {
	KEY_USER_ID : "userid",
	KEY_PASSWORD : "password",
	KEY_ROOM_NUM : "roomNum",
	KEY_PLAYER_NAME : "playername",
};

ImportHelper.add([//
"js/cookies.js",//
"js/urlparam.js",//
"javascripts/socket.io-1.3.5.min.js",//
"javascripts/jquery-1.10.2.min.js",//
], [//
function() {
	init();
},//
null,//
null,//
function() {
	init();
} ]);

console.log("MainView.js:");

var initCount = 0;
function init() {
	if (initCount++ < 1) {
		return;
	}

	data.userid = CookieHelper.getCookieByName(CONST_DATA.KEY_USER_ID);
	data.password = CookieHelper.getCookieByName(CONST_DATA.KEY_PASSWORD);
	data.roomNum = CookieHelper.getCookieByName(CONST_DATA.KEY_ROOM_NUM);

	$("#loginidtext").val(data.userid);
	$("#loginpasswordtext").val(data.password);
	$("#roomNum").val(data.roomNum);
}

function creatRoom() {

}
// 根据频道号进行链接
function enterRoom() {
	data.roomNum = $("#roomNum").val();
	alert(data.playerName + ",欢迎您进入" + data.roomNum);

	CookieHelper.setCookie(CONST_DATA.KEY_ROOM_NUM, data.roomNum);

	UrlParamHelper.setUrlParam(CONST_DATA.KEY_ROOM_NUM, data.roomNum);
	UrlParamHelper.setUrlParam(CONST_DATA.KEY_USER_ID, data.userid);
	UrlParamHelper.setUrlParam(CONST_DATA.KEY_PLAYER_NAME, data.playerName);
	UrlParamHelper.go("room/room.html");
}

function login() {
	data.userid = $("#loginidtext").val();
	data.password = $("#loginpasswordtext").val();
	data.playerName = playInfos[data.userid].playerName;

	CookieHelper.setCookie(CONST_DATA.KEY_USER_ID, data.userid);
	CookieHelper.setCookie(CONST_DATA.KEY_PASSWORD, data.password);

	if (data.userid) {
		// 进行登录操作
		if (playInfos[data.userid]) {
			alert(data.playerName + ",欢迎您进入狼人世界，呜哈哈哈哈（小武笑）");
			document.getElementById("loginView").style.display = 'none';
			document.getElementById("enterRoom").style.display = 'inline';
		} else {
			alert("登录失败");
		}
	}
}

var playernames = new Array("何宁", "张鑫", "田嘉禾", "陈斐", "撖美霞", "高磊", "冬梅", "李敏",
		"陈林", "刘玉鹏", "曾宪武", "张广忍", "预言凯", "刘源");
var playInfos = new Array();
for (var i = 0; i < 14; i++) {
	var player = new Player(playernames[i], 10000 + i);
	playInfos[(i + 10000).toString()] = player;
}
function Player(name, userid) {
	this.playerName = name;
	this.playerid = userid;
}
