/**
 * Created by qikai on 16/11/22.
 */

var data = {
	initCount : 0,
	userid : "",
	password : "",
	roomNum : "",
};

ImportHelper.add([//
"js/cookies.js",//
"js/urlparam.js",//
"javascripts/socket.io-1.3.5.min.js",//
"javascripts/jquery-1.10.2.min.js",//
"js/voice/voicecom.js",//
], [//
function() {
	init();
},//
null,//
null,//
function() {
	init();
}, //
null,//
]//
);

function init() {
	if (data.initCount++ < 1) {
		return;
	}

	data.userid = CookieHelper.getCookieByName(Werewolf.CONST.KEY_USER_ID);
	data.password = CookieHelper.getCookieByName(Werewolf.CONST.KEY_PASSWORD);
	data.roomNum = CookieHelper.getCookieByName(Werewolf.CONST.KEY_ROOM_NUM);

	$("#loginidtext").val(data.userid);
	$("#loginpasswordtext").val(data.password);
	$("#roomNum").val(data.roomNum);
}

function creatRoom() {
}

// 根据频道号进行链接
function enterRoom() {
	data.roomNum = $("#roomNum").val();

	VoiceCom.setDivName("#div_play");
	VoiceCom.play(data.playerName + ",欢迎您进入" + data.roomNum);
	alert(data.playerName + ",欢迎您进入" + data.roomNum);

	CookieHelper.setCookie(Werewolf.CONST.KEY_ROOM_NUM, data.roomNum);

	UrlParamHelper.setUrlParam(Werewolf.CONST.KEY_ROOM_NUM, data.roomNum);
	UrlParamHelper.setUrlParam(Werewolf.CONST.KEY_USER_ID, data.userid);
	UrlParamHelper.setUrlParam(Werewolf.CONST.KEY_USER_NAME, data.playerName);
	UrlParamHelper.go("room/room.html");
}

function login() {
	data.userid = $("#loginidtext").val();
	data.password = $("#loginpasswordtext").val();
	data.playerName = Werewolf.PLAYINFOS[data.userid].playerName;

	CookieHelper.setCookie(Werewolf.CONST.KEY_USER_ID, data.userid);
	CookieHelper.setCookie(Werewolf.CONST.KEY_PASSWORD, data.password);

	if (data.userid) {
		// 进行登录操作
		if (Werewolf.PLAYINFOS[data.userid]) {
			VoiceCom.setDivName("#div_play");
			VoiceCom.play(data.playerName + ",欢迎您进入狼人世界，呜哈哈哈哈");
			alert(data.playerName + ",欢迎您进入狼人世界，呜哈哈哈哈（小武笑）");
			document.getElementById("loginView").style.display = 'none';
			document.getElementById("enterRoom").style.display = 'inline';
		} else {
			alert("登录失败");
		}
	}
}
