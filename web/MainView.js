/**
 * Created by qikai on 16/11/22.
 */

function creatRoom() {

}
// 根据频道号进行链接
function enterRoom() {
	var roomNum = $("#roomNum").val();
	var welcomeString = playInfos[($("#loginidtext").val()).toString()].playerName
			+ ",欢迎您进入" + roomNum.toString();
	alert(welcomeString)

	window.location = "room/room.html";
}
function login() {
	var userid = $("#loginidtext").val();
	var password = $("#loginpasswordtext").val();
	if (userid) {
		// 进行登录操作
		if (playInfos[userid.toString()]) {
			alert(playInfos[userid.toString()].playerName
					+ ",欢迎您进入狼人世界，呜哈哈哈哈（小武笑）");
			document.getElementById("loginView").style.display = 'none';
			document.getElementById("enterRoom").style.display = 'inline';
		} else {
			alert("登录失败");
		}
	}
}

var playernames = new Array("何宁", "张鑫", "田嘉禾", "陈斐", "撖美霞", "高磊", "冬梅", "李敏",
		"陈林", "刘玉鹏", "曾宪武", "张广忍", "预言凯", "刘源");
var playInfos = new Array();
for (var i = 0; i < 14; i++) {
	var player = new Player(playernames[i], 10000 + i);
	playInfos[(i + 10000).toString()] = player;
}
function Player(name, userid) {
	this.playerName = name;
	this.playerid = userid;
}
