/* */

ImportHelper.add([ //
"../js/cookies.js",//
"../js/urlparam.js",//
]);

function roomSettings() {
	// output: Gold%20Coast

	console.log(UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_ROOM_NUM));
	console.log(UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_USER_ID));
	console.log(UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_USER_NAME));

	// window.location = "settings/roomSettings.html";
}

function testroom() {
}
