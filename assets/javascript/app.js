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
    database.ref().set(responseObject);

    
});