var _randomNumberBef = Math.floor(Math.random() * 51) + 0;

function assignNumberBefore($randomNumberBefore) {
	document.getElementById("secondDivBefore").innerHTML = $randomNumberBefore;
	document.getElementById("thirdDivBefore").innerHTML = $randomNumberBefore + 1;
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("enterNumberBefore").focus();
}

function $tryAgainBefore() {
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("tick-ok").style.display = "none";
	document.getElementById("star-glowing").style.display = "none";
	document.getElementById("try-again").style.display = "none";
	document.getElementById("submit").style.display = "block";
	document.getElementById("enterNumberBefore").value = "";
	document.getElementById("enterNumberBefore").className = "";
	_randomNumberBef = Math.floor(Math.random() * 51) + 0;
	assignNumberBefore(_randomNumberBef);
	document.getElementById("enterNumberBefore").focus();
}
assignNumberBefore(_randomNumberBef)

function $checkNumberBefore() {

if(document.getElementById("enterNumberBefore").value==""){
	document.getElementById("enterNumberBefore").focus();
	return false;
}
	var _checkNumber = _randomNumberBef - 1;
	if (document.getElementById("enterNumberBefore").value == _checkNumber) {
		document.getElementById("tick-ok").style.display = "block";
		document.getElementById("star-glowing").style.display = "block";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";

	} else {
		document.getElementById("enterNumberBefore").value = _checkNumber;
		document.getElementById("enterNumberBefore").className = "errorTxt";
		document.getElementById("tick-cross").style.display = "block";
		document.getElementById("tick-ok").style.display = "none";
		document.getElementById("star-glowing").style.display = "none";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";
	}

}
