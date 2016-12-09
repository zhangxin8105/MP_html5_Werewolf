/* */

//ImportHelper.add([ //
//"../js/cookies.js",//
//"../js/urlparam.js",//
//]);
function roomSettings() {
	// output: Gold%20Coast

	console.log(UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_ROOM_NUM));
	console.log(UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_USER_ID));
	console.log(UrlParamHelper.getUrlParamByName(Werewolf.CONST.KEY_USER_NAME));

	console.log(Werewolf.PLAYINFOS);

	console.log(CookieHelper.getCookie());
	console.log(CookieHelper.getCookieByName(Werewolf.CONST.KEY_ROOM_NUM));
	console.log(CookieHelper.getCookieByName(Werewolf.CONST.KEY_USER_ID));
	console.log(CookieHelper.getCookieByName(Werewolf.CONST.KEY_USER_NAME));
	console.log(CookieHelper.getCookieByName(Werewolf.CONST.KEY_PASSWORD));

	// window.location = "settings/roomSettings.html";
}

function testroom() {
}
