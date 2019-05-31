var lat;
var longitude;


window.setInterval(function() {
  //This is for main page current location
  if (navigator.geolocation == undefined) {
    alert("Gelocation undefined");
  } else {
    navigator.geolocation.getCurrentPosition(userLocated, LocationError);

    function userLocated(position) {
      lat = position.coords.latitude;
      longitude = position.coords.longitude;
      //Assigning temporary storage
      localStorage.setItem('lat', lat);
      localStorage.setItem('longitude', longitude);
    }

    function LocationError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Permission Denied-" + error.message);
          break;

        case error.POSITION_UNAVAILABLE:
          alert("Request Time out-" + error.message);

      }
    }
  }
}, 2000);

//CODE FOR HOME FUNCTIONALITY
$(document).ready(function() {
  //Displaying homepage and hidding all other divs
  $("#home1").tap(function() {
    $("#policeview").hide("fast");
    $("#fireview").hide("fast");
    $("#hospitalview").hide("fast");
    $("#busview").hide("fast");
    $("#atmview").hide("fast");
    $("#municipalityview").hide("fast");
    $("#bankview").hide("fast");
    $("#postview").hide("fast");
    $("#gasview").hide("fast");
    $("#titl").show("fast");
    $("#temp").hide("fast");
    $("#buttongroup").show("fast");
  });
  //POLICE STATIONS
  $("#police").tap(function() {
    $("#buttongroup").hide("fast");
    $("#policeview").show("fast");
    $("#titl").hide("fast");
    $("#temp").show("fast");
    //TEMPERATURE FUNC
    getemp();
    var api_url = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + lat + "," + longitude + "&q=policestation&app_id=6HK4rI7nJG7U70E3sSlb&app_code=ojkRjUzTEJR5VLyGobiRIQ";
    $(".content a").each(function(index, element) {
      console.log($(this).text());
    })
    $.ajax({
      url: api_url,
      contentType: "application/json",
      dataType: 'json',
      success: function(data) {
        console.log(data);
        var i;
        var a = [];
        var b = [];
        var c = [];
        for (i = 0; i < data.results.length; i++) {
          //Ensuring that values returned by API are not void
          if (data.results[i].position != null) {
            a[i] = data.results[i].position[0];
            b[i] = data.results[i].position[1];
            c[i] = data.results[i].title;
          }
        }
        var mymap = L.map('policeview').setView([lat, longitude], 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 19,
          attribution: 'Map data &copy;' +
            '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
            'contributors,<a href="https://creativecommons.org/licenses' +
            '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://' +
            'www.mapbox.com/">Mapbox</a>',
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc' +
            'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        }).addTo(mymap);
        //Populating markers on the MAP
        var marker = [];
        var one;
        for (one = 0; one < data.results.length; one++) {
          if (a[one] != null) {
            //Limits Results to Mauritius Only & near to user
            var latlower = parseFloat(lat) - 0.09;
            var latupper = parseFloat(lat) + 0.09;
            var longlower = parseFloat(longitude) - 0.09;
            var longupper = parseFloat(longitude) + 0.09;
            if ((parseFloat(a[one]) >= latlower) && (parseFloat(a[one]) <= latupper)) {
              if ((parseFloat(b[one]) >= longlower) && (parseFloat(b[one]) <= longupper)) {
                marker[one] = L.marker([a[one], b[one]]).on('click', shortroute).addTo(mymap);
                marker[one].bindPopup(c[one]).openPopup();
              }
            }
          }
        }
        //ADDING NAVIGATION TO MAP still beta
        function shortroute(e) {
          L.Routing.control({
            waypoints: [
              L.latLng(lat, longitude),
              L.latLng(e.latlng.lat, e.latlng.lng)
            ]
          }).addTo(mymap);
        }
      }
    });

  });
  //FIRE STATTION
  $("#fire").tap(function() {
    $("#buttongroup").hide("fast");
    $("#fireview").show("fast");
    $("#titl").hide("fast");
    $("#temp").show("fast");
    //TEMPERATURE FUNC
    getemp();
    var api = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + lat + "," + longitude + "&q=mauritiusfire&app_id=6HK4rI7nJG7U70E3sSlb&app_code=ojkRjUzTEJR5VLyGobiRIQ";
    $.getJSON(api, function(data) {
      console.log(data);
      var i;
      var a = [];
      var b = [];
      var c = [];
      for (i = 0; i < data.results.length; i++) {
        //Ensuring that values returned by API are not void
        if (data.results[i].position != null) {
          a[i] = data.results[i].position[0];
          b[i] = data.results[i].position[1];
          c[i] = data.results[i].title;
        }

      }
      var mymap = L.map('fireview').setView([lat, longitude], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 19,
        attribution: 'Map data &copy;' +
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
          'contributors,<a href="https://creativecommons.org/licenses' +
          '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://' +
          'www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc' +
          'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
      }).addTo(mymap);
      //Populating markers on the MAP
      var marker = [];
      var one;
      for (one = 0; one < data.results.length; one++) {
        if (a[one] != null) {
          //Limits Results to Mauritius Only & near to user
          var latlower = parseFloat(lat) - 0.09;
          var latupper = parseFloat(lat) + 0.09;
          var longlower = parseFloat(longitude) - 0.09;
          var longupper = parseFloat(longitude) + 0.09;
          if ((parseFloat(a[one]) >= latlower) && (parseFloat(a[one]) <= latupper)) {
            if ((parseFloat(b[one]) >= longlower) && (parseFloat(b[one]) <= longupper)) {
              marker[one] = L.marker([a[one], b[one]]).on('click', shortroute).addTo(mymap);
              marker[one].bindPopup(c[one]).openPopup();
            }
          }
        }
      }
      //ADDING NAVIGATION TO MAP still beta
      function shortroute(e) {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
          ]
        }).addTo(mymap);
      }
    });
  });
  //HOSPITAL
  $("#hospital").tap(function() {
    $("#buttongroup").hide("fast");
    $("#hospitalview").show("fast");
    $("#titl").hide("fast");
    $("#temp").show("fast");
    //TEMPERATURE FUNC
    getemp();
    var api = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + lat + "," + longitude + "&q=hospital&app_id=6HK4rI7nJG7U70E3sSlb&app_code=ojkRjUzTEJR5VLyGobiRIQ";
    $.getJSON(api, function(data) {
      console.log(data);
      var i;
      var a = [];
      var b = [];
      var c = [];
      for (i = 0; i < data.results.length; i++) {
        //Ensuring that values returned by API are not void
        if (data.results[i].position != null) {
          a[i] = data.results[i].position[0];
          b[i] = data.results[i].position[1];
          c[i] = data.results[i].title;
        }

      }
      var mymap = L.map('hospitalview').setView([lat, longitude], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 19,
        attribution: 'Map data &copy;' +
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
          'contributors,<a href="https://creativecommons.org/licenses' +
          '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://' +
          'www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc' +
          'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
      }).addTo(mymap);
      //Populating markers on the MAP
      var marker = [];
      var one;
      for (one = 0; one < data.results.length; one++) {
        if (a[one] != null) {
          //Limits Results to Mauritius Only & near to user
          var latlower = parseFloat(lat) - 0.09;
          var latupper = parseFloat(lat) + 0.09;
          var longlower = parseFloat(longitude) - 0.09;
          var longupper = parseFloat(longitude) + 0.09;
          if ((parseFloat(a[one]) >= latlower) && (parseFloat(a[one]) <= latupper)) {
            if ((parseFloat(b[one]) >= longlower) && (parseFloat(b[one]) <= longupper)) {
              marker[one] = L.marker([a[one], b[one]]).on('click', shortroute).addTo(mymap);
              marker[one].bindPopup(c[one]).openPopup();
            }
          }
        }
      }
      //ADDING NAVIGATION TO MAP still beta
      function shortroute(e) {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
          ]
        }).addTo(mymap);
      }
    });
  });
  //BUS STOP
  $("#busstop").tap(function() {
    $("#buttongroup").hide("fast");
    $("#busview").show("fast");
    $("#titl").hide("fast");
    $("#temp").show("fast");
    //TEMPERATURE FUNC
    getemp();
    var api = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + lat + "," + longitude + "&q=busstation&app_id=6HK4rI7nJG7U70E3sSlb&app_code=ojkRjUzTEJR5VLyGobiRIQ";
    $.getJSON(api, function(data) {
      console.log(data);
      var i;
      var a = [];
      var b = [];
      var c = [];
      for (i = 0; i < data.results.length; i++) {
        //Ensuring that values returned by API are not void
        if (data.results[i].position != null) {
          a[i] = data.results[i].position[0];
          b[i] = data.results[i].position[1];
          c[i] = data.results[i].title;
        }

      }
      var mymap = L.map('busview').setView([lat, longitude], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 19,
        attribution: 'Map data &copy;' +
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
          'contributors,<a href="https://creativecommons.org/licenses' +
          '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://' +
          'www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc' +
          'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
      }).addTo(mymap);
      //Populating markers on the MAP
      var marker = [];
      var one;
      for (one = 0; one < data.results.length; one++) {
        if (a[one] != null) {
          //Limits Results to Mauritius Only & near to user
          var latlower = parseFloat(lat) - 0.09;
          var latupper = parseFloat(lat) + 0.09;
          var longlower = parseFloat(longitude) - 0.09;
          var longupper = parseFloat(longitude) + 0.09;
          if ((parseFloat(a[one]) >= latlower) && (parseFloat(a[one]) <= latupper)) {
            if ((parseFloat(b[one]) >= longlower) && (parseFloat(b[one]) <= longupper)) {
              marker[one] = L.marker([a[one], b[one]]).on('click', shortroute).addTo(mymap);
              marker[one].bindPopup(c[one]).openPopup();
            }
          }
        }
      }
      //ADDING NAVIGATION TO MAP still beta
      function shortroute(e) {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
          ]
        }).addTo(mymap);
      }
    });
  });
  //ATMs
  $("#atm").tap(function() {
    $("#buttongroup").hide("fast");
    $("#atmview").show("fast");
    $("#titl").hide("fast");
    $("#temp").show("fast");
    //TEMPERATURE FUNC
    getemp();
    var api = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + lat + "," + longitude + "&q=atm&app_id=6HK4rI7nJG7U70E3sSlb&app_code=ojkRjUzTEJR5VLyGobiRIQ";
    $.getJSON(api, function(data) {
      console.log(data);
      var i;
      var a = [];
      var b = [];
      var c = [];
      for (i = 0; i < data.results.length; i++) {
        //Ensuring that values returned by API are not void
        if (data.results[i].position != null) {
          a[i] = data.results[i].position[0];
          b[i] = data.results[i].position[1];
          c[i] = data.results[i].title;
        }

      }
      var mymap = L.map('atmview').setView([lat, longitude], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 19,
        attribution: 'Map data &copy;' +
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
          'contributors,<a href="https://creativecommons.org/licenses' +
          '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://' +
          'www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc' +
          'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
      }).addTo(mymap);
      //Populating markers on the MAP
      var marker = [];
      var one;
      for (one = 0; one < data.results.length; one++) {
        if (a[one] != null) {
          //Limits Results to Mauritius Only & near to user
          var latlower = parseFloat(lat) - 0.09;
          var latupper = parseFloat(lat) + 0.09;
          var longlower = parseFloat(longitude) - 0.09;
          var longupper = parseFloat(longitude) + 0.09;
          if ((parseFloat(a[one]) >= latlower) && (parseFloat(a[one]) <= latupper)) {
            if ((parseFloat(b[one]) >= longlower) && (parseFloat(b[one]) <= longupper)) {
              marker[one] = L.marker([a[one], b[one]]).on('click', shortroute).addTo(mymap);
              marker[one].bindPopup(c[one]).openPopup();
            }
          }
        }
      }
      //ADDING NAVIGATION TO MAP still beta
      function shortroute(e) {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
          ]
        }).addTo(mymap);
      }
    });
  });
  //MUNICIPALITY
  $("#muni").tap(function() {
    $("#buttongroup").hide("fast");
    $("#municipalityview").show("fast");
    $("#titl").hide("fast");
    $("#temp").show("fast");
    //TEMPERATURE FUNC
    getemp();
    var api = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + lat + "," + longitude + "&q=municipal&app_id=6HK4rI7nJG7U70E3sSlb&app_code=ojkRjUzTEJR5VLyGobiRIQ";
    $.getJSON(api, function(data) {
      console.log(data);
      var i;
      var a = [];
      var b = [];
      var c = [];
      for (i = 0; i < data.results.length; i++) {
        //Ensuring that values returned by API are not void
        if (data.results[i].position != null) {
          a[i] = data.results[i].position[0];
          b[i] = data.results[i].position[1];
          c[i] = data.results[i].title;
        }

      }
      var mymap = L.map('municipalityview').setView([lat, longitude], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 19,
        attribution: 'Map data &copy;' +
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
          'contributors,<a href="https://creativecommons.org/licenses' +
          '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://' +
          'www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc' +
          'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
      }).addTo(mymap);
      //Populating markers on the MAP
      var marker = [];
      var one;
      for (one = 0; one < data.results.length; one++) {
        if (a[one] != null) {
          //Limits Results to Mauritius Only & near to user
          var latlower = parseFloat(lat) - 0.09;
          var latupper = parseFloat(lat) + 0.09;
          var longlower = parseFloat(longitude) - 0.09;
          var longupper = parseFloat(longitude) + 0.09;
          if ((parseFloat(a[one]) >= latlower) && (parseFloat(a[one]) <= latupper)) {
            if ((parseFloat(b[one]) >= longlower) && (parseFloat(b[one]) <= longupper)) {
              marker[one] = L.marker([a[one], b[one]]).on('click', shortroute).addTo(mymap);
              marker[one].bindPopup(c[one]).openPopup();
            }
          }
        }
      }
      //ADDING NAVIGATION TO MAP still beta
      function shortroute(e) {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
          ]
        }).addTo(mymap);
      }
    });
  });
  //BANK
  $("#bank").tap(function() {
    $("#buttongroup").hide("fast");
    $("#bankview").show("fast");
    $("#titl").hide("fast");
    $("#temp").show("fast");
    //TEMPERATURE FUNC
    getemp();
    var api = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + lat + "," + longitude + "&q=bank&app_id=6HK4rI7nJG7U70E3sSlb&app_code=ojkRjUzTEJR5VLyGobiRIQ";
    $.getJSON(api, function(data) {
      console.log(data);
      var i;
      var a = [];
      var b = [];
      var c = [];
      for (i = 0; i < data.results.length; i++) {
        //Ensuring that values returned by API are not void
        if (data.results[i].position != null) {
          a[i] = data.results[i].position[0];
          b[i] = data.results[i].position[1];
          c[i] = data.results[i].title;
        }

      }
      var mymap = L.map('bankview').setView([lat, longitude], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 19,
        attribution: 'Map data &copy;' +
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
          'contributors,<a href="https://creativecommons.org/licenses' +
          '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://' +
          'www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc' +
          'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
      }).addTo(mymap);
      //Populating markers on the MAP
      var marker = [];
      var one;
      for (one = 0; one < data.results.length; one++) {
        if (a[one] != null) {
          //Limits Results to Mauritius Only & near to user
          var latlower = parseFloat(lat) - 0.09;
          var latupper = parseFloat(lat) + 0.09;
          var longlower = parseFloat(longitude) - 0.09;
          var longupper = parseFloat(longitude) + 0.09;
          if ((parseFloat(a[one]) >= latlower) && (parseFloat(a[one]) <= latupper)) {
            if ((parseFloat(b[one]) >= longlower) && (parseFloat(b[one]) <= longupper)) {
              marker[one] = L.marker([a[one], b[one]]).on('click', shortroute).addTo(mymap);
              marker[one].bindPopup(c[one]).openPopup();
            }
          }
        }
      }
      //ADDING NAVIGATION TO MAP still beta
      function shortroute(e) {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
          ]
        }).addTo(mymap);
      }
    });
  });
  //POST- OFFICE
  $("#post").tap(function() {
    $("#buttongroup").hide("fast");
    $("#postview").show("fast");
    $("#titl").hide("fast");
    $("#temp").show("fast");
    //TEMPERATURE FUNC
    getemp();
    var api = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + lat + "," + longitude + "&q=postoffice&app_id=6HK4rI7nJG7U70E3sSlb&app_code=ojkRjUzTEJR5VLyGobiRIQ";
    $.getJSON(api, function(data) {
      console.log(data);
      var i;
      var a = [];
      var b = [];
      var c = [];
      for (i = 0; i < data.results.length; i++) {
        //Ensuring that values returned by API are not void
        if (data.results[i].position != null) {
          a[i] = data.results[i].position[0];
          b[i] = data.results[i].position[1];
          c[i] = data.results[i].title;
        }

      }
      var mymap = L.map('postview').setView([lat, longitude], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 19,
        attribution: 'Map data &copy;' +
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
          'contributors,<a href="https://creativecommons.org/licenses' +
          '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://' +
          'www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc' +
          'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
      }).addTo(mymap);
      //Populating markers on the MAP
      var marker = [];
      var one;
      for (one = 0; one < data.results.length; one++) {
        if (a[one] != null) {
          //Limits Results to Mauritius Only & near to user
          var latlower = parseFloat(lat) - 0.09;
          var latupper = parseFloat(lat) + 0.09;
          var longlower = parseFloat(longitude) - 0.09;
          var longupper = parseFloat(longitude) + 0.09;
          if ((parseFloat(a[one]) >= latlower) && (parseFloat(a[one]) <= latupper)) {
            if ((parseFloat(b[one]) >= longlower) && (parseFloat(b[one]) <= longupper)) {
              marker[one] = L.marker([a[one], b[one]]).on('click', shortroute).addTo(mymap);
              marker[one].bindPopup(c[one]).openPopup();
            }
          }
        }
      }
      //ADDING NAVIGATION TO MAP still beta
      function shortroute(e) {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
          ]
        }).addTo(mymap);
      }
    });
  });
  //FILLING STATION
  $("#gas").tap(function() {
    $("#buttongroup").hide("fast");
    $("#gasview").show("fast");
    $("#titl").hide("fast");
    $("#temp").show("fast");
    //TEMPERATURE FUNC
    getemp();
    var api = "https://places.cit.api.here.com/places/v1/autosuggest?at=" + lat + "," + longitude + "&q=fillingstation&app_id=6HK4rI7nJG7U70E3sSlb&app_code=ojkRjUzTEJR5VLyGobiRIQ";
    $.getJSON(api, function(data) {
      console.log(data);
      var i;
      var a = [];
      var b = [];
      var c = [];
      for (i = 0; i < data.results.length; i++) {
        //Ensuring that values returned by API are not void
        if (data.results[i].position != null) {
          a[i] = data.results[i].position[0];
          b[i] = data.results[i].position[1];
          c[i] = data.results[i].title;
        }

      }
      var mymap = L.map('gasview').setView([lat, longitude], 13);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 19,
        attribution: 'Map data &copy;' +
          '<a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
          'contributors,<a href="https://creativecommons.org/licenses' +
          '/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://' +
          'www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYyc' +
          'XBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
      }).addTo(mymap);
      //Populating markers on the MAP
      var marker = [];
      var one;
      for (one = 0; one < data.results.length; one++) {
        if (a[one] != null) {
          //Limits Results to Mauritius Only & near to user
          var latlower = parseFloat(lat) - 0.09;
          var latupper = parseFloat(lat) + 0.09;
          var longlower = parseFloat(longitude) - 0.09;
          var longupper = parseFloat(longitude) + 0.09;
          if ((parseFloat(a[one]) >= latlower) && (parseFloat(a[one]) <= latupper)) {
            if ((parseFloat(b[one]) >= longlower) && (parseFloat(b[one]) <= longupper)) {
              marker[one] = L.marker([a[one], b[one]]).on('click', shortroute).addTo(mymap);
              marker[one].bindPopup(c[one]).openPopup();
            }
          }
        }
      }
      //ADDING NAVIGATION TO MAP still beta
      function shortroute(e) {
        L.Routing.control({
          waypoints: [
            L.latLng(lat, longitude),
            L.latLng(e.latlng.lat, e.latlng.lng)
          ]
        }).addTo(mymap);
      }
    });
  });



  function getemp() {
    $.ajax({
      url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
      type: 'GET',
      dataType: 'jsonp',
      jsonp: 'jsonpcallback',
      data: {
        product: 'observation',
        latitude: lat,
        longitude: longitude,
        oneobservation: 'true',
        app_id: '6HK4rI7nJG7U70E3sSlb',
        app_code: 'ojkRjUzTEJR5VLyGobiRIQ'
      },
      success: function(data) {
        $("#temp").html(data.observations.location[0].city + ": " + data.observations.location[0].observation[0].highTemperature + "<img id='thermo' src='img/thermo.png'>");
      }
    });
  }

}); //END OF HOME FUNCTIONALITY
