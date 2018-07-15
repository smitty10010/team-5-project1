function initMap() {
    denver = {
        lat: 39.7231759,
        lng: -105.1296253
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: denver,
        zoom: 10
    });

}

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
            
            infowindow = new google.maps.InfoWindow();
            
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(name);
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
            
            var routeName = response.routes[i].name;
            var routeGrade = response.routes[i].rating;
            var routeArea = response.routes[i].location[2];
            var routeCrag = response.routes[i].location[3];
            var routeLink = response.routes[i].url;
            createOutdoorMarker(coordinates, routeName);
            buildRouteListItem(routeName,routeGrade,routeArea,routeCrag,routeLink);
            
        }
    }); 
    // ajax end
    }
})

// retrieve profile info from session storage
function retrieveProfileInfo() {
    return JSON.parse(sessionStorage.getItem("user"));
}

// convert boulder/tope rope to gerund
function makeGerund() {
    var styleVerb = userProfile.style;
    if (styleVerb = "Boulder") {
        return "Bouldering";
    } else if (styleVerb = "Boulder") {
        return "Top Roping";
    }
}

// set up profile info string for header chip on profile page
function profileChipPopulate () {
    var profileStore = retrieveProfileInfo();
    var activity = makeGerund();
    var userProfString = profileStore.firstName + ", " + profileStore.age + " | " + "Exploring " + activity + " " + profileStore.venue + "s";
    $("#userProfile").text(userProfString);
}

// build out collection of routes/gym/problems in card left of map
function buildRouteListItem(name,grade,area,crag,src) {
    $("#route-table").append($("<li>").addClass("collection-item avatar")
    .append($("<i>").addClass("material-icons circle").text("landscape"))
    .append($("<a>").addClass("route-name").text(name).attr("href",src).attr("targe","_blank"))
    .append($("<p>").text("Grade: " + grade))
    .append($("<p>").text("Area: " + area))
    .append($("<p>").text("Crag: " + crag))
    )
};

// initialization functions
$(document).ready(function() {
    $('.tabs').tabs();
    $('.parallax').parallax();
    $(".indicator").addClass("orange darken-1");
    profileChipPopulate();
});