document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('login-form');

    form.addEventListener('submit', function() {
        event.preventDefault();
        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;

        if (username === 'janina' && password === '12345') {
            window.location.href = '../index_profile/index.html';
        } else {
            const userbox = document.getElementById('username-login');
            const passbox = document.getElementById('password-login');

            if (username != 'janina') {
                userbox.style.border = "2px solid #EE6958";
            } else {
                userbox.style.border = "2px solid #537A5A";
            }
            
            if(password != '12345') {
                passbox.style.border = "2px solid #EE6958";
            } else {
                passbox.style.border = "2px solid #537A5A";
            }

            return false;
        }
    })
})