function initMap() {
    denver = {
        lat: 39.7231759,
        lng: -105.1296253
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: denver,
        zoom: 10
    });



// Initialize Firebase
var config = {
    apiKey: "AIzaSyCeiT1Q0QtBaOFezcF3IzQSFTiRHnWpheM",
    authDomain: "team-five-projec-1531180321292.firebaseapp.com",
    databaseURL: "https://team-five-projec-1531180321292.firebaseio.com",
    projectId: "team-five-projec-1531180321292",
    storageBucket: "team-five-projec-1531180321292.appspot.com",
    messagingSenderId: "91504514776"
};

firebase.initializeApp(config);
var database = firebase.database();

database.ref().once("value", function(snapshot) {
    if (snapshot.val().q1 === "indoor") {
        
           var request = {
               location: denver,
               query: 'mountain climbing gyms'
           };

           infowindow = new google.maps.InfoWindow();
           var service = new google.maps.places.PlacesService(map);
           service.textSearch(request, callback);


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
    }
    if (snapshot.val().q1 === "outdoor") {
        function createOutdoorMarker(place, name) {
    
            var marker = new google.maps.Marker({
                map: map,
                position: place,
                title: name
            });
        
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }
        if  (snapshot.val().q2 === "boulder" && snapshot.val().q3 === "some") {
            minDiff = "V1";
            maxDiff = "V2";
            lat = "39.652";
            long = "-105.185";
          } else if 
        
          (snapshot.val().q2 === "boulder" && snapshot.val().q3 === "none") {
            minDiff = "V0";
            maxDiff = "V1";
            lat = "39.652";
            long = "-105.185";
          } else if 
        
           (snapshot.val().q2 === "top rope" && snapshot.val().q3 === "none") {
            minDiff = "5.4";
            maxDiff = "5.6";
            lat = "39.754";
            long = "-105.24";
          } else if 
        
          (snapshot.val().q2 === "top rope" && snapshot.val().q3 === "some") {
            minDiff = "5.7";
            maxDiff = "5.9";
            lat = "39.754";
            long = "-105.24";
          };
          
          var queryURL = "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" + lat + "&lon=" + long + "&maxDistance=1&minDiff=" + minDiff + "&maxDiff=" + maxDiff + "&key=200310132-c610c4fb4a201873e534db2c38774eb7"
        
        
        console.log('queryURL: ' + queryURL);
        //  ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
        
           
        for (var i = 0; i<response.routes.length; i++) {
            
            var coordinates = {
                lat: response.routes[i].latitude,
                lng: response.routes[i].longitude
            }
            
            console.log('ROUTES: ' , response.routes[i]);
            var routeName = response.routes[i].name;
            createOutdoorMarker(coordinates, routeName);
        }
    }); 
    // ajax end
    }
})

$('.tabs').tabs();
$('.parallax').parallax();
}