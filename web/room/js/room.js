/* */

ImportHelper.add([ //
"../js/cookies.js",//
"../js/urlparam.js",//
]);

function roomSettings() {
	// output: Gold%20Coast

	console.log(UrlParamHelper.getUrlParamByName('roomNum'));
	console.log(UrlParamHelper.getUrlParamByName('playerid'));
	console.log(UrlParamHelper.getUrlParamByName('playername'));

	// window.location = "settings/roomSettings.html";
}

function testroom() {
}
