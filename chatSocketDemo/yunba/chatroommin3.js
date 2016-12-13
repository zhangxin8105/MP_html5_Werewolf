!function() {
    "use strict";
    app = app || {};
    var e = new Date;
    app.chatroomTopic = "CHATROOM_DEMO_" + e.getFullYear() + e.getMonth() + e.getDate(),
    app.yunba_demo = new Yunba({
// server: "sock.yunba.io",
		server : "101.201.140.107",
// port: 443,
// secure: !0,
        appkey: "54d0c24252be1f7e1dd84c42",
    });
    var username = "游客#" + Math.floor(1e5 * Math.random());
    app.ChatroomView = Backbone.View.extend({
    	el: "#view-chatroom",
    	events: {
    		'keypress [id="chatroom-input"]': "sendMessageOnEnter",
    		"click #btn-send-msg": "sendMessage",
    	},
        initialize: function() {
            this.initYunbaSDK();
            this.initCloseWindowEvent();
            var e = "";
        },
        initYunbaSDK: function() {
            var that = this;
            this.logMessage("正在初始化..."),
            $(".chatroom-btn").attr("disabled", !0),
            app.yunba_demo.init(function(t) {
                if ( t ) {
                	that.logMessage("初始化成功...");
                	that.connect();
                }else{
                	that.logMessage("初始化失败或服务断线，若长时间无响应请尝试刷新页面");
                	that.connect();
                }
            }, function() {
                that.logMessage("服务断线，正在尝试重新连接...");
                that.sendState("OFFLINE");
                that.connect()
            });
        },
        connect: function() {
            var that = this;
            that.logMessage("正在尝试连接...");
            var customid = "yunba_chatroom_demo_" + Math.floor(1e5 * Math.random());
            app.yunba_demo.connect_by_customid(customid, function(t, a) {
                if ( t ){
                	that.logMessage("连接成功...");
                	that.setMessageCallback();
                	that.subscribe(app.chatroomTopic);
                } else {
                	that.logMessage(a);
                }
            })
        },
        subscribe: function(e) {
            var t = this;
            t.logMessage("正在尝试加入房间..."),
            app.yunba_demo.subscribe({
                topic: e
            }, function(e, a) {
                e ? (t.logMessage("加入房间成功..."),
                t.sendState("ONLINE"),
                $(".chatroom-btn").attr("disabled", !1)) : t.logMessage(a)
            })
        },
        unsubscribe: function(e) {
            app.yunba_demo.unsubscribe({
                topic: e
            })
        },
        sendState: function(e) {
            var t = JSON.stringify({
                dataType: "ONLINE_STATE",
                dataContent: e,
                username: username
            });
            this.publish(app.chatroomTopic, t)
        },
        sendMessage: function() {
            if ("" !== $("#chatroom-input").val()) {
                var e = JSON.stringify({
                    dataType: "MESSAGE",
                    dataContent: $("#chatroom-input").val(),
                    username: username
                });
                this.publish(app.chatroomTopic, e),
                $("#chatroom-input").val("")
            }
        },
        publish: function(e, t) {
            var a = this;
            app.yunba_demo.publish({
                topic: e,
                msg: t
            }, function(e, t) {
                e ? console.log("消息发布成功") : a.logMessage(t)
            })
        },
        setMessageCallback: function() {
            var e = this;
            app.yunba_demo.set_message_cb(function(t) {
                e.dataController(t.msg);
            })
        },
        dataController: function(e) {
            e = JSON.parse(e);
            switch(e.dataType){
            case "MESSAGE":
            	this.addMessageElement(e);
            	break;
            case "ONLINE_STATE":
            	this.userController(e) ;
            	break;
            case "GET_ONLINE_USERS":
            	this.sendState("ONLINE") ;
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
        },
        userController: function(e) {
            var o = e.username;
            if ("ONLINE" === e.dataContent){
                this.addOnlineUserElement(o);
            }else if ("OFFLINE" === e.dataContent) {
                this.removeOnlineUserElement(o);
            }
        },
        addOnlineUserElement: function(e) {
            var t = $("#chat-online-list")
              , a = $('<li class="list-group-item"/>').text(e);
            a.attr("id", e),
            t.append(a)
        },
        removeOnlineUserElement: function(e) {
            $('li[id="' + e + '"]').remove()
        },
        addMessageElement: function(e, t) {
            var a = $("#chat-messages");
            if (t)
                return a.append($("<li>").addClass("chat-log").text(e.log)),
                void a.scrollTop(a[0].scrollHeight);
            var o = $('<span class="chat-username"/>').text(e.username)
              , n = $('<span class="chat-message-body">').text(e.dataContent)
              , i = $('<li class="chat-message"/>').data("username", e.username).append(o, n);
            a.append(i),
            a.scrollTop(a[0].scrollHeight)
        },
        logMessage: function(e) {
            this.addMessageElement({
                log: e
            }, !0)
        },
        preventSubmit: function(e) {
            e.preventDefault()
        },
        sendMessageOnEnter: function(e) {
            13 === e.keyCode && (e.preventDefault(),
            "chatroom-input" === $(e.target).attr("id") && this.sendMessage())
        },
        initCloseWindowEvent: function() {
            var e = this;
            $(window).on("unload", function() {
                e.sendState("OFFLINE"),
                e.unsubscribe(app.chatroomTopic)
            })
        },
        onBeforeDestroy: function() {
            app.yunba_demo && app.yunba_demo.disconnect(),
            $("#btn-send-multimedia").uploadify("destroy")
        }
    }),
    $(document).ready(function() {
        app.chatroomView = new app.ChatroomView
    })
}();
