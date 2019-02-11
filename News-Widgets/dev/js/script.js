var _endpointsArr = ['top-headlines', 'everything'];
var _apiKey = '70828934161147718da85cb0d137fa57';
var _apiURL = 'https://newsapi.org/v2/';


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

function getUrl(urlEndPoints, _apiURL, _endpointsArr, _apiKey, callback) {
    if (urlEndPoints == 'top-headlines') {
        var $changeUrl = _apiURL + 'sources' + '?apiKey=' + _apiKey;
        var $data = "";
        ajax_get($changeUrl, function (data) {
            callback(data);
        });

    } else if (urlEndPoints == 'everything') {
        var $changeUrl = _apiURL + 'sources' + '?apiKey=' + _apiKey;
        var $data = "";
        ajax_get($changeUrl, function (data) {
            callback(data);
        });
    }
}




$(function () {

    $('select.endpoints').formSelect();

    $('select.endpoints').on('change', function () {
        $("#latestNews").empty();
        $(".blackOverlay, .spinnerLoader").fadeIn();

        var $val = $(this).val() - 1;

        if (_endpointsArr[$val] == "top-headlines") {
            var $valOption = "";
            var $changeUrl = _apiURL + _endpointsArr[$val] + '?apiKey=' + _apiKey;
            getUrl(_endpointsArr[$val], _apiURL, _endpointsArr[$val], _apiKey, function (data) {
                for (var i = 0; i < data.sources.length; i++) {
                    $valOption += '<option value="' + data.sources[i].country + '">' + data.sources[i].name + '</option>';
                }
                $("div.chooseNews").html(`<div class="input-field"><select class="chooseNews">
                <option value="" disabled selected>Choose your option</option>
            </select>
            <label class="chooseLabel">Choose</label></div>`)
                $("select.chooseNews").append($valOption);
                $("select.chooseNews").formSelect();
                $("div.chooseNews").show();
                $(".blackOverlay, .spinnerLoader").fadeOut();
            })
        }
        if (_endpointsArr[$val] == "everything") {

            $valOption = `<div class="inputSearch inline input-field">
            <input placeholder="Search Item" id="search_item" type="text" class="validate">  
            <a class="btn-floating btn waves-effect waves-light red" id="start-record-btn"><i class="material-icons">mic_none</i></a>
            <label for="search_item">Search Item</label>
            </div>
            <button class="btn waves-effect waves-light  red darken-1 submit-button" type="button"  name="action">Submit
            <i class="material-icons right">send</i>
          </button>
            `;

            $("div.chooseNews").html($valOption);
            M.updateTextFields();
            $("div.chooseNews").show();
            $(".blackOverlay, .spinnerLoader").fadeOut();
        }

    })

    $(document).on('change', 'select.chooseNews', function () {
        $(".blackOverlay, .spinnerLoader").fadeIn();
        var chooseNewsVar = "";
        ajax_get(_apiURL + _endpointsArr[0] + '?country=' + $(this).val() + '&apiKey=' + _apiKey, function (data) {
            //console.log(data)
            for (var i = 0; i < data.articles.length; i++) {
                var $mainContent = data.articles[i].content;
                var $mainContentImage = data.articles[i].urlToImage;

                if (!$mainContent) {
                    $mainContent = data.articles[i].description
                }
                if (!$mainContentImage) {
                    $mainContentImage = "./images/default-image.png"
                }
                chooseNewsVar += `
                    <div class="col s4 carouselItem">
                        <div class="card" style="background-image:url(` + $mainContentImage + `)">
                            <div class="card-content white-text">
                                <span class="card-title">` + data.articles[i].title + `</span>
                                <p>` + $mainContent + `</p>
                            </div>
                            <div class="card-action">
                                <p><strong>Resource</strong>: ` + data.articles[i].source.name + `</p>
                            </div>
                        </div>

                </div>`;
            }
            document.getElementById('latestNews').innerHTML = chooseNewsVar;
            $(".blackOverlay, .spinnerLoader").fadeOut();
            //$('.carousel').masonry();
        });

    })

    $(document).on('click', '.submit-button', function () {
        $(".blackOverlay, .spinnerLoader").fadeIn();
        var chooseNewsVar = "";
        ajax_get(_apiURL + _endpointsArr[1] + '?q=' + $("#search_item").val() + '&apiKey=' + _apiKey, function (data) {
            for (var i = 0; i < data.articles.length; i++) {
                var $mainContent = data.articles[i].content;
                var $mainContentImage = data.articles[i].urlToImage;
                if (!$mainContent) {
                    $mainContent = data.articles[i].description
                }
                if (!$mainContentImage) {
                    $mainContentImage = "./images/default-image.png"
                }
                chooseNewsVar += `
                    <div class="col s4 carouselItem">
                        <div class="card" style="background-image:url(` + $mainContentImage + `)">
                            <div class="card-content white-text">
                                <span class="card-title">` + data.articles[i].title + `</span>
                                <p>` + $mainContent + `</p>
                            </div>
                            <div class="card-action">
                                <p><strong>Resource</strong>: ` + data.articles[i].source.name + `</p>
                            </div>
                        </div>

                </div>`;
            }
            document.getElementById('latestNews').innerHTML = chooseNewsVar;
            $(".blackOverlay, .spinnerLoader").fadeOut();
            //$('.carousel').masonry();
        });


    })

    $(document).on('click', '#nav-mobile li a', function () {
        var $className = $(this).attr('class');
        console.log($className)
        if ($className == "masonary") {
            $('#latestNews').removeClass('carousel');
            $('.carouselItem').removeClass('carousel-item');
            $('.carouselItem').removeAttr("style");
            $('.carousel').removeAttr("style");
            $('.carousel').masonry();

        } else if ($className == "masonary-carousel") {
            $('#latestNews').addClass('carousel');
            $('.carouselItem').addClass('carousel-item');
            $('.carousel').removeAttr("style");


            $('.carousel').carousel({
                dist: -150,
                indicators: true
            });
        }
    })

})