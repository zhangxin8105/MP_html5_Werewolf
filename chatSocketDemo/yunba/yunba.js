/*
 * http: // hichat.herokuapp.com/
 */

var Yunba = function() {
	this.socket = null;
};

Yunba.prototype = {
	callback : {},
	init : function() {
		var that = this;
		this.socket = io.connect("sock.yunba.io:443", {
			force_new_connection : true,
			secure : true
		});
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
		this.socket.on('publish', function(user, msg, color) {
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
		// that.socket.emit('img', e.target.result, color);
		this.socket.emit('img', result, color);
	},

// _initialEmoji : function() {
// var emojiContainer = document.getElementById('emojiWrapper'), docFragment
// = document
// .createDocumentFragment();
// for (var i = 69; i > 0; i--) {
// var emojiItem = document.createElement('img');
// emojiItem.src = '../content/emoji/' + i + '.gif';
// emojiItem.title = i;
// docFragment.appendChild(emojiItem);
// }
// ;
// emojiContainer.appendChild(docFragment);
// },
// _showEmoji : function(msg) {
// var match, result = msg, reg = /\[emoji:\d+\]/g, emojiIndex, totalEmojiNum =
// document
// .getElementById('emojiWrapper').children.length;
// while (match = reg.exec(msg)) {
// emojiIndex = match[0].slice(7, -1);
// if (emojiIndex > totalEmojiNum) {
// result = result.replace(match[0], '[X]');
// } else {
// result = result.replace(match[0],
// '<img class="emoji" src="../content/emoji/'
// + emojiIndex + '.gif" />');// todo:fix this in
// // chrome it will
// // cause a new
// // request for the
// // image
// }
// ;
// }
// ;
// return result;
// }
};
