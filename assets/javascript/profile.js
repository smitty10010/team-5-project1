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
            query: 'rock climbing gyms'
        };

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);


        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                    buildGymListItem(results[i]);
                }
            }
        }

        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: placeLoc
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
                var lat = place.geometry.location.lat();
                var lng = place.geometry.location.lng();
                weatherAPICall(lat, lng);
            });
        }

        //meet up url 
        var meetUpUrl = "https://api.meetup.com/find/groups?&sign=true&photo-host=public&zip=80201&text=climbing&page=20&key=665c5651aa6363315a7b2a30321e35";

        $.ajax({
            url: meetUpUrl,
            dataType: 'jsonp',
            crossDomain: true,
            method: 'GET'
        }).then(function(response) {
            for (i = 0; i < response.data.length; i++) {
                var groupDetails = response.data[i];
                buildMeetUpGroups(groupDetails);
            }
        })
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
                weatherAPICall(place.lat, place.lng);
            });
        }
        if (snapshot.val().q2 === "boulder" && snapshot.val().q3 === "some") {
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


            for (var i = 0; i < response.routes.length; i++) {

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
                buildRouteListItem(routeName, routeLink, routeGrade, routeArea, routeCrag);
            }
        });
        // mountain project ajax end

    };
});

// weather ajax
function weatherAPICall(lat, lng) {

    var APIKey = "c96fd8234f72e215a9e79fae44f17d3f";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat + "&lon=" + lng + "&appid=" + APIKey;

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(weatherResponse) {
            var tempFaren = (((weatherResponse.main.temp - 273.15) * 1.8) + 32).toFixed();
            var description = weatherResponse.weather[0].description;
            var wind = weatherResponse.wind.speed;
            $('#temp').text("Temperature: " + tempFaren);
            $('#description').text("Description: " + description);
            $('#wind').text("Wind speed: " + wind + " mph");

        });
    // weather ajax end

};

// retrieve profile info from session storage
function retrieveProfileInfo() {
    return JSON.parse(sessionStorage.getItem("user"));
}

// convert boulder/tope rope to gerund
function makeGerund(styleVerb) {
    if (styleVerb === "Boulder") {
        return "Bouldering";
    } else if (styleVerb === "Top Rope")
        return "Top Rope Climbing";
}

// update HTML tab for bouldering and indoor, defaults to ROUTES 
function tabLabelUpdateHTML() {
    var profileStore = retrieveProfileInfo();
    var userStyle = profileStore.style;
    var userVenue = profileStore.venue;
    if (userVenue === "Indoor") {
        $("#routes-tab").text("GYMS");
    } else if (userStyle === "Boulder") {
        $("#routes-tab").text("PROBLEMS");
    }
}

// set up profile info string for header chip on profile page
function profileChipPopulate() {
    var profileStore = retrieveProfileInfo();
    var activity = makeGerund(profileStore.style);
    var userProfString = profileStore.firstName + ", " + profileStore.age + " | " + "Exploring " + activity + " " + profileStore.venue + "s";
    $("#userProfile").text(userProfString);
}

// build out collection of outdoor routes/problems in card left of map
function buildRouteListItem(name, src, grade, area, crag) {
    $("#route-table").append($("<li>").addClass("collection-item avatar")
        .append($("<i>").addClass("material-icons circle").text("landscape"))
        .append($("<a>").addClass("route-name").text(name).attr("href", src).attr("target", "_blank"))
        .append($("<p>").text("Grade: " + grade))
        .append($("<p>").text("Area: " + area))
        .append($("<p>").text("Crag: " + crag))
    );
};

// create Places Service to get gym website urls
function getPlacesDetails(id) {

    var request = {
        placeId: id,
    }

    var service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);

    function callback(place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            $("#" + id).attr("href", place.website).attr("target", "_blank");
        }
    }
}

// build out collection of indoor gyms in card left of map 
function buildGymListItem(place) {
    $("#route-table").append($("<li>").addClass("collection-item avatar")
        .append($("<i>").addClass("material-icons circle").text("landscape"))
        .append($("<a>").addClass("gym-name").text(place.name).attr("id", place.place_id))
        .append($("<p>").text(place.formatted_address))
    );
    getPlacesDetails(place.place_id);
}

//build meetup events list
function buildMeetUpGroups(groups) {
    $('#meetups-table').append($("<li>").addClass("collection-item avatar")
        .append($("<i>").addClass("material-icons circle").text("landscape"))
        .append($("<a>").text(groups.name).attr("href", groups.link).attr("target", "_blank"))
        .append($("<p>").text("Active members: " + groups.members))
    );
}

// initialization functions
$(document).ready(function() {
    $('.tabs').tabs();
    $('.parallax').parallax();
    $(".indicator").addClass("orange darken-1");
    tabLabelUpdateHTML();
    profileChipPopulate();
});