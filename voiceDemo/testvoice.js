function testOkVoice() {
	var url = OkVoice.makeUrl($("#textinput").val());
	playVoice("#div_video", url);
}

function testIFlytek() {
	play($("#textinput").val(), 'aisxping');
}
