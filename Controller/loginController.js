const loginDB = require('../Model/loginModel');

function add(server){
    server.post('/user-login', (req, resp) => {
        loginDB.loginToWebsite(req, resp);
    });
}

module.exports = {
    add
}