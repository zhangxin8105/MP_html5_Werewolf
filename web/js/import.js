/* import工具类 */

var ImportHelper = (function() {
	function add(script_dependencies) {
		for (var s = 0; s < script_dependencies.length; s++) {
			var findList = find(script_dependencies[s]);
			if (findList.length > 0) {
				continue;
			}

			script_element = document.createElement("script");
			script_element.type = "text/javascript";
			script_element.src = script_dependencies[s];

			document.head.childNodes.splice(0, 0, script_element);
			// document.head.appendChild(script_element);
		}
	}

	function remove(script_dependencies) {
		dump();

		for (var s = 0; s < script_dependencies.length; s++) {
			var removeList = find(script_dependencies[s]);
			for (var r = 0; r < removeList.length; r++) {
				console.log("remove " + r + ":"
						+ removeList[r].getAttribute("src"));
				document.head.removeChild(removeList[r]);
			}
		}

		dump();
	}

	function dump() {
		var scriptList = document.getElementsByTagName("script");
		for (var k = 0; k < scriptList.length; k++) {
			console.log("dump " + k + ":" + scriptList[k].getAttribute("src"));
		}
	}

	function find(scriptSrc) {
		var scriptList = document.getElementsByTagName("script");
		var findList = [];

		for (var i = 0; i < scriptList.length; i++) {
			if (scriptList[i].getAttribute("src") == scriptSrc) {
				findList[findList.length] = scriptList[i];
			}
		}

		return findList;
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
