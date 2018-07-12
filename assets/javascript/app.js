$(document).ready(function() {

function mountainProject() {

var minDiff;
var maxDiff;
var lat;
var long;


  
  var queryURL = "https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=" + lat + "&lon=" + long + "&maxDistance=10&minDiff=" + minDiff + "&maxDiff=" + maxDiff + "&key=200310132-c610c4fb4a201873e534db2c38774eb7"

  

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   console.log(response);
   var responseObject = {
    q1: $('input[name=radioName]:checked', '#question1').val(),
    q2: $('input[name=radioName]:checked', '#question2').val(),
    q3: $('input[name=radioName]:checked', '#question3').val()
};

  if (responseObject.q2 === "boulder" && responseObject.q3 === "yes") {
    minDiff = "V1";
    maxDiff = "V2";
    lat = "39.652";
    long = "-105.185";
  };

  if (responseObject.q2 === "boulder" && responseObject.q3 === "no") {
    minDiff = "V0";
    maxDiff = "V1";
    lat = "39.652";
    long = "-105.185";
  };

  if (responseObject.q2 === "sport" && responseObject.q3 === "no") {
    minDiff = "5.4";
    maxDiff = "5.6";
    lat = "39.754";
    long = "-105.24";
  };

  if (responseObject.q2 === "sport" && responseObject.q3 === "yes") {
    minDiff = "5.7";
    maxDiff = "5.9";
    lat = "39.754";
    long = "-105.24";
  };




  });
};

mountainProject();






});