/*
 * http: // hichat.herokuapp.com/
 */

var KAAZING_ID = "8381c16e-11f4-4bac-9ae7-c03a2c9376ec";

var EVENT_CONNECT = "connect";
var EVENT_DISCONNECT = "disconnect";
var EVENT_MESSAGE = "message";
var EVENT_SUBSCRIBE = "subscribe";
var EVENT_UNSUBSCRIBE = "unsubscribe";

var script_dependencies = [ //
"workerman.net/web_socket.js",//
];

for (var s = 0; s < script_dependencies.length; s++) {
	script_element = document.createElement("script");
	script_element.src = script_dependencies[s];

	//document.head.appendChild(script_element);
}

var WorkerMan = function() {
	this.socket = null;
	this.chat_user = "" + Date.now();
};

WorkerMan.prototype = {
	callback : {},
	init : function() {
		var that = this;

		if (this.socket != null) {
			this.socket.close();
		}

		this.socket = new WebSocket("ws://workerman.net:7272");
		this.socket.onmessage = function(e) {
			console.group("WS Receive");
			console.log(e.data);

			var data = JSON.parse(e.data);
			switch (data.type) {
			// 服务端ping客户端
			case 'welcome':
				this.id = o.id;
				break;

			case 'ping':
				that.socket.send('{"type":"pong"}');
				break;

			// 登录 更新用户列表
			case 'login':
				break;
			// 发言
			case 'say':
				if (that.callback != null && that.callback.onNewMsg != null) {
				    if (that.chat_user!=data['from_client_name']){
    					that.callback.onNewMsg(data['from_client_name'],
    							data['content'], data['time']);
					}
				}
				break;

			// 用户退出 更新用户列表
			case 'logout':
				break;
			}

			console.groupEnd();
		};

		this.socket.onopen = function(e) {
			// check if we can speak WAMP!
			console.group("WAMP Connect");

			this.socket_connected = true;

			if (that.callback != null && that.callback.onConnect != null) {
				that.callback.onConnect();
			}
			console.groupEnd();
			that.sendlogin();
		};

		this.socket.onerror = function(e) {
			// FF fires this upon unclean closes
			// Chrome does not fire this
			if (that.callback != null && that.callback.onError != null) {
				that.callback.onError(err);
			}
		};

		this.socket.onclose = function(e) {
			if (this.socket_connected) {
				console.log("Autobahn connection to " + self._wsuri
						+ " lost (code " + e.code + ", reason '" + e.reason
						+ "', wasClean " + e.wasClean + ").");
			} else {
				console.log("Autobahn could not connect to " + self._wsuri
						+ " (code " + e.code + ", reason '" + e.reason
						+ "', wasClean " + e.wasClean + ").");
			}

			// fire app callback
			if (this.socket_onclose !== undefined) {
				if (this.socket_connected) {
					if (e.wasClean) {
						// connection was closed cleanly (closing HS was
						// performed)
						this.socket_onclose(ab.CONNECTION_CLOSED);
					} else {
						// connection was closed uncleanly (lost without closing
						// HS)
						this.socket_onclose(ab.CONNECTION_LOST);
					}
				} else {
					// connection could not be established in the first place
					this.socket_onclose(ab.CONNECTION_UNREACHABLE);
				}
			}

			// cleanup - reconnect requires a new session object!
			this.socket_connected = false;
			self._wsuri = null;
			this.socket_onopen = null;
			this.socket_onclose = null;
			this.socket = null;

			if (that.callback != null && that.callback.onNewImg != null) {
				that.callback.onDisconnect();
			}
		};
	},

    login : function(nickName) {
        // this.socket.emit('login', nickName);
        this.chat_user = nickName + Math.floor(1e12 * Math.random());
        // 登录
        this.sendlogin();
    },

    sendlogin : function() {
        // 登录
        var login_data = '{"type":"login","client_name":"'
                + this.chat_user.replace(/"/g, '\\"') + '","room_id":"4"}';
        console.log("websocket握手成功，发送登录数据:" + login_data);
        if(this.socket)this.socket.send(login_data);
    },

	sendMsg : function(msg, color) {
		this.socket.send('{"type":"say","to_client_id":"'
				+ 'all'
				+ '","to_client_name":"'
				+ '所有人'
				+ '","content":"'
				+ msg.replace(/"/g, '\\"').replace(/\n/g, '\\n')
						.replace(/\r/g, '\\r') + '"}');

		// log("Chat sent.");
	},

	sendImg : function(result, color) {
	},
};
