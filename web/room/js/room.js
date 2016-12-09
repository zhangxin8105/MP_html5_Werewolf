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

	store.set('username', 'marcus');
	store.set('zhangxin', 'zhx');
	console.log(store.get('username'));
	store.remove('username');

	store.clear();

	store.set('user', {
		name : 'marcus',
		likes : 'javascript'
	});

	var user = store.get('user');
	console.log(user.name + ' likes ' + user.likes);

	// Get all stored values
	store.getAll().user.name == 'marcus';

	// Loop over all stored values
	store.forEach(function(key, val) {
		console.log(key, '==', val);
	})
	// window.location = "settings/roomSettings.html";
}

function testroom() {
	store.forEach(function(key, val) {
		console.log(key, '==', val);
	})
}
