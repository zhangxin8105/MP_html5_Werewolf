/* */

var CookieHelper = (function() {
	var cookie = document.cookie;

	cookie = "userid=10001&passwd=1";
	cookie = "&" + cookie;

	function setCookie(name, value) {
		var result = getCookieMap();
		result[name] = value;

		document.cookie = JSON.stringify(result);
		console.log("document.cookie:" + document.cookie);

		return result;
	}

	function getCookieMap() {
		var keyResult = cookie.match(new RegExp("[\&][^\&][^\=]+", "g"));
		console.log(keyResult);
		var valueResult = cookie.match(new RegExp("[\=]([^\&]+)", "g"));
		console.log(valueResult);

		if (keyResult == null || valueResult == null) {
			return "";
		}

		var result = {};
		for (var i = 0; i < keyResult.length; i++) {
			result[keyResult[i].substring(1)] = valueResult[i].substring(1);
		}
		console.log(result);

		return result;
	}

	function getCookies() {
		var result = cookie.match(new RegExp("[\&][^\&]+=[^\&]+", "g"));
		console.log(result);

		if (result == null) {
			return "";
		}

		for (var i = 0; i < result.length; i++) {
			result[i] = result[i].substring(1);
		}

		return result;
	}

	// 根据QueryString参数名称获取值
	function getCookieByName(name) {
		var result = cookie.match(new RegExp("[\&]" + name + "=([^\&]+)", "i"));
		console.log(result);

		if (result == null || result.length < 1) {
			return "";
		}

		return result[1];
	}

	// 根据QueryString参数索引获取值
	function getCookieByIndex(index) {
		if (index == null) {
			return "";
		}

		var queryStringList = getCookie();
		if (index >= queryStringList.length) {
			return "";
		}

		var result = queryStringList[index];
		var startIndex = result.indexOf("=") + 1;

		result = result.substring(startIndex);

		return result;
	}

	return {
		setCookie : setCookie,
		getCookieMap : getCookieMap,
		getCookieByIndex : getCookieByIndex,
		getCookieByName : getCookieByName,
	}
}());
document.cookie = "";

console.log("document.cookie:" + document.cookie);

CookieHelper.setCookie("zhangxin", "zhangxind");
