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


    }
    if (snapshot.val().q1 === "outdoor") {

    }
})

$('.tabs').tabs();
$('.parallax').parallax();