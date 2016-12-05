/*
 * http: // hichat.herokuapp.com/
 */

var script_dependencies = [ //
"yunba/yunba-js-sdk/socket.io-0.9.16.min.js",//
"yunba/yunba-js-sdk/yunba-js-sdk.js",//
];

for (var s = 0; s < script_dependencies.length; s++) {
	script_element = document.createElement("script");
	script_element.src = script_dependencies[s];

	document.head.appendChild(script_element);
}

var YunbaInf = function() {
	this.socket = null;
};

YunbaInf.prototype = {
	callback : {},
	init : function() {
		var that = this;
		this.yunba_demo = new Yunba({
			appkey : '54d0c24252be1f7e1dd84c42'
		});
		this.yunba_demo.init(function(success) {
			if (success) {
				that.yunba_demo.connect_by_customid(
						'yunba_chatroom_demo_77476', function(success, msg) {
							if (success) {
								console.log('连接成功!');
								sub();
							} else {
								console.log(msg);
							}
						});
			}
		});

		function sub() {
			var e = new Date;
			that.chatroomTopic = "CHATROOM_DEMO_" + e.getFullYear()
					+ e.getMonth() + e.getDate();
			// <!-- 若要接收一个频道的消息，先使用 subscribe() 方法订阅该频道。 -->
			that.yunba_demo.subscribe({
				'topic' : that.chatroomTopic
			}, function(success, msg) {
				if (success) {
					console.log('你已成功订阅频道');
				} else {
					console.log(msg);
				}
			});
			// <!-- 用 set_message_cb() 设置收到消息时调用的回调函数 -->
			that.yunba_demo
					.set_message_cb(function(data) {
						console.log('data:' + data);

						var msg = data.msg;
						try {
							msg = JSON.parse(data.msg);
						} catch (b) {
						}
						console.log('msg:' + msg);
						if (that.callback != null
								&& that.callback.onNewMsg != null) {
							that.callback.onNewMsg(msg.username,
									msg.dataContent, null);
						}
					});
		}

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
		this.yunba_demo.publish({
			'topic' : this.chatroomTopic,
			'msg' : msg
		}, function(success, msg) {
			if (success)
				console.log('消息发布成功');
			else
				console.log(msg);
		});
	},

	sendImg : function(result, color) {
		// that.socket.emit('img', e.target.result, color);
		this.socket.emit('img', result, color);
	},
};
