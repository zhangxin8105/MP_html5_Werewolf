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

function initChat(){
    var cb = {};
    ChatWay.init(new WorkerMan(), cb);
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

    initChat();
};

function showMsg(msg) {
	var oldText = $("#dispaly_messages").val();
	$("#dispaly_messages").val(oldText + msg);
}
