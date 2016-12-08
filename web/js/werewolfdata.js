/* Werewolf data
 * werewolfjs
 */

var Werewolf = (function() {
	var CONST = {
		KEY_USER_ID : "userid",
		KEY_PASSWORD : "password",
		KEY_USER_NAME : "playername",
		KEY_ROOM_NUM : "roomNum",
	};

	var playernames = new Array("何宁", "张鑫", "田嘉禾", "陈斐", "撖美霞", "高磊", "冬梅",
			"李敏", "陈林", "刘玉鹏", "曾宪武", "张广忍", "预言凯", "刘源");
	var playInfos = new Array();
	for (var i = 0; i < 14; i++) {
		var player = new Player(playernames[i], 10000 + i);
		playInfos[(i + 10000).toString()] = player;
	}

	function Player(name, userid) {
		this.playerName = name;
		this.playerid = userid;
	}

	return {
		CONST : CONST,
		PLAYINFOS : playInfos,
	};
}());