$(document).ready(function() {
// only show the start screen
$('#sign-in').hide();
$('#questionnaire').hide();
// on click function for Im new button
$('#new-button').on('click', function() {
    $('#start-screen').hide();
    $('#questionnaire').show();
    $('#sign-in').hide();
});
// on click function for member button
$('#member-button').on('click', function() {
    $('#start-screen').hide();
    $('#sign-in').show();
});






});