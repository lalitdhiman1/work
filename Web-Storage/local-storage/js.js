var _key, _val = "";
var getStorageVal = function() {
    _key = document.getElementById("key").value;
    _val = document.getElementById("value").value;
    if (_key != "" && _val != "") {
        localStorage.setItem(_key, _val);
    } else {
        alert("please enter valid values in input");
        return false;
    }
    document.getElementById("retrieve").style.display = "block"
}


var retStorageVal = function() {
    document.getElementById("getresult").innerHTML = "<span>You entered 'VALUE' <strong>" + localStorage.getItem(_key) + "</strong> for 'KEY' <strong>" + _key + "</strong></span>"
}