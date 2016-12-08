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

	var playInfos = {
		baseIndex : 0,
		maxIndex : 0,
		length : 0,
	};
	init();

	return {
		CONST : CONST,
		PLAYINFOS : playInfos,
	};

	function init() {
		initUsers();
	}

	function initUsers() {
		var playernames = //
		[ "何宁", "张鑫", "田嘉禾", "陈斐", "撖美霞", "高磊", "冬梅", "李敏", "陈林", "刘玉鹏", "曾宪武",
				"张广忍", "预言凯", "刘源",
		//
		];

		playInfos.baseIndex = 10000;
		playInfos.maxIndex = playInfos.baseIndex;

		for (var i = 0; i < playernames.length; i++) {
			var player = new Player(playernames[i], playInfos.maxIndex++);
			playInfos[player.playerid] = player;
		}

		for (var i = 0; i < 20; i++) {
			var player = new Player("新玩家" + i, playInfos.maxIndex++);
			playInfos[player.playerid] = player;
		}

		playInfos.length = playInfos.maxIndex - playInfos.baseIndex;

		function Player(name, userid) {
			this.playerName = name;
			this.playerid = userid;
		}
	}
}());
