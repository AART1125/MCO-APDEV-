const loginModel = require('../Model/loginModel');
const { getRestaurantData } = require('../Model/restaurantModel');

function add(server){
    server.post('/post-login', (req, resp) => {
        loginModel.loginToWebsite(req, resp);
    });

    server.get('/main-user', async (req,resp) => {
        const restaurants = await getRestaurantData();
        resp.render('main', {
            layout: 'index',
            title: 'Archer\'s Hunt',
            js: '/common/js/mainFunc.js',
            css: '/common/css/main.css',
            islogin: true,
            isOwner: false,
            restaurants: restaurants
        });
    });

    server.get('/main-owner', async (req,resp) => {
        const restaurants = await getRestaurantData();
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
};
