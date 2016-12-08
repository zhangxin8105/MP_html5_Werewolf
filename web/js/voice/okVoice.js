var OkVoice = {
	apiSecretKey : '1a3c1500ab253b636100c053e1ebea87',

	options : {
		apiKey : '2594280bed1522810d28a717f57c64db',
		format : 'MP3',
		speed : 1,
		voice : 'cnfemale'
	},

	makeUrl : function(content, vcn, speed) {
		var curTime = new Date();
		var expires = Math.floor(curTime.getTime() / 1000 + 100);

		if (!vcn) {
			vcn = this.options.voice;
		}
		if (!speed) {
			speed = this.options.speed;
		} else {
			speed = speed / 100 * 4.8 + 0.2;
		}
		var sendData = "" //
				+ "apiKey=" + this.options.apiKey //
				+ "&expires=" + expires //
				+ "&format=" + this.options.format //
				+ "&speed=" + speed//
				+ "&text=" + content//
				+ "&voice=" + vcn;

		var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1,
				this.apiSecretKey);
		hmac.update(sendData);
		var hash = hmac.finalize();
		var hex = CryptoJS.enc.Hex.stringify(hash);
		console.log(hex);
		var signature = "&signature=" + hex;

		var url = "http://api.okvoice.com/tts/?" + sendData + signature;

		return url;
	},

	playContent : function(content, vcn, speed, playRun) {
		var url = null;
		if (playRun) {
			url = this.makeUrl(content, vcn, speed);
			playRun(url);
		}

		return url;
	}
}
