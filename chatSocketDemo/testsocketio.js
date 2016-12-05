/*
 *
 */

var chatWay = null;

window.onload = function() {
	chatWay = new YunbaInf();
	chatWay.callback.onConnect = function() {
		var oldText = $("#dispaly_messages").val();
		$("#dispaly_messages").val(oldText //
				+ "连接服务器成功！\r\n");
	};
	chatWay.callback.onDisconnect = function() {
		var oldText = $("#dispaly_messages").val();
		$("#dispaly_messages").val(oldText //
				+ "断开服务器连接！\r\n");
	};
	chatWay.callback.onLoginSuccess = function() {
		var oldText = $("#dispaly_messages").val();
		$("#dispaly_messages").val(oldText//
				+ "登录成功！\r\n");
	};
	chatWay.callback.onError = function(err) {
		var oldText = $("#dispaly_messages").val();
		$("#dispaly_messages").val(oldText //
				+ "系统错误！" + err + "\r\n");
	};
	chatWay.callback.onSystem = function(nickName, userCount, type) {
		var oldText = $("#dispaly_messages").val();
		$("#dispaly_messages").val(oldText //
				+ nickName + "登录,用户总数:" + userCount + ",类型:" + type//
				+ "\r\n");
	};
	chatWay.callback.onNewMsg = function(user, msg, color) {
		var oldText = $("#dispaly_messages").val();
		$("#dispaly_messages").val(oldText //
				+ user + ":" + msg + "(" + color + ")\r\n");
	};
	chatWay.callback.onNewImg = function(user, img, color) {
		var oldText = $("#dispaly_messages").val();
		$("#dispaly_messages").val(oldText //
				+ user + ":" + img + "(" + color + ")\r\n");
	};

	chatWay.init();
};

function login() {
	chatWay.login($("#nickname").val());
}

function send() {
	chatWay.sendMsg($("#message").val());
}