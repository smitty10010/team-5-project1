var map;
var infowindow;

function initMap() {
    var denver = {
        lat: 39.7231759,
        lng: -105.1296253
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: denver,
        zoom: 11.49
    });

    var request = {
        location: denver,
        query: 'mountain climbing gyms'
    };

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
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



// function mountainProject() {

//     var minDiff;
//     var maxDiff;
//     var lat;
//     var long;



//       var queryURL = "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" + lat + "&lon=" + long + "&maxDistance=10&minDiff=" + minDiff + "&maxDiff=" + maxDiff + "&key=200310132-c610c4fb4a201873e534db2c38774eb7"



//       $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {
//        console.log(response);
//        var responseObject = {
//         q1: $('input[name=radioName]:checked', '#question1').val(),
//         q2: $('input[name=radioName]:checked', '#question2').val(),
//         q3: $('input[name=radioName]:checked', '#question3').val()
//     };

//       if (responseObject.q2 === "boulder" && responseObject.q3 === "yes") {
//         minDiff = "V1";
//         maxDiff = "V2";
//         lat = "39.652";
//         long = "-105.185";
//       };

//       if (responseObject.q2 === "boulder" && responseObject.q3 === "no") {
//         minDiff = "V0";
//         maxDiff = "V1";
//         lat = "39.652";
//         long = "-105.185";
//       };

//       if (responseObject.q2 === "sport" && responseObject.q3 === "no") {
//         minDiff = "5.4";
//         maxDiff = "5.6";
//         lat = "39.754";
//         long = "-105.24";
//       };

//       if (responseObject.q2 === "sport" && responseObject.q3 === "yes") {
//         minDiff = "5.7";
//         maxDiff = "5.9";
//         lat = "39.754";
//         long = "-105.24";
//       };




//       });
//     };

//     mountainProject();