/*
 * werewolfcrypto.js
 */

WerewolfCrypto = (function() {
	var keyStr = '_Werewolf_Crypto';
	var key = CryptoJS.enc.Utf8.parse(keyStr);

	var useBase64 = false;

	return {
		encrypt : encrypt,
		decrypt : decrypt,
	}

	function makeMode() {
		return {
			mode : CryptoJS.mode.ECB,
			padding : CryptoJS.pad.Pkcs7
		};
	}

	function encrypt(msg) {
		var encryptedData = CryptoJS.AES.encrypt(msg, key, makeMode());

		var encryptedBase64Str = encryptedData.toString();
		console.log(encryptedBase64Str);
		if (useBase64) {
			return encryptedBase64Str;
		}

		// 需要读取encryptedData上的ciphertext.toString()才能拿到跟Java一样的密文
		var encryptedStr = encryptedData.ciphertext.toString();
		console.log(encryptedStr);

		return encryptedStr;
	}

	function decrypt(msg) {
		var encryptedBase64Str2 = null;
		var encryptedBase64Str = null;

		var decryptedData = null;
		var decryptedStr2 = "";

		var decryptedData2 = null;
		var decryptedStr = "";

		try {
			var encryptedHexStr = CryptoJS.enc.Hex.parse(msg);
			encryptedBase64Str2 = CryptoJS.enc.Base64
					.stringify(encryptedHexStr);
			decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str2, key,
					makeMode());
			decryptedStr2 = decryptedData.toString(CryptoJS.enc.Utf8);

			return decryptedStr2;
		} catch (e) {
			for ( var p in e) {
				document.writeln(p + "=" + e[p]);
			}
		}
		try {
			encryptedBase64Str = msg;

			decryptedData2 = CryptoJS.AES.decrypt(encryptedBase64Str, key,
					makeMode());
			decryptedStr = decryptedData2.toString(CryptoJS.enc.Utf8);

			return decryptedStr;
		} catch (e) {
			for ( var p in e) {
				document.writeln(p + "=" + e[p]);
			}
		}
	}

}());