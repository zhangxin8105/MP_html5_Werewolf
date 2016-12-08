/* */

ImportHelper.add([ //
"../js/cookies.js",//
]);

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
