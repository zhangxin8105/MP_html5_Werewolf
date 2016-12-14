/* */

//ImportHelper.add([ //
//"../js/cookies.js",//
//"../js/urlparam.js",//
//]);
function roomSettings() {
	// output: Gold%20Coast

	// window.location = "settings/roomSettings.html";
}

function testroom() {
	ChatWay.send("zhangxin" + new Date().getTime());
	store.forEach(function(key, val) {
		console.log(key, '==', val);
	})
}

function send() {
	ChatWay.send($("#message").val() + " " + new Date().toUTCString());
}

var CHAT_SELECT_LIST = {
	Yunba1 : new YunbaInf1(),
	Yunba2 : new YunbaInf2(),
	Yunba3 : new YunbaInf3(),
	Yunba4 : new YunbaInf4(),
	Yunba5 : new YunbaInf5(),
	Yunba6 : new YunbaInf6(),
	Yunba7 : new YunbaInf7(),
	Yunba8 : new YunbaInf8(),
	WorkerMan : new WorkerMan(),
	HiChat : new HiChat(),
};

var CHAT_SELECT_ELEMENT_NAME = 'chatSelect';
var VOICE_SELECT_ELEMENT_NAME = 'voiceSelect';

function initChatSelect() {
	var chatSel = document.getElementById(CHAT_SELECT_ELEMENT_NAME);
	for ( var k in CHAT_SELECT_LIST) {
		var oOption = document.createElement("OPTION");
		chatSel.options.add(oOption);
		oOption.innerText = k;
		oOption.value = k;
	}
}

function initChat() {
	var cb = {};
	ChatWay.init(CHAT_SELECT_LIST[$("#" + CHAT_SELECT_ELEMENT_NAME).val()], cb);
	cb.onConnect = function() {
		showMsg("连接服务器成功！\r\n");
	};
	cb.onDisconnect = function() {
		showMsg("断开服务器连接！\r\n");
	};
	cb.onLoginSuccess = function() {
		showMsg("登录成功！\r\n");
	};
	cb.onError = function(err) {
		showMsg("系统错误！" + err + "\r\n");
	};
	cb.onSystem = function(nickName, userCount, type) {
		showMsg(nickName + "登录,用户总数:" + userCount + ",类型:" + type//
				+ "\r\n");
	};
	cb.onNewMsg = function(user, msg, color) {
		showMsg(user + ":" + msg + "(" + color + ")\r\n");
	};
	cb.onNewImg = function(user, img, color) {
		showMsg(user + ":" + img + "(" + color + ")\r\n");
	};

	var uid = UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_USER_ID);
	if (!uid) {
		uid = CookieHelper.getCookieByName(Werewolf.CONST.KEY_USER_ID);
		if (!uid) {
			uid = "10001";
		}
	}

	ChatWay.login(uid);
}

function changeChatSelect() {
	console.log("changeChatSelect");

	initChat();
}

var VOICE_SELECT_LIST = {
	"蜡笔小新" : "vixx",
	"鸭先生" : "aisduck",

	"小筠(女播音)" : "aisjying",

	"小峰(男)" : "vixf",
	"许久(男)" : "aisjiuxu",
	"许多(男)" : "aisduoxu",
	"小宇(男)" : "xiaoyu",

	"小燕(女)" : "xiaoyan",
	"小琪1(女)" : "xiaoqi",
	"小琪2(女)" : "vixq",
	"小萍(女)" : "aisxping",
	"小婧(女)" : "aisjinger",
	"叶芳(女故事)" : "yefang",
	"小梦(女)" : "aisxmeng",
	"小春(女故事)" : "aismengchun",
	"子琪(女)" : "ziqi",

	"楠楠(童故事)" : "vinn",
	"许小宝(童)" : "aisbabyxu",
	"老孙(男中年)" : "vils",

	"小梅(粤语女)" : "vixm",

	"晓琳(台普女)" : "aisxlin",
	"小莉(台普女)" : "vixl",

	"小芸(东北女)" : "vixyun",

	"小蓉1(四川女)" : "aisxrong",
	"小蓉2(四川女)" : "vixr",

	"小坤(河南男)" : "vixk",

	"小强1(湖南男)" : "aisxqiang",
	"小强2(湖南男)" : "vixqa",

	"小英1(陕西女)" : "aisxying",
	"小英2(陕西女)" : "vixying",
};

function initVoiceSelect() {
	var chatSel = document.getElementById(VOICE_SELECT_ELEMENT_NAME);
	for ( var k in VOICE_SELECT_LIST) {
		var oOption = document.createElement("OPTION");
		chatSel.options.add(oOption);
		oOption.innerText = k;
		oOption.value = VOICE_SELECT_LIST[k];
	}
}

function changeVoiceSpeed() {
	$("#showVoiceSpeed").val($("#voiceSpeed").val());
}

function playVoice() {
	VoiceCom.setVcn($("#" + VOICE_SELECT_ELEMENT_NAME).val());
	VoiceCom.setSpeed($("#voiceSpeed").val());

	VoiceCom.setDivName("#div_play");
	VoiceCom.play($("#message").val(), function() {
	});
}

window.onload = function() {
	console.log("window.onload");

	console.log(UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_ROOM_NUM));
	console.log(UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_USER_ID));
	console.log(UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_USER_NAME));

	console.log(Werewolf.PLAYINFOS);

	console.log(CookieHelper.getCookie());
	console.log(CookieHelper.getCookieByName(Werewolf.CONST.KEY_ROOM_NUM));
	console.log(CookieHelper.getCookieByName(Werewolf.CONST.KEY_USER_ID));
	console.log(CookieHelper.getCookieByName(Werewolf.CONST.KEY_USER_NAME));
	console.log(CookieHelper.getCookieByName(Werewolf.CONST.KEY_PASSWORD));

	initChatSelect();

	initChat();

	initVoiceSelect();
};

function showMsg(msg) {
	var oldText = $("#dispaly_messages").val();
	$("#dispaly_messages").val(oldText + msg);
}
