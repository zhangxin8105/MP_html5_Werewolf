/*
 */


/*
 * 【chat demo】
 *      appkey   : 54d0c24252be1f7e1dd84c42
 *      customid : yunba_chatroom_demo_77476
 *      Topic    = "CHATROOM_DEMO_" + e.getFullYear() + e.getMonth() + e.getDate();
 *
 * 【快速入门 demo】
 *      appkey   : 54d0c24252be1f7e1dd84c42
 *      customid : yunba_push_demo_1
 *      Topic    = 随意设置
 *
 * 【快速入门】
 *      appkey   : 52fcc04c4dc903d66d6f8f92
 *      customid : ?
 *      Topic    = ?
 *
 * 【视频直播互动】
 *      port     : 3000,
 *      appkey   : 56a0a88c4407a3cd028ac2fe
 *      customid : Math.random().toString().substr(2)
 *                 如:7192223761230707
 *      Topic    = bullet
 *      Topic    = like
 *      Topic    = stat
 *
 * 【Yo App】聊天软件
 *      appkey   : 53db1f030416ca3817e33c57
 *      customid : ?
 *      Topic    = ?
 *
 * 【云巴多人绘图】
 *      server   : 'sock.yunba.io',
 *      port     : 3000,
 *      appkey   : '56a0a88c4407a3cd028ac2fe'
 *      customid : Math.random().toString().substr(2);
 *                 如:21538377087563276
 *      Topic    = drawing
 *
 * 【云巴智能小屋】
 *      appkey   : '563c4afef085fc471efdf803'
 *      customid : 随机ID生成
                   function MathRand() {
                       var myDate = new Date();
                       var mytime = myDate.getTime();
                       var Num = "";
                       for (var i = 0; i < 6; i++) {
                           Num += Math.floor(Math.random() * 10);
                       }
                       Num = Num + "-" + mytime;
                       return Num;
                    };
 *      Topic    = smart_home_topic
 *
 * 【云巴多屏触摸】
 *      server   : 'sock.yunba.io',
 *      port     : 3000,
 *      appkey   : '56a0a88c4407a3cd028ac2fe'
 *      customid : Math.random().toString().substr(2);
 *      Topic    = particles
 *
 * 【云巴汽车】
 *      appkey   : '5487f75052be1f7e1dd834e8'
 *      customid : ?
 *      Topic    = yunba_car
 *
 * 【云巴智能插座】与【云巴智能空调】相同
 *
 * 【云巴智能灯】
 *      appkey   : ?
 *      customid : ?
 *      Topic    = ?
 *
 * 【云巴智能空调】
 *      port     : 3000,
 *      appkey   : '5697113d4407a3cd028abead'
 *      customid : ?
 *      Topic    = yunba_smart_plug
 *      Topic    = smart_office
 *
 * 【各个产品页】
 *      server   : 'sock.yunba.io',
 *      port     : 443,
 *      secure   : !0,
 *      appkey   : '54d0c26252be1f7e1dd84c43'
 *      customid : "yunba_push_demo_1" + Math.floor(1e5 * Math.random());
 *      customid : "yunba_push_demo_2" + Math.floor(1e5 * Math.random());
 *      Topic    = 随意设置
 *
 * 【掌阅 iReader】
 *
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
