/* import工具类 */

var ImportHelper = (function() {
	var scriptMap = null;

	function init() {
		var scriptOrgList = document.getElementsByTagName("script");
		if (scriptMap == null || scriptMap.length != scriptOrgList.length) {
			scriptMap = {};

			console.log("scriptOrgList " + ":" + scriptOrgList);
			for (var i = 0; i < scriptOrgList.length; i++) {
				scriptMap[scriptOrgList[i].getAttribute("src")] = scriptOrgList[i];
			}
			for ( var i in scriptMap) {
				console.log("scriptMap " + i + ":" + scriptMap[i]);
			}
		}

		return scriptOrgList[scriptOrgList.length - 1];
	}

	function add(script_dependencies, callback) {
		var callbackList = {};
		if (callback) {
			for (var s = 0; s < script_dependencies.length; s++) {
				callbackList[script_dependencies[s]] = callback[s];
			}
		}

		var lastChild = init();
		var addList = [];
		for (var s = 0; s < script_dependencies.length; s++) {
			var sr = script_dependencies[s];

			if (scriptMap[sr] != null) {
				continue;
			}
			addList[addList.length] = sr;
		}
		document.head.removeChild(lastChild);

		if (addList.length == 0 && onloadCb) {
			onloadCb();
		}
		for (var s = 0; s < addList.length; s++) {
			var script_element = document.createElement("script");
			script_element.type = "text/javascript";
			script_element.src = script_dependencies[s];

			// var childNodes = new [ document.head.childNodes ];
			// childNodes.splice(0, 0, script_element);
			document.head.appendChild(script_element);

			script_element.onload = function() {
				var cb = callbackList[this.getAttribute("src")];
				if (cb) {
					cb();
				}
			}
		}
		document.head.appendChild(lastChild);
	}

	function remove(script_dependencies) {
		init();
		dump();

		for (var s = 0; s < script_dependencies.length; s++) {
			var remove = scriptMap[script_dependencies[s]];
			console.log("remove " + ":" + remove.getAttribute("src"));
			if (remove != null) {
				document.head.removeChild(remove);
			}
		}

		dump();
	}

	function dump() {
		var scriptList = document.getElementsByTagName("script");
		for (var k = 0; k < scriptList.length; k++) {
			console.log("dump " + k + ":" + scriptList[k].getAttribute("src"));
		}
		for ( var i in scriptMap) {
			console.log("scriptMap " + i + ":" + scriptMap[i]);
		}
	}

	return {
		add : add,
		remove : remove,
	};
}());

function test() {
	ImportHelper.add([ //
	"../js/cookies.js", //
	"../js/cookies2.js",//
	]);
	ImportHelper.add([ //
	"../js/cookies.js", //
	"../js/cookies2.js",//
	]);

	ImportHelper.remove([ //
	"../js/cookies2.js",//
	]);
}

// test();
