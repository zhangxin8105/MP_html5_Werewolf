var keyStr = 'bbbbbbbbbbbbbbbb';
var key = null;

function initKey() {
	key = CryptoJS.enc.Utf8.parse(keyStr);
}

function encrypt() {
	initKey();
	var encryptedData = CryptoJS.AES.encrypt($("#orgtext").val(), key, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});

	var encryptedBase64Str = encryptedData.toString();

	// 需要读取encryptedData上的ciphertext.toString()才能拿到跟Java一样的密文
	var encryptedStr = encryptedData.ciphertext.toString();

	console.log(encryptedBase64Str);
	console.log(encryptedStr);

	$("#encryptmessages").val(//
	encryptedData.toString()//
			+ "\r\n"//
			+ encryptedStr);

	// 拿到字符串类型的密文需要先将其用Hex方法parse一下
	var encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedStr);

	console.log(encryptedHexStr);

	// 将密文转为Base64的字符串
	// 只有Base64类型的字符串密文才能对其进行解密
	var encryptedBase64Str2 = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	console.log(encryptedBase64Str2);

	var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str2, key, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});

	var decryptedData2 = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});

	$("#decryptmessages").val(decryptedData.toString(CryptoJS.enc.Utf8)//
			+ "\r\n" //
			+ decryptedData2.toString(CryptoJS.enc.Utf8));
}

function encryptHasIV() {
	var key = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
	var iv = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');

	var encrypted = CryptoJS.AES.encrypt($("#orgtext").val(), key, {
		iv : iv
	});

	console.log(encrypted.toString());
}

function decrypt() {
	initKey();

	var encryptedBase64Str2 = null;
	var encryptedBase64Str = null;

	var decryptedData = null;
	var decryptedStr2 = "";

	var decryptedData2 = null;
	var decryptedStr = "";

	try {
		var encryptedHexStr = CryptoJS.enc.Hex.parse($("#orgtext").val());
		encryptedBase64Str2 = CryptoJS.enc.Base64.stringify(encryptedHexStr);
		decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str2, key, {
			mode : CryptoJS.mode.ECB,
			padding : CryptoJS.pad.Pkcs7
		});
		decryptedStr2 = decryptedData.toString(CryptoJS.enc.Utf8);
	} catch (e) {
		for ( var p in e) {
			document.writeln(p + "=" + e[p]);
		}
	}
	try {
		encryptedBase64Str = $("#orgtext").val();

		decryptedData2 = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
			mode : CryptoJS.mode.ECB,
			padding : CryptoJS.pad.Pkcs7
		});
		decryptedStr = decryptedData2.toString(CryptoJS.enc.Utf8);
	} catch (e) {
		for ( var p in e) {
			document.writeln(p + "=" + e[p]);
		}
	}

	$("#decryptmessages").val(decryptedStr//
			+ "\r\n" //
			+ decryptedStr2);
}