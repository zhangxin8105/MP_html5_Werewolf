/*  */

ImportHelper.add([//
"javascripts/jquery-1.10.2.min.js",//
"js/voice/iflytek/fingerprint.js",//
"js/voice/iflytek/tts.min.js",//
"js/voice/iflytek/iFlytek.js",//
]);

var VoiceCom = (function() {

	var divName = null;
	var vcn = "vixx";
	var speed = 50;
	var callback = {};

	return {
		setDivName : setDivName,
		playVoice : playVoice,
		play : play,
	}

	function setDivName(div) {
		divName = div;
	}

	function play(text, callback) {
		IFlytek.playContent(//
		text, //
		vcn,//
		speed,//
		function(url) {
			VoiceCom.playVoice(divName, url, callback);
		});
	}

	function playVoice(divName, url, endCb, errorCb) {
		if (divName == null) {
			errorCb();
			return;
		}
		callback.playError = errorCb;
		callback.playEnd = endCb;

		var playerDiv = $(divName);

		playerDiv.empty();

		var play_embed = document.createElement("audio");
		play_embed.src = url;
		play_embed.autoplay = true;
		play_embed.width = 1;
		play_embed.height = 1;
		play_embed.onerror = playError;
		play_embed.onended = playEnd;

		playerDiv.append(play_embed);
	}

	function playError() {
		if (callback.playError) {
			callback.playError();
		}
	}

	function playEnd() {
		if (callback.playEnd) {
			callback.playEnd();
		}
	}
}());
