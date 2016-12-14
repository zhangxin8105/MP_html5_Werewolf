/*
 *
 */

var ChatWay = (function() {
	var callback = {};
	var loginName = null;
	var chatWay = null;

	return {
		init : initChatWay,
		login : login,
		send : send,
		init : initChatWay,
	};

	function initChatWay(chat, cb) {
		chatWay = chat;
		callback = cb;
		chatWay.callback.onConnect = function() {
			if (callback != null && callback.onConnect) {
				callback.onConnect();
			}
		};
		chatWay.callback.onDisconnect = function() {
			if (callback != null && callback.onDisconnect) {
				callback.onDisconnect();
			}
		};
		chatWay.callback.onLoginSuccess = function() {
			if (callback != null && callback.onLoginSuccess) {
				callback.onLoginSuccess();
			}
		};
		chatWay.callback.onError = function(err) {
			if (callback != null && callback.onError) {
				callback.onError(err);
			}
		};
		chatWay.callback.onSystem = function(nickName, userCount, type) {
			if (callback != null && callback.onSystem) {
				callback.onSystem(nickName, userCount, type);
			}
		};
		chatWay.callback.onNewMsg = function(user, msg, color) {
			if (callback != null && callback.onNewMsg) {
				callback.onNewMsg(user, WerewolfCrypto.decrypt(msg), color);
			}
		};
		chatWay.callback.onNewImg = function(user, img, color) {
			if (callback != null && callback.onNewImg) {
				callback.onNewImg(user, img, color);
			}
		};

		chatWay.init();
	}

	function login(login) {
		loginName = login;
		chatWay.login(loginName);
	}

	function send(msg) {
		var msgCrypto = WerewolfCrypto.encrypt(msg);

		chatWay.sendMsg(msgCrypto);
	}

}());
