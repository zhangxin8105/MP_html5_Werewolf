document.write(//
"<script language=javascript src='voiceCom.js'></script>");

document.write(//
"<script language=javascript src='okvoice/okVoice.js'></script>");

function testOkVoice() {
	var url = OkVoice.makeUrl($("#textinput").val());
	playOkVoice("#div_video", url);
}
