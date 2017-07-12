var _randomAlphaAfter = Math.floor(Math.random() * 24) + 65;

function assignNumberAfter($randomAlphaAfter) {
	document.getElementById("firstDivAfter").innerHTML = String.fromCharCode($randomAlphaAfter);
	document.getElementById("secondDivAfter").innerHTML = String.fromCharCode($randomAlphaAfter + 1);
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("enterAlphaAfter").focus();
}

function $tryAgainAfterAlpha() {
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("tick-ok").style.display = "none";
	document.getElementById("star-glowing").style.display = "none";
	document.getElementById("try-again").style.display = "none";
	document.getElementById("submit").style.display = "block";
	document.getElementById("enterAlphaAfter").value = "";
	document.getElementById("enterAlphaAfter").className = "";
	_randomAlphaAfter = Math.floor(Math.random() * 24) + 65;
	assignNumberAfter(_randomAlphaAfter);
	document.getElementById("enterAlphaAfter").focus();
}
assignNumberAfter(_randomAlphaAfter)

function $checkAlphaAfter() {

if(document.getElementById("enterAlphaAfter").value==""){
	document.getElementById("enterAlphaAfter").focus();
	return false;
}
	var _checkNumber = String.fromCharCode(_randomAlphaAfter + 2);
	if (document.getElementById("enterAlphaAfter").value == _checkNumber) {
		document.getElementById("tick-ok").style.display = "block";
		document.getElementById("star-glowing").style.display = "block";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";

	} else {
		document.getElementById("enterAlphaAfter").value = _checkNumber;
		document.getElementById("enterAlphaAfter").className = "errorTxt";
		document.getElementById("tick-cross").style.display = "block";
		document.getElementById("tick-ok").style.display = "none";
		document.getElementById("star-glowing").style.display = "none";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";
	}

}
