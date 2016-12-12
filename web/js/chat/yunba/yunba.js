/*
 */

var YunbaInf1 = new YunbaInf({
	appKey : "54d0c24252be1f7e1dd84c42",// chat demo
	customid : "yunba_chatroom_demo_Ww",// "yunba_chatroom_demo_77476",
	date : new Date(),
	topic : "CHATROOM_DEMO_Ww_" + date.getFullYear() + date.getMonth()
			+ date.getDate(),
});

var YunbaInf2 = new YunbaInf({
	appKey : "54d0c24252be1f7e1dd84c42",// 快速入门 demo
	customid : "yunba_push_demo_1",
	topic : "Ww_topic",
});

var YunbaInf3 = new YunbaInf({
	appKey : "52fcc04c4dc903d66d6f8f92",// 快速入门
	customid : "yunba_push_Ww",
	topic : "Ww_topic",
});

var YunbaInf4 = new YunbaInf({
	appKey : "56a0a88c4407a3cd028ac2fe",// 视频直播互动 云巴多人绘图 云巴多屏触摸
	customid : "yunba_push_Ww",
	topic : "Ww_topic",
});

var YunbaInf5 = new YunbaInf({
	appKey : "53db1f030416ca3817e33c57",// 【Yo App】聊天软件
	customid : "yunba_push_Ww",
	topic : "Ww_topic",
});

var YunbaInf6 = new YunbaInf({
	appKey : "563c4afef085fc471efdf803",// 云巴智能小屋
	customid : "yunba_push_Ww",
	topic : "Ww_topic",
});

var YunbaInf7 = new YunbaInf({
	appKey : "5487f75052be1f7e1dd834e8",// 云巴汽车
	customid : "yunba_push_Ww",
	topic : "Ww_topic",
});

var YunbaInf8 = new YunbaInf({
	appKey : "5697113d4407a3cd028abead",// 云巴智能空调
	customid : "yunba_push_Ww",
	topic : "Ww_topic",
});

var YunbaInf8 = new YunbaInf({
	port : 443,
	secure : !0,
	appKey : "54d0c26252be1f7e1dd84c43",// 各个产品页
	customid : "yunba_push_Ww",
	topic : "Ww_topic",
});

var YunbaInf = function(data) {
	this.socket = null;
	this.appkey = null;
	this.port = null;
	setData(data);
};

YunbaInf.prototype = {
	callback : {},
	setData : function(data) {
		this.data = data;
	},
	init : function() {
		var that = this;
		this.yunba_demo = new Yunba({
			port : this.data.port,
			secure : this.data.secure,
			appkey : this.data.appKey
		});
		this.yunba_demo.init(function(success) {
			if (success) {
				that.yunba_demo.connect_by_customid(this.data.customid,
						function(success, msg) {
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
			that.chatroomTopic = this.data.topic;
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
