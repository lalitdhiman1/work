var _randomNumberAfter = Math.floor(Math.random() * 51) + 0;

function assignNumberAfter($randomNumberAfter) {
	document.getElementById("firstDivAfter").innerHTML = $randomNumberAfter;
	document.getElementById("secondDivAfter").innerHTML = $randomNumberAfter + 1;
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("enterNumberAfter").focus();
}

function $tryAgainAfter() {
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("tick-ok").style.display = "none";
	document.getElementById("star-glowing").style.display = "none";
	document.getElementById("try-again").style.display = "none";
	document.getElementById("submit").style.display = "block";
	document.getElementById("enterNumberAfter").value = "";
	document.getElementById("enterNumberAfter").className = "";
	_randomNumberAfter = Math.floor(Math.random() * 51) + 0;
	assignNumberAfter(_randomNumberAfter);
	document.getElementById("enterNumberAfter").focus();
}
assignNumberAfter(_randomNumberAfter)

function $checkNumberAfter() {

if(document.getElementById("enterNumberAfter").value==""){
	document.getElementById("enterNumberAfter").focus();
	return false;
}
	var _checkNumber = _randomNumberAfter + 2;
	if (document.getElementById("enterNumberAfter").value == _checkNumber) {
		document.getElementById("tick-ok").style.display = "block";
		document.getElementById("star-glowing").style.display = "block";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";

	} else {
		document.getElementById("enterNumberAfter").value = _checkNumber;
		document.getElementById("enterNumberAfter").className = "errorTxt";
		document.getElementById("tick-cross").style.display = "block";
 		document.getElementById("tick-ok").style.display = "none";
		document.getElementById("star-glowing").style.display = "none";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";
	}

}
