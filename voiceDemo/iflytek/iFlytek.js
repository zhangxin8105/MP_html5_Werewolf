/** *************************************************ELEMENT************************************************************* */
var HINT_IFLYTEK = '科大讯飞成立于1999年，是中国最大的智能化语音技术提供商，其语音核心技术代表世界最高水平。2008年科大讯飞在深圳证券交易所挂牌上市';
var HINT_API = '本API基于HTML5和NODEJS技术，实现网页上的语音合成、语音识别效果，兼容个人电脑、苹果和安卓等移动终端设备.';
var HINT_ENG = 'IFLYTEK.AI enables developers to add a natural language interface to their app or device in minutes. It’s faster and more accurate than Siri, and requires no upfront investment, expertise, or training dataset.';
/** *************************************************ELEMENT************************************************************* */
/**
 * *********************************************local
 * Variables*********************************************************
 */
var audioPalyUrl = "http://h5.xf-yun.com/audioStream/";

/**
 * 初始化Session会话 url 连接的服务器地址（可选） reconnection 客户端是否支持断开重连 reconnectionDelay
 * 重连支持的延迟时间
 */
var session = new IFlyTtsSession({
	'url' : 'ws://h5.xf-yun.com/tts.do',
	'reconnection' : true,
	'reconnectionDelay' : 30000
});
/* 音频播放对象 */
window.iaudio = null;
/* 音频播放状态 0:未播放且等待音频数据状态，1:正播放且等待音频数据状态，2：未播放且不等待音频数据 */
var audio_state = 0;
/**
 * *********************************************local
 * Variables*********************************************************
 */

function play(content, vcn) {
	ssb_param = {
		"appid" : '5836ab53',
		"appkey" : "39b583469a133405",
		"synid" : "12345",
		"params" : "ent=aisound,aue=lame,vcn=" + vcn
	};

	session.start(ssb_param, content, function(err, obj) {
		var audio_url = audioPalyUrl + obj.audio_url;
		// if (audio_url != null && audio_url != undefined) {
		// window.iaudio.src = audio_url;
		// window.iaudio.play();
		// }
		playVoice("#div_video", audio_url);
	});
};
