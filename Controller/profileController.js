const profileDB = require('../Model/profileModel');

function add(server){
    server.post('/user-profile', (req, resp) => {
        profileDB.findProfile(req, resp);
    });
}

module.exports = {
    add
}