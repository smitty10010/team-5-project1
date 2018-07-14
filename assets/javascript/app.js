var map;
var infowindow;
var denver;
var map;

function initMap() {
    denver = {
        lat: 39.7231759,
        lng: -105.1296253
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: denver,
        zoom: 11.49
    });

    // var request = {
    //     location: denver,
    //     query: 'mountain climbing gyms'
    // };

    // infowindow = new google.maps.InfoWindow();
    // var service = new google.maps.places.PlacesService(map);
    // service.textSearch(request, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
$('.tabs').tabs();
$('.parallax').parallax();



function createOutdoorMarker(place) {
    
    var marker = new google.maps.Marker({
        map: map,
        position: place
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

$("#submit").click(function() {
    
    var minDiff;
    var maxDiff;
    var lat;
    var long;
    
    var responseObject = {
        q1: $('.venue.active').text().toLowerCase(),
        q2: $('.style.active').text().toLowerCase(),
        q3: $('.exp.active').text().toLowerCase(),
    };
console.log(responseObject)
if (responseObject.q1 === "indoor") {
    var request = {
        location: denver,
        query: 'mountain climbing gyms'
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
    
} else {
  if  (responseObject.q2 === "boulder" && responseObject.q3 === "some") {
        minDiff = "V1";
        maxDiff = "V2";
        lat = "39.652";
        long = "-105.185";
      } else if 
    
      (responseObject.q2 === "boulder" && responseObject.q3 === "none") {
        minDiff = "V0";
        maxDiff = "V1";
        lat = "39.652";
        long = "-105.185";
      } else if 
    
       (responseObject.q2 === "top rope" && responseObject.q3 === "none") {
        minDiff = "5.4";
        maxDiff = "5.6";
        lat = "39.754";
        long = "-105.24";
      } else if 
    
      (responseObject.q2 === "top rope" && responseObject.q3 === "some") {
        minDiff = "5.7";
        maxDiff = "5.9";
        lat = "39.754";
        long = "-105.24";
      };
      
      var queryURL = "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" + lat + "&lon=" + long + "&maxDistance=1&minDiff=" + minDiff + "&maxDiff=" + maxDiff + "&key=200310132-c610c4fb4a201873e534db2c38774eb7"
    
    
    console.log('queryURL: ' + queryURL);

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
    //    console.log('RESPONSE: ' , response);
       
    for (var i = 0; i<response.routes.length; i++) {
       
        
        var coordinates = {
            lat: response.routes[i].latitude,
            lng: response.routes[i].longitude
        }
        
        console.log('ROUTES: ' , response.routes[i]);
        
        createOutdoorMarker(coordinates);
        var routeName = $("<p>").text("Name: " + response.routes[i].name);
        var routeLocation = $("<p>").text("Location: " + response.routes[i].location);
        var routeRating = $("<p>").text("Rating: " + response.routes[i].rating);
        
        

        
        $('#results').append(routeName);
        $('#results').append(routeLocation);
        $('#results').append(routeRating);
        

        
    }
    
      
    
    
    
    
      });
    }
    });