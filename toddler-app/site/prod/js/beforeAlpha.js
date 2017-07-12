var _randomAlphaBef = Math.floor(Math.random() * 24) + 65;

function assignAlphaBefore($randomAlphaBefore) {
	document.getElementById("secondDivBefore").innerHTML = String.fromCharCode($randomAlphaBefore);
	document.getElementById("thirdDivBefore").innerHTML = String.fromCharCode($randomAlphaBefore + 1);
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("enterAlphaBefore").focus();
}

function $tryAgainBeforeAlpha() {
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("tick-ok").style.display = "none";
	document.getElementById("star-glowing").style.display = "none";
	document.getElementById("try-again").style.display = "none";
	document.getElementById("submit").style.display = "block";
	document.getElementById("enterAlphaBefore").value = "";
	document.getElementById("enterAlphaBefore").className = "";
	_randomAlphaBef = Math.floor(Math.random() * 24) + 65;
	assignAlphaBefore(_randomAlphaBef);
	document.getElementById("enterAlphaBefore").focus();
}
assignAlphaBefore(_randomAlphaBef)

function $checkAlphaBefore() {

if(document.getElementById("enterAlphaBefore").value==""){
	document.getElementById("enterAlphaBefore").focus();
	return false;
}
	var _checkAlpha = String.fromCharCode(_randomAlphaBef - 1);
	if (document.getElementById("enterAlphaBefore").value.toUpperCase() == _checkAlpha) {
		document.getElementById("tick-ok").style.display = "block";
		document.getElementById("star-glowing").style.display = "block";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";

	} else {
		document.getElementById("enterAlphaBefore").value = _checkAlpha;
		document.getElementById("enterAlphaBefore").className = "errorTxt";
		document.getElementById("tick-cross").style.display = "block";
		document.getElementById("tick-ok").style.display = "none";
		document.getElementById("star-glowing").style.display = "none";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";
	}

}
