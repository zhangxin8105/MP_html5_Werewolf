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
"socketo.me/web_socket.js",//
];

for (var s = 0; s < script_dependencies.length; s++) {
	script_element = document.createElement("script");
	script_element.src = script_dependencies[s];

	document.head.appendChild(script_element);
}

var SockeToMe = function() {
	this.socket = null;
	this.chat_user = "" + Date.now();
};

SockeToMe.prototype = {
	callback : {},
	init : function() {

	},

	loginRun : function() {
		var self = this;

		if (this.socket != null) {
			this.socket.close();
		}
		this.socket = new WebSocket("ws://socketo.me/chat", [ "wamp" ]);
		this.socket.onmessage = function(e) {
			self._rxcnt += 1;
			console.group("WS Receive");
			console.info(self._wsuri + "  [" + self._session_id + "]");
			console.log(self._rxcnt);
			console.log(e.data);
			console.groupEnd();

			var o = JSON.parse(e.data);
			if (o[1] in self._calls) {
				if (o[0] === ab._MESSAGE_TYPEID_CALL_RESULT) {

					var dr = self._calls[o[1]];
					var r = o[2];

					if (ab._debugrpc && dr._ab_callobj !== undefined) {
						console.group("WAMP Call", dr._ab_callobj[2]);
						console.timeEnd(dr._ab_tid);
						console.group("Arguments");
						for (var i = 3; i < dr._ab_callobj.length; i += 1) {
							var arg = dr._ab_callobj[i];
							if (arg !== undefined) {
								console.log(arg);
							} else {
								break;
							}
						}
						console.groupEnd();
						console.group("Result");
						console.log(r);
						console.groupEnd();
						console.groupEnd();
					}

					dr.resolve(r);
				} else if (o[0] === ab._MESSAGE_TYPEID_CALL_ERROR) {

					var de = self._calls[o[1]];
					var uri = o[2];
					var desc = o[3];
					var detail = o[4];

					if (ab._debugrpc && de._ab_callobj !== undefined) {
						console.group("WAMP Call", de._ab_callobj[2]);
						console.timeEnd(de._ab_tid);
						console.group("Arguments");
						for (var j = 3; j < de._ab_callobj.length; j += 1) {
							var arg2 = de._ab_callobj[j];
							if (arg2 !== undefined) {
								console.log(arg2);
							} else {
								break;
							}
						}
						console.groupEnd();
						console.group("Error");
						console.log(uri);
						console.log(desc);
						if (detail !== undefined) {
							console.log(detail);
						}
						console.groupEnd();
						console.groupEnd();
					}

					if (detail !== undefined) {
						de.reject(uri, desc, detail);
					} else {
						de.reject(uri, desc);
					}
				}
				delete self._calls[o[1]];
			} else if (o[0] === ab._MESSAGE_TYPEID_EVENT) {
				var subid = self._prefixes.resolve(o[1], true);
				if (subid in self._subscriptions) {

					var uri2 = o[1];
					var val = o[2];

					if (ab._debugpubsub) {
						console.group("WAMP Event");
						console.info(self._wsuri + "  [" + self._session_id
								+ "]");
						console.log(uri2);
						console.log(val);
						console.groupEnd();
					}

					self._subscriptions[subid].forEach(function(callback) {

						callback(uri2, val);
					});
				} else {
					// ignore unsolicited event!
				}
			} else if (o[0] === ab._MESSAGE_TYPEID_WELCOME) {
				if (self._session_id === null) {
					self._session_id = o[1];
					self._wamp_version = o[2];
					self._server = o[3];

					if (ab._debugrpc || ab._debugpubsub) {
						console.group("WAMP Welcome");
						console.info(self._wsuri + "  [" + self._session_id
								+ "]");
						console.log(self._wamp_version);
						console.log(self._server);
						console.groupEnd();
					}

					// only now that we have received the initial
					// server-to-client
					// welcome message, fire application onopen() hook
					if (this.socket_onopen !== null) {
						this.socket_onopen(self._session_id,
								self._wamp_version, self._server);
					}
				} else {
					throw "protocol error (welcome message received more than once)";
				}
			}
		};

		this.socket.onopen = function(e) {
			// check if we can speak WAMP!
			if (this.socket.protocol !== ab._subprotocol) {

				if (typeof this.socket.protocol === 'undefined') {
					// i.e. Safari does subprotocol negotiation (broken), but
					// then
					// does NOT set the protocol attribute of the websocket
					// object (broken)
					//
					if (ab._debugws) {
						console.group("WS Warning");
						console.info(self._wsuri);
						console
								.log("WebSocket object has no protocol attribute: WAMP subprotocol check skipped!");
						console.groupEnd();
					}
				} else if (self._options && self._options.skipSubprotocolCheck) {
					// WAMP subprotocol check disabled by session option
					//
					if (ab._debugws) {
						console.group("WS Warning");
						console.info(self._wsuri);
						console
								.log("Server does not speak WAMP, but subprotocol check disabled by option!");
						console.log(this.socket.protocol);
						console.groupEnd();
					}
				} else {
					// we only speak WAMP .. if the server denied us this, we
					// bail out.
					//
					this.socket.close(1000, "server does not speak WAMP");
					throw "server does not speak WAMP (but '"
							+ this.socket.protocol + "' !)";
				}
			}

			console.group("WAMP Connect");
			console.info(self._wsuri);
			console.log(this.socket.protocol);
			console.groupEnd();

			this.socket_connected = true;
		};

		this.socket.onerror = function(e) {
			// FF fires this upon unclean closes
			// Chrome does not fire this
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
		};
		// this.socket.on(EVENT_CONNECT, function() {
		// if (that.callback != null && that.callback.onConnect != null) {
		// that.callback.onConnect();
		// }
		// });
		// this.socket.on('nickExisted', function() {
		// if (that.callback != null && that.callback.onNickExisted != null) {
		// that.callback.onNickExisted();
		// }
		// });
		// this.socket.on(EVENT_SUBSCRIBE, function() {
		// if (that.callback != null && that.callback.onLoginSuccess != null) {
		// that.callback.onLoginSuccess();
		// }
		// });
		// this.socket.on('error', function(err) {
		// if (that.callback != null && that.callback.onError != null) {
		// that.callback.onError(err);
		// }
		// });
		// this.socket.on('system', function(nickName, userCount, type) {
		// if (that.callback != null && that.callback.onSystem != null) {
		// that.callback.onSystem(nickName, userCount, type);
		// }
		// });
		// this.socket.on(EVENT_MESSAGE, function(data) {
		// var content = JSON.parse(data);
		//
		// if (that.callback != null && that.callback.onNewMsg != null) {
		// that.callback.onNewMsg(content.user, content.message,
		// content.color);
		// }
		// });
		// this.socket.on('newImg', function(user, img, color) {
		// if (that.callback != null && that.callback.onNewImg != null) {
		// that.callback.onNewImg(user, msg, color);
		// }
		// });
		// this.socket.on(EVENT_DISCONNECT, function() {
		// if (that.callback != null && that.callback.onNewImg != null) {
		// that.callback.onDisconnect();
		// }
		// });
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

		this.socket.publish(CHAT_TOPIC, json);

		// log("Chat sent.");
	},

	sendImg : function(result, color) {
		// that.socket.emit('img', e.target.result, color);
		// this.socket.emit('img', result, color);
	},
};
