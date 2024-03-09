const profileDB = require('../Model/profileModel');

// to fix pa

function add(server){
    server.post('/user-profile', (req, resp) => {
        profileDB.findProfile(req, resp);
    });
}

module.exports = {
    add
}