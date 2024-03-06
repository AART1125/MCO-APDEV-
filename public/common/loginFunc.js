$(document).ready(function () {
    $('#loginbtn').click(function (e) { 
        $.post("/login-form", 
            {username   :   $('#username').val(),
             password   :   $('#password').val()},
            function (data, status) {
                if (status == 'success' && !data.isSame) {
                    $('#username').style.border = "2px solid #EE6958";
                    $('#password').style.border = "2px solid #EE6958";
                }
            },
        );
    });
});