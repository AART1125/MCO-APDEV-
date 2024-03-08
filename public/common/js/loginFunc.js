//login button function
$(document).ready(function () {
    $('#loginbtn').click(function (e) { 
        $.post("/login-form", 
            {username   :   $('#username').val(),
             password   :   $('#password').val()},
            function (data, status) {
                if (status === 'success') {
                    if (!data.doesExist) {
                        $('#username').css("border","2px solid #EE6958")
                        $('#password').css("border","2px solid #EE6958")
                    }
                }
            },
        );
        return false;
    });
});