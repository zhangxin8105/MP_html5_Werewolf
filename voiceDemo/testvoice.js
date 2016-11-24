function testOkVoice() {
	var type=$("input[name='type']:checked").val();
	var sex=$("input[name='sex']:checked").val();
	console.log(type+sex);
	OkVoice.options.voice = type+sex;

	var url = OkVoice.makeUrl($("#textinput").val());
	playVoice("#div_video", url);
}

function testIFlytek() {
	play($("#textinput").val(), $("input[name='type2']:checked").val());
}
