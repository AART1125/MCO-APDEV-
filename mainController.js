//server specific functions

const profileDB = require('../Model/profileModel');


function add(server){
    server.get('/',(req, resp) => {
        resp.render('main',{
            layout  :   'index',
            title   :   'Archer\'s Hunts',
            js      :   '/common/js/mainFunc.js',
            css     :   '/common/css/main.css',
            islogin :   false
        });
    });
    
    server.get('/login',(req, resp) => {
        resp.render('login', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Login',
            js      :   '/common/js/loginFunc.js',
            css     :   '/common/css/login.css',
        })
    });

    server.get('/establishments',(req, resp) => {
        resp.render('establishments', {
            layout  :   'index',
            title   :   'Archer\'s Hunts | Listings',
            js      :   '/common/js/establishments.js',
            css     :   '/common/css/establishments.css',
        })
    });

    server.get('/profile', (req, resp) => {
        profileDB.findProfile(req, resp);
    });

}

module.exports = {
    add
}