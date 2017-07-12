
var map, directionDisplay,xmlData,geocoder,startMarker,visual_radius,max_distance,start_marker_bounds;
var markerArray = [];
var infoWindowArray = [];
var latlngArray = [];
var directionsService = new google.maps.DirectionsService();
var main_point_lat = 21.0000;
var main_point_long = 78.0000;
var max_markers = 100;
var x_main_point_lat = "";
var x_main_point_long = "";

function checkKeycode(e) {
    var keycode;
    if (window.event) keycode = window.event.keyCode;
    else if (e) keycode = e.which;
    if (keycode == 13) {
        mapSearch();
        void(0);
    }
}
function init() {
    initXML("data/data.xml");
}

function clearText(thefield) {
    if (thefield.defaultValue == thefield.value) {
        thefield.value = "";
    } else if ("" == thefield.value) {
        thefield.value = thefield.defaultValue;
    }
}

function initXML(xmlUrlTemp) {
    $.ajax({
        type: "GET",
        url: xmlUrlTemp,
        dataType: "xml",
        success: xmlSuccess,
        error: xmlError
    });
}

function xmlSuccess(xml) {
    xmlData = xml;
    mapInit()
    $("#map-canvas").addClass('no-bg');
}

function xmlError() {}

function mapInit() {
    var direction_marker_options = {
        clickable: false,
        flat: true,
        zIndex: 99999

    }
    var directionOptions = {
        suppressMarkers: false,
        suppressInfoWindows: true,
        draggable: false,
        markerOptions: direction_marker_options
    }
    directionsDisplay = new google.maps.DirectionsRenderer(directionOptions);
    directionsDisplay.setPanel(document.getElementById("direction-container"));

    geocoder = new google.maps.Geocoder();
    var myOptions = {
        zoom: 4,
        center: new google.maps.LatLng(main_point_lat, main_point_long),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
    $(".form-div").fadeIn();
}
var retailerName = window.location.href;
if (retailerName.indexOf("?retailer=") != -1) {
    retailerName = retailerName.split("?retailer=");
    retailerName = retailerName[1];
    if (retailerName.indexOf("#") != -1) {
        retailerName = retailerName.split("#");
        retailerName = retailerName[0];
    }
    if (retailerName == "") {
        retailerName = "all";
    }

} else {
    retailerName = "all";
}

function createAllMarkers() {

    var tempMarkerArray = [];
    infoWindowArray = [];
    

    $(xmlData).find('entry').each(function(ii) {
         
        var mark_address = $(this).find("address").text();
        var mark_points = new google.maps.LatLng($(this).find("lat").text(), $(this).find("lng").text());
        var marker_distance = google.maps.geometry.spherical.computeDistanceBetween(start_marker_bounds, mark_points);
        if (marker_distance <= max_distance) {
            var mark_text = (mark_address != "") ? "<p>" + mark_address + "</p>" : "";

            tempMarkerArray.push([marker_distance, mark_points, mark_text]);
        }

        if (markerArray.length >= max_markers) {
            return false
        }

    });




    tempMarkerArray.sortByNum();

    for (var mi = 0; mi < tempMarkerArray.length; mi++) {
        mapIcon = "img/marker.png";
        createIndividualMarker(tempMarkerArray[mi][1], tempMarkerArray[mi][2], mi, mapIcon);
    }

    zoomToAllMarkers()
    showResults();
}

Array.prototype.sortByNum = function() {
    for (i = 0; i < this.length; i++) {
        for (j = i + 1; j < this.length; j++) {
            if (Number(this[i][0]) > Number(this[j][0])) {
                tempValue = this[j];
                this[j] = this[i];
                this[i] = tempValue;
            }
        }
    }
}


function createIndividualMarker(points, mark_text, index, baloonImage) {

    var strposition = (index + 1) + "";

    var marker = new google.maps.Marker({
        position: points,
        map: map,
        icon: new google.maps.MarkerImage(baloonImage)
    });


    var infowindow = new google.maps.InfoWindow({});
    var windowContent = mark_text + "<p><a href='javascript:void(0)' style='margin-top:5px;' onclick='getDirections" + points + "'>Get Driving Directions</a></p>";
    var arrayContent = "<div class='result-info-click' onclick='openInfoWindo(" + index + ")'>" + mark_text + "</div>" + "<a href='javascript:void(0)' onclick='getDirections" + points + "'>Get Driving Directions</a>";
    infowindow.setContent(windowContent)

    infoWindowArray.push([infowindow, arrayContent])

    google.maps.event.addListener(marker, 'click', function() {
        openInfoWindo(index)
    });

    markerArray.push(marker);
}

function openInfoWindo(index) {
    var markerLength = infoWindowArray.length;

    for (var ii = 0; ii < markerLength; ii++) {
        infoWindowArray[ii][0].close();
    }

    infoWindowArray[index][0].open(map, markerArray[index]);
}

function removeMarkers() {
    //debug.add("-> Removing all markers")
    var markerLength = markerArray.length;
    for (var ii = 0; ii < markerLength; ii++) {
        markerArray[ii].setMap(null);
    }
    markerArray = [];
}


function showResults(howManyTemp) {
    $(".headingh2").html('Near by locations');
    var finalHTML = "";
    if (howManyTemp != 0) {
        if (infoWindowArray.length < 1) {
            finalHTML = "";
        }
        var howMany = howManyTemp || 3;
        if (infoWindowArray.length < howMany) {

            howMany = infoWindowArray.length;
        } else {

        }

        for (var ii = 0; ii < howMany; ii++) {
            
            finalHTML += "<li>";
            finalHTML += "<div class='content-list'>" + infoWindowArray[ii][1] + "</div>";
            finalHTML += "</li>";

        }

    }
    $("#result-container").fadeIn();
    $(".result-container").html(finalHTML)
}

function createStartMarker(point, title, distance) {
    removeMarkers();
    showResults(0)
    showDirection(false);
    if (startMarker != undefined) {
        //remove
        startMarker.setMap(null);
        visual_radius.setMap(null);
    }

    startMarker = new StyledMarker({
        styleIcon: new StyledIcon(StyledIconTypes.MARKER, {
            color: "ffffff",
            text: "A"
        }),
        map: map,
        position: point,
        title: 'Start Point',
        strokeColor: "#050b4d",
        strokeWeight: 2,
        draggable: true
    });


    startMarker.setAnimation(google.maps.Animation.DROP);
    max_distance = parseFloat(distance) * 1;

    visual_radius = new google.maps.Circle({
        map: map,
        radius: max_distance,
        fillColor: "#ffffff",
        strokeColor: "#050b4d",
        strokeWeight: 2,
        fillOpacity: .4
    });
    visual_radius.bindTo('center', startMarker, 'position');
    start_marker_bounds = startMarker.getPosition();
    google.maps.event.addListener(startMarker, 'dragend', function() {
        createStartMarker(startMarker.getPosition(), "Starting Position", max_distance)
    });

    createAllMarkers()
}

function zoomToAllMarkers() {
    var bounds = new google.maps.LatLngBounds(start_marker_bounds);
    for (var i = 0; i < markerArray.length; i++) {
        bounds.extend(markerArray[i].getPosition());
    }
    map.fitBounds(bounds);
}

//searching
var main_qzip;
var isnum;

function mapSearch() {

    var qzip = document.getElementById("query-zip").value;
    main_qzip = document.getElementById("query-zip").value;
    var qdistance = document.getElementById("query-distance").value;

    if (qzip.length < 5) {
        alert("Please enter valid zip code.");
        return false;
    } else if (qzip) {

        geocoder.geocode({
            'address': qzip,
            'bounds': map.getBounds()
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                createStartMarker(results[0].geometry.location, "Starting Position", qdistance)
            } else {
                alert("We could not understand the location '" + qzip + "'. Please enter a valid zip code.");
            }
        });
    } else {

        alert("Please enter valid zip code");
        return false;
    }

}

function getDirections(endMarkerLat, endMarkerLng) {
    var start = startMarker.getPosition();
    var end = new google.maps.LatLng(endMarkerLat, endMarkerLng);
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            showDirection(true);
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById("direction-container"));
            directionsDisplay.setDirections(response);
        }
    });
}

function showDirection(showOn) {
    if (showOn) {
        $("#map-canvas").addClass("split");
        $("#direction-container").show();
        smoothScroll("#direction-container")

    } else {
        $("#map-canvas").removeClass("split");
        $("#direction-container").hide();
        directionsDisplay.setMap(null);
        directionsDisplay.setPanel(null);
    }
    google.maps.event.trigger(map, "resize");
}


function smoothScroll(scrollWhere, duration) {
    var $duration = (duration != undefined) ? duration : 500;
    var targetOffset = $(scrollWhere).offset();
    var scrollTo = targetOffset.top - 60;
    $('html, body').animate({
        scrollTop: scrollTo
    }, $duration);
}




$(function() {
    init();

});
