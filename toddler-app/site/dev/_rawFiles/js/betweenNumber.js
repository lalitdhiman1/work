var _randomNumber = Math.floor(Math.random() * 51) + 0;

function assignNumber($randomNumber) {
	document.getElementById("firstDivBet").innerHTML = $randomNumber;
	document.getElementById("thirdDivBet").innerHTML = $randomNumber + 2;
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("enterNumberBet").focus();
}

function $tryAgain() {
	document.getElementById("tick-cross").style.display = "none";
	document.getElementById("tick-ok").style.display = "none";
	document.getElementById("star-glowing").style.display = "none";
	document.getElementById("try-again").style.display = "none";
	document.getElementById("submit").style.display = "block";
	document.getElementById("enterNumberBet").value = "";
	document.getElementById("enterNumberBet").className = "";
	_randomNumber = Math.floor(Math.random() * 51) + 0;
	assignNumber(_randomNumber);
	document.getElementById("enterNumberBet").focus();
} 
assignNumber(_randomNumber)

function $checkNumber() {

if(document.getElementById("enterNumberBet").value==""){
	document.getElementById("enterNumberBet").focus();
	return false;
}
	var _checkNumber = _randomNumber + 1;
	if (document.getElementById("enterNumberBet").value == _checkNumber) {
		document.getElementById("tick-ok").style.display = "block";
		document.getElementById("star-glowing").style.display = "block";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";

	} else {
		document.getElementById("enterNumberBet").value = _checkNumber;
		document.getElementById("enterNumberBet").className = "errorTxt";
		document.getElementById("tick-cross").style.display = "block";
		document.getElementById("tick-ok").style.display = "none";
		document.getElementById("star-glowing").style.display = "none";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";
	}

}
