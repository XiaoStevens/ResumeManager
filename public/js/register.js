$(document).ready(function () {
    $("#password2").keyup(checkPasswordMatch);
});

function checkPasswordMatch() {
    var password = $("#password").val();
    var confirmPassword = $("#password2").val();

    if (password != confirmPassword){
        $("#password2alert").html("Passwords do not match!");
        $("#password2alert").show();
        $("#signup").attr("disabled", true);
    }else {
        $("#password2alert").hide();
        $("#signup").attr("disabled", false);

    }
}

$("#email").on('blur',function(){
    $.ajax({
        type: "POST",
        url: '/checkEmail',
        data: {email:$(this).val()},
        success: function(data){
            console.log(data);
            if (data){
                $("#emailId_alert").html("Email Id already exists!");
                $("#emailId_alert").show();
                $("#signup").attr("disabled", true);
            }else {
                $("#emailId_alert").hide();
                $("#signup").attr("disabled", false);
            }
        }
    })
})
