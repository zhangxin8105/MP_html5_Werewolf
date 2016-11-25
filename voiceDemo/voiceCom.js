/*  */
function playVoice(divName, text) {

	$(divName).empty();

	// $(divName)
	// .append(
	// '<EMBED src="'
	// +
	// 'http://api.okvoice.com/tts?apiKey=2594280bed1522810d28a717f57c64db&expires=1479998540&format=MP3&speed=1&text=%E5%BC%A0%E9%91%AB%E6%B5%8B%E8%AF%95&voice=cnfemale&signature=6dd0a119de2b3e9a5e4335ca4101d220939a3fad'
	// + '" autostart="true" loop="true" width="0" height="0"></EMBED>');
	$(divName).append(
			'<EMBED src="' + text
					+ '" autostart="true" loop="true" width="0" height="0"/>');
}
