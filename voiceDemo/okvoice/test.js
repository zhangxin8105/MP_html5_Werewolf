//document.write("<script language=javascript src='files/com.js'></script>");

function testOkVoice() {
	var http = require('http');
	var fs = require('fs');
	var crypto = require('crypto');
	var util = require('util');

	var apiSecretKey = '1a3c1500ab253b636100c053e1ebea87';

	var options = {
			apiKey : '2594280bed1522810d28a717f57c64db',
			expires : 0,
			format : 'MP3',
			speed : 1,
			text : '张三丰是武当派的开山祖师，知名的弟子有宋远桥等。',
			voice : 'cnfemale'
		};

	var text = "张鑫测试";

	var curDate = new Date();
	options.expires = Date.UTC(curDate.getFullYear(), curDate.getMonth(),
			curDate.getDate(), curDate.getHours(), curDate.getMinutes(),
			curDate.getSeconds()) / 1000 + 100;

	options.expires = 1511506318;
	
	var query = util.format(
			'apiKey=%s&expires=%d&format=%s&speed=%d&text=%s&voice=%s',
			options.apiKey, options.expires, options.format, options.speed,
			text, options.voice);

	console.log('query - %s\n', query);

	var hmac = crypto.createHmac('sha1', apiSecretKey);
	var data = new Buffer(query, 'utf8');
	console.log("=================");
	console.log(data);
	console.log("=================");

	hmac.update(data);
	var signatureResult = hmac.digest('hex');

	console.log('signatureResult - %s', signatureResult);

	var url = "http://api.okvoice.com/tts?" + query + "&signature="
			+ signatureResult;
	console.log('url - \n%s', url);
	var encodedUri = encodeURI(url);
	console.log('encodedUri - \n%s', encodedUri);
	var req = http.get(encodedUri);

	function handleError(e) {
		console.log(e);
	}

	function handleResponse(res) {
		console.log('statusCode - ', res.statusCode);
		console.log('contentLength - ', res.headers['content-length']);

		if (res.statusCode == 200) {
			var savedAudio = fs.createWriteStream('okVoice_en_cn.mp3');
			savedAudio.on('finish', function() {
				console.log('savedAudio finished.');
				process.exit(0);
			})
			res.pipe(savedAudio);
		} else if (res.statusCode == 301 || res.statusCode == 302) {
			console.log('redirect to -\n%s', res.headers['location']);
			req = http.get(res.headers['location']);
			req.on('error', handleError);
			req.on('response', handleResponse);
		} else {
			console.log('statusCode - %d', res.statusCode);
			process.exit(1);
		}
	}

	req.on('error', handleError);
	req.on('response', handleResponse);
}

testOkVoice();