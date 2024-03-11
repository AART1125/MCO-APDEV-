const restaurantModel = require('../Model/restaurantModel'); 

function add(server) {
    server.get('/restaurant/Bonchon', (req, resp) => {
        resp.send('Testing'); 
    });
}

module.exports = {
    add
};
