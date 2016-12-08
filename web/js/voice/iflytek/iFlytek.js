/**
 * *********************************************local
 * Variables*********************************************************
 */

var IFlytek = {
	audioPalyUrl : "http://h5.xf-yun.com/audioStream/",

	/**
	 * 初始化Session会话 url 连接的服务器地址（可选） reconnection 客户端是否支持断开重连 reconnectionDelay
	 * 重连支持的延迟时间
	 */
	session : new IFlyTtsSession({
		'url' : 'ws://h5.xf-yun.com/tts.do',
		'reconnection' : true,
		'reconnectionDelay' : 30000
	}),

	audio_state : 0,

	makeUrl : function(content, vcn, speed, playRun) {
		var ssb_param = {
			"appid" : '5836ab53',
			"appkey" : "39b583469a133405",
			"synid" : "12345",
			"params" : "ent=aisound,aue=lame,speed=" + speed + ",vcn=" + vcn
		};

		this.session.start(ssb_param, content, function(err, obj) {
			var audio_url = IFlytek.audioPalyUrl + obj.audio_url;
			// if (audio_url != null && audio_url != undefined) {
			// window.iaudio.src = audio_url;
			// window.iaudio.play();
			// }
			if (playRun) {
				playRun(audio_url);
			}
		});
	},

	playContent : function(content, vcn, speed, playRun) {
		var url = null;
		this.makeUrl(content, vcn, speed, playRun);

		return url;
	}
}