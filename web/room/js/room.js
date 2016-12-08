/* */

var script_dependencies = [ //
"../js/cookies.js",//
];

for (var s = 0; s < script_dependencies.length; s++) {
	script_element = document.createElement("script");
	script_element.src = script_dependencies[s];

	document.head.appendChild(script_element);
}

function roomSettings() {
	// output: Gold%20Coast

	urlParam = function(name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)')
				.exec(window.location.href);
		if (results == null) {
			return null;
		} else {
			return results[1] || 0;
		}
	}

	console.log(decodeURIComponent(urlParam('roomNum')));
	console.log(decodeURIComponent(urlParam('playerid')));
	console.log(decodeURIComponent(urlParam('playername')));

	// window.location = "settings/roomSettings.html";
}

function testroom() {
	location.href = "room.html?"//
			+ 'roomNum=' + 1 //
			+ "&playerid=" + 10001 //
			+ "&playername=" + "zhangxin";
}
