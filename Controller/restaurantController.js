const restaurantModel = require('../Model/restaurantModel'); 

function add(server) {
    server.get('/restaurant/:restoname', async (req, resp) => {
        try {
            const restaurantDataArray = await restaurantModel.getRestaurantData();
            
            const restonameParam = req.params.restoname;
            const selectedRestaurant = restaurantDataArray.find(restaurant => restaurant['resto-name'] === restonameParam);

            if (selectedRestaurant) {
                resp.render('restaurant', {
                    layout: 'index',
                    title: 'Archer\'s Hunt',
                    js: '/common/js/restaurant.js', 
                    css: '/common/css/restaurant.css', 
                    islogin: false,
                    isOwner: false,
                    restaurant: selectedRestaurant
                });
            } else {
                resp.status(404).send('Restaurant not found'); 
            }
        } catch (error) {
            console.error('Error in /restaurant/:restoname route:', error);
            resp.status(500).send('Internal Server Error');
        }
    });
}

module.exports = {
    add
};
