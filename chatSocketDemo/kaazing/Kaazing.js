/*
 * http: // hichat.herokuapp.com/
 */

var KAAZING_ID = "8381c16e-11f4-4bac-9ae7-c03a2c9376ec";

var script_dependencies = [ //
"kaazing/gateway2.js",//
];

for (var s = 0; s < script_dependencies.length; s++) {
	script_element = document.createElement("script");
	script_element.src = script_dependencies[s];

	document.head.appendChild(script_element);
}

var Kaazing = function() {
	this.socket = null;
	this.chat_user = Gateway.CHAT_USER_PREFIX + Date.now();
};

Kaazing.prototype = {
	callback : {},
	init : function() {
	},

	loginRun : function() {
		var that = this;

		if (this.socket != null) {
			this.socket.close();
		}
		Gateway.clearCallback();
		this.socket = Gateway.chatCb(KAAZING_ID);
		this.socket.on(Gateway.EVENT_CONNECT, function() {
			if (that.callback != null && that.callback.onConnect != null) {
				that.callback.onConnect();
			}
		});
		this.socket.on('nickExisted', function() {
			if (that.callback != null && that.callback.onNickExisted != null) {
				that.callback.onNickExisted();
			}
		});
		this.socket.on(Gateway.EVENT_SUBSCRIBE, function() {
			if (that.callback != null && that.callback.onLoginSuccess != null) {
				that.callback.onLoginSuccess();
			}
		});
		this.socket.on('error', function(err) {
			if (that.callback != null && that.callback.onError != null) {
				that.callback.onError(err);
			}
		});
		this.socket.on('system', function(nickName, userCount, type) {
			if (that.callback != null && that.callback.onSystem != null) {
				that.callback.onSystem(nickName, userCount, type);
			}
		});
		this.socket.on(Gateway.EVENT_MESSAGE, function(data) {
			var content = JSON.parse(data);

			if (that.callback != null && that.callback.onNewMsg != null) {
				that.callback.onNewMsg(content.user, content.message,
						content.color);
			}
		});
		this.socket.on('newImg', function(user, img, color) {
			if (that.callback != null && that.callback.onNewImg != null) {
				that.callback.onNewImg(user, msg, color);
			}
		});
		this.socket.on(Gateway.EVENT_DISCONNECT, function() {
			if (that.callback != null && that.callback.onNewImg != null) {
				that.callback.onDisconnect();
			}
		});

		// var ready = function() {
		// if (that.callback != null && that.callback.onConnect != null) {
		// that.callback.onConnect();
		// }
		// };
		// var revMsg = function(content) {
		// if (that.callback != null && that.callback.onNewMsg != null) {
		// that.callback.onNewMsg(content.user, content.message,
		// content.color);
		// }
		// };
		// this.socket = Gateway.chatCb(KAAZING_ID, ready, revMsg);
	},

	login : function(nickName) {
		// this.socket.emit('login', nickName);
		this.chat_user = nickName;
		this.loginRun();
	},

	sendMsg : function(msg, color) {
		var json = null;

		json = JSON.stringify({
			color : color,
			message : msg,
			user : this.chat_user
		});

		this.socket.publish(Gateway.CHAT_TOPIC, json);

		// log("Chat sent.");
	},

	sendImg : function(result, color) {
		// that.socket.emit('img', e.target.result, color);
		// this.socket.emit('img', result, color);
	},
};
