function addOnlineUserElement(e) {
	var t = $("#chat-online-list"), a = $('<li class="list-group-item"/>')
			.text(e);
	a.attr("id", e), t.append(a)
}

function removeOnlineUserElement(e) {
	$('li[id="' + e + '"]').remove()
}

function addMessageElement(e, t) {
	console.log(e);
	var a = $("#chat-messages");
	if (t) {
		a.append($("<li>").addClass("chat-log").text(e.log));
		return;
	}

	var o = $('<span class="chat-username"/>').text(e.username);
	var n = $('<span class="chat-message-body">').text("  " + e.dataContent);
	var i = $('<li class="chat-message"/>').data("username", e.username)
			.append(o, n);
	a.append(i);
}

function sendMessageOnEnter(e) {
	var isKey = (13 == e.keyCode);
	e.preventDefault();
	var isView = ("chatroom-input" == $(e.target).attr("id"));
	var issendOK = sendMessage();
	return isKey && isView && issendOK;
}

function sendMessage() {
	app.sendMessage($("#chatroom-input").val());
}

window.app = {};

app.appkey = "54d0c24252be1f7e1dd84c42";

app.server = "101.201.140.107";
app.port = null;
app.secure = null;

app.customid = "yunba_chatroom_demo_" + Math.floor(1e5 * Math.random());
var e = new Date;
app.chatroomTopic = "CHATROOM_DEMO_WW_" + e.getFullYear() + e.getMonth()
		+ e.getDate();

app.username = "游客#" + Math.floor(1e5 * Math.random());

app.callback = {
	OnlineUser : addOnlineUserElement,
	UnonlineUser : removeOnlineUserElement,
	OnMessage : addMessageElement,
};

function initYunbaSocket(app) {
	app = app || {};

	app.yunba_demo = new Yunba({
		server : app.server,
		port : app.port,
		secure : app.secure,
		appkey : app.appkey,
	});

	function userController(e) {
		var o = e.username;
		if ("ONLINE" === e.dataContent) {
			if (app.callback && app.callback.OnlineUser) {
				app.callback.OnlineUser(o);
			}
		} else if ("OFFLINE" === e.dataContent) {
			if (app.callback && app.callback.UnonlineUser) {
				app.callback.UnonlineUser(o);
			}
		}
	}

	function preventSubmit(e) {
		e.preventDefault()
	}
	app.sendMessage = function sendMessage(msg) {
		if ("" !== msg) {
			var e = JSON.stringify({
				dataType : "MESSAGE",
				dataContent : msg,
				username : app.username
			});
			publish(app.chatroomTopic, e), $("#chatroom-input").val("");
		}
	}

	function publish(e, t) {
		var a = this;
		app.yunba_demo.publish({
			topic : e,
			msg : t
		}, function(e, t) {
			e ? console.log("消息发布成功") : a.logMessage(t)
		})
	}

	function dataController(e) {
		e = JSON.parse(e);
		switch (e.dataType) {
		case "MESSAGE":
			if (app.callback && app.callback.OnMessage) {
				app.callback.OnMessage(e);
			}

			break;
		case "ONLINE_STATE":
			userController(e);
			break;
		case "GET_ONLINE_USERS":
			sendState("ONLINE");
			break;
		case "PICTURE":
		case "MICROEXP":
		case "VOICE":
		case "VIDEO":
		case "FILE":
		case "VIDEO":
			break;

		default:
			console.log("发生错误...");
			break;
		}
	}

	function setMessageCallback() {
		app.yunba_demo.set_message_cb(function(t) {
			dataController(t.msg);
		})
	}

	function connect() {
		logMessage("正在尝试连接...");
		app.yunba_demo.connect_by_customid(app.customid, function(t, a) {
			if (t) {
				logMessage("连接成功...");
				setMessageCallback();
				subscribe(app.chatroomTopic);
			} else {
				logMessage(a);
			}
		})
	}

	function subscribe(e) {
		logMessage("正在尝试加入房间..."), app.yunba_demo.subscribe({
			topic : e
		}, function(e, a) {
			if (e) {
				logMessage("加入房间成功...");
				sendState("ONLINE");
			} else {
				logMessage(a)
			}
		})
	}

	function unsubscribe(e) {
		app.yunba_demo.unsubscribe({
			topic : e
		})
	}

	function sendState(e) {
		var t = JSON.stringify({
			dataType : "ONLINE_STATE",
			dataContent : e,
			username : app.username
		});
		publish(app.chatroomTopic, t);
	}

	function logMessage(e) {
		addMessageElement({
			log : e
		}, !0);
	}

	function initCloseWindowEvent() {
		var e = this;
		$(window).on("unload", function() {
			e.sendState("OFFLINE");
			e.unsubscribe(app.chatroomTopic);
		})
	}

	function initYunbaSDK() {
		logMessage("正在初始化..."), app.yunba_demo.init(function(t) {
			if (t) {
				logMessage("初始化成功...");
				connect();
			} else {
				logMessage("初始化失败或服务断线，若长时间无响应请尝试刷新页面");
				connect();
			}
		}, function() {
			logMessage("服务断线，正在尝试重新连接...");
			sendState("OFFLINE");
			connect()
		});
	}

	function initialize() {
		initYunbaSDK();
		initCloseWindowEvent();
	}

	initialize();
};

initYunbaSocket(window.app);
