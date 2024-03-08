const loginModel = require('../Model/loginModel');

function add(server){
    server.post('/loggedin-main', (req, resp) => {
        loginModel.loginToWebsite(req, resp);
    });

    server.get('/register', (req, resp) => {
        resp.render('register', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Register',
            js      :   '../public/common/js/register.js',
            css     :   '../public/common/css/register.css'
        })
    })
}

module.exports = {
    add
}