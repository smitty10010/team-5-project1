// initialize all modals with dismissiable = false
    $(document).ready(function(){
        $('.modal').modal({
            dismissible: false
        });
    });
// initialize warning modal with dismissable = true
    $(document).ready(function(){
        $('.warning-modal').modal({
            dismissible: true
        });
    });
// toggle venue button selection
    $(".venue").click(function() {
        $(".venue").removeClass('active');
        $(this).addClass('active');
    });
// toggle style button selection
    $(".style").click(function() {
        $(".style").removeClass('active');
        $(this).addClass('active');
    });
// toggle exp button selection
    $(".exp").click(function() {
        $(".exp").removeClass('active');
        $(this).addClass('active');
    });
// check if user filled in all forms, launch warning modal if not, launch next modal if yes
    $(document).ready(function() {
        $("#next-btn").click(function() {
            var firstName = $("#first_name").val();
            var lastName = $("#last_name").val();
            var age = $("#age").val();
            var email = $("#email").val();
            if (firstName && lastName && age && email) {
                userProfile.firstName = $("#first_name").val();
                userProfile.age = $("#age").val();
                $("#mod-question1").modal("close");
                $("#mod-question2").modal("open");
            } else {
                $("#warning-modal1").modal("open");
            }
        });
    });
// check if user made all selections, launch warning modal if not, launch profile page if yes
        $(document).ready(function() {
            $("#submit").click(function() {
                if ($(".venue.active").length < 1 || $(".style.active").length < 1 || $(".exp.active").length < 1) {
                    $("#warning-modal2").modal("open");
                } else {
                    userProfile.style = $(".style.active").text();
                    userProfile.venue = $(".venue.active").text();
                    storeProfileInfo();
                    location.href = "profile-page.html#profile-logo";
                }
            });
        });
// empty object to hold profile info
    var userProfile = {
        firstName: "",
        age: 0, 
        style: "", 
        venue: ""
    };
// set profile information to browser session storage 
    function storeProfileInfo() {
        sessionStorage.setItem("user", JSON.stringify(userProfile));
    }