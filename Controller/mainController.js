//server specific functions

const restaurantDB = require('../Model/restaurantModel');

function add(server){
    server.get('/', async (req, res) => {
            const restaurants = await restaurantDB.getRestaurantData();
            res.render('main', {
                layout: 'index',
                title: 'Archer\'s Hunts',
                js: '/common/js/mainFunc.js',
                css: '/common/css/main.css',
                islogin: false,
                restaurants: restaurants
            });
    });

    server.get('/main-user', async (req,resp) => {
        const restaurants = await restaurantDB.getRestaurantData();
        console.log(req.session.login_user);
        console.log(req.session.login_username);
        resp.render('main', {
            layout: 'index',
            username: req.session.login_username,
            title: 'Archer\'s Hunt',
            js: '/common/js/mainFunc.js',
            css: '/common/css/main.css',
            islogin: true,
            isOwner: false,
            restaurants: restaurants,
        });
    });

    server.get('/main-owner', async (req,resp) => {
        const restaurants = await restaurantDB.getRestaurantData();
        resp.render('main', {
            layout: 'index',
            title: 'Archer\'s Hunt',
            js: '/common/js/mainFunc.js',
            css: '/common/css/main.css',
            islogin: true,
            isOwner: true,
            restaurants: restaurants
        });
    });

}

module.exports = {
    add
}