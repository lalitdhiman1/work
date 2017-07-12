var _randomAlpha = Math.floor(Math.random() * 24) + 65;
 
function assignAlpha($randomAlpha) {
	document.getElementById("firstDivBet").innerHTML = String.fromCharCode($randomAlpha);
	document.getElementById("thirdDivBet").innerHTML = String.fromCharCode($randomAlpha+2)
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("enterAlphaBet").focus();
}

function $tryAgainAlpha() {
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("tick-ok").style.display = "none";
	document.getElementById("star-glowing").style.display = "none";
	document.getElementById("try-again").style.display = "none";
	document.getElementById("submit").style.display = "block";
	document.getElementById("enterAlphaBet").value = "";
	document.getElementById("enterAlphaBet").className = "";
	_randomAlpha = Math.floor(Math.random() * 24) + 65;
	assignAlpha(_randomAlpha);
	document.getElementById("enterAlphaBet").focus();
} 
assignAlpha(_randomAlpha)

function $checkAlpha() {

if(document.getElementById("enterAlphaBet").value==""){
	document.getElementById("enterAlphaBet").focus();
	return false;
}
	var _checkAlpha = String.fromCharCode(_randomAlpha + 1);
	if (document.getElementById("enterAlphaBet").value.toUpperCase() == _checkAlpha) {
		document.getElementById("tick-ok").style.display = "block";
		document.getElementById("star-glowing").style.display = "block";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";

	} else {
		document.getElementById("enterAlphaBet").value = _checkAlpha;
		document.getElementById("enterAlphaBet").className = "errorTxt";
		document.getElementById("tick-cross").style.display = "block";
		document.getElementById("tick-ok").style.display = "none";
		document.getElementById("star-glowing").style.display = "none";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";
	}

}
