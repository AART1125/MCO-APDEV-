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
                    } 
                    else if (data.doesExist && !data.isOwner){
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

// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('loginbtn').addEventListener('click', async function (e) {
//         e.preventDefault();

//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         try {
//             const response = await fetch("post-login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({username, password}),
//             });

//             if (response.ok) {
//                 const data = await response.json();

//                 if (!data.doesExist) {
//                     document.getElementById('username').style.border = "2px solid #EE6958";
//                     document.getElementById('password').style.border = "2px solid #EE6958";
//                     document.getElementById('username').value = '';
//                     document.getElementById('password').value = '';
//                 } else if (data.doesExist && !data.isOwner){
//                     document.getElementById('username').value = '';
//                     document.getElementById('password').value = '';
//                     window.location.href = '/main-user';
//                 } else if (data.doesExist && data.isOwner) {
//                     document.getElementById('username').value = '';
//                     document.getElementById('password').value = '';
//                     window.location.href = '/main-owner';
//                 }
//             } else {
//                 // Handle HTTP error responses
//                 console.error('Login failed:', response.status, response.statusText);
//             }
//         } catch (error) {
//             console.error('Error during fetch:', error);
//         }
//     });
// });