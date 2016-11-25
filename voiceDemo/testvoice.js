function makeOkVoiceParam() {
	var type = $("input[name='type']:checked").val();
	var sex = $("input[name='sex']:checked").val();

	var param = {
		content : $("#textinput").val(),
		vcn : type + sex,
		speed : $("#speed").val(),
	}
	return param;
}

function testOkVoice() {
	var param = makeOkVoiceParam();

	OkVoice.playContent(param.content, param.vcn, param.speed, function(url) {
		playVoice("#div_video", url);
	});
}

function makeIFlytekParam() {
	var param = {
		content : $("#textinput").val(),
		vcn : $("input[name='type2']:checked").val(),
		speed : $("#speed").val(),
	}
	return param;
}

function testIFlytek() {
	var param = makeIFlytekParam();

	IFlytek.playContent(param.content, param.vcn, param.speed, function(url) {
		playVoice("#div_video", url);
	});
}
