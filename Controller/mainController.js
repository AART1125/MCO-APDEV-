//server specific functions

const restaurantDB = require('../model/restaurantModel');
const establishmentsDB = require('../model/establishmentsModel');

function add(server){
    server.get('/', async (req, res) => {
        let restuarants;
        
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

    // server.get('/main', async (req,resp) => {
    //     const restaurants = await restaurantDB.getRestaurantData();
    //     console.log(req.session.login_user);
        
    //     resp.render('main', {
    //         layout: 'index',
    //         username: req.session.login_username,
    //         title: 'Archer\'s Hunt',
    //         js: '/common/js/mainFunc.js',
    //         css: '/common/css/main.css',
    //         islogin: true,
    //         isOwner: req.session.login_isOwner,
    //         restaurants: restaurants,
    //     });
    // });

    // server.get('/main-owner', async (req,resp) => {
    //     const restaurants = await restaurantDB.getRestaurantData();
    //     resp.render('main', {
    //         layout: 'index',
    //         title: 'Archer\'s Hunt',
    //         js: '/common/js/mainFunc.js',
    //         css: '/common/css/main.css',
    //         islogin: true,
    //         isOwner: true,
    //         restaurants: restaurants
    //     });
    // });

}

module.exports = {
    add
}