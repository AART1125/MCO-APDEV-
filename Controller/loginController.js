const loginModel = require('../Model/loginModel');
const { getRestaurantData } = require('../Model/restaurantModel');

function add(server){
    server.post('/post-login', (req, resp) => {
        loginModel.loginToWebsite(req, resp);
    });

    server.get('/login',(req, resp) => {
        resp.render('login', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Login',
            js      :   '/common/js/loginFunc.js',
            css     :   '/common/css/login.css',
        })
    });

    server.get('/logout',(req, resp) => {
        req.session.destroy((err) => {
            if(err){
                console.log(err);
                res.status(500).send('Error ending session');
            } else {
                resp.redirect('/');
            }
        })
    });

}

module.exports = {
    add
};
