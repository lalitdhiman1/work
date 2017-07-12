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
		document.getElementById("enterNumberAfter").value = "";
		document.getElementById("tick-cross").style.display = "block";
		document.getElementById("tick-ok").style.display = "none";
		document.getElementById("star-glowing").style.display = "none";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";
	}

}

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
		document.getElementById("enterNumberBefore").value = "";
		document.getElementById("tick-cross").style.display = "block";
		document.getElementById("tick-ok").style.display = "none";
		document.getElementById("star-glowing").style.display = "none";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";
	}

}

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
		document.getElementById("enterNumberBet").value = "";
		document.getElementById("tick-cross").style.display = "block";
		document.getElementById("tick-ok").style.display = "none";
		document.getElementById("star-glowing").style.display = "none";
		document.getElementById("try-again").style.display = "block";
		document.getElementById("submit").style.display = "none";
	}

}

 
