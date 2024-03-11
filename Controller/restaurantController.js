const restaurantDB = require('../Model/restaurantModel');

function add(server) {
    server.get('/restaurant/:restoname', (req, resp) => {

    });
}

module.exports = {
    add
}