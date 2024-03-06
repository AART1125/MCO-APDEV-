const loginDB = require('../Model/loginDB');

const loginView = function(req, resp){
    resp.render('login', {
        layout  :   'index',
        title   :   'Archer\'s Hunt'
    });
}

const login = function(req, resp){loginDB.loginToWebsite()};

module.exports = {
    loginView,
    login
}