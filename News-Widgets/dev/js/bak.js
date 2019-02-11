$(function () {
    var $latestNews = document.querySelector('#latestNews')
    var $_url = 'https://newsapi.org/v2/everything?q=bcci&from=2019-01-07&sortBy=publishedAt&apiKey=70828934161147718da85cb0d137fa57';

    function ajax_get(url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    var data = JSON.parse(xmlhttp.responseText);
                } catch (err) {
                    console.log(err.message + " in " + xmlhttp.responseText);
                    return;
                }
                callback(data);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    ajax_get($_url, function (data) {
        console.log(data)
    });
    $('select').formSelect();

})
