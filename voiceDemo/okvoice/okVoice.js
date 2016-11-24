document.write(//
"<script language=javascript src='okvoice/crypto/crypto-js.js'></script>");
document.write(//
"<script language=javascript src='okvoice/crypto/hmac-sha1.js'></script>");

var OkVoice = {
	apiSecretKey : '1a3c1500ab253b636100c053e1ebea87',

	options : {
		apiKey : '2594280bed1522810d28a717f57c64db',
		format : 'MP3',
		speed : 0.5,
		voice : 'cnfemale'
	},

	makeUrl : function(text) {
		var curTime = new Date();
		var expires = Math.floor(curTime.getTime() / 1000 + 100);
		var sendData = "" //
				+ "apiKey=" + OkVoice.options.apiKey //
				+ "&expires=" + expires //
				+ "&format=" + OkVoice.options.format //
				+ "&speed=" + OkVoice.options.speed//
				+ "&text=" + text//
				+ "&voice=" + OkVoice.options.voice;

		var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, OkVoice.apiSecretKey);
		hmac.update(sendData);
		var hash = hmac.finalize();
		var hex = CryptoJS.enc.Hex.stringify(hash);
		console.log(hex);
		var signature = "&signature=" + hex;

		var url = "http://api.okvoice.com/tts/?" + sendData + signature;

		return url;
	}
}
