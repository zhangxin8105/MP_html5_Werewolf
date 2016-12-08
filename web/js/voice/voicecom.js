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

	return {
		setDivName : setDivName,
		playVoice : playVoice,
		play : play,
	}

	function setDivName(div) {
		divName = div;
	}

	function play(text) {
		IFlytek.playContent(//
		text, //
		vcn,//
		speed,//
		function(url) {
			VoiceCom.playVoice(divName, url);
		});
	}

	function playVoice(divName, url) {
		if (divName == null) {
			return;
		}
		var playerDiv = $(divName);

		playerDiv.empty();
		playerDiv.append(//
		'<EMBED src="' + url //
				+ '" autostart="true" loop="true" width="0" height="0"/>');
	}
}());
