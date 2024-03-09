//login button function in login page
$(document).ready(function () {
    $('#loginbtn').click(function (e) { 
        e.preventDefault();
        $.post("post-login", 
            {username   :   $('#username').val(),
             password   :   $('#password').val()},
            function (data, status) {
                if (status === 'success') {
                    if (!data.doesExist) {
                        $('#username').css("border","2px solid #EE6958");
                        $('#password').css("border","2px solid #EE6958");
                        $('#username').val('');
                        $('#password').val('');
                    } else if (data.doesExist && !data.isOwner){
                        $('#username').val('');
                        $('#password').val('');
                        window.location.href = '/main-user';
                    } else if (data.doesExist && data.isOwner) {
                        $('#username').val('');
                        $('#password').val('');
                        window.location.href = '/main-owner';
                    }
                }
            },
        );
    });
});