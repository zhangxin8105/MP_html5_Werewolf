/**
 * Created by qikai on 16/11/22.
 */

function creatRoom() {

}
//根据频道号进行链接
function enterRoom(roomNum) {

}
function login() {
    var userid = $("#loginidtext").val();
    var password  = $("#loginpasswordtext").val();
    alert("登录账号:"+userid+"登录密码"+password);
    console.log(111);
    if (userid && password){
       // 进行登录操作
        var players = single.getInstance();
    }
}

// 存储所有玩家信息的array
var single = (function(){
    var unique;
    var playersInfo;
    function getInstance(){
        if( unique === undefined ){
            unique = new Construct();
        }
        return unique;
    }
    function Construct() {
        playersInfo = new Array;
        var names = new  Array("何宁","张鑫","田嘉禾","陈斐","撖美霞","高磊","冬梅","李敏","陈林","刘玉鹏","曾宪武","张广忍","预言凯","刘源");
        for (var i =0 ;i < 14 ;i++){
            var player = new player(names[i],10000+i);
        }
    }
    return {
        getInstance : getInstance
    }
})();

function Player(name,userid) {
    var playerName = name;
    var playerId = userid;
}
