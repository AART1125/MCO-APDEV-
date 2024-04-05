//server specific functions

const restaurantDB = require('../Model/restaurantModel');
const establishmentsDB = require('../Model/establishmentsModel');

function add(server){
    server.get('/', async (req, res) => {
        if(req.session.login_isOwner) {
            restaurants = await establishmentsDB.ownerGen(req);
        } else {
            restaurants = await restaurantDB.getRestaurantData();
        }
        
        res.render('main', {
            layout: 'index',
            title: 'Archer\'s Hunts',
            js: '/common/js/mainFunc.js',
            css: '/common/css/main.css',
            islogin: req.session.login_id != undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
            restaurants: restaurants
        });
    });
    
    server.get('/about', (req, res) => {
        res.render('about', {
            layout: 'index',
            title: 'Archer\'s Hunts',
            css: '/common/css/main.css',
            islogin: req.session.login_id !== undefined,
            isOwner: req.session.login_isOwner,
            username: req.session.login_username,
        });
    });
}

module.exports = {
    add
}
