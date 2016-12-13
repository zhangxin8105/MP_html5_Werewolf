/*
 * http: // hichat.herokuapp.com/
 */

var HiChat = function() {
	this.socket = null;
};

HiChat.prototype = {
	callback : {},
	init : function() {
		var that = this;
		this.socket = io.connect("http://hichat.herokuapp.com");
		this.socket.on('connect', function() {
			if (that.callback != null && that.callback.onConnect != null) {
				that.callback.onConnect();
			}
		});
		this.socket.on('nickExisted', function() {
			if (that.callback != null && that.callback.onNickExisted != null) {
				that.callback.onNickExisted();
			}
		});
		this.socket.on('loginSuccess', function() {
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
		this.socket.on('newMsg', function(user, msg, color) {
			if (that.callback != null && that.callback.onNewMsg != null) {
				that.callback.onNewMsg(user, msg, color);
			}
		});
		this.socket.on('newImg', function(user, img, color) {
			if (that.callback != null && that.callback.onNewImg != null) {
				that.callback.onNewImg(user, msg, color);
			}
		});
		// this.socket.connect();
	},

	login : function(nickName) {
		this.socket.emit('login', nickName);
	},

	sendMsg : function(msg, color) {
		this.socket.emit('postMsg', msg, color);
	},

	sendImg : function(result, color) {
		this.socket.emit('img', result, color);
	},
};
