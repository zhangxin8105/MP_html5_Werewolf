/* urlParam
 * urlparam.js
 */

var UrlParamHelper = (function() {
	// urlParam = function(name) {
	// var maps = new RegExp('[\?&]' + name + '=([^&#]*)')
	// .exec(window.location.href);
	// if (maps == null) {
	// return null;
	// } else {
	// return maps[1] || 0;
	// }
	// }
	// console.log(decodeURIComponent(urlParam('roomNum')));
	// console.log(decodeURIComponent(urlParam('playerid')));
	// console.log(decodeURIComponent(urlParam('playername')));
	var map = {};
	var urlhref = window.location.href;

	init();

	return {
		getUrlParamMap : getUrlParamMap,
		getUrlParamByName : getUrlParamByName,
		getUrlParamByIndex : getUrlParamByIndex,
		setUrlParam : setUrlParam,
		removeUrlParamByName : removeUrlParamByName,
		removeUrlParamByIndex : removeUrlParamByIndex,
		clean : clean,
		makeUrlParam : makeUrlParam,
		go : go,
	};

	function init() {
		var keyResult = urlhref.match(new RegExp("[\?\&][^\&][^\=]+", "g"));
		var valueResult = urlhref.match(new RegExp("[\=]([^\&]+)", "g"));

		// console.log(keyResult);
		// console.log(valueResult);

		if (keyResult == null || valueResult == null) {
			return "";
		}

		for (var i = 0; i < keyResult.length; i++) {
			var key = keyResult[i].substring(1);
			var val = valueResult[i].substring(1);
			map[key] = decodeURIComponent(val);
		}
		// console.log(map);
	}

	function makeUrlParam(mainUrl) {
		// console.log("map:" + JSON.stringify(map));

		if (map == null || map.length == 0) {
			return mainUrl;
		}

		var newUrl = mainUrl + "?";
		for ( var k in map) {
			newUrl += (k + "=" + encodeURIComponent(map[k]) + "&");
		}

		newUrl = newUrl.substring(0, newUrl.length - 1);

		return newUrl;
	}

	function go(mainUrl) {
		location.href = makeUrlParam(mainUrl);
	}

	function setUrlParam(name, value) {
		map[name] = value;
		return map;
	}

	function removeUrlParamByName(name) {
		delete map[name];
		return map;
	}

	function removeUrlParamByIndex(index) {
		var name = null;
		var i = 0;
		for ( var k in map) {
			if (i == index) {
				delete map[k];
				break;
			}
		}

		return map;
	}

	function clean() {
		map = {};

		return map;
	}

	function getUrlParam() {
		return urlhref;
	}

	function getUrlParamMap() {
		return map;
	}

	function getUrlParams() {
		var result = [];
		var i = 0;
		for ( var k in map) {
			result[i++] = map[k];
		}
		// console.log("result:" + result);
		return result;
	}

	function getUrlParamKeys() {
		var result = [];
		var i = 0;
		for ( var k in map) {
			result[i++] = k;
		}
		// console.log("result:" + result);
		return result;
	}

	// 根据QueryString参数名称获取值
	function getUrlParamByName(name) {
		return map[name];
	}

	// 根据QueryString参数索引获取值
	function getUrlParamByIndex(index) {
		if (index == null) {
			return "";
		}

		var queryStringList = getUrlParams();
		if (index >= queryStringList.length) {
			return "";
		}

		return queryStringList[index];
	}

}());

function test() {
	console.log(window.location.href);
	console.log(UrlParamHelper//
	.makeUrlParam("file:///work/code/MP_html5_Werewolf/web/room/room.html"));

	console.log(UrlParamHelper.makeUrlParam("room.html"));

	UrlParamHelper.setUrlParam("zhangxin", "zhx");
	console.log(UrlParamHelper.makeUrlParam("room.html"));

	UrlParamHelper.setUrlParam("zhangxin", "张鑫");
	console.log(UrlParamHelper.makeUrlParam("room.html"));

	UrlParamHelper.removeUrlParamByName("zhangxin");
	console.log(UrlParamHelper.makeUrlParam("room.html"));

	console.log(UrlParamHelper.getUrlParamByName("zhangxin"));
	console.log(UrlParamHelper.getUrlParamByName("roomNum"));

	UrlParamHelper.clean();
	console.log(UrlParamHelper.makeUrlParam("room.html"));

	UrlParamHelper.setUrlParam("zhangxin", "zhx");
	// UrlParamHelper.go("room.html");
}

// test();
