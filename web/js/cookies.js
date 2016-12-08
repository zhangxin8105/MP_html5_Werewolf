/* */

//document.cookie = "";
//console.log("document.cookie:" + document.cookie);
var CookieHelper = (function() {
	var cookie = document.cookie;
	console.log("init cookie:" + cookie);

	// cookie = '{"zhangxin":"zhangxind","userid":"10001","passwd":"123"}';

	var map = null;
	try {
		map = JSON.parse(cookie);
	} catch (e) {
	}
	if (map == "" || map == null) {
		map = {};
	}
	// console.log("map:" + JSON.stringify(map));

	function saveCookie() {
		// console.log("map:" + JSON.stringify(map));
		cookie = JSON.stringify(map);

		// console.log("document.cookie:" + cookie);
		document.cookie = cookie;
		return cookie;
	}

	function getCookie() {
		return cookie;
	}

	function setCookie(name, value) {
		map[name] = value;

		saveCookie();
		return map;
	}

	function removeCookieByName(name) {
		delete map[name];
		saveCookie();
		return map;
	}

	function removeCookieByIndex(index) {
		var name = null;
		var i = 0;
		for ( var k in map) {
			if (i == index) {
				delete map[k];
				break;
			}
		}

		saveCookie();
		return map;
	}

	function clean() {
		map = {};

		saveCookie();
		return map;
	}

	function getCookieMap() {
		return map;
	}

	function getCookies() {
		var result = [];
		var i = 0;
		for ( var k in map) {
			result[i++] = map[k];
		}
		// console.log("result:" + result);
		return result;
	}

	// 根据QueryString参数名称获取值
	function getCookieByName(name) {
		return map[name];
	}

	// 根据QueryString参数索引获取值
	function getCookieByIndex(index) {
		if (index == null) {
			return "";
		}

		var queryStringList = getCookies();
		if (index >= queryStringList.length) {
			return "";
		}

		return queryStringList[index];
	}

	return {
		getCookie : getCookie,
		getCookieMap : getCookieMap,
		getCookieByName : getCookieByName,
		getCookieByIndex : getCookieByIndex,
		setCookie : setCookie,
		removeCookieByName : removeCookieByName,
		removeCookieByIndex : removeCookieByIndex,
		clean : clean,
	}
}());

function test() {
	CookieHelper.setCookie("userid", "10001");
	console.log("cookie:" + CookieHelper.getCookie());

	CookieHelper.setCookie("passwd", "123");
	console.log("cookie:" + CookieHelper.getCookie());

	CookieHelper.setCookie("zhangxin", "zhangxind");
	console.log("cookie:" + CookieHelper.getCookie());

	console.log("getCookieByIndex0:" + CookieHelper.getCookieByIndex(0));
	console.log("getCookieByIndex1:" + CookieHelper.getCookieByIndex(1));
	console.log("getCookieByIndex2:" + CookieHelper.getCookieByIndex(2));
	console.log("getCookieByIndex3:" + CookieHelper.getCookieByIndex(3));
	console.log("userid:" + CookieHelper.getCookieByName("userid"));
	console.log("passwd:" + CookieHelper.getCookieByName("passwd"));

	console.log("getCookieMap:" + JSON.stringify(CookieHelper.getCookieMap()));

	CookieHelper.removeCookieByName("zhangxin");
	console.log("cookie:" + CookieHelper.getCookie());

	CookieHelper.removeCookieByIndex(0);
	console.log("cookie:" + CookieHelper.getCookie());

	CookieHelper.clean();
	console.log("cookie:" + CookieHelper.getCookie());
}

// test();
