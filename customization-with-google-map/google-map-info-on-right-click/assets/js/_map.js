  var map, marker, infoWindow, infowindow, _latitude, _longitude, _TimeZoneName, _utcTime, _localTime, getfavVal;
  var markersArray = [];

  function initMap() {
      infowindow = new google.maps.InfoWindow();
      var latlng = new google.maps.LatLng(0, 0);
      var myOptions = {
          zoom: 2,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
      google.maps.event.addListener(map, "rightclick", function(event) {

          _placeMarker(event.latLng);
          setTimeout(function() {
              infoWindow.open(map, marker)
          }, 1000);

      });
  }

  function _placeMarker(location) {
      getfavVal = location;
      var infoWindowContent = "";
      _deleteOverlays();
      _latitude = location.lat();
      _longitude = location.lng();
      marker = new google.maps.Marker({
          position: location,
          map: map
      });
      markersArray.push(marker);
      $.ajax({
          url: "https://maps.googleapis.com/maps/api/timezone/json?location=" + _latitude + "," + _longitude + "&timestamp=" + (Math.round((new Date().getTime()) / 1000)).toString() + "&sensor=false",
      }).done(function(response) {
          if (response.timeZoneId != null) {
              _TimeZoneName = response.timeZoneName;
              var d = new Date();
              var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

              var nd = new Date(utc + (1000 * response.rawOffset));
              var _nd = new Date(utc)
              _utcTime = _nd.toLocaleString();
              _utcTime = _utcTime.split(" ");
              _utcTime = _utcTime[1] + " " + _utcTime[2];
              _localTime = nd.toLocaleString();
              _localTime = _localTime.split(" ");
              _localTime = _localTime[1] + " " + _localTime[2];
          } else {

          }
          infoWindowContent = '<div class="info_content"><span><b>Longitude</b>:' + _longitude + '</span><br><span><b>Latitude</b>:' + _latitude + '</span><br><span><b>TimeZone</b>:' + _TimeZoneName + '</span><br><span><b>UTC</b>:' + _utcTime + '</span><br><span><b>Local Time</b>:' + _localTime + '</span></div>';
          infoWindow = new google.maps.InfoWindow({
              content: infoWindowContent
          });
      });
  }

  function _deleteOverlays() {
      if (markersArray) {
          for (i in markersArray) {
              markersArray[i].setMap(null);
          }
          markersArray.length = 0;
      }
  }