$(document).ready(function(){
   $('.modal').modal({
    dismissible: false
   });
});
$(".venue").click(function() {
    $(".venue").removeClass('active');
    $(this).addClass('active');
});
$(".style").click(function() {
    $(".style").removeClass('active');
    $(this).addClass('active');
});
$(".exp").click(function() {
    $(".exp").removeClass('active');
    $(this).addClass('active');
});
$("#submit").click(function() {
    location.href = "profile-page.html";
});